// API: /api/image/download?image_url=...
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const image_url = request.nextUrl.searchParams.get('q');

    if (!image_url) {
        return NextResponse.json({ error: 'Missing image URL' }, { status: 400 });
    }

    try {
        const response = await fetch(image_url);
        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
        }
        const imageSplit = image_url.split('/')
        const downloadImageName = imageSplit[imageSplit.length - 1]

        const contentType = response.headers.get('content-type') || 'application/octet-stream';
        const arrayBuffer = await response.arrayBuffer();
        return new NextResponse(Buffer.from(arrayBuffer), {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Content-Disposition': `attachment; filename=${downloadImageName}`,
            },
        });
    } catch (err) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
