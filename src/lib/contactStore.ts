import 'server-only';
import { ObjectId, type WithId } from 'mongodb';
import { getDb, isDbConfigured } from './mongodb';

const COLLECTION = 'contact_submissions';

// Pipeline: new → contacted → qualified → proposal → won/lost.
// 'closed' is the legacy terminal status from before the pipeline existed.
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost' | 'closed';
export type EmailStatus = 'sent' | 'failed' | 'pending';

export interface LeadNote {
    id: string;
    text: string;
    createdAt: string;
}

export interface ContactSubmissionInput {
    name: string;
    email: string;
    phone?: string;
    preferredDate: string;
    preferredTime: string;
    timezone: string;
    projectDetails?: string;
    /** Page path the form was submitted from (e.g. "/services/ai-agents-automation"). */
    sourcePath?: string;
    userAgent?: string;
    // First-touch marketing attribution (captured client-side) + geo (server-side).
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmTerm?: string;
    utmContent?: string;
    referrer?: string;
    landingPage?: string;
    country?: string;
}

export interface ContactSubmission extends ContactSubmissionInput {
    id: string;
    status: LeadStatus;
    emailStatus: EmailStatus;
    emailAttempts: number;
    lastEmailError?: string;
    emailSentAt?: string;
    createdAt: string;
    updatedAt: string;
    /** Starred / high-priority flag. */
    priority?: boolean;
    /** Estimated deal value in USD. */
    value?: number;
    /** ISO date (yyyy-mm-dd) the next follow-up is due. */
    followUpAt?: string;
    notes?: LeadNote[];
}

type SubmissionDoc = Omit<ContactSubmission, 'id'>;

let indexesEnsured = false;

async function collection() {
    const db = await getDb();
    const col = db.collection<SubmissionDoc>(COLLECTION);
    if (!indexesEnsured) {
        indexesEnsured = true;
        Promise.all([
            col.createIndex({ createdAt: -1 }),
            col.createIndex({ status: 1, createdAt: -1 }),
            col.createIndex({ emailStatus: 1 }),
            col.createIndex({ email: 1 }),
        ]).catch(() => { indexesEnsured = false; });
    }
    return col;
}

function toSubmission(doc: WithId<SubmissionDoc>): ContactSubmission {
    const { _id, ...rest } = doc;
    return { id: _id.toHexString(), ...rest };
}

export async function saveSubmission(input: ContactSubmissionInput): Promise<ContactSubmission> {
    const col = await collection();
    const now = new Date().toISOString();
    const doc: SubmissionDoc = {
        ...input,
        status: 'new',
        emailStatus: 'pending',
        emailAttempts: 0,
        createdAt: now,
        updatedAt: now,
    };
    const result = await col.insertOne(doc as SubmissionDoc & { _id?: ObjectId });
    return { id: result.insertedId.toHexString(), ...doc };
}

export async function recordEmailResult(
    id: string,
    result: { ok: boolean; attempts: number; error?: string },
): Promise<void> {
    const col = await collection();
    const now = new Date().toISOString();
    await col.updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                emailStatus: (result.ok ? 'sent' : 'failed') as EmailStatus,
                ...(result.ok
                    ? { emailSentAt: now }
                    : { lastEmailError: result.error ?? 'Unknown error' }),
                updatedAt: now,
            },
            ...(result.ok ? { $unset: { lastEmailError: '' } } : {}),
            $inc: { emailAttempts: result.attempts },
        },
    );
}

export async function getSubmissions(options?: { limit?: number }): Promise<ContactSubmission[]> {
    if (!isDbConfigured()) return [];
    const col = await collection();
    const docs = await col.find({}).sort({ createdAt: -1 }).limit(options?.limit ?? 500).toArray();
    return docs.map(toSubmission);
}

export async function getSubmissionById(id: string): Promise<ContactSubmission | null> {
    if (!ObjectId.isValid(id)) return null;
    const col = await collection();
    const doc = await col.findOne({ _id: new ObjectId(id) });
    return doc ? toSubmission(doc) : null;
}

export async function updateSubmissionStatus(id: string, status: LeadStatus): Promise<boolean> {
    if (!ObjectId.isValid(id)) return false;
    const col = await collection();
    const result = await col.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status, updatedAt: new Date().toISOString() } },
    );
    return result.matchedCount === 1;
}

export interface LeadUpdate {
    status?: LeadStatus;
    priority?: boolean;
    /** null clears the deal value. */
    value?: number | null;
    /** null clears the follow-up date. */
    followUpAt?: string | null;
}

export async function updateSubmission(id: string, update: LeadUpdate): Promise<boolean> {
    if (!ObjectId.isValid(id)) return false;
    const col = await collection();

    const $set: Record<string, unknown> = { updatedAt: new Date().toISOString() };
    const $unset: Record<string, ''> = {};

    if (update.status !== undefined) $set.status = update.status;
    if (update.priority !== undefined) $set.priority = update.priority;
    if (update.value !== undefined) {
        if (update.value === null) $unset.value = '';
        else $set.value = update.value;
    }
    if (update.followUpAt !== undefined) {
        if (update.followUpAt === null) $unset.followUpAt = '';
        else $set.followUpAt = update.followUpAt;
    }

    const result = await col.updateOne(
        { _id: new ObjectId(id) },
        { $set, ...(Object.keys($unset).length > 0 ? { $unset } : {}) },
    );
    return result.matchedCount === 1;
}

export async function addNote(id: string, text: string): Promise<LeadNote | null> {
    if (!ObjectId.isValid(id)) return null;
    const col = await collection();
    const note: LeadNote = {
        id: new ObjectId().toHexString(),
        text,
        createdAt: new Date().toISOString(),
    };
    const result = await col.updateOne(
        { _id: new ObjectId(id) },
        {
            $push: { notes: { $each: [note], $position: 0 } },
            $set: { updatedAt: note.createdAt },
        },
    );
    return result.matchedCount === 1 ? note : null;
}

export async function deleteNote(id: string, noteId: string): Promise<boolean> {
    if (!ObjectId.isValid(id)) return false;
    const col = await collection();
    const result = await col.updateOne(
        { _id: new ObjectId(id) },
        {
            $pull: { notes: { id: noteId } },
            $set: { updatedAt: new Date().toISOString() },
        },
    );
    return result.matchedCount === 1;
}

export async function deleteSubmission(id: string): Promise<boolean> {
    if (!ObjectId.isValid(id)) return false;
    const col = await collection();
    const result = await col.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
}

export async function countNewLeads(): Promise<number> {
    if (!isDbConfigured()) return 0;
    try {
        const col = await collection();
        return await col.countDocuments({ status: 'new' });
    } catch {
        return 0;
    }
}
