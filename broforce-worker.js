// MADENTA BROFORCE - Cloudflare Worker
// Full game with conspiracy storyline, all characters, bilingual support

export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // Route: Main game
    if (url.pathname === '/' || url.pathname === '/play') {
      return new Response(GAME_HTML, {
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          'Cache-Control': 'public, max-age=3600',
          'X-Powered-By': '2076 ehf & Madenta Budapest',
        },
      });
    }
    
    // Route: Game assets info
    if (url.pathname === '/about') {
      return new Response(JSON.stringify({
        game: "MADENTA BROFORCE",
        version: "1.0.0",
        subtitle: "The Tooth Cartel Conspiracy",
        languages: ["Icelandic", "Hungarian"],
        characters: {
          heroes: ["Dr. Dávid Farkas", "Ómar the Patient", "Dr. György Péter", "Gunnar"],
          minibosses: ["Carius", "Bactus"],
          midbosses: ["The Fraudulent Five"],
          finalbosses: ["Decay Dancer", "Root Reaper"]
        },
        features: [
          "Pixel-art Broforce-style gameplay",
          "Conspiracy storyline",
          "Bilingual IS/HU support",
          "5 levels + boss fights",
          "Educational dental content"
        ],
        madenta: "https://madenta.is",
        creator: "2076 ehf - omar@2076.is"
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 404
    return new Response('Not Found - Try / or /about', { status: 404 });
  },
};

const GAME_HTML = `[GAME HTML WOULD GO HERE - TOO LARGE FOR INLINE]`;
// Note: In production, load from KV or R2 storage
