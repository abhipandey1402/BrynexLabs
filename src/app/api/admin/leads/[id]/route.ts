import { NextRequest, NextResponse } from 'next/server';
import { updateSubmissionStatus, deleteSubmission, type LeadStatus } from '@/lib/contactStore';
import { isDbConfigured } from '@/lib/mongodb';

export const runtime = 'nodejs';

interface Params {
    params: { id: string };
}

const VALID_STATUSES: LeadStatus[] = ['new', 'contacted', 'closed'];

export async function PATCH(request: NextRequest, { params }: Params) {
    if (!isDbConfigured()) {
        return NextResponse.json({ error: 'MongoDB is not configured.' }, { status: 503 });
    }

    let body: { status?: string };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    if (!VALID_STATUSES.includes(body.status as LeadStatus)) {
        return NextResponse.json({ error: 'Invalid status.' }, { status: 400 });
    }

    const updated = await updateSubmissionStatus(params.id, body.status as LeadStatus);
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
