import { NextResponse } from 'next/server';

// Import the forms array from the parent route
import { forms } from '../route';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const form = forms.find((f) => f.id === params.id);
    if (!form) {
        return NextResponse.json(
            { error: 'Form not found' },
            { status: 404 }
        );
    }
    return NextResponse.json(form);
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const index = forms.findIndex((f) => f.id === params.id);

        if (index === -1) {
            return NextResponse.json(
                { error: 'Form not found' },
                { status: 404 }
            );
        }

        forms[index] = { ...forms[index], ...body };
        return NextResponse.json(forms[index]);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update form' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const index = forms.findIndex((f) => f.id === params.id);
    if (index === -1) {
        return NextResponse.json(
            { error: 'Form not found' },
            { status: 404 }
        );
    }
    
    forms.splice(index, 1);
    return NextResponse.json({ success: true });
} 