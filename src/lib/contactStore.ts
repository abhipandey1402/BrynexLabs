import 'server-only';
import { ObjectId, type WithId } from 'mongodb';
import { getDb, isDbConfigured } from './mongodb';

const COLLECTION = 'contact_submissions';

export type LeadStatus = 'new' | 'contacted' | 'closed';
export type EmailStatus = 'sent' | 'failed' | 'pending';

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
