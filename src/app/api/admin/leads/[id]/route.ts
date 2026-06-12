import { NextRequest, NextResponse } from 'next/server';
import { updateSubmission, deleteSubmission, type LeadStatus, type LeadUpdate } from '@/lib/contactStore';
import { isDbConfigured } from '@/lib/mongodb';

export const runtime = 'nodejs';

interface Params {
    params: { id: string };
}

const VALID_STATUSES: LeadStatus[] = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost', 'closed'];

export async function PATCH(request: NextRequest, { params }: Params) {
    if (!isDbConfigured()) {
        return NextResponse.json({ error: 'MongoDB is not configured.' }, { status: 503 });
    }

    let body: { status?: string; priority?: unknown; value?: unknown; followUpAt?: unknown };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const update: LeadUpdate = {};

    if (body.status !== undefined) {
        if (!VALID_STATUSES.includes(body.status as LeadStatus)) {
            return NextResponse.json({ error: 'Invalid status.' }, { status: 400 });
        }
        update.status = body.status as LeadStatus;
    }

    if (body.priority !== undefined) {
        if (typeof body.priority !== 'boolean') {
            return NextResponse.json({ error: 'Invalid priority.' }, { status: 400 });
        }
        update.priority = body.priority;
    }

    if (body.value !== undefined) {
        if (body.value === null) {
            update.value = null;
        } else if (typeof body.value === 'number' && Number.isFinite(body.value) && body.value >= 0 && body.value <= 100_000_000) {
            update.value = Math.round(body.value);
        } else {
            return NextResponse.json({ error: 'Invalid deal value.' }, { status: 400 });
        }
    }

    if (body.followUpAt !== undefined) {
        if (body.followUpAt === null) {
            update.followUpAt = null;
        } else if (typeof body.followUpAt === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(body.followUpAt)) {
            update.followUpAt = body.followUpAt;
        } else {
            return NextResponse.json({ error: 'Invalid follow-up date.' }, { status: 400 });
        }
    }

    if (Object.keys(update).length === 0) {
        return NextResponse.json({ error: 'Nothing to update.' }, { status: 400 });
    }

    const updated = await updateSubmission(params.id, update);
    if (!updated) return NextResponse.json({ error: 'Submission not found.' }, { status: 404 });
    return NextResponse.json({ ok: true });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
    if (!isDbConfigured()) {
        return NextResponse.json({ error: 'MongoDB is not configured.' }, { status: 503 });
    }
    const deleted = await deleteSubmission(params.id);
    if (!deleted) return NextResponse.json({ error: 'Submission not found.' }, { status: 404 });
    return NextResponse.json({ ok: true });
}
