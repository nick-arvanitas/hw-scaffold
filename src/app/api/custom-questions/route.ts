import { NextResponse } from 'next/server';

interface Form {
    id: string;
    name: string;
    category: string;
    freshness: string;
    template?: string;
    createdAt: string;
}

// In-memory storage for forms
export let forms: Form[] = [];

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // Create a new form with a unique ID
        const newForm: Form = {
            id: Date.now().toString(),
            name: body.name,
            category: body.category,
            freshness: body.freshness,
            template: body.template,
            createdAt: new Date().toISOString()
        };
        
        // Add to our in-memory storage
        forms.push(newForm);
        
        return NextResponse.json(newForm);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create form' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json(forms);
}

// Get a single form by ID
export async function GET_BY_ID(id: string) {
    const form = forms.find(f => f.id === id);
    if (!form) {
        return NextResponse.json(
            { error: 'Form not found' },
            { status: 404 }
        );
    }
    return NextResponse.json(form);
} 