// ============================================================
// MADENTA GAME PORTAL - Cloudflare Worker
// Built by 2076 ehf | All games fully functional
// ============================================================

// PORTAL LANDING PAGE
const PORTAL_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MADENTA Game Portal</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&family=Press+Start+2P&display=swap" rel="stylesheet">
    <style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'Inter',sans-serif;background:linear-gradient(135deg,#022c22 0%,#064e3b 50%,#000 100%);color:#fff;min-height:100vh}
        .container{max-width:1200px;margin:0 auto;padding:40px 20px}
        header{text-align:center;margin-bottom:50px}
        .logo{font-family:'Press Start 2P',monospace;font-size:clamp(28px,5vw,48px);color:#34d399;text-shadow:3px 3px 0 #065f46;margin-bottom:15px}
        .tagline{font-size:16px;color:#a7f3d0;max-width:500px;margin:0 auto}
        .games-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:25px;margin-bottom:50px}
        .game-card{background:rgba(255,255,255,0.05);border:2px solid rgba(16,185,129,0.3);border-radius:16px;overflow:hidden;transition:all 0.3s;cursor:pointer}
        .game-card:hover{transform:translateY(-8px);border-color:#10b981;box-shadow:0 20px 40px rgba(0,0,0,0.3)}
        .card-preview{height:140px;display:flex;align-items:center;justify-content:center;font-size:56px}
        .card-content{padding:20px}
        .card-tag{display:inline-block;padding:4px 10px;background:#10b981;color:white;font-size:9px;font-weight:700;text-transform:uppercase;border-radius:15px;margin-bottom:10px}
        .card-tag.action{background:#dc2626}
        .card-tag.pixel{background:#9333ea}
        .card-title{font-size:20px;font-weight:800;margin-bottom:8px}
        .card-desc{font-size:13px;color:#a7f3d0;line-height:1.5;margin-bottom:12px}
        .play-btn{display:inline-block;padding:10px 24px;background:linear-gradient(135deg,#10b981,#059669);color:white;border:none;border-radius:25px;font-size:13px;font-weight:700;cursor:pointer;text-decoration:none}
        .play-btn:hover{transform:scale(1.05)}
        footer{text-align:center;padding:30px;border-top:1px solid rgba(16,185,129,0.2)}
        .footer-text{font-size:12px;color:rgba(255,255,255,0.5)}
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1 class="logo">🦷 MADENTA</h1>
            <p class="tagline">Interactive dental education games. Learn about All-on-4® implants through play.</p>
        </header>
        <div class="games-grid">
            <div class="game-card" onclick="location.href='/main'">
                <div class="card-preview" style="background:linear-gradient(135deg,#065f46,#022c22)">🦷</div>
                <div class="card-content">
                    <span class="card-tag">Educational</span>
                    <h3 class="card-title">All-on-4 Simulator</h3>
                    <p class="card-desc">Full surgical simulation with 5 tools. Remove teeth and place titanium implants.</p>
                    <a href="/main" class="play-btn">▶ Play</a>
                </div>
            </div>
            <div class="game-card" onclick="location.href='/broforce'">
                <div class="card-preview" style="background:linear-gradient(135deg,#dc2626,#7f1d1d)">🔫</div>
                <div class="card-content">
                    <span class="card-tag action">Action</span>
                    <h3 class="card-title">BROFORCE</h3>
                    <p class="card-desc">Fight the Tooth Cartel! Action platformer with story cutscenes.</p>
                    <a href="/broforce" class="play-btn">▶ Play</a>
                </div>
            </div>
            <div class="game-card" onclick="location.href='/patient'">
                <div class="card-preview" style="background:linear-gradient(135deg,#2563eb,#1e3a8a)">🏥</div>
                <div class="card-content">
                    <span class="card-tag">Patient Mode</span>
                    <h3 class="card-title">3 Days After</h3>
                    <p class="card-desc">Post-surgery recovery simulation. Wine tasting without teeth!</p>
                    <a href="/patient" class="play-btn">▶ Play</a>
                </div>
            </div>
            <div class="game-card" onclick="location.href='/pixel'">
                <div class="card-preview" style="background:linear-gradient(135deg,#9333ea,#581c87)">👾</div>
                <div class="card-content">
                    <span class="card-tag pixel">Retro</span>
                    <h3 class="card-title">Pixel Edition</h3>
                    <p class="card-desc">Classic pixel art dental game with retro aesthetics.</p>
                    <a href="/pixel" class="play-btn">▶ Play</a>
                </div>
            </div>
        </div>
        <footer>
            <p class="footer-text">© 2024 2076 ehf | Built for Madenta.is</p>
        </footer>
    </div>
</body>
</html>`;



// ============================================================
// GAME: ALL-ON-4 SIMULATOR (MAIN) - Bilingual IS/HU
// ============================================================
const GAME_MAIN = `<!DOCTYPE html>
<html lang="is">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MADENTA: All-on-4 Simulator</title>
    <style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:Arial,sans-serif;background:#1a1a2e;overflow:hidden}
        #game-container{position:relative;width:100vw;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center}
        canvas{border:3px solid #10b981;border-radius:8px;cursor:crosshair}
        #hud{position:absolute;top:10px;left:50%;transform:translateX(-50%);display:flex;gap:30px;background:rgba(0,0,0,0.8);padding:10px 25px;border-radius:25px;color:#fff;font-size:14px;font-weight:bold}
        .hud-item{display:flex;align-items:center;gap:8px}
        .hud-value{color:#10b981;font-size:18px}
        #toolbar{position:absolute;bottom:20px;left:50%;transform:translateX(-50%);display:flex;gap:8px;background:rgba(0,0,0,0.9);padding:12px;border-radius:12px}
        .tool-btn{width:70px;height:70px;border:3px solid #444;border-radius:10px;background:#222;color:#fff;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:all 0.2s}
        .tool-btn:hover{border-color:#10b981;transform:translateY(-3px)}
        .tool-btn.active{border-color:#10b981;background:#065f46}
        .tool-icon{font-size:24px}
        .tool-name{font-size:8px;margin-top:4px;text-transform:uppercase}
        .tool-key{font-size:10px;color:#888;margin-top:2px}
        #lang-bar{position:absolute;top:10px;right:10px;display:flex;gap:5px}
        .lang-btn{padding:8px 15px;border:2px solid #444;background:#222;color:#fff;border-radius:20px;cursor:pointer;font-weight:bold}
        .lang-btn.active{border-color:#10b981;background:#065f46}
        #back-btn{position:absolute;top:10px;left:10px;padding:8px 16px;background:#10b981;color:#fff;border:none;border-radius:20px;cursor:pointer;font-weight:bold;text-decoration:none}
        #instructions{position:absolute;bottom:110px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.8);color:#a7f3d0;padding:8px 20px;border-radius:20px;font-size:12px;text-align:center}
        #overlay{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:100}
        #overlay.hidden{display:none}
        #overlay h1{font-size:36px;color:#10b981;margin-bottom:15px}
        #overlay p{color:#a7f3d0;margin-bottom:25px;max-width:500px;text-align:center;line-height:1.6}
        .start-btn{padding:15px 40px;background:#10b981;color:#fff;border:none;border-radius:30px;font-size:18px;font-weight:bold;cursor:pointer}
        .start-btn:hover{background:#059669}
        #result{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:100}
        #result.show{display:flex}
        #result h1{font-size:48px;margin-bottom:20px}
        #result p{color:#a7f3d0;font-size:20px;margin:10px 0}
    </style>
</head>
<body>
<div id="game-container">
    <a href="/" id="back-btn">← Portal</a>
    <div id="lang-bar">
        <button class="lang-btn active" onclick="setLang('is')">🇮🇸 IS</button>
        <button class="lang-btn" onclick="setLang('hu')">🇭🇺 HU</button>
    </div>
    <div id="hud">
        <div class="hud-item"><span id="lbl-score">STIG:</span><span class="hud-value" id="score">0</span></div>
        <div class="hud-item"><span id="lbl-teeth">TENNUR:</span><span class="hud-value" id="teeth">28</span></div>
        <div class="hud-item"><span id="lbl-implants">ÍPPLANTAR:</span><span class="hud-value" id="implants">0</span></div>
        <div class="hud-item"><span>⏱️</span><span class="hud-value" id="timer">120</span></div>
    </div>
    <canvas id="canvas" width="800" height="500"></canvas>
    <div id="instructions"></div>
    <div id="toolbar">
        <button class="tool-btn active" onclick="selectTool(0)"><span class="tool-icon">🔷</span><span class="tool-name" id="t0">Bora</span><span class="tool-key">[1]</span></button>
        <button class="tool-btn" onclick="selectTool(1)"><span class="tool-icon">🔨</span><span class="tool-name" id="t1">Tang</span><span class="tool-key">[2]</span></button>
        <button class="tool-btn" onclick="selectTool(2)"><span class="tool-icon">⚡</span><span class="tool-name" id="t2">Laser</span><span class="tool-key">[3]</span></button>
        <button class="tool-btn" onclick="selectTool(3)"><span class="tool-icon">💨</span><span class="tool-name" id="t3">Sog</span><span class="tool-key">[4]</span></button>
        <button class="tool-btn" onclick="selectTool(4)"><span class="tool-icon">🔩</span><span class="tool-name" id="t4">Ípplant</span><span class="tool-key">[5]</span></button>
    </div>
    <div id="overlay">
        <h1 id="title">🦷 MADENTA: All-on-4</h1>
        <p id="desc"></p>
        <button class="start-btn" onclick="startGame()" id="start-btn">HEFJA LEIK</button>
    </div>
    <div id="result">
        <h1 id="result-title">🏆</h1>
        <p id="result-score"></p>
        <p id="result-implants"></p>
        <button class="start-btn" onclick="restartGame()">🔄</button>
    </div>
</div>
<script>
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let lang = 'is', tool = 0, playing = false, score = 0, teethLeft = 28, implantsPlaced = 0, timeLeft = 120, timer = null;
let teeth = [];

const TEXTS = {
    is: {
        score: 'STIG:', teeth: 'TENNUR:', implants: 'ÍPPLANTAR:',
        tools: ['Bora', 'Tang', 'Laser', 'Sog', 'Ípplant'],
        desc: 'Notaðu verkfærin til að fjarlægja tennur og setja títan ípplanta. Markmið: 4+ ípplantar!',
        start: 'HEFJA LEIK', win: '🏆 SIGUR!', lose: '💀 TÍMI RANN ÚT',
        instructions: '🖱️ SMELLA á tennur | Tölur 1-5 velja verkfæri | Bora → Tang → Ípplant'
    },
    hu: {
        score: 'PONT:', teeth: 'FOGAK:', implants: 'IMPLANT:',
        tools: ['Fúró', 'Fogó', 'Lézer', 'Szívó', 'Implant'],
        desc: 'Használd az eszközöket a fogak eltávolításához és titán implantátumok beültetéséhez. Cél: 4+ implant!',
        start: 'JÁTÉK INDÍTÁSA', win: '🏆 GYŐZELEM!', lose: '💀 LEJÁRT AZ IDŐ',
        instructions: '🖱️ KATTINTS a fogakra | 1-5 billentyűk eszközök | Fúró → Fogó → Implant'
    }
};

function setLang(l) {
    lang = l;
    document.querySelectorAll('.lang-btn').forEach((b,i) => b.classList.toggle('active', (i===0 && l==='is') || (i===1 && l==='hu')));
    updateTexts();
}

function updateTexts() {
    const T = TEXTS[lang];
    document.getElementById('lbl-score').textContent = T.score;
    document.getElementById('lbl-teeth').textContent = T.teeth;
    document.getElementById('lbl-implants').textContent = T.implants;
    T.tools.forEach((name, i) => document.getElementById('t'+i).textContent = name);
    document.getElementById('desc').textContent = T.desc;
    document.getElementById('start-btn').textContent = T.start;
    document.getElementById('instructions').textContent = T.instructions;
}

function selectTool(t) {
    tool = t;
    document.querySelectorAll('.tool-btn').forEach((b,i) => b.classList.toggle('active', i===t));
}

function initTeeth() {
    teeth = [];
    // Upper jaw
    for(let i = 0; i < 14; i++) {
        teeth.push({ x: 120 + i * 42, y: 120, hp: 100, removed: false, implant: false });
    }
    // Lower jaw
    for(let i = 0; i < 14; i++) {
        teeth.push({ x: 120 + i * 42, y: 380, hp: 100, removed: false, implant: false });
    }
}

function startGame() {
    document.getElementById('overlay').classList.add('hidden');
    playing = true;
    score = 0; teethLeft = 28; implantsPlaced = 0; timeLeft = 120;
    initTeeth();
    updateHUD();
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if(timeLeft <= 0) endGame(false);
    }, 1000);
    gameLoop();
}

function updateHUD() {
    document.getElementById('score').textContent = score;
    document.getElementById('teeth').textContent = teethLeft;
    document.getElementById('implants').textContent = implantsPlaced;
}

function gameLoop() {
    if(!playing) return;
    ctx.fillStyle = '#fce7f3';
    ctx.fillRect(0, 0, 800, 500);
    
    // Draw gums
    ctx.fillStyle = '#f472b6';
    ctx.fillRect(100, 80, 600, 100);
    ctx.fillRect(100, 320, 600, 100);
    
    // Draw teeth
    teeth.forEach(t => {
        if(t.removed) {
            if(t.implant) {
                ctx.fillStyle = '#64748b';
                ctx.fillRect(t.x - 8, t.y - 15, 16, 30);
                ctx.fillStyle = '#94a3b8';
                ctx.fillRect(t.x - 10, t.y - 18, 20, 8);
            } else {
                ctx.fillStyle = '#be185d';
                ctx.beginPath();
                ctx.arc(t.x, t.y, 10, 0, Math.PI * 2);
                ctx.fill();
            }
        } else {
            ctx.fillStyle = t.hp > 50 ? '#fff' : '#fca5a5';
            ctx.beginPath();
            ctx.moveTo(t.x, t.y - 20);
            ctx.lineTo(t.x + 12, t.y + 15);
            ctx.lineTo(t.x - 12, t.y + 15);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = '#d1d5db';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            if(t.hp < 100) {
                ctx.fillStyle = '#22c55e';
                ctx.fillRect(t.x - 12, t.y - 30, 24 * (1 - t.hp/100), 4);
            }
        }
    });
    
    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', e => {
    if(!playing) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    
    teeth.forEach(t => {
        const dist = Math.sqrt((x - t.x)**2 + (y - t.y)**2);
        if(dist < 20) {
            if(!t.removed) {
                if(tool === 0) { t.hp -= 35; score += 10; } // Drill
                else if(tool === 1 && t.hp <= 50) { t.removed = true; teethLeft--; score += 100; } // Extract
                else if(tool === 2) { t.hp -= 15; score += 5; } // Laser
                else if(tool === 3) { score += 5; } // Suction
            } else if(t.removed && !t.implant && tool === 4) {
                t.implant = true;
                implantsPlaced++;
                score += 200;
                if(implantsPlaced >= 4) endGame(true);
            }
            updateHUD();
        }
    });
});

function endGame(won) {
    playing = false;
    clearInterval(timer);
    const T = TEXTS[lang];
    document.getElementById('result-title').textContent = won ? T.win : T.lose;
    document.getElementById('result-score').textContent = T.score + ' ' + score;
    document.getElementById('result-implants').textContent = T.implants + ' ' + implantsPlaced;
    document.getElementById('result').classList.add('show');
}

function restartGame() {
    document.getElementById('result').classList.remove('show');
    document.getElementById('overlay').classList.remove('hidden');
}

document.addEventListener('keydown', e => {
    if(e.key >= '1' && e.key <= '5') selectTool(parseInt(e.key) - 1);
});

updateTexts();
</script>
</body>
</html>`;



// ============================================================
// GAME: BROFORCE - Action Platformer with Cutscenes
// ============================================================
const GAME_BROFORCE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MADENTA BROFORCE</title>
    <style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{background:#0f0f23;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:Arial,sans-serif}
        #game-container{position:relative}
        canvas{border:3px solid #10b981;border-radius:4px}
        #hud{position:absolute;top:10px;left:10px;color:#fff;font-size:14px;background:rgba(0,0,0,0.7);padding:8px 15px;border-radius:8px}
        #hud div{margin:3px 0}
        #back-btn{position:absolute;top:10px;right:10px;padding:8px 16px;background:#10b981;color:#fff;border:none;border-radius:20px;cursor:pointer;font-weight:bold;text-decoration:none}
        #instructions{position:absolute;bottom:10px;left:50%;transform:translateX(-50%);color:#a7f3d0;font-size:12px;background:rgba(0,0,0,0.8);padding:8px 20px;border-radius:20px}
        #cutscene{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;z-index:10}
        #cutscene.hidden{display:none}
        #cutscene-text{max-width:600px;text-align:center;font-size:18px;line-height:1.8;margin-bottom:30px;color:#a7f3d0}
        #cutscene-speaker{font-size:24px;color:#10b981;margin-bottom:20px;font-weight:bold}
        .skip-btn{padding:12px 30px;background:#10b981;color:#fff;border:none;border-radius:25px;font-size:16px;cursor:pointer;font-weight:bold}
        #overlay{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:20}
        #overlay.hidden{display:none}
        #overlay h1{font-size:42px;color:#dc2626;margin-bottom:15px;text-shadow:3px 3px 0 #7f1d1d}
        #overlay p{color:#fca5a5;margin-bottom:25px;font-size:16px}
        #gameover{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:20}
        #gameover.show{display:flex}
        #gameover h1{font-size:48px;margin-bottom:20px}
    </style>
</head>
<body>
<div id="game-container">
    <a href="/" id="back-btn">← Portal</a>
    <canvas id="canvas" width="800" height="500"></canvas>
    <div id="hud">
        <div>❤️ Health: <span id="health">100</span></div>
        <div>🎯 Score: <span id="score">0</span></div>
        <div>📍 Level: <span id="level">1</span></div>
    </div>
    <div id="instructions">⬅️➡️ Move | ⬆️ Jump | SPACE Shoot | W Ultimate</div>
    <div id="cutscene">
        <div id="cutscene-speaker"></div>
        <div id="cutscene-text"></div>
        <button class="skip-btn" onclick="skipCutscene()">CONTINUE →</button>
    </div>
    <div id="overlay">
        <h1>🔫 MADENTA BROFORCE</h1>
        <p>Fight the Tooth Cartel! Save dentistry with Dr. Dávid!</p>
        <button class="skip-btn" onclick="startGame()">START GAME</button>
    </div>
    <div id="gameover">
        <h1 id="gameover-title">💀 GAME OVER</h1>
        <p id="gameover-score" style="color:#a7f3d0;font-size:20px"></p>
        <button class="skip-btn" onclick="restartGame()">TRY AGAIN</button>
    </div>
</div>
<script>
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let playing = false, level = 1, score = 0;
let player = { x: 100, y: 350, w: 30, h: 40, vx: 0, vy: 0, hp: 100, onGround: false, ultimate: 0 };
let enemies = [], bullets = [], platforms = [];
let keys = {};
let cutsceneIndex = 0;

const CUTSCENES = [
    { speaker: '🦷 DR. DÁVID FARKAS', text: 'The Tooth Cartel has gone too far! They are destroying dentistry across Europe. It is time to fight back!' },
    { speaker: '🔫 ÓMAR (2076 ehf)', text: 'I built you the ultimate weapon system, Dr. Dávid. Use it wisely. The bacteria must be stopped!' },
    { speaker: '🦷 DR. DÁVID', text: 'For Madenta! For healthy teeth! Let us begin the operation!' }
];

function showCutscene() {
    if(cutsceneIndex >= CUTSCENES.length) {
        document.getElementById('cutscene').classList.add('hidden');
        playing = true;
        spawnEnemies();
        gameLoop();
        return;
    }
    const c = CUTSCENES[cutsceneIndex];
    document.getElementById('cutscene-speaker').textContent = c.speaker;
    document.getElementById('cutscene-text').textContent = c.text;
}

function skipCutscene() {
    cutsceneIndex++;
    showCutscene();
}

function startGame() {
    document.getElementById('overlay').classList.add('hidden');
    cutsceneIndex = 0;
    showCutscene();
}

function initPlatforms() {
    platforms = [
        { x: 0, y: 450, w: 800, h: 50 }, // Ground
        { x: 100, y: 350, w: 150, h: 20 },
        { x: 350, y: 300, w: 150, h: 20 },
        { x: 550, y: 350, w: 150, h: 20 },
        { x: 200, y: 200, w: 100, h: 20 },
        { x: 500, y: 200, w: 100, h: 20 }
    ];
}

function spawnEnemies() {
    enemies = [];
    for(let i = 0; i < 3 + level * 2; i++) {
        enemies.push({
            x: 300 + Math.random() * 400,
            y: 100 + Math.random() * 300,
            w: 25, h: 25,
            vx: (Math.random() - 0.5) * 2,
            hp: 30 + level * 10,
            type: Math.random() > 0.7 ? 'carius' : 'bacteria'
        });
    }
}

function gameLoop() {
    if(!playing) return;
    update();
    render();
    requestAnimationFrame(gameLoop);
}

function update() {
    // Player movement
    if(keys['ArrowLeft']) player.vx = -5;
    else if(keys['ArrowRight']) player.vx = 5;
    else player.vx *= 0.8;
    
    if(keys['ArrowUp'] && player.onGround) {
        player.vy = -12;
        player.onGround = false;
    }
    
    // Gravity
    player.vy += 0.5;
    player.x += player.vx;
    player.y += player.vy;
    
    // Platform collision
    player.onGround = false;
    platforms.forEach(p => {
        if(player.x + player.w > p.x && player.x < p.x + p.w &&
           player.y + player.h > p.y && player.y + player.h < p.y + p.h + 10 && player.vy > 0) {
            player.y = p.y - player.h;
            player.vy = 0;
            player.onGround = true;
        }
    });
    
    // Boundaries
    if(player.x < 0) player.x = 0;
    if(player.x > 770) player.x = 770;
    if(player.y > 450) { player.y = 410; player.onGround = true; player.vy = 0; }
    
    // Update bullets
    bullets = bullets.filter(b => {
        b.x += b.vx;
        return b.x > 0 && b.x < 800;
    });
    
    // Update enemies
    enemies.forEach(e => {
        e.x += e.vx;
        if(e.x < 50 || e.x > 750) e.vx *= -1;
        
        // Check bullet hits
        bullets.forEach((b, bi) => {
            if(b.x > e.x && b.x < e.x + e.w && b.y > e.y && b.y < e.y + e.h) {
                e.hp -= 20;
                bullets.splice(bi, 1);
                if(e.hp <= 0) {
                    score += e.type === 'carius' ? 150 : 100;
                    player.ultimate = Math.min(100, player.ultimate + 10);
                }
            }
        });
        
        // Check player collision
        if(player.x < e.x + e.w && player.x + player.w > e.x &&
           player.y < e.y + e.h && player.y + player.h > e.y && e.hp > 0) {
            player.hp -= 1;
            if(player.hp <= 0) endGame(false);
        }
    });
    
    enemies = enemies.filter(e => e.hp > 0);
    
    // Level complete
    if(enemies.length === 0) {
        level++;
        if(level > 5) {
            endGame(true);
        } else {
            spawnEnemies();
        }
    }
    
    // Update HUD
    document.getElementById('health').textContent = Math.max(0, player.hp);
    document.getElementById('score').textContent = score;
    document.getElementById('level').textContent = level;
}

function render() {
    // Background
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, 800, 500);
    
    // Platforms
    ctx.fillStyle = '#10b981';
    platforms.forEach(p => ctx.fillRect(p.x, p.y, p.w, p.h));
    
    // Player
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(player.x, player.y, player.w, player.h);
    ctx.fillStyle = '#fff';
    ctx.fillRect(player.x + 8, player.y + 8, 6, 6);
    ctx.fillRect(player.x + 18, player.y + 8, 6, 6);
    
    // Ultimate bar
    ctx.fillStyle = '#333';
    ctx.fillRect(player.x, player.y - 10, 30, 5);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(player.x, player.y - 10, 30 * (player.ultimate / 100), 5);
    
    // Enemies
    enemies.forEach(e => {
        ctx.fillStyle = e.type === 'carius' ? '#dc2626' : '#22c55e';
        ctx.beginPath();
        ctx.arc(e.x + e.w/2, e.y + e.h/2, e.w/2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.fillRect(e.x + 5, e.y + 8, 5, 5);
        ctx.fillRect(e.x + 15, e.y + 8, 5, 5);
    });
    
    // Bullets
    ctx.fillStyle = '#fbbf24';
    bullets.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, 5, 0, Math.PI * 2);
        ctx.fill();
    });
}

function shoot() {
    if(!playing) return;
    bullets.push({ x: player.x + 30, y: player.y + 15, vx: 10 });
}

function useUltimate() {
    if(!playing || player.ultimate < 100) return;
    player.ultimate = 0;
    enemies.forEach(e => { e.hp -= 50; score += 50; });
    enemies = enemies.filter(e => e.hp > 0);
}

function endGame(won) {
    playing = false;
    document.getElementById('gameover-title').textContent = won ? '🏆 VICTORY!' : '💀 GAME OVER';
    document.getElementById('gameover-score').textContent = 'Score: ' + score;
    document.getElementById('gameover').classList.add('show');
}

function restartGame() {
    document.getElementById('gameover').classList.remove('show');
    level = 1; score = 0;
    player = { x: 100, y: 350, w: 30, h: 40, vx: 0, vy: 0, hp: 100, onGround: false, ultimate: 0 };
    bullets = [];
    cutsceneIndex = 0;
    showCutscene();
}

document.addEventListener('keydown', e => {
    keys[e.key] = true;
    if(e.code === 'Space') { e.preventDefault(); shoot(); }
    if(e.key === 'w' || e.key === 'W') useUltimate();
});
document.addEventListener('keyup', e => keys[e.key] = false);

initPlatforms();
</script>
</body>
</html>`;



// ============================================================
// GAME: PATIENT MODE - 3 Days After (Bilingual IS/HU)
// ============================================================
const GAME_PATIENT = `<!DOCTYPE html>
<html lang="is">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MADENTA: 3 Days After Surgery</title>
    <style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:Arial,sans-serif;background:linear-gradient(135deg,#1e3a8a,#0f172a);min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:20px}
        #game-container{max-width:700px;width:100%;background:rgba(255,255,255,0.05);border-radius:20px;padding:30px;border:2px solid rgba(59,130,246,0.3)}
        #header{display:flex;justify-content:space-between;align-items:center;margin-bottom:25px}
        #title{font-size:28px;color:#60a5fa;font-weight:bold}
        #lang-bar{display:flex;gap:8px}
        .lang-btn{padding:8px 15px;border:2px solid #3b82f6;background:transparent;color:#60a5fa;border-radius:20px;cursor:pointer;font-weight:bold}
        .lang-btn.active{background:#3b82f6;color:#fff}
        #back-btn{display:inline-block;margin-bottom:20px;padding:8px 16px;background:#3b82f6;color:#fff;border-radius:20px;text-decoration:none;font-weight:bold}
        #stats{display:grid;grid-template-columns:repeat(2,1fr);gap:15px;margin-bottom:25px}
        .stat-box{background:rgba(59,130,246,0.1);padding:15px;border-radius:12px;text-align:center}
        .stat-label{font-size:12px;color:#93c5fd;text-transform:uppercase;margin-bottom:5px}
        .stat-value{font-size:24px;color:#fff;font-weight:bold}
        #day-indicator{text-align:center;margin-bottom:20px}
        #day-title{font-size:20px;color:#60a5fa;margin-bottom:5px}
        #day-desc{color:#93c5fd;font-size:14px}
        #scenario{background:rgba(0,0,0,0.3);padding:25px;border-radius:15px;margin-bottom:25px}
        #scenario-text{color:#e0f2fe;font-size:16px;line-height:1.8;margin-bottom:20px}
        #choices{display:flex;flex-direction:column;gap:12px}
        .choice-btn{padding:15px 20px;background:rgba(59,130,246,0.2);border:2px solid #3b82f6;color:#fff;border-radius:10px;cursor:pointer;text-align:left;font-size:14px;transition:all 0.2s}
        .choice-btn:hover{background:#3b82f6;transform:translateX(5px)}
        .choice-btn.safe::before{content:'✅ ';color:#22c55e}
        .choice-btn.danger::before{content:'⚠️ ';color:#f59e0b}
        #feedback{display:none;padding:20px;border-radius:12px;margin-top:20px;text-align:center}
        #feedback.show{display:block}
        #feedback.good{background:rgba(34,197,94,0.2);border:2px solid #22c55e}
        #feedback.bad{background:rgba(239,68,68,0.2);border:2px solid #ef4444}
        #feedback-text{color:#fff;font-size:15px;margin-bottom:15px}
        .next-btn{padding:12px 30px;background:#3b82f6;color:#fff;border:none;border-radius:25px;cursor:pointer;font-weight:bold}
        #result{display:none;text-align:center;padding:40px}
        #result.show{display:block}
        #result h1{font-size:36px;margin-bottom:20px}
        #result p{color:#93c5fd;font-size:16px;margin:10px 0}
    </style>
</head>
<body>
<a href="/" id="back-btn">← Portal</a>
<div id="game-container">
    <div id="header">
        <div id="title">🏥 3 Days After</div>
        <div id="lang-bar">
            <button class="lang-btn active" onclick="setLang('is')">🇮🇸 IS</button>
            <button class="lang-btn" onclick="setLang('hu')">🇭🇺 HU</button>
        </div>
    </div>
    <div id="stats">
        <div class="stat-box"><div class="stat-label" id="lbl-healing">Healing</div><div class="stat-value" id="healing">100</div></div>
        <div class="stat-box"><div class="stat-label" id="lbl-confidence">Confidence</div><div class="stat-value" id="confidence">50</div></div>
        <div class="stat-box"><div class="stat-label" id="lbl-implant">Implant Health</div><div class="stat-value" id="implant">100</div></div>
        <div class="stat-box"><div class="stat-label" id="lbl-embarrass">Embarrassment</div><div class="stat-value" id="embarrass">0</div></div>
    </div>
    <div id="day-indicator">
        <div id="day-title"></div>
        <div id="day-desc"></div>
    </div>
    <div id="scenario">
        <div id="scenario-text"></div>
        <div id="choices"></div>
        <div id="feedback"><div id="feedback-text"></div><button class="next-btn" onclick="nextScenario()" id="next-btn">Next →</button></div>
    </div>
    <div id="result">
        <h1 id="result-title">🏆</h1>
        <p id="result-healing"></p>
        <p id="result-confidence"></p>
        <button class="next-btn" onclick="location.reload()">🔄 Play Again</button>
    </div>
</div>
<script>
let lang = 'is';
let day = 1, scenario = 0;
let stats = { healing: 100, confidence: 50, implant: 100, embarrass: 0 };

const TEXTS = {
    is: {
        labels: { healing: 'Græðsla', confidence: 'Sjálfstraust', implant: 'Ípplantaheilsa', embarrass: 'Vandræði' },
        days: ['Dagur 1: Vínsmökkun', 'Dagur 2: Veitingastaður', 'Dagur 3: Skoðunarferð'],
        dayDescs: ['Fyrsti dagurinn eftir aðgerð í Búdapest', 'Kvöldmatur á fínum veitingastað', 'Síðasti dagurinn - ferðast um borgina'],
        nextBtn: 'Næsta →',
        scenarios: [
            {
                text: 'Þú ert á vínsmökkun í Búdapest. Þjónninn býður þér rauðvín. Tennurnar þínar voru teknar í gær og þú ert með bráðabirgðatennur.',
                choices: [
                    { text: 'Þiggja vínið og reyna að drekka eðlilega', safe: false, effect: { healing: -20, confidence: 10, embarrass: 15 }, feedback: 'Vínið rann niður hökunni! Allir horfðu á þig.' },
                    { text: 'Biðja um vatn í staðinn og útskýra aðstæðurnar', safe: true, effect: { healing: 5, confidence: 15 }, feedback: 'Snjallt val! Þjónninn skildi fullkomlega.' },
                    { text: 'Þiggja vínið en drekka bara smáum sopa', safe: true, effect: { healing: -5, confidence: 10 }, feedback: 'Þetta gekk nokkuð vel með varfærni.' }
                ]
            },
            {
                text: 'Framrétturinn er gulrótarsúpa. Súpan er mjög heit.',
                choices: [
                    { text: 'Borða súpuna strax', safe: false, effect: { implant: -15, healing: -10 }, feedback: 'Æææ! Heita súpan olli sársauka!' },
                    { text: 'Bíða þar til hún kólnar', safe: true, effect: { healing: 5, confidence: 5 }, feedback: 'Þolinmæði borgar sig. Súpan var ljúffeng.' },
                    { text: 'Biðja um kalt vatn til að kæla súpuna', safe: true, effect: { confidence: 10 }, feedback: 'Sniðug lausn!' }
                ]
            },
            {
                text: 'Á veitingastaðnum eru fleiri gestir að horfa á þig. Þú þarft að tala við þjóninn.',
                choices: [
                    { text: 'Tala eðlilega og reyna að brosa', safe: false, effect: { embarrass: 20, confidence: -10 }, feedback: 'Brosið var skrýtið án tanna. Gestir horfðu.' },
                    { text: 'Nota handahreyfingar og benda á matseðilinn', safe: true, effect: { confidence: 5 }, feedback: 'Þetta gekk vel! Enginn tók eftir neinu.' },
                    { text: 'Skrifa pöntunina á símann og sýna þjóninum', safe: true, effect: { confidence: 15 }, feedback: 'Frábær hugmynd! Þjónninn var hrifinn.' }
                ]
            },
            {
                text: 'Þú ert að heimsækja Fiskiþorpið við Dúná. Leiðsögumaður býður öllum að smakka gullas (lángos).',
                choices: [
                    { text: 'Borða gullasinn eins og aðrir ferðamenn', safe: false, effect: { implant: -20, healing: -15, embarrass: 25 }, feedback: 'Gullasinn festist í bráðabirgðatönnunum! Vandræðalegt!' },
                    { text: 'Hafna kurteislega og segja að þú sért ekki svangur', safe: true, effect: { confidence: 10 }, feedback: 'Ekkert mál. Enginn spurði frekar.' },
                    { text: 'Taka gullas og borða hann í litlum bitum seinna', safe: true, effect: { healing: -5, confidence: 5 }, feedback: 'Með varfærni gekk þetta.' }
                ]
            }
        ],
        win: '🏆 Vel gert!', lose: '😅 Þetta hefði getað farið betur',
        healingResult: 'Græðsla:', confidenceResult: 'Sjálfstraust:'
    },
    hu: {
        labels: { healing: 'Gyógyulás', confidence: 'Önbizalom', implant: 'Implant Állapot', embarrass: 'Kínosság' },
        days: ['1. Nap: Borkóstoló', '2. Nap: Étterem', '3. Nap: Városnézés'],
        dayDescs: ['Az első nap a műtét után Budapesten', 'Vacsora egy elegáns étteremben', 'Az utolsó nap - városnézés'],
        nextBtn: 'Következő →',
        scenarios: [
            {
                text: 'Borkóstolón vagy Budapesten. A pincér vörösbort kínál. A fogaidat tegnap húzták ki és ideiglenes fogaid vannak.',
                choices: [
                    { text: 'Elfogadod a bort és megpróbálsz normálisan inni', safe: false, effect: { healing: -20, confidence: 10, embarrass: 15 }, feedback: 'A bor lefolyt az álladon! Mindenki nézett.' },
                    { text: 'Vizet kérsz helyette és elmagyarázod a helyzetet', safe: true, effect: { healing: 5, confidence: 15 }, feedback: 'Okos választás! A pincér teljesen megértette.' },
                    { text: 'Elfogadod a bort de csak kis kortyokban iszol', safe: true, effect: { healing: -5, confidence: 10 }, feedback: 'Óvatossággal egész jól ment.' }
                ]
            },
            {
                text: 'Az előétel sárgarépa krémleves. A leves nagyon forró.',
                choices: [
                    { text: 'Azonnal megeszed a levest', safe: false, effect: { implant: -15, healing: -10 }, feedback: 'Aúú! A forró leves fájdalmat okozott!' },
                    { text: 'Megvárod amíg kihűl', safe: true, effect: { healing: 5, confidence: 5 }, feedback: 'A türelem kifizetődik. A leves finom volt.' },
                    { text: 'Hideg vizet kérsz hogy lehűtsd a levest', safe: true, effect: { confidence: 10 }, feedback: 'Ügyes megoldás!' }
                ]
            },
            {
                text: 'Az étteremben más vendégek néznek rád. Beszélned kell a pincérrel.',
                choices: [
                    { text: 'Normálisan beszélsz és megpróbálsz mosolyogni', safe: false, effect: { embarrass: 20, confidence: -10 }, feedback: 'A mosoly furcsa volt fogak nélkül. A vendégek bámultak.' },
                    { text: 'Kézmozdulatokat használsz és az étlapra mutatsz', safe: true, effect: { confidence: 5 }, feedback: 'Jól sikerült! Senki nem vett észre semmit.' },
                    { text: 'Leírod a rendelést a telefonodon és megmutatod', safe: true, effect: { confidence: 15 }, feedback: 'Remek ötlet! A pincér el volt ragadtatva.' }
                ]
            },
            {
                text: 'A Halászbástyánál vagy. Az idegenvezető lángost kínál mindenkinek.',
                choices: [
                    { text: 'Megeszed a lángost mint a többi turista', safe: false, effect: { implant: -20, healing: -15, embarrass: 25 }, feedback: 'A lángos beragadt az ideiglenes fogakba! Kínos!' },
                    { text: 'Udvariasan visszautasítod, mondván nem vagy éhes', safe: true, effect: { confidence: 10 }, feedback: 'Semmi gond. Senki nem kérdezett tovább.' },
                    { text: 'Elviszed a lángost és később kis falatokban eszed', safe: true, effect: { healing: -5, confidence: 5 }, feedback: 'Óvatossággal sikerült.' }
                ]
            }
        ],
        win: '🏆 Szép munka!', lose: '😅 Ez jobban is mehetett volna',
        healingResult: 'Gyógyulás:', confidenceResult: 'Önbizalom:'
    }
};

function setLang(l) {
    lang = l;
    document.querySelectorAll('.lang-btn').forEach((b,i) => b.classList.toggle('active', (i===0 && l==='is') || (i===1 && l==='hu')));
    updateUI();
    showScenario();
}

function updateUI() {
    const T = TEXTS[lang];
    document.getElementById('lbl-healing').textContent = T.labels.healing;
    document.getElementById('lbl-confidence').textContent = T.labels.confidence;
    document.getElementById('lbl-implant').textContent = T.labels.implant;
    document.getElementById('lbl-embarrass').textContent = T.labels.embarrass;
    document.getElementById('next-btn').textContent = T.nextBtn;
}

function updateStats() {
    document.getElementById('healing').textContent = Math.max(0, Math.min(100, stats.healing));
    document.getElementById('confidence').textContent = Math.max(0, Math.min(100, stats.confidence));
    document.getElementById('implant').textContent = Math.max(0, Math.min(100, stats.implant));
    document.getElementById('embarrass').textContent = Math.max(0, stats.embarrass);
}

function showScenario() {
    const T = TEXTS[lang];
    const dayIndex = Math.floor(scenario / 1.5);
    document.getElementById('day-title').textContent = T.days[Math.min(dayIndex, 2)];
    document.getElementById('day-desc').textContent = T.dayDescs[Math.min(dayIndex, 2)];
    
    if(scenario >= T.scenarios.length) {
        endGame();
        return;
    }
    
    const s = T.scenarios[scenario];
    document.getElementById('scenario-text').textContent = s.text;
    
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';
    s.choices.forEach((c, i) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn ' + (c.safe ? 'safe' : 'danger');
        btn.textContent = c.text;
        btn.onclick = () => makeChoice(i);
        choicesDiv.appendChild(btn);
    });
    
    document.getElementById('feedback').classList.remove('show');
}

function makeChoice(index) {
    const T = TEXTS[lang];
    const s = T.scenarios[scenario];
    const choice = s.choices[index];
    
    // Apply effects
    if(choice.effect.healing) stats.healing += choice.effect.healing;
    if(choice.effect.confidence) stats.confidence += choice.effect.confidence;
    if(choice.effect.implant) stats.implant += choice.effect.implant;
    if(choice.effect.embarrass) stats.embarrass += choice.effect.embarrass;
    
    updateStats();
    
    // Show feedback
    const fb = document.getElementById('feedback');
    fb.className = 'show ' + (choice.safe ? 'good' : 'bad');
    document.getElementById('feedback-text').textContent = choice.feedback;
    document.getElementById('choices').innerHTML = '';
}

function nextScenario() {
    scenario++;
    showScenario();
}

function endGame() {
    const T = TEXTS[lang];
    document.getElementById('scenario').style.display = 'none';
    const result = document.getElementById('result');
    result.classList.add('show');
    
    const won = stats.healing >= 50 && stats.implant >= 50;
    document.getElementById('result-title').textContent = won ? T.win : T.lose;
    document.getElementById('result-healing').textContent = T.healingResult + ' ' + stats.healing + '%';
    document.getElementById('result-confidence').textContent = T.confidenceResult + ' ' + stats.confidence + '%';
}

updateUI();
updateStats();
showScenario();
</script>
</body>
</html>`;



// ============================================================
// GAME: PIXEL EDITION - Retro Style (Bilingual IS/HU)
// ============================================================
const GAME_PIXEL = `<!DOCTYPE html>
<html lang="is">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MADENTA: Pixel Edition</title>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'Press Start 2P',monospace;background:#0f0a1a;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:20px}
        #header{display:flex;justify-content:space-between;align-items:center;width:100%;max-width:600px;margin-bottom:20px}
        #title{font-size:16px;color:#9333ea;text-shadow:2px 2px 0 #581c87}
        #lang-bar{display:flex;gap:5px}
        .lang-btn{padding:5px 10px;font-family:'Press Start 2P',monospace;font-size:8px;border:2px solid #9333ea;background:#1a0a2e;color:#c084fc;cursor:pointer}
        .lang-btn.active{background:#9333ea;color:#fff}
        #back-btn{font-family:'Press Start 2P',monospace;font-size:8px;padding:8px 12px;background:#9333ea;color:#fff;text-decoration:none;border:none}
        #game-area{background:#1a0a2e;border:4px solid #9333ea;padding:20px;image-rendering:pixelated}
        #hud{display:flex;justify-content:space-between;margin-bottom:15px;font-size:10px;color:#c084fc}
        #grid{display:grid;grid-template-columns:repeat(10,40px);gap:2px;margin-bottom:15px}
        .cell{width:40px;height:40px;background:#2d1a4a;border:2px solid #4c1d95;display:flex;align-items:center;justify-content:center;font-size:20px;cursor:pointer;transition:all 0.1s}
        .cell:hover{background:#4c1d95;transform:scale(1.05)}
        .cell.tooth{background:#f0abfc}
        .cell.removed{background:#581c87}
        .cell.implant{background:#c084fc}
        #tools{display:flex;gap:8px;justify-content:center;margin-bottom:15px}
        .tool-btn{padding:10px 15px;font-family:'Press Start 2P',monospace;font-size:8px;border:2px solid #9333ea;background:#2d1a4a;color:#c084fc;cursor:pointer}
        .tool-btn:hover{background:#4c1d95}
        .tool-btn.active{background:#9333ea;color:#fff}
        #instructions{font-size:8px;color:#a855f7;text-align:center;line-height:1.8}
        #result{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(15,10,26,0.95);flex-direction:column;align-items:center;justify-content:center}
        #result.show{display:flex}
        #result h1{font-size:24px;color:#9333ea;margin-bottom:20px}
        #result p{font-size:10px;color:#c084fc;margin:10px 0}
        .restart-btn{margin-top:20px;padding:15px 30px;font-family:'Press Start 2P',monospace;font-size:10px;background:#9333ea;color:#fff;border:none;cursor:pointer}
    </style>
</head>
<body>
<div id="header">
    <a href="/" id="back-btn">← BACK</a>
    <div id="title">👾 PIXEL</div>
    <div id="lang-bar">
        <button class="lang-btn active" onclick="setLang('is')">IS</button>
        <button class="lang-btn" onclick="setLang('hu')">HU</button>
    </div>
</div>
<div id="game-area">
    <div id="hud">
        <span id="score-lbl">STIG: <span id="score">0</span></span>
        <span id="teeth-lbl">TENNUR: <span id="teeth-left">20</span></span>
        <span id="impl-lbl">ÍPP: <span id="impl-count">0</span></span>
    </div>
    <div id="grid"></div>
    <div id="tools">
        <button class="tool-btn active" onclick="setTool(0)" id="tb0">🔷 BORA [1]</button>
        <button class="tool-btn" onclick="setTool(1)" id="tb1">🔨 TANG [2]</button>
        <button class="tool-btn" onclick="setTool(2)" id="tb2">🔩 ÍPP [3]</button>
    </div>
    <div id="instructions"></div>
</div>
<div id="result">
    <h1 id="result-title">🏆 WIN!</h1>
    <p id="result-score"></p>
    <p id="result-impl"></p>
    <button class="restart-btn" onclick="location.reload()">🔄 RESTART</button>
</div>
<script>
let lang = 'is', tool = 0, score = 0, teethLeft = 20, implants = 0;
let cells = [];

const TEXTS = {
    is: {
        score: 'STIG:', teeth: 'TENNUR:', impl: 'ÍPP:',
        tools: ['🔷 BORA [1]', '🔨 TANG [2]', '🔩 ÍPP [3]'],
        instructions: 'SMELLA Á REITINN | BORA VEIKIR | TANG FJARLÆGIR | SETJA ÍPPLANT',
        win: '🏆 SIGUR!', resultScore: 'STIG:', resultImpl: 'ÍPPLANTAR:'
    },
    hu: {
        score: 'PONT:', teeth: 'FOGAK:', impl: 'IMP:',
        tools: ['🔷 FÚRÓ [1]', '🔨 FOGÓ [2]', '🔩 IMP [3]'],
        instructions: 'KATTINTS A CELLÁRA | FÚRÓ GYENGÍT | FOGÓ ELTÁVOLÍT | IMPLANT BERAK',
        win: '🏆 GYŐZELEM!', resultScore: 'PONT:', resultImpl: 'IMPLANTOK:'
    }
};

function setLang(l) {
    lang = l;
    document.querySelectorAll('.lang-btn').forEach((b,i) => b.classList.toggle('active', (i===0 && l==='is') || (i===1 && l==='hu')));
    updateUI();
}

function updateUI() {
    const T = TEXTS[lang];
    document.getElementById('score-lbl').innerHTML = T.score + ' <span id="score">' + score + '</span>';
    document.getElementById('teeth-lbl').innerHTML = T.teeth + ' <span id="teeth-left">' + teethLeft + '</span>';
    document.getElementById('impl-lbl').innerHTML = T.impl + ' <span id="impl-count">' + implants + '</span>';
    T.tools.forEach((t, i) => document.getElementById('tb' + i).textContent = t);
    document.getElementById('instructions').textContent = T.instructions;
}

function setTool(t) {
    tool = t;
    document.querySelectorAll('.tool-btn').forEach((b,i) => b.classList.toggle('active', i===t));
}

function initGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    cells = [];
    
    // Create 10x10 grid with teeth in mouth shape
    for(let row = 0; row < 10; row++) {
        for(let col = 0; col < 10; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            
            // Teeth in upper and lower rows
            const hasTooth = (row === 1 || row === 2 || row === 7 || row === 8) && col >= 1 && col <= 8;
            
            const cellData = { el: cell, hasTooth, hp: hasTooth ? 100 : 0, removed: false, implant: false };
            cells.push(cellData);
            
            if(hasTooth) {
                cell.classList.add('tooth');
                cell.textContent = '🦷';
            }
            
            cell.onclick = () => clickCell(cellData);
            grid.appendChild(cell);
        }
    }
}

function clickCell(c) {
    if(!c.hasTooth) return;
    
    if(!c.removed) {
        if(tool === 0) { // Drill
            c.hp -= 40;
            score += 5;
            c.el.style.opacity = c.hp / 100;
        } else if(tool === 1 && c.hp <= 50) { // Extract
            c.removed = true;
            c.el.classList.remove('tooth');
            c.el.classList.add('removed');
            c.el.textContent = '⭕';
            teethLeft--;
            score += 20;
        }
    } else if(c.removed && !c.implant && tool === 2) { // Implant
        c.implant = true;
        c.el.classList.add('implant');
        c.el.textContent = '🔩';
        implants++;
        score += 50;
        
        if(implants >= 4 && teethLeft <= 16) {
            endGame();
        }
    }
    
    updateUI();
}

function endGame() {
    const T = TEXTS[lang];
    document.getElementById('result-title').textContent = T.win;
    document.getElementById('result-score').textContent = T.resultScore + ' ' + score;
    document.getElementById('result-impl').textContent = T.resultImpl + ' ' + implants;
    document.getElementById('result').classList.add('show');
}

document.addEventListener('keydown', e => {
    if(e.key === '1') setTool(0);
    if(e.key === '2') setTool(1);
    if(e.key === '3') setTool(2);
});

initGrid();
updateUI();
</script>
</body>
</html>`;



// ============================================================
// WORKER EXPORT & ROUTING
// ============================================================
export default {
    async fetch(request) {
        const url = new URL(request.url);
        const path = url.pathname.toLowerCase();
        
        const headers = {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
            'Access-Control-Allow-Origin': '*',
            'X-Powered-By': '2076 ehf'
        };
        
        // Route handling
        switch(true) {
            case path === '/' || path === '':
                return new Response(PORTAL_HTML, { headers });
            
            case path === '/main' || path === '/premium' || path === '/simulator':
                return new Response(GAME_MAIN, { headers });
            
            case path === '/broforce' || path === '/action' || path === '/fight':
                return new Response(GAME_BROFORCE, { headers });
            
            case path === '/patient' || path === '/3days' || path === '/recovery':
                return new Response(GAME_PATIENT, { headers });
            
            case path === '/pixel' || path === '/retro' || path === '/8bit':
                return new Response(GAME_PIXEL, { headers });
            
            case path === '/api/health':
                return new Response(JSON.stringify({ status: 'ok', games: 4, version: '2.0' }), {
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
                });
            
            default:
                // 404 - redirect to portal
                return new Response(`<!DOCTYPE html><html><head><meta charset="UTF-8"><meta http-equiv="refresh" content="2;url=/"><title>Not Found</title><style>body{background:#022c22;color:#10b981;font-family:Arial;display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column}h1{font-size:48px;margin-bottom:20px}p{color:#a7f3d0}</style></head><body><h1>404</h1><p>Redirecting to portal...</p></body></html>`, { status: 404, headers });
        }
    }
};
