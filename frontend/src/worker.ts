export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);

    // Try fetching the requested asset
    let response = await env.ASSETS.fetch(request);

    // If the asset was not found (404), fallback to index.html
    if (response.status === 404 && request.method === 'GET' && !url.pathname.startsWith('/assets')) {
      const indexRequest = new Request(`${url.origin}/index.html`, request);
      response = await env.ASSETS.fetch(indexRequest);
    }

    return response;
  }
};
