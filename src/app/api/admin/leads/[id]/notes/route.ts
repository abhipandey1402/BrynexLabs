import { NextRequest, NextResponse } from 'next/server';
import { addNote, deleteNote } from '@/lib/contactStore';
import { isDbConfigured } from '@/lib/mongodb';

export const runtime = 'nodejs';

interface Params {
    params: { id: string };
}

export async function POST(request: NextRequest, { params }: Params) {
    if (!isDbConfigured()) {
        return NextResponse.json({ error: 'MongoDB is not configured.' }, { status: 503 });
    }

    let body: { text?: unknown };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const text = typeof body.text === 'string' ? body.text.trim().slice(0, 2000) : '';
    if (!text) {
        return NextResponse.json({ error: 'Note text is required.' }, { status: 400 });
    }

    const note = await addNote(params.id, text);
    if (!note) return NextResponse.json({ error: 'Submission not found.' }, { status: 404 });
    return NextResponse.json({ ok: true, note });
}

export async function DELETE(request: NextRequest, { params }: Params) {
    if (!isDbConfigured()) {
        return NextResponse.json({ error: 'MongoDB is not configured.' }, { status: 503 });
    }

    const noteId = request.nextUrl.searchParams.get('noteId') ?? '';
    if (!noteId) {
        return NextResponse.json({ error: 'noteId is required.' }, { status: 400 });
    }

    const deleted = await deleteNote(params.id, noteId);
    if (!deleted) return NextResponse.json({ error: 'Submission not found.' }, { status: 404 });
    return NextResponse.json({ ok: true });
}
