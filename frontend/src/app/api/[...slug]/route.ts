import { NextRequest, NextResponse } from 'next/server';

// Disabilita la verifica SSL globalmente per questo processo
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export async function GET(request: NextRequest) {
  return handleRequest(request, 'GET');
}

export async function POST(request: NextRequest) {
  return handleRequest(request, 'POST');
}

export async function PUT(request: NextRequest) {
  return handleRequest(request, 'PUT');
}

export async function DELETE(request: NextRequest) {
  return handleRequest(request, 'DELETE');
}

async function handleRequest(request: NextRequest, method: string) {
  try {
    // Estrai il percorso dalla URL
    const { pathname, search } = request.nextUrl;
    const apiPath = pathname.replace('/api', '');
    const targetUrl = `https://api.freedhome-test.it${apiPath}${search}`;

    // Prepara gli headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Prepara il body per le richieste non-GET
    let body: string | undefined;
    if (method !== 'GET' && method !== 'HEAD') {
      body = await request.text();
    }

    // Effettua la richiesta al backend
    const response = await fetch(targetUrl, {
      method,
      headers,
      body,
    });

    // Copia la risposta
    const data = await response.text();
    
    return new NextResponse(data, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
      },
    });
  } catch (error) {
    console.error('API Proxy error:', error);
    return NextResponse.json(
      { success: false, message: 'Errore del proxy API', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
