// 🦷⚡ MADENTA: BROFORCE – Workers API
// Handles leaderboard, multiplayer sync, and AI villain dialogue
// © 2076 ehf

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // API Routes
      if (url.pathname === '/api/health') {
        return jsonResponse({ 
          status: 'ok',
          game: 'madenta-broforce',
          version: '1.0.0',
          timestamp: new Date().toISOString()
        }, corsHeaders);
      }

      if (url.pathname === '/api/leaderboard') {
        return handleLeaderboard(request, env, corsHeaders);
      }

      if (url.pathname === '/api/villain-dialogue') {
        return handleVillainDialogue(request, env, corsHeaders);
      }

      if (url.pathname === '/api/game-state') {
        return handleGameState(request, env, corsHeaders);
      }

      return jsonResponse({ error: 'Not Found' }, corsHeaders, 404);
    } catch (error) {
      return jsonResponse({ 
        error: error.message,
        stack: error.stack 
      }, corsHeaders, 500);
    }
  }
};

//═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
//═══════════════════════════════════════════════════════════════════════════

function jsonResponse(data, headers = {}, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  });
}

//═══════════════════════════════════════════════════════════════════════════
// LEADERBOARD API
//═══════════════════════════════════════════════════════════════════════════

async function handleLeaderboard(request, env, corsHeaders) {
  const method = request.method;

  // GET - Fetch leaderboard
  if (method === 'GET') {
    const leaderboard = await env.LEADERBOARD?.get('top-scores', { type: 'json' }) || [];
    return jsonResponse(leaderboard, corsHeaders);
  }

  // POST - Submit score
  if (method === 'POST') {
    const { playerName, score, hero, level } = await request.json();
    
    if (!playerName || typeof score !== 'number') {
      return jsonResponse({ error: 'Invalid input' }, corsHeaders, 400);
    }

    let leaderboard = await env.LEADERBOARD?.get('top-scores', { type: 'json' }) || [];
    
    leaderboard.push({
      playerName: playerName.slice(0, 20),
      score,
      hero: hero || 'jawbreaker',
      level: level || 1,
      timestamp: new Date().toISOString()
    });

    // Sort by score descending, keep top 100
    leaderboard = leaderboard
      .sort((a, b) => b.score - a.score)
      .slice(0, 100);

    await env.LEADERBOARD?.put('top-scores', JSON.stringify(leaderboard));

    return jsonResponse({ 
      success: true, 
      rank: leaderboard.findIndex(entry => entry.timestamp === leaderboard[leaderboard.length - 1].timestamp) + 1,
      leaderboard: leaderboard.slice(0, 10)
    }, corsHeaders);
  }

  return jsonResponse({ error: 'Method Not Allowed' }, corsHeaders, 405);
}

//═══════════════════════════════════════════════════════════════════════════
// VILLAIN DIALOGUE API (Love Island style)
//═══════════════════════════════════════════════════════════════════════════

async function handleVillainDialogue(request, env, corsHeaders) {
  const { villainType, context } = await request.json();

  const dialogueBank = {
    'carius': {
      taunt: [
        "Bro, do you even floss?",
        "This protein shake is 99% bacteria, mate.",
        "I'm not decay... I'm GAINS.",
        "Your enamel looking weak, bruv.",
        "Tooth day is leg day in my gym."
      ],
      death: [
        "I was... just bulking...",
        "Tell my gains... I loved them...",
        "The protein... it wasn't worth it..."
      ]
    },
    'bactus': {
      taunt: [
        "Mate, I only came here for the drama.",
        "This cavity isn't going to dig itself.",
        "You think YOU'RE strong? I literally eat through bone.",
        "I'm coupling up... with your molars.",
        "Sorry, not sorry about your dental bill."
      ],
      death: [
        "I should've stayed in the villa...",
        "This wasn't in my contract...",
        "My agent will hear about this..."
      ]
    },
    'fairy-villain': {
      taunt: [
        "Ugh, another hero? How original.",
        "These wings cost more than your equipment.",
        "I didn't steal teeth, I LIBERATED them.",
        "Do you know who I AM?",
        "This tooth is mine. I saw it first."
      ],
      death: [
        "My influencer career...",
        "I had 10k followers...",
        "This is so unfair..."
      ]
    },
    'fraududent': {
      taunt: [
        "This procedure is totally necessary. Trust me.",
        "Our prices? Let's call it... competitive.",
        "Insurance will definitely cover this. Probably.",
        "That's not a drill... it's a luxury tool.",
        "I have a degree! From... uh... overseas."
      ],
      death: [
        "The money... it was so close...",
        "I almost paid off my yacht...",
        "My Yelp reviews..."
      ]
    }
  };

  const lines = dialogueBank[villainType] || dialogueBank['carius'];
  const contextLines = lines[context] || lines.taunt;
  const randomLine = contextLines[Math.floor(Math.random() * contextLines.length)];

  return jsonResponse({ 
    dialogue: randomLine,
    villainType,
    context
  }, corsHeaders);
}

//═══════════════════════════════════════════════════════════════════════════
// GAME STATE API (for saving progress)
//═══════════════════════════════════════════════════════════════════════════

async function handleGameState(request, env, corsHeaders) {
  const method = request.method;

  if (method === 'GET') {
    const { playerId } = Object.fromEntries(new URL(request.url).searchParams);
    
    if (!playerId) {
      return jsonResponse({ error: 'playerId required' }, corsHeaders, 400);
    }

    const state = await env.GAME_STATE?.get(`player-${playerId}`, { type: 'json' });
    return jsonResponse(state || {}, corsHeaders);
  }

  if (method === 'POST') {
    const { playerId, gameState } = await request.json();
    
    if (!playerId || !gameState) {
      return jsonResponse({ error: 'Invalid input' }, corsHeaders, 400);
    }

    await env.GAME_STATE?.put(`player-${playerId}`, JSON.stringify({
      ...gameState,
      lastSaved: new Date().toISOString()
    }));

    return jsonResponse({ success: true }, corsHeaders);
  }

  return jsonResponse({ error: 'Method Not Allowed' }, corsHeaders, 405);
}

//═══════════════════════════════════════════════════════════════════════════
// DURABLE OBJECT: Multiplayer Session
//═══════════════════════════════════════════════════════════════════════════

export class MultiplayerSession {
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.players = new Map();
  }

  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === '/join') {
      const { playerId, heroType } = await request.json();
      
      this.players.set(playerId, {
        heroType,
        joinedAt: Date.now(),
        position: { x: 100, y: 450 },
        health: 100
      });

      await this.state.storage.put('players', Object.fromEntries(this.players));

      return new Response(JSON.stringify({ 
        success: true,
        players: Object.fromEntries(this.players)
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (url.pathname === '/sync') {
      const { playerId, position, health } = await request.json();
      
      if (this.players.has(playerId)) {
        this.players.get(playerId).position = position;
        this.players.get(playerId).health = health;
      }

      return new Response(JSON.stringify({ 
        players: Object.fromEntries(this.players)
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response('Not Found', { status: 404 });
  }
}
