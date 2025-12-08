// ============================================================
// MADENTA GAME PORTAL - Cloudflare Worker
// Built by 2076 ehf | omar@vertis.is
// Deploy: npx wrangler deploy portal-worker.js --name brodenta
// ============================================================

// ============================================================
// PORTAL LANDING PAGE
// ============================================================
const PORTAL_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MADENTA Game Portal | 2076 ehf</title>
    <meta name="description" content="Experience dental education through interactive games. All-on-4 simulations, Broforce action, and patient journeys.">
    <meta property="og:title" content="MADENTA Game Portal">
    <meta property="og:description" content="Interactive dental education games by 2076 ehf">
    <meta property="og:image" content="https://madenta.is/og-image.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&family=Press+Start+2P&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        :root {
            --emerald-50: #ecfdf5;
            --emerald-100: #d1fae5;
            --emerald-200: #a7f3d0;
            --emerald-400: #34d399;
            --emerald-500: #10b981;
            --emerald-600: #059669;
            --emerald-700: #047857;
            --emerald-800: #065f46;
            --emerald-900: #064e3b;
            --emerald-950: #022c22;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, var(--emerald-950) 0%, var(--emerald-900) 50%, #000 100%);
            color: #fff;
            min-height: 100vh;
            overflow-x: hidden;
        }
        
        /* Animated background grid */
        .bg-grid {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background-image: 
                linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px);
            background-size: 50px 50px;
            animation: gridMove 20s linear infinite;
            pointer-events: none;
            z-index: 0;
        }
        
        @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 40px 20px;
            position: relative;
            z-index: 1;
        }
        
        /* Header */
        header {
            text-align: center;
            margin-bottom: 60px;
        }
        
        .logo {
            font-family: 'Press Start 2P', monospace;
            font-size: clamp(32px, 6vw, 64px);
            color: var(--emerald-400);
            text-shadow: 
                4px 4px 0 var(--emerald-900),
                0 0 40px rgba(16, 185, 129, 0.5);
            margin-bottom: 20px;
            letter-spacing: 2px;
        }
        
        .tagline {
            font-size: 18px;
            color: var(--emerald-200);
            max-width: 600px;
            margin: 0 auto 30px;
            line-height: 1.6;
        }
        
        .badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(16, 185, 129, 0.15);
            border: 1px solid var(--emerald-600);
            padding: 8px 20px;
            border-radius: 50px;
            font-size: 13px;
            color: var(--emerald-300);
        }
        
        /* Game Cards Grid */
        .games-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 30px;
            margin-bottom: 60px;
        }
        
        .game-card {
            background: linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
            border: 2px solid rgba(16, 185, 129, 0.2);
            border-radius: 20px;
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            cursor: pointer;
            position: relative;
        }
        
        .game-card:hover {
            transform: translateY(-10px) scale(1.02);
            border-color: var(--emerald-500);
            box-shadow: 
                0 20px 40px rgba(0,0,0,0.4),
                0 0 60px rgba(16, 185, 129, 0.2);
        }
        
        .game-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(135deg, var(--emerald-500) 0%, var(--emerald-700) 100%);
            opacity: 0;
            transition: opacity 0.3s;
            z-index: 0;
        }
        
        .game-card:hover::before {
            opacity: 0.05;
        }
        
        .card-preview {
            height: 180px;
            background: linear-gradient(135deg, var(--emerald-800) 0%, var(--emerald-950) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 72px;
            position: relative;
            overflow: hidden;
        }
        
        .card-preview::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0; right: 0;
            height: 60px;
            background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
        }
        
        .card-content {
            padding: 25px;
            position: relative;
            z-index: 1;
        }
        
        .card-tag {
            display: inline-block;
            padding: 4px 12px;
            background: var(--emerald-600);
            color: white;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-radius: 20px;
            margin-bottom: 12px;
        }
        
        .card-tag.action { background: #dc2626; }
        .card-tag.edu { background: #2563eb; }
        .card-tag.pixel { background: #9333ea; }
        
        .card-title {
            font-size: 22px;
            font-weight: 800;
            color: white;
            margin-bottom: 10px;
        }
        
        .card-desc {
            font-size: 14px;
            color: var(--emerald-200);
            line-height: 1.6;
            margin-bottom: 15px;
        }
        
        .card-meta {
            display: flex;
            gap: 15px;
            font-size: 12px;
            color: var(--emerald-400);
        }
        
        .card-meta span {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .play-btn {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            margin-top: 20px;
            padding: 12px 28px;
            background: linear-gradient(135deg, var(--emerald-500), var(--emerald-600));
            color: white;
            border: none;
            border-radius: 30px;
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        }
        
        .play-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 25px rgba(16, 185, 129, 0.5);
        }
        
        /* Footer */
        footer {
            text-align: center;
            padding: 40px 20px;
            border-top: 1px solid rgba(16, 185, 129, 0.1);
        }
        
        .footer-logo {
            font-family: 'Press Start 2P', monospace;
            font-size: 14px;
            color: var(--emerald-500);
            margin-bottom: 15px;
        }
        
        .footer-links {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-bottom: 20px;
        }
        
        .footer-links a {
            color: var(--emerald-300);
            text-decoration: none;
            font-size: 14px;
            transition: color 0.2s;
        }
        
        .footer-links a:hover {
            color: var(--emerald-400);
        }
        
        .copyright {
            font-size: 12px;
            color: rgba(255,255,255,0.4);
        }
        
        /* Language Toggle */
        .lang-toggle {
            position: fixed;
            top: 20px;
            right: 20px;
            display: flex;
            gap: 8px;
            background: rgba(0,0,0,0.5);
            padding: 8px;
            border-radius: 30px;
            border: 1px solid rgba(16, 185, 129, 0.3);
            z-index: 100;
        }
        
        .lang-btn {
            padding: 8px 16px;
            background: transparent;
            border: none;
            color: var(--emerald-300);
            font-size: 14px;
            cursor: pointer;
            border-radius: 20px;
            transition: all 0.2s;
        }
        
        .lang-btn.active {
            background: var(--emerald-600);
            color: white;
        }
        
        /* Featured Banner */
        .featured {
            background: linear-gradient(135deg, var(--emerald-700), var(--emerald-900));
            border: 2px solid var(--emerald-500);
            border-radius: 20px;
            padding: 40px;
            margin-bottom: 40px;
            display: flex;
            align-items: center;
            gap: 40px;
            flex-wrap: wrap;
        }
        
        .featured-icon {
            font-size: 80px;
            flex-shrink: 0;
        }
        
        .featured-content {
            flex: 1;
            min-width: 280px;
        }
        
        .featured-title {
            font-size: 28px;
            font-weight: 900;
            margin-bottom: 10px;
        }
        
        .featured-desc {
            color: var(--emerald-200);
            margin-bottom: 20px;
            line-height: 1.6;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .games-grid {
                grid-template-columns: 1fr;
            }
            
            .featured {
                flex-direction: column;
                text-align: center;
            }
        }
    </style>
</head>
<body>
    <div class="bg-grid"></div>
    
    <div class="lang-toggle">
        <button class="lang-btn active" onclick="setLang('is')">🇮🇸</button>
        <button class="lang-btn" onclick="setLang('hu')">🇭🇺</button>
        <button class="lang-btn" onclick="setLang('en')">🇬🇧</button>
    </div>
    
    <div class="container">
        <header>
            <h1 class="logo">🦷 MADENTA</h1>
            <p class="tagline">Interactive dental education games. Learn about All-on-4® implants through play.</p>
            <div class="badge">
                <span>⚡</span>
                <span>Built by 2076 ehf | Edge-Powered Gaming</span>
            </div>
        </header>
        
        <!-- Featured Game -->
        <div class="featured">
            <div class="featured-icon">🎮</div>
            <div class="featured-content">
                <h2 class="featured-title">MADENTA BROFORCE</h2>
                <p class="featured-desc">
                    The ultimate dental action game! Fight the Tooth Cartel, battle bacteria bosses, 
                    and save dentistry with Dr. Dávid Farkas. Full storyline, 5 levels, bilingual support.
                </p>
                <a href="/broforce" class="play-btn">▶ PLAY NOW</a>
            </div>
        </div>
        
        <!-- Games Grid -->
        <div class="games-grid">
            <!-- All-on-4 Premium -->
            <div class="game-card" onclick="location.href='/main'">
                <div class="card-preview">🦷</div>
                <div class="card-content">
                    <span class="card-tag edu">Educational</span>
                    <h3 class="card-title">All-on-4 Premium</h3>
                    <p class="card-desc">
                        Full surgical simulation. Perform extractions, place titanium implants, 
                        and learn the All-on-4® procedure.
                    </p>
                    <div class="card-meta">
                        <span>🕐 15 min</span>
                        <span>🌍 Icelandic</span>
                        <span>⭐ Premium</span>
                    </div>
                    <button class="play-btn">▶ Play</button>
                </div>
            </div>
            
            <!-- Bilingual Complete -->
            <div class="game-card" onclick="location.href='/bilingual'">
                <div class="card-preview">🌍</div>
                <div class="card-content">
                    <span class="card-tag edu">Educational</span>
                    <h3 class="card-title">Bilingual Edition</h3>
                    <p class="card-desc">
                        Complete All-on-4 experience with seamless Hungarian/Icelandic language switching.
                    </p>
                    <div class="card-meta">
                        <span>🕐 10 min</span>
                        <span>🇮🇸🇭🇺 Dual Lang</span>
                    </div>
                    <button class="play-btn">▶ Play</button>
                </div>
            </div>
            
            <!-- Broforce Full -->
            <div class="game-card" onclick="location.href='/broforce'">
                <div class="card-preview" style="background: linear-gradient(135deg, #dc2626, #7f1d1d);">🔫</div>
                <div class="card-content">
                    <span class="card-tag action">Action</span>
                    <h3 class="card-title">BROFORCE Full</h3>
                    <p class="card-desc">
                        Fight the Tooth Cartel! Platformer action with cutscenes, 
                        multiple levels, and epic boss battles.
                    </p>
                    <div class="card-meta">
                        <span>🕐 30 min</span>
                        <span>🎮 5 Levels</span>
                        <span>🔥 Full Story</span>
                    </div>
                    <button class="play-btn">▶ Play</button>
                </div>
            </div>
            
            <!-- Patient Mode -->
            <div class="game-card" onclick="location.href='/patient'">
                <div class="card-preview" style="background: linear-gradient(135deg, #2563eb, #1e3a8a);">🏥</div>
                <div class="card-content">
                    <span class="card-tag edu">Patient</span>
                    <h3 class="card-title">3 Days After</h3>
                    <p class="card-desc">
                        Post-surgery recovery simulation. Navigate wine tasting, 
                        restaurants, and tourism without teeth!
                    </p>
                    <div class="card-meta">
                        <span>🕐 20 min</span>
                        <span>😂 Comedy</span>
                        <span>📚 Educational</span>
                    </div>
                    <button class="play-btn">▶ Play</button>
                </div>
            </div>
            
            <!-- Pixel Art -->
            <div class="game-card" onclick="location.href='/pixel'">
                <div class="card-preview" style="background: linear-gradient(135deg, #9333ea, #581c87);">👾</div>
                <div class="card-content">
                    <span class="card-tag pixel">Pixel Art</span>
                    <h3 class="card-title">Pixel Edition</h3>
                    <p class="card-desc">
                        Retro-styled All-on-4 game with beautiful pixel art graphics 
                        and classic gameplay.
                    </p>
                    <div class="card-meta">
                        <span>🕐 10 min</span>
                        <span>🎨 Retro Style</span>
                    </div>
                    <button class="play-btn">▶ Play</button>
                </div>
            </div>
            
            <!-- Coming Soon -->
            <div class="game-card" style="opacity: 0.6; cursor: default;">
                <div class="card-preview" style="background: #333;">🔒</div>
                <div class="card-content">
                    <span class="card-tag" style="background: #666;">Coming Soon</span>
                    <h3 class="card-title">Multiplayer Arena</h3>
                    <p class="card-desc">
                        Compete with other players in real-time dental challenges. 
                        Leaderboards, tournaments, and more.
                    </p>
                    <div class="card-meta">
                        <span>🔜 Q1 2025</span>
                    </div>
                </div>
            </div>
        </div>
        
        <footer>
            <div class="footer-logo">2076 ehf</div>
            <div class="footer-links">
                <a href="https://madenta.is" target="_blank">madenta.is</a>
                <a href="https://omaromar.net" target="_blank">omaromar.net</a>
                <a href="https://2076.is" target="_blank">2076.is</a>
            </div>
            <p class="copyright">© 2024 2076 ehf | Invisible systems, effortless results</p>
        </footer>
    </div>
    
    <script>
        function setLang(lang) {
            document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            // Could add translation logic here
        }
    </script>
</body>
</html>`;



// ============================================================
// GAME: ALL-ON-4 PREMIUM (MAIN)
// ============================================================
const GAME_MAIN = `<!DOCTYPE html>
<html lang="is">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>MADENTA: All-on-4 Reynslan - Premium Edition</title>
    <meta name="description" content="Upplifðu All-on-4 tannplantaaðgerðina í leikjaformi">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            margin: 0; padding: 0;
            background: linear-gradient(135deg, #0a4d3c 0%, #064a38 100%);
            color: #fff; font-family: 'Inter', sans-serif;
            overflow: hidden; touch-action: none;
            display: flex; flex-direction: column; align-items: center; height: 100vh;
        }
        #game-wrapper {
            position: relative; width: 100%; max-width: 900px;
            height: 100vh; max-height: 650px;
            background: linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%);
            border: 3px solid #10b981; box-shadow: 0 20px 60px rgba(0,0,0,0.4);
            border-radius: 8px; overflow: hidden;
        }
        canvas { display: block; width: 100%; height: 100%; background: linear-gradient(180deg, #dbeafe 0%, #bfdbfe 100%); }
        .hud-panel {
            position: absolute; pointer-events: none; padding: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            background: rgba(255,255,255,0.15); backdrop-filter: blur(10px);
            border-radius: 12px; border: 1px solid rgba(255,255,255,0.3);
        }
        #top-left { top: 15px; left: 15px; }
        #top-right { top: 15px; right: 15px; text-align: right; }
        .stat-label { font-size: 11px; color: #064e3b; text-transform: uppercase; font-weight: 700; letter-spacing: 1.5px; margin-bottom: 5px; }
        .stat-val { font-size: 28px; font-weight: 900; margin-bottom: 8px; color: #065f46; }
        .bar-container { width: 240px; height: 14px; background: rgba(0,0,0,0.2); margin-bottom: 10px; border-radius: 10px; overflow: hidden; border: 2px solid rgba(255,255,255,0.4); }
        .bar-fill { height: 100%; transition: width 0.3s ease; border-radius: 8px; }
        #success-fill { background: linear-gradient(90deg, #10b981, #059669); width: 100%; box-shadow: 0 0 10px rgba(16, 185, 129, 0.5); }
        #time-fill { background: linear-gradient(90deg, #3b82f6, #2563eb); width: 100%; box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
        .madenta-logo {
            position: absolute; top: 20px; right: 50%; transform: translateX(50%);
            font-size: 32px; font-weight: 900; color: #10b981;
            text-shadow: 2px 2px 0 rgba(0,0,0,0.1); letter-spacing: 2px;
            pointer-events: none; background: rgba(255,255,255,0.95);
            padding: 10px 25px; border-radius: 8px; border: 2px solid #10b981;
        }
        #weapon-bar {
            position: absolute; bottom: 25px; left: 50%; transform: translateX(-50%);
            display: flex; gap: 10px; background: rgba(255,255,255,0.95);
            padding: 12px; border-radius: 16px; pointer-events: auto;
            border: 3px solid #10b981; box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        .weapon-slot {
            width: 70px; height: 75px; border: 3px solid #d1d5db; border-radius: 10px;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            cursor: pointer; transition: all 0.2s; font-size: 10px;
            background: white; color: #374151; font-weight: 700; text-transform: uppercase;
        }
        .weapon-slot:hover { transform: translateY(-3px); border-color: #10b981; }
        .weapon-slot.active {
            border-color: #10b981; background: linear-gradient(135deg, #d1fae5, #a7f3d0);
            transform: translateY(-8px) scale(1.05); box-shadow: 0 0 20px rgba(16, 185, 129, 0.5); color: #065f46;
        }
        .w-icon { font-size: 28px; margin-bottom: 5px; }
        .w-label { font-size: 9px; text-align: center; line-height: 1.2; }
        .w-key { color: #9ca3af; font-size: 8px; margin-top: 3px; }
        #overlay {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(135deg, rgba(6, 78, 59, 0.97), rgba(6, 95, 70, 0.97));
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            text-align: center; z-index: 100; padding: 30px; box-sizing: border-box; overflow-y: auto;
        }
        .hidden { display: none !important; }
        button.btn-primary {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white; border: none; padding: 18px 60px; font-size: 22px;
            font-family: inherit; font-weight: 800; cursor: pointer; margin-top: 35px;
            border-radius: 50px; box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4);
            transition: all 0.2s; text-transform: uppercase; letter-spacing: 1px;
        }
        button.btn-primary:hover { transform: scale(1.05); box-shadow: 0 12px 32px rgba(16, 185, 129, 0.6); }
        button.btn-secondary {
            background: rgba(255,255,255,0.1); color: white;
            border: 2px solid rgba(255,255,255,0.3); padding: 12px 30px;
            font-size: 16px; font-family: inherit; font-weight: 600;
            cursor: pointer; margin: 10px; border-radius: 30px; transition: all 0.2s;
        }
        button.btn-secondary:hover { background: rgba(255,255,255,0.2); border-color: #10b981; }
        button.btn-secondary.selected { background: #10b981; border-color: #10b981; font-weight: 800; }
        .edu-box {
            text-align: left; max-width: 700px; background: rgba(255,255,255,0.1);
            padding: 30px; border-radius: 16px; font-size: 15px; line-height: 1.9;
            border: 2px solid rgba(255,255,255,0.2); backdrop-filter: blur(20px); margin: 20px 0;
        }
        h1 { font-size: 48px; margin: 0 0 15px 0; color: #d1fae5; text-shadow: 3px 3px 6px rgba(0,0,0,0.4); }
        .subtitle { font-size: 18px; color: #a7f3d0; margin-bottom: 25px; font-weight: 600; }
        .highlight { color: #6ee7b7; font-weight: 700; }
        .warning { color: #fbbf24; font-weight: 700; }
        .back-btn { position: absolute; top: 20px; left: 20px; background: rgba(255,255,255,0.9); border: 2px solid #10b981; border-radius: 50px; padding: 10px 20px; font-size: 14px; font-weight: 700; color: #065f46; cursor: pointer; z-index: 200; }
        .back-btn:hover { background: #10b981; color: white; }
        @media (max-width: 900px) {
            #game-wrapper { height: calc(100vh - 130px); border-radius: 0; border-left: none; border-right: none; }
            .w-key { display: none; } .madenta-logo { font-size: 24px; padding: 8px 20px; }
            h1 { font-size: 36px; } .edu-box { font-size: 13px; padding: 20px; }
        }
    </style>
</head>
<body>
    <button class="back-btn" onclick="location.href='/'">← Portal</button>
    <div id="game-wrapper">
        <canvas id="gameCanvas" width="900" height="650"></canvas>
        <div class="madenta-logo">MADENTA</div>
        <div id="top-left" class="hud-panel">
            <div class="stat-label">Árangur Aðgerðar</div>
            <div class="bar-container"><div id="success-fill" class="bar-fill"></div></div>
            <div class="stat-label">Tími eftir</div>
            <div class="bar-container"><div id="time-fill" class="bar-fill"></div></div>
        </div>
        <div id="top-right" class="hud-panel">
            <div class="stat-label">Heildarvirði</div>
            <div class="stat-val" style="color: #10b981;" id="score-val">0 €</div>
            <div class="stat-label">Tennur eftir</div>
            <div class="stat-val" id="teeth-val">28</div>
        </div>
        <div id="weapon-bar">
            <div class="weapon-slot active" onclick="setTool(0)"><div class="w-icon">🔷</div><div class="w-label">BORA</div><div class="w-key">1</div></div>
            <div class="weapon-slot" onclick="setTool(1)"><div class="w-icon">🔨</div><div class="w-label">MYLLARI</div><div class="w-key">2</div></div>
            <div class="weapon-slot" onclick="setTool(2)"><div class="w-icon">⚡</div><div class="w-label">LASER</div><div class="w-key">3</div></div>
            <div class="weapon-slot" onclick="setTool(3)"><div class="w-icon">🌀</div><div class="w-label">SOG</div><div class="w-key">4</div></div>
            <div class="weapon-slot" onclick="setTool(4)"><div class="w-icon">🔩</div><div class="w-label">PLANTA</div><div class="w-key">5</div></div>
        </div>
        <div id="overlay">
            <h1>MADENTA: All-on-4 Reynslan</h1>
            <p class="subtitle">Fræðandi leikur um tannplantaaðgerðir - Premium Edition</p>
            <div class="edu-box">
                <b style="font-size: 18px; color: #d1fae5;">🦷 Veldu erfiðleikastig:</b><br><br>
                <div style="display: flex; gap: 10px; justify-content: center; margin: 20px 0; flex-wrap: wrap;">
                    <button class="btn-secondary" onclick="setDifficulty('easy')">🟢 AUÐVELT</button>
                    <button class="btn-secondary selected" onclick="setDifficulty('normal')">🟡 VENJULEGT</button>
                    <button class="btn-secondary" onclick="setDifficulty('hard')">🔴 ERFITT</button>
                </div>
                <b style="font-size: 16px; color: #d1fae5;">📚 Lærðu um All-on-4®:</b><br><br>
                <b>1. 🔷 BORA (1):</b> Fjarlægir venjulegar tennur.<br>
                <b>2. 🔨 MYLLARI (2):</b> <span class="highlight">Fyrir harðar tennur.</span><br>
                <b>3. ⚡ LASER (3):</b> Peri-implantitis vörn.<br>
                <b>4. 🌀 SOG (4):</b> Hreinsar úrgang.<br>
                <b>5. 🔩 TANNPLANTA (5):</b> <span class="highlight">3 sek hold</span> yfir tómum gómum.<br><br>
                <b style="color: #6ee7b7;">Markmið:</b> Fjarlægja 28 tennur + setja títanímpplantar.
            </div>
            <button class="btn-primary" onclick="startGame()">HEFJA AÐGERÐ</button>
            <div style="margin-top:20px;font-size:12px;color:rgba(255,255,255,0.7);">
                Með Dr. Dávid Farkas | <a href="https://madenta.is" target="_blank" style="color: #6ee7b7;">madenta.is</a>
            </div>
        </div>
    </div>
<script>
let currentTool = 0;
let difficulty = 'normal';
function setTool(t) {
    currentTool = t;
    document.querySelectorAll('.weapon-slot').forEach((s,i) => s.classList.toggle('active', i===t));
}
function setDifficulty(d) {
    difficulty = d;
    document.querySelectorAll('.btn-secondary').forEach(b => b.classList.remove('selected'));
    event.target.classList.add('selected');
}
function startGame() {
    document.getElementById('overlay').classList.add('hidden');
    // Game would start here
    alert('Leikurinn byrjar! (Game engine loads here)');
}
document.addEventListener('keydown', e => {
    if (e.key >= '1' && e.key <= '5') setTool(parseInt(e.key) - 1);
});
</script>
</body>
</html>`;



// ============================================================
// GAME: BILINGUAL COMPLETE
// ============================================================
const GAME_BILINGUAL = `<!DOCTYPE html>
<html lang="is">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>MADENTA: All-on-4 - Bilingual Edition</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            margin: 0; padding: 0;
            background: linear-gradient(135deg, #0a4d3c 0%, #064a38 100%);
            color: #fff; font-family: 'Inter', sans-serif;
            overflow: hidden; touch-action: none;
            display: flex; flex-direction: column; align-items: center; height: 100vh;
        }
        #game-wrapper {
            position: relative; width: 100%; max-width: 900px;
            height: 100vh; max-height: 650px;
            background: linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%);
            border: 3px solid #10b981; box-shadow: 0 20px 60px rgba(0,0,0,0.4);
            border-radius: 8px; overflow: hidden;
        }
        canvas { display: block; width: 100%; height: 100%; }
        .hud-panel {
            position: absolute; pointer-events: none; padding: 20px;
            background: rgba(255,255,255,0.15); backdrop-filter: blur(10px);
            border-radius: 12px; border: 1px solid rgba(255,255,255,0.3);
        }
        #top-left { top: 15px; left: 80px; }
        #top-right { top: 15px; right: 15px; text-align: right; }
        .stat-label { font-size: 11px; color: #064e3b; text-transform: uppercase; font-weight: 700; }
        .stat-val { font-size: 28px; font-weight: 900; color: #065f46; }
        .bar-container { width: 200px; height: 14px; background: rgba(0,0,0,0.2); margin: 8px 0; border-radius: 10px; overflow: hidden; }
        .bar-fill { height: 100%; border-radius: 8px; }
        #success-fill { background: linear-gradient(90deg, #10b981, #059669); width: 100%; }
        #time-fill { background: linear-gradient(90deg, #3b82f6, #2563eb); width: 100%; }
        .madenta-logo {
            position: absolute; top: 20px; right: 50%; transform: translateX(50%);
            font-size: 28px; font-weight: 900; color: #10b981;
            background: rgba(255,255,255,0.95); padding: 10px 25px; border-radius: 8px; border: 2px solid #10b981;
        }
        #weapon-bar {
            position: absolute; bottom: 25px; left: 50%; transform: translateX(-50%);
            display: flex; gap: 10px; background: rgba(255,255,255,0.95);
            padding: 12px; border-radius: 16px; border: 3px solid #10b981;
        }
        .weapon-slot {
            width: 65px; height: 70px; border: 3px solid #d1d5db; border-radius: 10px;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            cursor: pointer; transition: all 0.2s; background: white; color: #374151; font-weight: 700;
        }
        .weapon-slot.active {
            border-color: #10b981; background: linear-gradient(135deg, #d1fae5, #a7f3d0);
            transform: translateY(-5px); color: #065f46;
        }
        .w-icon { font-size: 24px; margin-bottom: 3px; }
        .w-label { font-size: 8px; text-transform: uppercase; }
        #lang-toggle {
            position: absolute; top: 20px; left: 20px; display: flex; gap: 5px;
            background: rgba(255,255,255,0.9); border: 2px solid #10b981; border-radius: 25px; padding: 5px; z-index: 10;
        }
        .lang-btn {
            padding: 8px 16px; border: none; background: transparent;
            color: #065f46; font-weight: 700; cursor: pointer; border-radius: 20px; font-size: 14px;
        }
        .lang-btn.active { background: #10b981; color: white; }
        #overlay {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(135deg, rgba(6, 78, 59, 0.97), rgba(6, 95, 70, 0.97));
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            text-align: center; z-index: 100; padding: 30px;
        }
        .hidden { display: none !important; }
        button.btn-primary {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white; border: none; padding: 18px 60px; font-size: 22px;
            font-weight: 800; cursor: pointer; margin-top: 35px; border-radius: 50px;
        }
        button.btn-secondary {
            background: rgba(255,255,255,0.1); color: white;
            border: 2px solid rgba(255,255,255,0.3); padding: 12px 30px;
            font-size: 16px; font-weight: 600; cursor: pointer; margin: 10px; border-radius: 30px;
        }
        button.btn-secondary.selected { background: #10b981; border-color: #10b981; }
        .edu-box { max-width: 700px; background: rgba(255,255,255,0.1); padding: 30px; border-radius: 16px; line-height: 1.8; }
        h1 { font-size: 42px; color: #d1fae5; margin-bottom: 15px; }
        .back-btn { position: absolute; top: 20px; left: 20px; background: rgba(255,255,255,0.9); border: 2px solid #10b981; border-radius: 50px; padding: 10px 20px; font-size: 14px; font-weight: 700; color: #065f46; cursor: pointer; z-index: 200; }
    </style>
</head>
<body>
    <button class="back-btn" onclick="location.href='/'">← Portal</button>
    <div id="game-wrapper">
        <canvas id="gameCanvas" width="900" height="650"></canvas>
        <div id="lang-toggle">
            <button class="lang-btn active" onclick="setLanguage('is')">🇮🇸</button>
            <button class="lang-btn" onclick="setLanguage('hu')">🇭🇺</button>
        </div>
        <div class="madenta-logo">MADENTA</div>
        <div id="top-left" class="hud-panel">
            <div class="stat-label" id="lbl-success">ÁRANGUR</div>
            <div class="bar-container"><div id="success-fill" class="bar-fill"></div></div>
            <div class="stat-label" id="lbl-time">TÍMI</div>
            <div class="bar-container"><div id="time-fill" class="bar-fill"></div></div>
        </div>
        <div id="top-right" class="hud-panel">
            <div class="stat-label" id="lbl-value">VIRÐI</div>
            <div class="stat-val" style="color: #10b981;" id="score-val">0 €</div>
            <div class="stat-label" id="lbl-teeth">TENNUR</div>
            <div class="stat-val" id="teeth-val">28</div>
        </div>
        <div id="weapon-bar">
            <div class="weapon-slot active" onclick="setTool(0)"><div class="w-icon">🔷</div><div class="w-label" id="tool-0">BORA</div></div>
            <div class="weapon-slot" onclick="setTool(1)"><div class="w-icon">🔨</div><div class="w-label" id="tool-1">MYLLARI</div></div>
            <div class="weapon-slot" onclick="setTool(2)"><div class="w-icon">⚡</div><div class="w-label" id="tool-2">LASER</div></div>
            <div class="weapon-slot" onclick="setTool(3)"><div class="w-icon">🌀</div><div class="w-label" id="tool-3">SOG</div></div>
            <div class="weapon-slot" onclick="setTool(4)"><div class="w-icon">🔩</div><div class="w-label" id="tool-4">PLANTA</div></div>
        </div>
        <div id="overlay"><div id="menu-content"></div></div>
    </div>
<script>
const LANG = {
    is: {
        title: "MADENTA: All-on-4 Reynslan", subtitle: "Fræðandi leikur um tannplantaaðgerðir",
        tools: ["BORA", "MYLLARI", "LASER", "SOG", "PLANTA"],
        labels: { success: "ÁRANGUR", time: "TÍMI", value: "VIRÐI", teeth: "TENNUR" },
        diff: ["🟢 AUÐVELT", "🟡 VENJULEGT", "🔴 ERFITT"], btnStart: "HEFJA AÐGERÐ",
        goal: "Markmið: Fjarlægja 28 tennur og setja títanímpplantar"
    },
    hu: {
        title: "MADENTA: All-on-4 Élmény", subtitle: "Oktató játék a fogbeültetésről",
        tools: ["FÚRÓ", "ZÚZÓ", "LÉZER", "SZÍVÓ", "IMPLANT"],
        labels: { success: "SIKER", time: "IDŐ", value: "ÉRTÉK", teeth: "FOGAK" },
        diff: ["🟢 KÖNNYŰ", "🟡 NORMÁL", "🔴 NEHÉZ"], btnStart: "MŰTÉT INDÍTÁSA",
        goal: "Cél: Mind a 28 fog eltávolítása és implantátumok behelyezése"
    }
};
let lang = 'is', currentTool = 0, difficulty = 1;
function setLanguage(l) {
    lang = l;
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    updateUI();
}
function setTool(t) {
    currentTool = t;
    document.querySelectorAll('.weapon-slot').forEach((s,i) => s.classList.toggle('active', i===t));
}
function updateUI() {
    const T = LANG[lang];
    document.getElementById('lbl-success').innerText = T.labels.success;
    document.getElementById('lbl-time').innerText = T.labels.time;
    document.getElementById('lbl-value').innerText = T.labels.value;
    document.getElementById('lbl-teeth').innerText = T.labels.teeth;
    T.tools.forEach((tool, i) => document.getElementById('tool-'+i).innerText = tool);
    document.getElementById('menu-content').innerHTML = 
        '<h1>'+T.title+'</h1><p style="color:#a7f3d0;margin-bottom:25px;">'+T.subtitle+'</p>'+
        '<div class="edu-box"><b style="color:#d1fae5;">🦷 '+(lang==='is'?'Veldu erfiðleikastig:':'Válassz nehézségi szintet:')+'</b><br><br>'+
        '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">'+
        T.diff.map((d,i)=>'<button class="btn-secondary '+(i===difficulty?'selected':'')+'" onclick="difficulty='+i+';updateUI()">'+d+'</button>').join('')+
        '</div><br><b style="color:#6ee7b7;">'+T.goal+'</b></div>'+
        '<button class="btn-primary" onclick="startGame()">'+T.btnStart+'</button>';
}
function startGame() { document.getElementById('overlay').classList.add('hidden'); alert(lang==='is'?'Leikurinn byrjar!':'A játék kezdődik!'); }
updateUI();
</script>
</body>
</html>`;



// ============================================================
// GAME: BROFORCE FULL
// ============================================================
const GAME_BROFORCE = `<!DOCTYPE html>
<html lang="is">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MADENTA BROFORCE - The Tooth Cartel Conspiracy</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #000; font-family: 'Press Start 2P', monospace; color: #fff; overflow: hidden; image-rendering: pixelated; }
        #game-container { width: 100vw; height: 100vh; position: relative; background: linear-gradient(180deg, #0a1f1a 0%, #000 100%); }
        canvas { display: block; width: 100%; height: 100%; image-rendering: pixelated; }
        #hud { position: absolute; top: 0; left: 0; right: 0; padding: 20px; display: flex; justify-content: space-between; z-index: 100; pointer-events: none; }
        .hud-panel { background: rgba(0,0,0,0.9); border: 3px solid #10b981; padding: 15px; border-radius: 8px; }
        .hud-label { font-size: 10px; color: #10b981; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 2px; }
        .hud-value { font-size: 18px; text-shadow: 2px 2px 0 #10b981; }
        .health-bar { width: 200px; height: 24px; background: #1a1a1a; border: 3px solid #10b981; margin-top: 10px; position: relative; overflow: hidden; }
        .health-fill { height: 100%; background: linear-gradient(90deg, #10b981, #059669); transition: width 0.3s; }
        #menu { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, rgba(6, 78, 59, 0.98), rgba(6, 95, 70, 0.98)); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 1000; }
        .menu-hidden { display: none !important; }
        .logo { font-size: 48px; color: #10b981; text-shadow: 4px 4px 0 #000, 0 0 20px #10b981; margin-bottom: 20px; animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        .subtitle { font-size: 14px; color: #a7f3d0; margin-bottom: 40px; text-align: center; line-height: 1.8; }
        .menu-btn { background: linear-gradient(135deg, #10b981, #059669); color: #fff; border: none; padding: 20px 50px; font-family: inherit; font-size: 16px; margin: 10px; cursor: pointer; border-radius: 8px; box-shadow: 0 8px 0 #064e3b; transition: all 0.1s; text-transform: uppercase; }
        .menu-btn:hover { transform: translateY(-2px); }
        .menu-btn:active { transform: translateY(4px); box-shadow: 0 4px 0 #064e3b; }
        #lang-toggle { position: absolute; top: 20px; right: 20px; display: flex; gap: 10px; z-index: 1001; }
        .lang-btn { background: rgba(16, 185, 129, 0.2); border: 2px solid #10b981; color: #10b981; padding: 10px 20px; font-family: inherit; font-size: 12px; cursor: pointer; border-radius: 5px; }
        .lang-btn.active { background: #10b981; color: #000; }
        #cutscene { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #000; z-index: 999; display: none; flex-direction: column; align-items: center; justify-content: center; padding: 40px; }
        .cutscene-active { display: flex !important; }
        .cutscene-image { width: 80%; max-width: 800px; height: 400px; background: #1a1a1a; border: 4px solid #10b981; margin-bottom: 30px; display: flex; align-items: center; justify-content: center; }
        .dialogue-box { width: 80%; max-width: 800px; background: rgba(0,0,0,0.95); border: 3px solid #10b981; padding: 30px; border-radius: 12px; }
        .speaker { font-size: 14px; color: #10b981; margin-bottom: 15px; }
        .dialogue-text { font-size: 12px; line-height: 1.8; }
        .continue-btn { background: #10b981; color: #000; border: none; padding: 15px 40px; font-family: inherit; font-size: 12px; margin-top: 20px; cursor: pointer; border-radius: 5px; float: right; animation: blink 1s infinite; }
        @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0.5; } }
        .controls { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); border: 2px solid #10b981; padding: 15px 30px; border-radius: 8px; font-size: 10px; color: #a7f3d0; z-index: 50; }
        .game-over { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; display: none; z-index: 900; }
        .game-over-active { display: block !important; }
        .game-over-title { font-size: 64px; color: #ef4444; text-shadow: 4px 4px 0 #000; margin-bottom: 20px; }
        .victory-title { font-size: 64px; color: #10b981; text-shadow: 4px 4px 0 #000; margin-bottom: 20px; }
        .back-btn { position: absolute; top: 20px; left: 20px; background: rgba(16, 185, 129, 0.8); border: 2px solid #10b981; color: #000; padding: 10px 20px; font-family: inherit; font-size: 10px; cursor: pointer; border-radius: 5px; z-index: 1002; }
    </style>
</head>
<body>
    <div id="game-container">
        <button class="back-btn" onclick="location.href='/'">← PORTAL</button>
        <div id="lang-toggle">
            <button class="lang-btn active" onclick="setLang('is')">🇮🇸 IS</button>
            <button class="lang-btn" onclick="setLang('hu')">🇭🇺 HU</button>
        </div>
        <div id="menu">
            <div class="logo" id="game-title">MADENTA BROFORCE</div>
            <div class="subtitle" id="game-subtitle">Tannplanta bardagaleikurinn<br>Berjast gegn spilltum tannlæknum!</div>
            <button class="menu-btn" onclick="startStory()"><span id="btn-start">HEFJA LEIKINN</span></button>
            <button class="menu-btn" onclick="showControls()"><span id="btn-controls">STJÓRNUN</span></button>
        </div>
        <div id="cutscene">
            <div class="cutscene-image"><div style="font-size: 24px; color: #10b981;">MADENTA CLINIC</div></div>
            <div class="dialogue-box">
                <div class="speaker" id="speaker">DR. DÁVID FARKAS</div>
                <div class="dialogue-text" id="dialogue">Loading story...</div>
                <button class="continue-btn" onclick="nextDialogue()"><span id="btn-continue">ÁFRAM ▶</span></button>
            </div>
        </div>
        <canvas id="gameCanvas" width="1200" height="800"></canvas>
        <div id="hud">
            <div class="hud-panel">
                <div class="hud-label" id="lbl-health">LÍFSGILDI</div>
                <div class="health-bar"><div class="health-fill" id="health-fill" style="width: 100%"></div></div>
                <div class="hud-label" style="margin-top: 15px;" id="lbl-score">STIG</div>
                <div class="hud-value" id="score">0</div>
            </div>
            <div class="hud-panel">
                <div class="hud-label" id="lbl-level">LEVEL</div>
                <div class="hud-value" id="level">1</div>
                <div class="hud-label" style="margin-top: 15px;" id="lbl-enemies">ÓVINIR</div>
                <div class="hud-value" id="enemies">0</div>
            </div>
        </div>
        <div class="controls" id="controls-info" style="display: none;"><span id="controls-text">⬅➡ HREYFA | SPACE SKJÓTA | W HOPPA</span></div>
        <div class="game-over" id="game-over"><div class="game-over-title">GAME OVER</div><button class="menu-btn" onclick="restartGame()">REYNA AFTUR</button></div>
        <div class="game-over" id="victory"><div class="victory-title">SIGUR!</div><button class="menu-btn" onclick="restartGame()">AÐALVALMYND</button></div>
    </div>
<script>
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let currentLang = 'is', gameState = 'MENU', currentLevel = 1, score = 0, cutsceneIndex = 0;
const LANG = {
    is: { title: "MADENTA BROFORCE", subtitle: "Tannplanta bardagaleikurinn\\nBerjast gegn spilltum tannlæknum!", btnStart: "HEFJA LEIKINN", btnControls: "STJÓRNUN", btnContinue: "ÁFRAM ▶", lblHealth: "LÍFSGILDI", lblScore: "STIG", lblLevel: "LEVEL", lblEnemies: "ÓVINIR", controlsText: "⬅➡ HREYFA | SPACE SKJÓTA | W HOPPA" },
    hu: { title: "MADENTA BROFORCE", subtitle: "Az All-on-4 akció játék\\nHarcolj a korrupt fogorvosok ellen!", btnStart: "JÁTÉK INDÍTÁSA", btnControls: "IRÁNYÍTÁS", btnContinue: "TOVÁBB ▶", lblHealth: "EGÉSZSÉG", lblScore: "PONTSZÁM", lblLevel: "SZINT", lblEnemies: "ELLENSÉGEK", controlsText: "⬅➡ MOZGÁS | SPACE LÖVÉS | W UGRÁS" }
};
const STORY = {
    is: [
        { speaker: "ÓMAR THE PATIENT", text: "Ég þarf All-on-4 tannplöntun. Í Budapest. Madenta. En... eitthvað er skrýtið." },
        { speaker: "DR. DÁVID FARKAS", text: "Velkomin! Við gerum All-on-4 meðferðina. En... hér er vandamál. Bakteríur hafa tekið völdin!" },
        { speaker: "GUNNAR", text: "Og það er verra... Spilltir tannlæknar vinna með ILLUM ÁLFUM?!" },
        { speaker: "DR. DÁVID FARKAS", text: "The Tooth Cartel. Við verðum að stöðva þá! Fyrir hreinar tennur!" }
    ],
    hu: [
        { speaker: "ÓMAR A BETEG", text: "All-on-4 implantációra van szükségem. Budapesten. Madentánál. De... valami furcsa." },
        { speaker: "DR. DÁVID FARKAS", text: "Üdvözlöm! Az All-on-4 kezelést végezzük. De... van egy probléma. A baktériumok támadnak!" },
        { speaker: "GUNNAR", text: "És még rosszabb... Korrupt fogorvosok együttműködnek GONOSZ TÜNDÉREKKEL?!" },
        { speaker: "DR. DÁVID FARKAS", text: "A Fog Kartell. Meg kell állítanunk őket! A tiszta fogakért!" }
    ]
};
function setLang(lang) { currentLang = lang; document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active')); event.target.classList.add('active'); updateLanguage(); }
function updateLanguage() {
    const t = LANG[currentLang];
    document.getElementById('game-title').innerText = t.title;
    document.getElementById('game-subtitle').innerHTML = t.subtitle.replace('\\n', '<br>');
    document.getElementById('btn-start').innerText = t.btnStart;
    document.getElementById('btn-controls').innerText = t.btnControls;
    document.getElementById('btn-continue').innerText = t.btnContinue;
    document.getElementById('lbl-health').innerText = t.lblHealth;
    document.getElementById('lbl-score').innerText = t.lblScore;
    document.getElementById('lbl-level').innerText = t.lblLevel;
    document.getElementById('lbl-enemies').innerText = t.lblEnemies;
    document.getElementById('controls-text').innerText = t.controlsText;
}
function startStory() { cutsceneIndex = 0; showCutscene(); }
function showCutscene() {
    gameState = 'CUTSCENE';
    document.getElementById('menu').classList.add('menu-hidden');
    document.getElementById('cutscene').classList.add('cutscene-active');
    const story = STORY[currentLang];
    if (cutsceneIndex < story.length) {
        document.getElementById('speaker').innerText = story[cutsceneIndex].speaker;
        document.getElementById('dialogue').innerText = story[cutsceneIndex].text;
    }
}
function nextDialogue() {
    cutsceneIndex++;
    const story = STORY[currentLang];
    if (cutsceneIndex < story.length) {
        document.getElementById('speaker').innerText = story[cutsceneIndex].speaker;
        document.getElementById('dialogue').innerText = story[cutsceneIndex].text;
    } else { startGame(); }
}
function startGame() {
    gameState = 'PLAYING';
    document.getElementById('cutscene').classList.remove('cutscene-active');
    document.getElementById('controls-info').style.display = 'block';
    initGame();
}
function showControls() { alert(LANG[currentLang].controlsText); }
let player = { x: 100, y: 600, w: 40, h: 60, vx: 0, vy: 0, speed: 5, jumpPower: -15, gravity: 0.8, onGround: false, health: 100 };
let enemies = [], projectiles = [], particles = [], keys = {}, frame = 0;
function initGame() {
    player.health = 100; player.x = 100; player.y = 600; score = 0; currentLevel = 1;
    enemies = []; projectiles = []; spawnEnemies(); gameLoop();
}
function spawnEnemies() {
    enemies = [];
    for (let i = 0; i < 5 + currentLevel * 2; i++) {
        enemies.push({ x: 800 + Math.random() * 400, y: 500 + Math.random() * 100, w: 30, h: 40, vx: -2 - Math.random(), health: 20, type: Math.random() > 0.7 ? 'boss' : 'minion' });
    }
}
function gameLoop() {
    if (gameState !== 'PLAYING') return;
    update(); render(); frame++;
    requestAnimationFrame(gameLoop);
}
function update() {
    if (keys['ArrowLeft']) { player.vx = -player.speed; } else if (keys['ArrowRight']) { player.vx = player.speed; } else { player.vx = 0; }
    if ((keys['w'] || keys['W'] || keys[' ']) && player.onGround) { player.vy = player.jumpPower; player.onGround = false; }
    player.vy += player.gravity; player.x += player.vx; player.y += player.vy;
    if (player.y > 600) { player.y = 600; player.vy = 0; player.onGround = true; }
    player.x = Math.max(0, Math.min(1160, player.x));
    enemies.forEach((enemy, i) => {
        enemy.x += enemy.vx; if (enemy.x < -50) enemy.x = 1250;
        if (checkCollision(player, enemy)) { player.health -= 1; enemies.splice(i, 1); }
    });
    projectiles.forEach((proj, i) => {
        proj.x += proj.vx;
        enemies.forEach((enemy, j) => {
            if (checkCollision(proj, enemy)) {
                enemy.health -= 10; projectiles.splice(i, 1);
                if (enemy.health <= 0) { enemies.splice(j, 1); score += enemy.type === 'boss' ? 500 : 100; }
            }
        });
        if (proj.x < 0 || proj.x > 1200) projectiles.splice(i, 1);
    });
    if (enemies.length === 0) { currentLevel++; if (currentLevel > 5) victory(); else setTimeout(spawnEnemies, 2000); }
    if (player.health <= 0) gameOver();
    updateHUD();
}
function render() {
    ctx.fillStyle = '#0a1f1a'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#064e3b'; ctx.fillRect(0, 640, 1200, 160);
    ctx.fillStyle = '#10b981'; ctx.fillRect(player.x, player.y, player.w, player.h);
    ctx.fillStyle = '#fff'; ctx.fillRect(player.x + 10, player.y + 15, 8, 8); ctx.fillRect(player.x + 22, player.y + 15, 8, 8);
    enemies.forEach(enemy => {
        ctx.fillStyle = enemy.type === 'boss' ? '#9333ea' : '#ef4444';
        ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h);
    });
    projectiles.forEach(proj => {
        ctx.fillStyle = '#6ee7b7'; ctx.beginPath(); ctx.arc(proj.x, proj.y, proj.r, 0, Math.PI * 2); ctx.fill();
    });
}
function shoot() { projectiles.push({ x: player.x + player.w, y: player.y + player.h / 2, vx: 10, vy: 0, r: 5 }); }
function checkCollision(a, b) { return a.x < b.x + b.w && a.x + (a.w||a.r*2) > b.x && a.y < b.y + b.h && a.y + (a.h||a.r*2) > b.y; }
function updateHUD() {
    document.getElementById('health-fill').style.width = Math.max(0, player.health) + '%';
    document.getElementById('score').innerText = score;
    document.getElementById('level').innerText = currentLevel;
    document.getElementById('enemies').innerText = enemies.length;
}
function gameOver() { gameState = 'GAMEOVER'; document.getElementById('game-over').classList.add('game-over-active'); }
function victory() { gameState = 'VICTORY'; document.getElementById('victory').classList.add('game-over-active'); }
function restartGame() {
    gameState = 'MENU';
    document.getElementById('menu').classList.remove('menu-hidden');
    document.getElementById('game-over').classList.remove('game-over-active');
    document.getElementById('victory').classList.remove('game-over-active');
    document.getElementById('controls-info').style.display = 'none';
}
window.addEventListener('keydown', e => { keys[e.key] = true; if (e.key === ' ' && gameState === 'PLAYING') { shoot(); e.preventDefault(); } });
window.addEventListener('keyup', e => { keys[e.key] = false; });
updateLanguage();
</script>
</body>
</html>`;



// ============================================================
// GAME: PATIENT MODE - 3 DAYS AFTER
// ============================================================
const GAME_PATIENT = `<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MADENTA: 3 Nap a Műtét Után</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: linear-gradient(135deg, #0a4d3c 0%, #064a38 100%); color: #fff; min-height: 100vh; }
        .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
        h1 { font-size: 42px; text-align: center; color: #d1fae5; margin-bottom: 20px; }
        .subtitle { text-align: center; font-size: 18px; color: #a7f3d0; margin-bottom: 40px; }
        .day-selector { display: flex; gap: 15px; justify-content: center; margin-bottom: 50px; flex-wrap: wrap; }
        .day-btn { padding: 20px 40px; font-size: 18px; font-weight: 800; background: rgba(255,255,255,0.1); border: 3px solid rgba(255,255,255,0.3); color: white; cursor: pointer; border-radius: 15px; transition: all 0.3s; }
        .day-btn:hover { background: rgba(255,255,255,0.2); transform: translateY(-5px); }
        .day-btn.active { background: linear-gradient(135deg, #10b981, #059669); border-color: #10b981; }
        .game-area { background: rgba(255,255,255,0.95); border-radius: 20px; padding: 40px; min-height: 400px; display: none; }
        .game-area.active { display: block; }
        .game-title { font-size: 28px; font-weight: 900; color: #064e3b; margin-bottom: 20px; text-align: center; }
        .game-desc { font-size: 14px; color: #065f46; margin-bottom: 30px; text-align: center; line-height: 1.8; }
        .stats-bar { display: flex; justify-content: space-around; background: linear-gradient(135deg, #f0f9ff, #e0f2fe); padding: 20px; border-radius: 15px; margin-bottom: 30px; border: 2px solid #10b981; flex-wrap: wrap; gap: 20px; }
        .stat { text-align: center; }
        .stat-label { font-size: 11px; color: #065f46; font-weight: 700; text-transform: uppercase; }
        .stat-value { font-size: 24px; font-weight: 900; color: #10b981; }
        .choice-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; margin: 30px 0; }
        .choice-card { background: white; border: 3px solid #d1d5db; border-radius: 15px; padding: 20px; cursor: pointer; transition: all 0.3s; text-align: center; }
        .choice-card:hover { border-color: #10b981; transform: translateY(-5px); }
        .choice-card.safe { border-color: #10b981; background: #d1fae5; }
        .choice-card.danger { border-color: #ef4444; background: #fee2e2; }
        .choice-icon { font-size: 40px; margin-bottom: 10px; }
        .choice-name { font-size: 16px; font-weight: 700; color: #1f2937; margin-bottom: 5px; }
        .choice-effect { font-size: 12px; color: #6b7280; }
        .action-btn { background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; padding: 18px 50px; font-size: 18px; font-weight: 800; cursor: pointer; border-radius: 50px; display: block; margin: 30px auto; }
        .feedback { background: linear-gradient(135deg, #fef3c7, #fde68a); border: 3px solid #f59e0b; border-radius: 15px; padding: 25px; margin: 20px 0; display: none; }
        .feedback.show { display: block; }
        .feedback.success { background: linear-gradient(135deg, #d1fae5, #a7f3d0); border-color: #10b981; }
        .feedback.fail { background: linear-gradient(135deg, #fee2e2, #fecaca); border-color: #ef4444; }
        .feedback-title { font-size: 20px; font-weight: 900; color: #1f2937; margin-bottom: 10px; }
        .menu-item { display: flex; align-items: center; justify-content: space-between; background: white; border: 3px solid #d1d5db; border-radius: 12px; padding: 20px; margin-bottom: 15px; cursor: pointer; transition: all 0.3s; }
        .menu-item:hover { border-color: #10b981; transform: translateX(10px); }
        .menu-item.forbidden { opacity: 0.5; cursor: not-allowed; }
        .menu-item.forbidden:hover { transform: none; border-color: #ef4444; }
        .back-btn { position: fixed; top: 20px; left: 20px; background: rgba(255,255,255,0.9); border: 2px solid #10b981; border-radius: 50px; padding: 10px 20px; font-size: 14px; font-weight: 700; color: #065f46; cursor: pointer; z-index: 100; }
    </style>
</head>
<body>
    <button class="back-btn" onclick="location.href='/'">← Portal</button>
    <div class="container">
        <h1>🦷 MADENTA: 3 Nappal Később</h1>
        <p class="subtitle">A Gyógyulás Kihívásai - 3 Dagar Eftir Aðgerð</p>
        <div class="day-selector">
            <button class="day-btn active" onclick="selectDay(1)">🍷 1. NAP<br><small>Wine Tasting</small></button>
            <button class="day-btn" onclick="selectDay(2)">🍲 2. NAP<br><small>Restaurant</small></button>
            <button class="day-btn" onclick="selectDay(3)">📸 3. NAP<br><small>Sightseeing</small></button>
        </div>
        <div id="day1" class="game-area active">
            <div class="game-title">🍷 Borkóstoló Budapesten - SZALMÁVAL!</div>
            <div class="game-desc"><b style="color: #ef4444;">⚠️ FIGYELEM:</b> Nincs fogad! Csak implantátumok!<br>A műtét után 48 órán belül <b>TILOS AZ ALKOHOL</b>, de ez csak egy játék... 😄</div>
            <div class="stats-bar">
                <div class="stat"><div class="stat-label">Kínossági Szint</div><div class="stat-value" id="embarrassment">0%</div></div>
                <div class="stat"><div class="stat-label">Implant Állapot</div><div class="stat-value" id="implant-health">100%</div></div>
            </div>
            <div class="choice-grid">
                <div class="choice-card safe" onclick="makeChoice('straw', 1)"><div class="choice-icon">🥤</div><div class="choice-name">Szalmával</div><div class="choice-effect">✅ Biztonságos</div></div>
                <div class="choice-card danger" onclick="makeChoice('gulp', 1)"><div class="choice-icon">🍷</div><div class="choice-name">Nagy Korty</div><div class="choice-effect">❌ Károsítja az implantot!</div></div>
                <div class="choice-card danger" onclick="makeChoice('swish', 1)"><div class="choice-icon">💫</div><div class="choice-name">Öblögetés</div><div class="choice-effect">❌ Túl nagy nyomás!</div></div>
                <div class="choice-card safe" onclick="makeChoice('spit', 1)"><div class="choice-icon">🚫</div><div class="choice-name">Kiköpés</div><div class="choice-effect">✅ Nem nyel</div></div>
            </div>
            <div id="feedback1" class="feedback"><div class="feedback-title">Eredmény:</div><p id="feedback-text1"></p></div>
        </div>
        <div id="day2" class="game-area">
            <div class="game-title">🍲 Étterem Kihívás - Puha Étel Csak!</div>
            <div class="game-desc">Dr. Dávid azt mondta: <b style="color: #10b981;">"Csak puha étel 3-4 hónapig!"</b></div>
            <div class="stats-bar">
                <div class="stat"><div class="stat-label">Gyógyulási Pont</div><div class="stat-value" id="healing">100%</div></div>
                <div class="stat"><div class="stat-label">Éhség</div><div class="stat-value" id="hunger">85%</div></div>
            </div>
            <div class="menu-item" onclick="orderFood('soup', true)"><div><div style="font-size: 32px;">🍲</div><div style="font-weight: 700; color: #1f2937;">Leves</div><div style="font-size: 12px; color: #10b981;">✅ Tökéletes!</div></div><div style="font-size: 20px; font-weight: 900; color: #10b981;">2,500 Ft</div></div>
            <div class="menu-item" onclick="orderFood('mash', true)"><div><div style="font-size: 32px;">🥔</div><div style="font-weight: 700; color: #1f2937;">Krumplipüré</div><div style="font-size: 12px; color: #10b981;">✅ Nagyon puha</div></div><div style="font-size: 20px; font-weight: 900; color: #10b981;">1,800 Ft</div></div>
            <div class="menu-item forbidden" onclick="orderFood('steak', false)"><div><div style="font-size: 32px;">🥩</div><div style="font-weight: 700; color: #1f2937;">Steak</div><div style="font-size: 12px; color: #ef4444;">❌ TILOS!</div></div><div style="font-size: 20px; font-weight: 900; color: #ef4444;">6,500 Ft</div></div>
            <div class="menu-item forbidden" onclick="orderFood('pizza', false)"><div><div style="font-size: 32px;">🍕</div><div style="font-weight: 700; color: #1f2937;">Pizza</div><div style="font-size: 12px; color: #ef4444;">❌ TILOS!</div></div><div style="font-size: 20px; font-weight: 900; color: #ef4444;">3,200 Ft</div></div>
            <div id="feedback2" class="feedback"><div class="feedback-title">Eredmény:</div><p id="feedback-text2"></p></div>
        </div>
        <div id="day3" class="game-area">
            <div class="game-title">📸 Budapesti Városnézés - Fog Nélkül!</div>
            <div class="game-desc">Halászbástya, Lánchíd... <b style="color: #ef4444;">De nincs FOGAD! Hogyan mosolyogsz? 😬</b></div>
            <div class="stats-bar">
                <div class="stat"><div class="stat-label">Magabiztosság</div><div class="stat-value" id="confidence">50%</div></div>
                <div class="stat"><div class="stat-label">Sikeres Fotók</div><div class="stat-value" id="photos">0/10</div></div>
            </div>
            <div class="choice-grid">
                <div class="choice-card" onclick="socialChoice('smile')"><div class="choice-icon">😬</div><div class="choice-name">Mosolygok</div></div>
                <div class="choice-card safe" onclick="socialChoice('cover')"><div class="choice-icon">🤚</div><div class="choice-name">Eltakarom</div></div>
                <div class="choice-card" onclick="socialChoice('run')"><div class="choice-icon">🏃</div><div class="choice-name">Elfutok</div></div>
            </div>
            <div id="feedback3" class="feedback"><div class="feedback-title">Eredmény:</div><p id="feedback-text3"></p></div>
            <button class="action-btn" onclick="completeMission()">✅ Küldetés Teljesítve!</button>
        </div>
    </div>
<script>
let currentDay = 1, gameStats = { embarrassment: 0, implantHealth: 100, healing: 100, confidence: 50, photos: 0 };
function selectDay(day) {
    currentDay = day;
    document.querySelectorAll('.day-btn').forEach((btn, i) => btn.classList.toggle('active', i+1 === day));
    document.querySelectorAll('.game-area').forEach((area, i) => area.classList.toggle('active', i+1 === day));
}
function makeChoice(choice, day) {
    const feedback = document.getElementById('feedback'+day), feedbackText = document.getElementById('feedback-text'+day);
    if (choice === 'straw' || choice === 'spit') {
        feedbackText.innerHTML = '✅ <b>Szuper!</b> Biztonságos módszer!';
        feedback.className = 'feedback success show';
    } else {
        gameStats.implantHealth -= 30;
        feedbackText.innerHTML = '❌ <b>AJ!</b> Túl nagy nyomás! -30 HP';
        feedback.className = 'feedback fail show';
    }
    document.getElementById('implant-health').innerText = Math.max(gameStats.implantHealth, 0) + '%';
}
function orderFood(food, safe) {
    const feedback = document.getElementById('feedback2'), feedbackText = document.getElementById('feedback-text2');
    if (safe) {
        gameStats.healing += 10;
        feedbackText.innerHTML = '✅ <b>Kiváló!</b> +10 Gyógyulás!';
        feedback.className = 'feedback success show';
    } else {
        gameStats.healing -= 30;
        feedbackText.innerHTML = '❌ <b>VIGYÁZZ!</b> -30 Gyógyulás!';
        feedback.className = 'feedback fail show';
    }
    document.getElementById('healing').innerText = Math.max(gameStats.healing, 0) + '%';
}
function socialChoice(choice) {
    const feedback = document.getElementById('feedback3'), feedbackText = document.getElementById('feedback-text3');
    if (choice === 'cover') {
        gameStats.photos++; gameStats.confidence += 5;
        feedbackText.innerHTML = '👍 Okos! +1 Sikeres fotó!';
        feedback.className = 'feedback success show';
    } else if (choice === 'smile') {
        feedbackText.innerHTML = '😬 Fogtalan vigyor = rémisztő!';
        feedback.className = 'feedback fail show';
    } else {
        gameStats.confidence -= 20;
        feedbackText.innerHTML = '🏃 Elfutottál! -20 Magabiztosság';
        feedback.className = 'feedback show';
    }
    document.getElementById('confidence').innerText = Math.max(gameStats.confidence, 0) + '%';
    document.getElementById('photos').innerText = gameStats.photos + '/10';
}
function completeMission() {
    alert('🏆 GRATULÁLUNK!\\n\\nTúlélted a 3 napot!\\n\\n✅ Implant: '+gameStats.implantHealth+'%\\n✅ Gyógyulás: '+gameStats.healing+'%\\n📸 Fotók: '+gameStats.photos+'/10\\n\\n🦷 madenta.is/allon4');
}
</script>
</body>
</html>`;



// ============================================================
// GAME: PIXEL ART EDITION
// ============================================================
const GAME_PIXEL = `<!DOCTYPE html>
<html lang="is">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MADENTA: Pixel Art Edition</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Press Start 2P', monospace; background: #1a1a2e; color: #fff; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; image-rendering: pixelated; }
        .container { text-align: center; padding: 40px; }
        h1 { font-size: 32px; color: #10b981; text-shadow: 4px 4px 0 #000; margin-bottom: 30px; }
        .subtitle { font-size: 12px; color: #a7f3d0; margin-bottom: 40px; line-height: 2; }
        .pixel-art { width: 300px; height: 300px; background: #0f3460; border: 8px solid #10b981; margin: 40px auto; display: grid; grid-template-columns: repeat(10, 1fr); gap: 2px; padding: 10px; box-shadow: 0 0 40px rgba(16, 185, 129, 0.3); }
        .pixel { background: #16213e; border-radius: 2px; cursor: pointer; transition: all 0.1s; }
        .pixel:hover { background: #10b981; transform: scale(1.1); }
        .pixel.active { background: #10b981; box-shadow: 0 0 10px #10b981; }
        .pixel.tooth { background: #f8fafc; }
        .pixel.implant { background: #94a3b8; }
        .pixel.gum { background: #fb7185; }
        .btn { background: linear-gradient(135deg, #10b981, #059669); color: #fff; border: none; padding: 20px 40px; font-family: inherit; font-size: 14px; margin: 10px; cursor: pointer; border-radius: 8px; box-shadow: 0 6px 0 #064e3b; transition: all 0.1s; }
        .btn:hover { transform: translateY(-2px); }
        .btn:active { transform: translateY(4px); box-shadow: 0 2px 0 #064e3b; }
        .hud { display: flex; justify-content: center; gap: 40px; margin: 30px 0; }
        .stat { text-align: center; }
        .stat-label { font-size: 10px; color: #10b981; margin-bottom: 10px; }
        .stat-value { font-size: 24px; }
        .tools { display: flex; gap: 10px; justify-content: center; margin: 20px 0; }
        .tool { width: 60px; height: 60px; background: #16213e; border: 3px solid #10b981; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 24px; cursor: pointer; transition: all 0.2s; }
        .tool:hover { transform: translateY(-5px); }
        .tool.active { background: #10b981; transform: scale(1.1); }
        .back-btn { position: fixed; top: 20px; left: 20px; background: rgba(16, 185, 129, 0.8); border: 2px solid #10b981; color: #000; padding: 10px 20px; font-family: inherit; font-size: 10px; cursor: pointer; border-radius: 5px; z-index: 100; }
    </style>
</head>
<body>
    <button class="back-btn" onclick="location.href='/'">← PORTAL</button>
    <div class="container">
        <h1>🦷 MADENTA</h1>
        <p class="subtitle">PIXEL ART EDITION<br>All-on-4 Tannplöntun</p>
        <div class="hud">
            <div class="stat"><div class="stat-label">TENNUR</div><div class="stat-value" id="teeth">28</div></div>
            <div class="stat"><div class="stat-label">IMPLANT</div><div class="stat-value" id="implants">0</div></div>
            <div class="stat"><div class="stat-label">STIG</div><div class="stat-value" id="score">0</div></div>
        </div>
        <div class="tools">
            <div class="tool active" onclick="setTool(0)" title="Bora">🔷</div>
            <div class="tool" onclick="setTool(1)" title="Laser">⚡</div>
            <div class="tool" onclick="setTool(2)" title="Implant">🔩</div>
            <div class="tool" onclick="setTool(3)" title="Clean">🌀</div>
        </div>
        <div class="pixel-art" id="mouth"></div>
        <button class="btn" onclick="resetGame()">🔄 RESET</button>
        <button class="btn" onclick="showInfo()">📚 INFO</button>
    </div>
<script>
let currentTool = 0, teeth = 28, implants = 0, score = 0;
const mouth = document.getElementById('mouth');
const MOUTH_LAYOUT = [
    'g','g','t','t','t','t','t','t','g','g',
    'g','t','t','t','t','t','t','t','t','g',
    't','t','t','t','g','g','t','t','t','t',
    't','t','t','g','g','g','g','t','t','t',
    't','t','t','g','g','g','g','t','t','t',
    't','t','t','t','g','g','t','t','t','t',
    'g','t','t','t','t','t','t','t','t','g',
    'g','g','t','t','t','t','t','t','g','g',
    'g','g','g','t','t','t','t','g','g','g',
    'g','g','g','g','t','t','g','g','g','g'
];
let pixelStates = [...MOUTH_LAYOUT];
function initMouth() {
    mouth.innerHTML = '';
    MOUTH_LAYOUT.forEach((type, i) => {
        const pixel = document.createElement('div');
        pixel.className = 'pixel ' + (type === 't' ? 'tooth' : 'gum');
        pixel.dataset.index = i;
        pixel.onclick = () => handleClick(i);
        mouth.appendChild(pixel);
    });
}
function handleClick(index) {
    const pixel = mouth.children[index];
    const state = pixelStates[index];
    if (currentTool === 0 && state === 't') { // Drill - remove tooth
        pixelStates[index] = 'e';
        pixel.className = 'pixel';
        teeth--;
        score += 50;
        updateHUD();
    } else if (currentTool === 2 && state === 'e') { // Implant
        pixelStates[index] = 'i';
        pixel.className = 'pixel implant';
        implants++;
        score += 100;
        updateHUD();
    } else if (currentTool === 1) { // Laser effect
        pixel.classList.add('active');
        setTimeout(() => pixel.classList.remove('active'), 200);
        score += 10;
        updateHUD();
    }
    if (teeth === 0 && implants >= 4) {
        setTimeout(() => alert('🏆 SIGUR! All-on-4 lokið!\\nStig: ' + score), 500);
    }
}
function setTool(t) {
    currentTool = t;
    document.querySelectorAll('.tool').forEach((tool, i) => tool.classList.toggle('active', i === t));
}
function updateHUD() {
    document.getElementById('teeth').innerText = teeth;
    document.getElementById('implants').innerText = implants;
    document.getElementById('score').innerText = score;
}
function resetGame() {
    pixelStates = [...MOUTH_LAYOUT];
    teeth = 28; implants = 0; score = 0;
    initMouth();
    updateHUD();
}
function showInfo() {
    alert('🦷 MADENTA PIXEL EDITION\\n\\n🔷 Bora: Fjarlægja tennur\\n⚡ Laser: Sótthreinsa\\n🔩 Implant: Setja títan\\n🌀 Clean: Hreinsa\\n\\nMarkmiða: Fjarlægja tennur og setja 4+ implant!');
}
initMouth();
</script>
</body>
</html>`;

// ============================================================
// WORKER EXPORT - ROUTE HANDLING
// ============================================================
export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const path = url.pathname;
        
        // CORS headers
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };
        
        // Handle OPTIONS (CORS preflight)
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }
        
        // Response headers
        const htmlHeaders = {
            'Content-Type': 'text/html;charset=UTF-8',
            'Cache-Control': 'public, max-age=3600',
            'X-Powered-By': '2076 ehf',
            ...corsHeaders
        };
        
        // Route handling
        switch (path) {
            case '/':
            case '/index.html':
            case '/portal':
                return new Response(PORTAL_HTML, { headers: htmlHeaders });
            
            case '/main':
            case '/premium':
                return new Response(GAME_MAIN, { headers: htmlHeaders });
            
            case '/bilingual':
            case '/bilingual-complete':
                return new Response(GAME_BILINGUAL, { headers: htmlHeaders });
            
            case '/broforce':
            case '/action':
                return new Response(GAME_BROFORCE, { headers: htmlHeaders });
            
            case '/patient':
            case '/3days':
            case '/recovery':
                return new Response(GAME_PATIENT, { headers: htmlHeaders });
            
            case '/pixel':
            case '/pixel-art':
            case '/retro':
                return new Response(GAME_PIXEL, { headers: htmlHeaders });
            
            // API endpoints placeholder
            case '/api/leaderboard':
                return new Response(JSON.stringify({
                    leaderboard: [
                        { name: "Dr. Dávid", score: 9999 },
                        { name: "Ómar", score: 8500 },
                        { name: "Gunnar", score: 7200 }
                    ]
                }), {
                    headers: { 'Content-Type': 'application/json', ...corsHeaders }
                });
            
            case '/api/health':
                return new Response(JSON.stringify({
                    status: 'ok',
                    version: '1.0.0',
                    games: 5,
                    powered_by: '2076 ehf'
                }), {
                    headers: { 'Content-Type': 'application/json', ...corsHeaders }
                });
            
            default:
                // 404 with redirect to portal
                return new Response(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>404 - MADENTA Portal</title>
                        <meta http-equiv="refresh" content="3;url=/">
                        <style>
                            body { font-family: 'Press Start 2P', monospace; background: #064e3b; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; text-align: center; }
                            h1 { font-size: 64px; color: #10b981; }
                            p { margin-top: 20px; }
                            a { color: #6ee7b7; }
                        </style>
                    </head>
                    <body>
                        <div>
                            <h1>404</h1>
                            <p>Game not found!</p>
                            <p>Redirecting to <a href="/">Portal</a>...</p>
                        </div>
                    </body>
                    </html>
                `, { status: 404, headers: htmlHeaders });
        }
    }
};
