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
                    <p class="card-desc">5 levels, 3 boss fights! Fight the Tooth Cartel with Dr. Dávid!</p>
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
    for(let i = 0; i < 14; i++) { teeth.push({ x: 120 + i * 42, y: 120, hp: 100, removed: false, implant: false }); }
    for(let i = 0; i < 14; i++) { teeth.push({ x: 120 + i * 42, y: 380, hp: 100, removed: false, implant: false }); }
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
    ctx.fillStyle = '#f472b6';
    ctx.fillRect(100, 80, 600, 100);
    ctx.fillRect(100, 320, 600, 100);
    
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
                if(tool === 0) { t.hp -= 35; score += 10; }
                else if(tool === 1 && t.hp <= 50) { t.removed = true; teethLeft--; score += 100; }
                else if(tool === 2) { t.hp -= 15; score += 5; }
                else if(tool === 3) { score += 5; }
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
// GAME: BROFORCE - 5 Levels with Boss Fights
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
        canvas{border:3px solid #10b981;border-radius:4px;background:#1a1a2e}
        #hud{position:absolute;top:10px;left:10px;color:#fff;font-size:12px;background:rgba(0,0,0,0.85);padding:10px 15px;border-radius:8px;min-width:160px}
        #hud div{margin:4px 0;display:flex;justify-content:space-between}
        #hud span{color:#10b981}
        #back-btn{position:absolute;top:10px;right:10px;padding:8px 16px;background:#10b981;color:#fff;border:none;border-radius:20px;cursor:pointer;font-weight:bold;text-decoration:none;font-size:11px}
        #instructions{position:absolute;bottom:10px;left:50%;transform:translateX(-50%);color:#a7f3d0;font-size:10px;background:rgba(0,0,0,0.85);padding:8px 15px;border-radius:20px}
        #level-banner{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:28px;color:#10b981;font-weight:bold;text-shadow:2px 2px 0 #000;display:none;z-index:5;background:rgba(0,0,0,0.8);padding:15px 30px;border-radius:10px}
        #cutscene{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.97);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;z-index:10}
        #cutscene.hidden{display:none}
        #cutscene-speaker{font-size:22px;color:#10b981;margin-bottom:12px;font-weight:bold}
        #cutscene-text{max-width:550px;text-align:center;font-size:15px;line-height:1.7;margin-bottom:20px;color:#a7f3d0}
        .skip-btn{padding:12px 28px;background:#10b981;color:#fff;border:none;border-radius:25px;font-size:14px;cursor:pointer;font-weight:bold}
        #overlay{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.97);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:20}
        #overlay.hidden{display:none}
        #overlay h1{font-size:32px;color:#dc2626;margin-bottom:10px;text-shadow:2px 2px 0 #7f1d1d}
        #overlay p{color:#fca5a5;margin-bottom:15px;font-size:13px;text-align:center;max-width:380px;line-height:1.5}
        .feat{color:#f59e0b;font-size:11px;margin-bottom:20px}
        #gameover{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:20}
        #gameover.show{display:flex}
        #gameover h1{font-size:38px;margin-bottom:15px}
        #gameover p{color:#a7f3d0;font-size:15px;margin:5px 0}
    </style>
</head>
<body>
<div id="game-container">
    <a href="/" id="back-btn">← Portal</a>
    <canvas id="canvas" width="800" height="500"></canvas>
    <div id="hud">
        <div>❤️ HP <span id="health">100</span></div>
        <div>🎯 Score <span id="score">0</span></div>
        <div>📍 Level <span id="level">1</span>/5</div>
        <div>👾 Enemies <span id="enemies-left">0</span></div>
        <div>⚡ Ultimate <span id="ultimate">0</span>%</div>
    </div>
    <div id="level-banner"></div>
    <div id="instructions">⬅️➡️ Move | ⬆️/W Jump | SPACE Shoot | E Ultimate (100%)</div>
    <div id="cutscene">
        <div id="cutscene-speaker"></div>
        <div id="cutscene-text"></div>
        <button class="skip-btn" onclick="skipCutscene()">CONTINUE →</button>
    </div>
    <div id="overlay">
        <h1>🔫 MADENTA BROFORCE</h1>
        <p>The Tooth Cartel is destroying dentistry! Join Dr. Dávid Farkas to defeat Carius, Bactus, and the evil FrauduDent!</p>
        <p class="feat">5 Levels • 3 Boss Fights • Challenging Gameplay</p>
        <button class="skip-btn" onclick="startGame()">START MISSION</button>
    </div>
    <div id="gameover">
        <h1 id="gameover-title">💀</h1>
        <p id="gameover-score"></p>
        <p id="gameover-level"></p>
        <button class="skip-btn" onclick="restartGame()">TRY AGAIN</button>
    </div>
</div>
<script>
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const W = 800, H = 500;

let playing = false, paused = false, level = 1, score = 0;
let player, enemies, bullets, enemyBullets, platforms, powerups, boss;
let keys = {}, lastShot = 0, cutsceneIndex = 0;

const COLORS = ['#1a1a2e','#1a2e1a','#2e1a1a','#1a1a3e','#2e0a0a'];
const NAMES = ['Bacteria Nest','Plaque Valley','Cavity Cave','Gingivitis Gorge','FrauduDent Lair'];

const CUTSCENES = [
    {speaker:'🦷 DR. DÁVID FARKAS',text:'The Tooth Cartel has gone too far! Carius and Bactus are spreading decay across Budapest. We must stop them!'},
    {speaker:'🔫 ÓMAR (2076 ehf)',text:'I equipped you with the latest dental laser. Your ultimate ability can clear waves of bacteria. Good luck!'},
    {speaker:'🦷 DR. DÁVID',text:'For Madenta! For healthy smiles! The operation begins NOW!'}
];

const LEVEL_CUTS = {
    2:{speaker:'👾 CARIUS (Boss)',text:'You think you can stop us? I am Carius, the Sugar Demon! My candy bombs will rot your resolve!'},
    3:{speaker:'🦷 DR. DÁVID',text:'Carius is defeated! But the infection runs deeper. We must press on!'},
    4:{speaker:'🔴 BACTUS (Boss)',text:'My brother Carius was weak! I am Bactus, master of plaque! You shall not pass!'},
    5:{speaker:'😈 FRAUDUDENT (Final Boss)',text:'Foolish dentist! I am Dr. FrauduDent! I sell teeth to the black market! You will join my collection!'}
};

function resetPlayer(){
    player = {x:50,y:350,w:26,h:36,vx:0,vy:0,hp:100,maxHp:100,onGround:false,ultimate:0,facing:1,inv:0};
}

function initLevel(lvl){
    enemies=[];bullets=[];enemyBullets=[];powerups=[];boss=null;
    
    const layouts = [
        [{x:0,y:460,w:800,h:40},{x:80,y:360,w:100,h:12},{x:250,y:300,w:100,h:12},{x:420,y:350,w:100,h:12},{x:580,y:280,w:100,h:12},{x:680,y:380,w:100,h:12}],
        [{x:0,y:460,w:800,h:40},{x:50,y:350,w:80,h:12},{x:180,y:280,w:120,h:12},{x:380,y:320,w:120,h:12},{x:560,y:260,w:100,h:12},{x:700,y:350,w:80,h:12},{x:280,y:180,w:150,h:12}],
        [{x:0,y:460,w:800,h:40},{x:60,y:380,w:70,h:12},{x:180,y:300,w:70,h:12},{x:300,y:220,w:70,h:12},{x:420,y:300,w:70,h:12},{x:540,y:380,w:70,h:12},{x:660,y:300,w:70,h:12},{x:240,y:140,w:280,h:12}],
        [{x:0,y:460,w:800,h:40},{x:0,y:340,w:120,h:12},{x:180,y:260,w:80,h:12},{x:320,y:340,w:80,h:12},{x:460,y:260,w:80,h:12},{x:600,y:340,w:120,h:12},{x:280,y:160,w:180,h:12}],
        [{x:0,y:460,w:800,h:40},{x:80,y:360,w:60,h:12},{x:200,y:280,w:60,h:12},{x:320,y:200,w:60,h:12},{x:440,y:280,w:60,h:12},{x:560,y:360,w:60,h:12},{x:40,y:180,w:80,h:12},{x:680,y:180,w:80,h:12},{x:340,y:100,w:120,h:12}]
    ];
    platforms = layouts[lvl-1]||layouts[0];
    
    const count = 4 + lvl * 4;
    for(let i=0;i<count;i++) spawnEnemy(lvl);
    
    if(lvl===2||lvl===4||lvl===5) spawnBoss(lvl);
    if(Math.random()>0.4) powerups.push({x:200+Math.random()*400,y:80+Math.random()*200,type:Math.random()>0.5?'hp':'ult',w:18,h:18});
}

function spawnEnemy(lvl){
    const types=['bacteria','carius','bactus','shooter'];
    const weights = lvl<3?[0.5,0.35,0.15,0]:[0.25,0.25,0.25,0.25];
    let r=Math.random(),type=types[0],sum=0;
    for(let i=0;i<weights.length;i++){sum+=weights[i];if(r<sum){type=types[i];break;}}
    
    const hp = 25 + lvl*20;
    const spd = 1.2 + lvl*0.4 + Math.random()*0.5;
    
    enemies.push({
        x:200+Math.random()*500,y:50+Math.random()*250,w:24,h:24,
        vx:(Math.random()>0.5?1:-1)*spd,vy:0,hp:hp,maxHp:hp,
        type:type,shootCD:0,jumpCD:0
    });
}

function spawnBoss(lvl){
    const data={
        2:{name:'CARIUS',hp:280,color:'#dc2626',size:48,spd:2.5,pattern:'jump'},
        4:{name:'BACTUS',hp:420,color:'#7c3aed',size:52,spd:3,pattern:'shoot'},
        5:{name:'FRAUDUDENT',hp:600,color:'#1f2937',size:58,spd:3.5,pattern:'both'}
    };
    const b=data[lvl];
    boss={x:600,y:300,w:b.size,h:b.size,vx:b.spd,vy:0,hp:b.hp,maxHp:b.hp,name:b.name,color:b.color,pattern:b.pattern,atkTimer:0,jumpTimer:0};
}

function showCutscene(){
    if(cutsceneIndex>=CUTSCENES.length){
        document.getElementById('cutscene').classList.add('hidden');
        playing=true;resetPlayer();initLevel(1);gameLoop();return;
    }
    document.getElementById('cutscene-speaker').textContent=CUTSCENES[cutsceneIndex].speaker;
    document.getElementById('cutscene-text').textContent=CUTSCENES[cutsceneIndex].text;
}

function showLevelCut(){
    if(LEVEL_CUTS[level]){
        paused=true;
        document.getElementById('cutscene').classList.remove('hidden');
        document.getElementById('cutscene-speaker').textContent=LEVEL_CUTS[level].speaker;
        document.getElementById('cutscene-text').textContent=LEVEL_CUTS[level].text;
    }
}

function skipCutscene(){
    if(paused){paused=false;document.getElementById('cutscene').classList.add('hidden');return;}
    cutsceneIndex++;showCutscene();
}

function startGame(){
    document.getElementById('overlay').classList.add('hidden');
    cutsceneIndex=0;level=1;score=0;showCutscene();
}

function showBanner(txt){
    const b=document.getElementById('level-banner');
    b.textContent=txt;b.style.display='block';
    setTimeout(()=>b.style.display='none',2000);
}

function gameLoop(){
    if(!playing)return;
    if(!paused){update();render();}
    requestAnimationFrame(gameLoop);
}

function update(){
    const spd=5.5;
    if(keys['ArrowLeft']||keys['a']||keys['A']){player.vx=-spd;player.facing=-1;}
    else if(keys['ArrowRight']||keys['d']||keys['D']){player.vx=spd;player.facing=1;}
    else player.vx*=0.82;
    
    if((keys['ArrowUp']||keys['w']||keys['W'])&&player.onGround){player.vy=-14;player.onGround=false;}
    
    player.vy+=0.65;player.x+=player.vx;player.y+=player.vy;
    
    player.onGround=false;
    platforms.forEach(p=>{
        if(player.x+player.w>p.x&&player.x<p.x+p.w){
            if(player.y+player.h>p.y&&player.y+player.h<p.y+18&&player.vy>0){
                player.y=p.y-player.h;player.vy=0;player.onGround=true;
            }
        }
    });
    
    if(player.x<0)player.x=0;
    if(player.x>W-player.w)player.x=W-player.w;
    if(player.y>H-50){player.y=H-50-player.h;player.onGround=true;player.vy=0;}
    if(player.inv>0)player.inv--;
    
    bullets=bullets.filter(b=>{b.x+=b.vx;b.y+=b.vy||0;return b.x>0&&b.x<W&&b.y>0&&b.y<H;});
    
    enemyBullets=enemyBullets.filter(b=>{
        b.x+=b.vx;b.y+=b.vy||0;
        if(player.inv===0&&b.x>player.x&&b.x<player.x+player.w&&b.y>player.y&&b.y<player.y+player.h){
            player.hp-=18;player.inv=35;return false;
        }
        return b.x>0&&b.x<W&&b.y>0&&b.y<H;
    });
    
    enemies.forEach(e=>{
        e.x+=e.vx;e.vy+=0.45;e.y+=e.vy;
        
        platforms.forEach(p=>{
            if(e.x+e.w>p.x&&e.x<p.x+p.w&&e.y+e.h>p.y&&e.y+e.h<p.y+18&&e.vy>0){
                e.y=p.y-e.h;e.vy=0;
            }
        });
        
        if(e.x<25||e.x>W-45)e.vx*=-1;
        if(e.y>H-70){e.y=H-70;e.vy=0;}
        
        if(Math.random()<0.025)e.vx=(player.x>e.x?1:-1)*(1.3+level*0.35);
        
        if(e.jumpCD<=0&&player.y<e.y-60&&Math.random()<0.04){e.vy=-11;e.jumpCD=70;}
        if(e.jumpCD>0)e.jumpCD--;
        
        if(e.type==='shooter'&&e.shootCD<=0){
            const dx=player.x-e.x,dy=player.y-e.y,dist=Math.sqrt(dx*dx+dy*dy);
            if(dist<350){
                enemyBullets.push({x:e.x+e.w/2,y:e.y+e.h/2,vx:(dx/dist)*5.5,vy:(dy/dist)*5.5});
                e.shootCD=75;
            }
        }
        if(e.shootCD>0)e.shootCD--;
        
        bullets.forEach((b,bi)=>{
            if(b.x>e.x&&b.x<e.x+e.w&&b.y>e.y&&b.y<e.y+e.h){
                e.hp-=28;bullets.splice(bi,1);
                if(e.hp<=0){score+=e.type==='shooter'?200:e.type==='carius'?150:100;player.ultimate=Math.min(100,player.ultimate+10);}
            }
        });
        
        if(player.inv===0&&player.x<e.x+e.w&&player.x+player.w>e.x&&player.y<e.y+e.h&&player.y+player.h>e.y&&e.hp>0){
            player.hp-=12;player.inv=50;player.vx=(player.x<e.x?-9:9);player.vy=-6;
        }
    });
    enemies=enemies.filter(e=>e.hp>0);
    
    if(boss&&boss.hp>0){
        boss.atkTimer++;
        boss.x+=boss.vx;boss.vy+=0.55;boss.y+=boss.vy;
        
        if(boss.y>H-90){boss.y=H-90;boss.vy=0;}
        if(boss.x<50||boss.x>W-110)boss.vx*=-1;
        
        if(boss.pattern==='jump'||boss.pattern==='both'){
            boss.jumpTimer++;
            if(boss.jumpTimer>90){boss.vy=-16;boss.jumpTimer=0;}
        }
        
        if((boss.pattern==='shoot'||boss.pattern==='both')&&boss.atkTimer%40===0){
            const dx=player.x-boss.x,dy=player.y-boss.y,dist=Math.sqrt(dx*dx+dy*dy);
            enemyBullets.push({x:boss.x+boss.w/2,y:boss.y+boss.h/2,vx:(dx/dist)*7,vy:(dy/dist)*7});
            if(boss.hp<boss.maxHp*0.5){
                enemyBullets.push({x:boss.x+boss.w/2,y:boss.y,vx:(dx/dist)*6,vy:-4});
                enemyBullets.push({x:boss.x+boss.w/2,y:boss.y+boss.h,vx:(dx/dist)*6,vy:4});
            }
            if(boss.hp<boss.maxHp*0.25){
                enemyBullets.push({x:boss.x,y:boss.y+boss.h/2,vx:-5,vy:0});
                enemyBullets.push({x:boss.x+boss.w,y:boss.y+boss.h/2,vx:5,vy:0});
            }
        }
        
        bullets.forEach((b,bi)=>{
            if(b.x>boss.x&&b.x<boss.x+boss.w&&b.y>boss.y&&b.y<boss.y+boss.h){
                boss.hp-=18;bullets.splice(bi,1);score+=30;
            }
        });
        
        if(player.inv===0&&player.x<boss.x+boss.w&&player.x+player.w>boss.x&&player.y<boss.y+boss.h&&player.y+player.h>boss.y){
            player.hp-=25;player.inv=65;player.vx=(player.x<boss.x?-14:14);player.vy=-10;
        }
    }
    
    powerups=powerups.filter(p=>{
        if(player.x<p.x+p.w&&player.x+player.w>p.x&&player.y<p.y+p.h&&player.y+player.h>p.y){
            if(p.type==='hp')player.hp=Math.min(player.maxHp,player.hp+35);
            else player.ultimate=Math.min(100,player.ultimate+60);
            return false;
        }
        return true;
    });
    
    if(player.hp<=0)endGame(false);
    
    const bossOK=!boss||boss.hp<=0;
    if(enemies.length===0&&bossOK){
        if(level>=5){endGame(true);}
        else{
            level++;
            showBanner('LEVEL '+level+': '+NAMES[level-1]);
            player.hp=Math.min(player.maxHp,player.hp+25);
            initLevel(level);
            if(LEVEL_CUTS[level])showLevelCut();
        }
    }
    
    document.getElementById('health').textContent=Math.max(0,Math.floor(player.hp));
    document.getElementById('score').textContent=score;
    document.getElementById('level').textContent=level;
    document.getElementById('enemies-left').textContent=enemies.length+(boss&&boss.hp>0?1:0);
    document.getElementById('ultimate').textContent=Math.floor(player.ultimate);
}

function render(){
    ctx.fillStyle=COLORS[level-1]||COLORS[0];
    ctx.fillRect(0,0,W,H);
    
    ctx.fillStyle='rgba(255,255,255,0.02)';
    for(let i=0;i<4;i++){ctx.beginPath();ctx.arc(120+i*200,120+(i%2)*180,70,0,Math.PI*2);ctx.fill();}
    
    platforms.forEach(p=>{
        ctx.fillStyle='#10b981';ctx.fillRect(p.x,p.y,p.w,p.h);
        ctx.fillStyle='#059669';ctx.fillRect(p.x,p.y,p.w,3);
    });
    
    powerups.forEach(p=>{
        ctx.fillStyle=p.type==='hp'?'#ef4444':'#f59e0b';
        ctx.beginPath();ctx.arc(p.x+9,p.y+9,9,0,Math.PI*2);ctx.fill();
        ctx.fillStyle='#fff';ctx.font='10px Arial';ctx.fillText(p.type==='hp'?'+':'⚡',p.x+4,p.y+13);
    });
    
    const flash=player.inv>0&&Math.floor(player.inv/4)%2===0;
    if(!flash){
        ctx.fillStyle='#3b82f6';ctx.fillRect(player.x,player.y,player.w,player.h);
        ctx.fillStyle='#fff';
        const ex=player.facing>0?6:3;
        ctx.fillRect(player.x+ex,player.y+9,4,4);ctx.fillRect(player.x+ex+9,player.y+9,4,4);
        ctx.fillStyle='#1e3a8a';ctx.fillRect(player.x+(player.facing>0?player.w:-7),player.y+14,9,5);
    }
    
    ctx.fillStyle='#333';ctx.fillRect(player.x-4,player.y-10,player.w+8,5);
    ctx.fillStyle=player.ultimate>=100?'#f59e0b':'#555';
    ctx.fillRect(player.x-4,player.y-10,(player.w+8)*(player.ultimate/100),5);
    
    enemies.forEach(e=>{
        let col='#22c55e';
        if(e.type==='carius')col='#dc2626';
        else if(e.type==='bactus')col='#7c3aed';
        else if(e.type==='shooter')col='#f59e0b';
        
        ctx.fillStyle=col;ctx.beginPath();ctx.arc(e.x+e.w/2,e.y+e.h/2,e.w/2,0,Math.PI*2);ctx.fill();
        ctx.fillStyle='#fff';ctx.fillRect(e.x+4,e.y+7,4,4);ctx.fillRect(e.x+e.w-8,e.y+7,4,4);
        ctx.fillStyle='#333';ctx.fillRect(e.x,e.y-7,e.w,3);
        ctx.fillStyle='#ef4444';ctx.fillRect(e.x,e.y-7,e.w*(e.hp/e.maxHp),3);
    });
    
    if(boss&&boss.hp>0){
        ctx.fillStyle=boss.color;ctx.fillRect(boss.x,boss.y,boss.w,boss.h);
        ctx.fillStyle=boss.hp<boss.maxHp*0.3?'#ef4444':'#fff';
        ctx.fillRect(boss.x+10,boss.y+14,9,9);ctx.fillRect(boss.x+boss.w-19,boss.y+14,9,9);
        ctx.fillStyle='#ef4444';ctx.fillRect(boss.x+14,boss.y+boss.h-14,boss.w-28,4);
        
        ctx.fillStyle='#333';ctx.fillRect(boss.x-8,boss.y-18,boss.w+16,9);
        ctx.fillStyle='#ef4444';ctx.fillRect(boss.x-8,boss.y-18,(boss.w+16)*(boss.hp/boss.maxHp),9);
        ctx.fillStyle='#fff';ctx.font='bold 9px Arial';ctx.fillText(boss.name,boss.x,boss.y-22);
    }
    
    ctx.fillStyle='#fbbf24';
    bullets.forEach(b=>{ctx.beginPath();ctx.arc(b.x,b.y,4,0,Math.PI*2);ctx.fill();});
    
    ctx.fillStyle='#ef4444';
    enemyBullets.forEach(b=>{ctx.beginPath();ctx.arc(b.x,b.y,5,0,Math.PI*2);ctx.fill();});
}

function shoot(){
    if(!playing||paused)return;
    const now=Date.now();
    if(now-lastShot<130)return;
    lastShot=now;
    bullets.push({x:player.x+(player.facing>0?player.w+4:-4),y:player.y+16,vx:player.facing*13,vy:0});
}

function useUlt(){
    if(!playing||paused||player.ultimate<100)return;
    player.ultimate=0;
    ctx.fillStyle='rgba(245,158,11,0.4)';ctx.fillRect(0,0,W,H);
    enemies.forEach(e=>{e.hp-=120;score+=60;});
    enemies=enemies.filter(e=>e.hp>0);
    if(boss)boss.hp-=100;
    enemyBullets=[];
}

function endGame(won){
    playing=false;
    document.getElementById('gameover-title').textContent=won?'🏆 VICTORY!':'💀 GAME OVER';
    document.getElementById('gameover-score').textContent='Score: '+score;
    document.getElementById('gameover-level').textContent=won?'The Tooth Cartel is defeated!':'Reached Level '+level+'/5';
    document.getElementById('gameover').classList.add('show');
}

function restartGame(){
    document.getElementById('gameover').classList.remove('show');
    document.getElementById('cutscene').classList.add('hidden');
    level=1;score=0;cutsceneIndex=0;bullets=[];enemyBullets=[];
    showCutscene();
}

document.addEventListener('keydown',e=>{
    keys[e.key]=true;keys[e.code]=true;
    if(e.code==='Space'){e.preventDefault();shoot();}
    if(e.key==='e'||e.key==='E')useUlt();
});
document.addEventListener('keyup',e=>{keys[e.key]=false;keys[e.code]=false;});
setInterval(()=>{if(keys['Space']&&playing&&!paused)shoot();},130);
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
        #title{font-size:26px;color:#60a5fa;font-weight:bold}
        #lang-bar{display:flex;gap:8px}
        .lang-btn{padding:8px 15px;border:2px solid #3b82f6;background:transparent;color:#60a5fa;border-radius:20px;cursor:pointer;font-weight:bold}
        .lang-btn.active{background:#3b82f6;color:#fff}
        #back-btn{display:inline-block;margin-bottom:20px;padding:8px 16px;background:#3b82f6;color:#fff;border-radius:20px;text-decoration:none;font-weight:bold}
        #stats{display:grid;grid-template-columns:repeat(2,1fr);gap:15px;margin-bottom:25px}
        .stat-box{background:rgba(59,130,246,0.1);padding:15px;border-radius:12px;text-align:center}
        .stat-label{font-size:11px;color:#93c5fd;text-transform:uppercase;margin-bottom:5px}
        .stat-value{font-size:22px;color:#fff;font-weight:bold}
        #day-indicator{text-align:center;margin-bottom:20px}
        #day-title{font-size:18px;color:#60a5fa;margin-bottom:5px}
        #day-desc{color:#93c5fd;font-size:13px}
        #scenario{background:rgba(0,0,0,0.3);padding:25px;border-radius:15px;margin-bottom:20px}
        #scenario-text{color:#e0f2fe;font-size:15px;line-height:1.7;margin-bottom:18px}
        #choices{display:flex;flex-direction:column;gap:10px}
        .choice-btn{padding:14px 18px;background:rgba(59,130,246,0.2);border:2px solid #3b82f6;color:#fff;border-radius:10px;cursor:pointer;text-align:left;font-size:13px;transition:all 0.2s}
        .choice-btn:hover{background:#3b82f6;transform:translateX(5px)}
        .choice-btn.safe::before{content:'✅ ';color:#22c55e}
        .choice-btn.danger::before{content:'⚠️ ';color:#f59e0b}
        #feedback{display:none;padding:18px;border-radius:12px;margin-top:18px;text-align:center}
        #feedback.show{display:block}
        #feedback.good{background:rgba(34,197,94,0.2);border:2px solid #22c55e}
        #feedback.bad{background:rgba(239,68,68,0.2);border:2px solid #ef4444}
        #feedback-text{color:#fff;font-size:14px;margin-bottom:12px}
        .next-btn{padding:10px 25px;background:#3b82f6;color:#fff;border:none;border-radius:20px;cursor:pointer;font-weight:bold}
        #result{display:none;text-align:center;padding:40px}
        #result.show{display:block}
        #result h1{font-size:32px;margin-bottom:18px}
        #result p{color:#93c5fd;font-size:15px;margin:8px 0}
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
    <div id="day-indicator"><div id="day-title"></div><div id="day-desc"></div></div>
    <div id="scenario">
        <div id="scenario-text"></div>
        <div id="choices"></div>
        <div id="feedback"><div id="feedback-text"></div><button class="next-btn" onclick="nextScenario()" id="next-btn">Next →</button></div>
    </div>
    <div id="result"><h1 id="result-title">🏆</h1><p id="result-healing"></p><p id="result-confidence"></p><button class="next-btn" onclick="location.reload()">🔄 Play Again</button></div>
</div>
<script>
let lang='is',scenario=0;
let stats={healing:100,confidence:50,implant:100,embarrass:0};

const T={
    is:{
        labels:{healing:'Græðsla',confidence:'Sjálfstraust',implant:'Ípplantaheilsa',embarrass:'Vandræði'},
        days:['Dagur 1: Vínsmökkun','Dagur 2: Veitingastaður','Dagur 3: Skoðunarferð'],
        dayDescs:['Fyrsti dagurinn eftir aðgerð í Búdapest','Kvöldmatur á fínum veitingastað','Síðasti dagurinn - ferðast um borgina'],
        nextBtn:'Næsta →',
        scenarios:[
            {text:'Þú ert á vínsmökkun. Þjónninn býður þér rauðvín. Þú ert með bráðabirgðatennur.',choices:[
                {text:'Þiggja vínið og reyna að drekka eðlilega',safe:false,effect:{healing:-20,confidence:10,embarrass:15},feedback:'Vínið rann niður hökunni! Allir horfðu.'},
                {text:'Biðja um vatn og útskýra aðstæðurnar',safe:true,effect:{healing:5,confidence:15},feedback:'Snjallt val! Þjónninn skildi.'},
                {text:'Þiggja vínið en drekka smáum sopa',safe:true,effect:{healing:-5,confidence:10},feedback:'Þetta gekk með varfærni.'}
            ]},
            {text:'Framrétturinn er heit gulrótarsúpa.',choices:[
                {text:'Borða súpuna strax',safe:false,effect:{implant:-15,healing:-10},feedback:'Æææ! Heita súpan olli sársauka!'},
                {text:'Bíða þar til hún kólnar',safe:true,effect:{healing:5,confidence:5},feedback:'Þolinmæði borgar sig.'},
                {text:'Biðja um kalt vatn til að kæla',safe:true,effect:{confidence:10},feedback:'Sniðug lausn!'}
            ]},
            {text:'Þú þarft að tala við þjóninn. Gestir horfa á þig.',choices:[
                {text:'Tala eðlilega og reyna að brosa',safe:false,effect:{embarrass:20,confidence:-10},feedback:'Brosið var skrýtið án tanna. Gestir horfðu.'},
                {text:'Nota handahreyfingar og benda',safe:true,effect:{confidence:5},feedback:'Enginn tók eftir neinu!'},
                {text:'Skrifa pöntunina á símann',safe:true,effect:{confidence:15},feedback:'Frábær hugmynd!'}
            ]},
            {text:'Leiðsögumaður býður öllum gullas (lángos).',choices:[
                {text:'Borða gullasinn eins og aðrir',safe:false,effect:{implant:-20,healing:-15,embarrass:25},feedback:'Gullasinn festist í tönnum! Vandræðalegt!'},
                {text:'Hafna kurteislega',safe:true,effect:{confidence:10},feedback:'Ekkert mál. Enginn spurði frekar.'},
                {text:'Taka gullas og borða seinna í litlum bitum',safe:true,effect:{healing:-5,confidence:5},feedback:'Gekk með varfærni.'}
            ]}
        ],
        win:'🏆 Vel gert!',lose:'😅 Þetta hefði getað farið betur',healingResult:'Græðsla:',confidenceResult:'Sjálfstraust:'
    },
    hu:{
        labels:{healing:'Gyógyulás',confidence:'Önbizalom',implant:'Implant Állapot',embarrass:'Kínosság'},
        days:['1. Nap: Borkóstoló','2. Nap: Étterem','3. Nap: Városnézés'],
        dayDescs:['Az első nap a műtét után Budapesten','Vacsora egy elegáns étteremben','Az utolsó nap - városnézés'],
        nextBtn:'Következő →',
        scenarios:[
            {text:'Borkóstolón vagy. A pincér vörösbort kínál. Ideiglenes fogaid vannak.',choices:[
                {text:'Elfogadod és megpróbálsz normálisan inni',safe:false,effect:{healing:-20,confidence:10,embarrass:15},feedback:'A bor lefolyt az álladon! Mindenki nézett.'},
                {text:'Vizet kérsz és elmagyarázod a helyzetet',safe:true,effect:{healing:5,confidence:15},feedback:'Okos választás! A pincér megértette.'},
                {text:'Elfogadod de kis kortyokban iszol',safe:true,effect:{healing:-5,confidence:10},feedback:'Óvatossággal jól ment.'}
            ]},
            {text:'Az előétel forró sárgarépa krémleves.',choices:[
                {text:'Azonnal megeszed',safe:false,effect:{implant:-15,healing:-10},feedback:'Aúú! A forró leves fájdalmat okozott!'},
                {text:'Megvárod amíg kihűl',safe:true,effect:{healing:5,confidence:5},feedback:'A türelem kifizetődik.'},
                {text:'Hideg vizet kérsz hogy lehűtsd',safe:true,effect:{confidence:10},feedback:'Ügyes megoldás!'}
            ]},
            {text:'Beszélned kell a pincérrel. Vendégek néznek rád.',choices:[
                {text:'Normálisan beszélsz és mosolyogsz',safe:false,effect:{embarrass:20,confidence:-10},feedback:'A mosoly furcsa volt. A vendégek bámultak.'},
                {text:'Kézmozdulatokat használsz',safe:true,effect:{confidence:5},feedback:'Senki nem vett észre semmit!'},
                {text:'Leírod a telefonodon',safe:true,effect:{confidence:15},feedback:'Remek ötlet!'}
            ]},
            {text:'Az idegenvezető lángost kínál mindenkinek.',choices:[
                {text:'Megeszed mint a többiek',safe:false,effect:{implant:-20,healing:-15,embarrass:25},feedback:'A lángos beragadt a fogakba! Kínos!'},
                {text:'Udvariasan visszautasítod',safe:true,effect:{confidence:10},feedback:'Senki nem kérdezett tovább.'},
                {text:'Elviszed és később kis falatokban eszed',safe:true,effect:{healing:-5,confidence:5},feedback:'Óvatossággal sikerült.'}
            ]}
        ],
        win:'🏆 Szép munka!',lose:'😅 Ez jobban is mehetett volna',healingResult:'Gyógyulás:',confidenceResult:'Önbizalom:'
    }
};

function setLang(l){
    lang=l;
    document.querySelectorAll('.lang-btn').forEach((b,i)=>b.classList.toggle('active',(i===0&&l==='is')||(i===1&&l==='hu')));
    updateUI();showScenario();
}

function updateUI(){
    const L=T[lang];
    document.getElementById('lbl-healing').textContent=L.labels.healing;
    document.getElementById('lbl-confidence').textContent=L.labels.confidence;
    document.getElementById('lbl-implant').textContent=L.labels.implant;
    document.getElementById('lbl-embarrass').textContent=L.labels.embarrass;
    document.getElementById('next-btn').textContent=L.nextBtn;
}

function updateStats(){
    document.getElementById('healing').textContent=Math.max(0,Math.min(100,stats.healing));
    document.getElementById('confidence').textContent=Math.max(0,Math.min(100,stats.confidence));
    document.getElementById('implant').textContent=Math.max(0,Math.min(100,stats.implant));
    document.getElementById('embarrass').textContent=Math.max(0,stats.embarrass);
}

function showScenario(){
    const L=T[lang];
    const dayIdx=Math.floor(scenario/1.5);
    document.getElementById('day-title').textContent=L.days[Math.min(dayIdx,2)];
    document.getElementById('day-desc').textContent=L.dayDescs[Math.min(dayIdx,2)];
    
    if(scenario>=L.scenarios.length){endGame();return;}
    
    const s=L.scenarios[scenario];
    document.getElementById('scenario-text').textContent=s.text;
    
    const div=document.getElementById('choices');
    div.innerHTML='';
    s.choices.forEach((c,i)=>{
        const btn=document.createElement('button');
        btn.className='choice-btn '+(c.safe?'safe':'danger');
        btn.textContent=c.text;
        btn.onclick=()=>makeChoice(i);
        div.appendChild(btn);
    });
    document.getElementById('feedback').classList.remove('show');
}

function makeChoice(idx){
    const L=T[lang];
    const s=L.scenarios[scenario];
    const c=s.choices[idx];
    
    if(c.effect.healing)stats.healing+=c.effect.healing;
    if(c.effect.confidence)stats.confidence+=c.effect.confidence;
    if(c.effect.implant)stats.implant+=c.effect.implant;
    if(c.effect.embarrass)stats.embarrass+=c.effect.embarrass;
    updateStats();
    
    const fb=document.getElementById('feedback');
    fb.className='show '+(c.safe?'good':'bad');
    document.getElementById('feedback-text').textContent=c.feedback;
    document.getElementById('choices').innerHTML='';
}

function nextScenario(){scenario++;showScenario();}

function endGame(){
    const L=T[lang];
    document.getElementById('scenario').style.display='none';
    const r=document.getElementById('result');
    r.classList.add('show');
    const won=stats.healing>=50&&stats.implant>=50;
    document.getElementById('result-title').textContent=won?L.win:L.lose;
    document.getElementById('result-healing').textContent=L.healingResult+' '+stats.healing+'%';
    document.getElementById('result-confidence').textContent=L.confidenceResult+' '+stats.confidence+'%';
}

updateUI();updateStats();showScenario();
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
        #header{display:flex;justify-content:space-between;align-items:center;width:100%;max-width:500px;margin-bottom:20px}
        #title{font-size:14px;color:#9333ea;text-shadow:2px 2px 0 #581c87}
        #lang-bar{display:flex;gap:5px}
        .lang-btn{padding:5px 10px;font-family:'Press Start 2P',monospace;font-size:8px;border:2px solid #9333ea;background:#1a0a2e;color:#c084fc;cursor:pointer}
        .lang-btn.active{background:#9333ea;color:#fff}
        #back-btn{font-family:'Press Start 2P',monospace;font-size:8px;padding:8px 12px;background:#9333ea;color:#fff;text-decoration:none;border:none}
        #game-area{background:#1a0a2e;border:4px solid #9333ea;padding:20px}
        #hud{display:flex;justify-content:space-between;margin-bottom:15px;font-size:9px;color:#c084fc}
        #grid{display:grid;grid-template-columns:repeat(10,38px);gap:2px;margin-bottom:15px}
        .cell{width:38px;height:38px;background:#2d1a4a;border:2px solid #4c1d95;display:flex;align-items:center;justify-content:center;font-size:18px;cursor:pointer;transition:all 0.1s}
        .cell:hover{background:#4c1d95;transform:scale(1.05)}
        .cell.tooth{background:#f0abfc}
        .cell.removed{background:#581c87}
        .cell.implant{background:#c084fc}
        #tools{display:flex;gap:6px;justify-content:center;margin-bottom:12px}
        .tool-btn{padding:8px 12px;font-family:'Press Start 2P',monospace;font-size:7px;border:2px solid #9333ea;background:#2d1a4a;color:#c084fc;cursor:pointer}
        .tool-btn:hover{background:#4c1d95}
        .tool-btn.active{background:#9333ea;color:#fff}
        #instructions{font-size:7px;color:#a855f7;text-align:center;line-height:1.8}
        #result{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(15,10,26,0.95);flex-direction:column;align-items:center;justify-content:center}
        #result.show{display:flex}
        #result h1{font-size:20px;color:#9333ea;margin-bottom:20px}
        #result p{font-size:9px;color:#c084fc;margin:8px 0}
        .restart-btn{margin-top:20px;padding:12px 25px;font-family:'Press Start 2P',monospace;font-size:9px;background:#9333ea;color:#fff;border:none;cursor:pointer}
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
let lang='is',tool=0,score=0,teethLeft=20,implants=0;
let cells=[];

const T={
    is:{score:'STIG:',teeth:'TENNUR:',impl:'ÍPP:',tools:['🔷 BORA [1]','🔨 TANG [2]','🔩 ÍPP [3]'],instructions:'SMELLA | BORA VEIKIR | TANG FJARLÆGIR | ÍPPLANT SETUR',win:'🏆 SIGUR!',resultScore:'STIG:',resultImpl:'ÍPPLANTAR:'},
    hu:{score:'PONT:',teeth:'FOGAK:',impl:'IMP:',tools:['🔷 FÚRÓ [1]','🔨 FOGÓ [2]','🔩 IMP [3]'],instructions:'KATTINTS | FÚRÓ GYENGÍT | FOGÓ ELTÁVOLÍT | IMPLANT BERAK',win:'🏆 GYŐZELEM!',resultScore:'PONT:',resultImpl:'IMPLANTOK:'}
};

function setLang(l){
    lang=l;
    document.querySelectorAll('.lang-btn').forEach((b,i)=>b.classList.toggle('active',(i===0&&l==='is')||(i===1&&l==='hu')));
    updateUI();
}

function updateUI(){
    const L=T[lang];
    document.getElementById('score-lbl').innerHTML=L.score+' <span id="score">'+score+'</span>';
    document.getElementById('teeth-lbl').innerHTML=L.teeth+' <span id="teeth-left">'+teethLeft+'</span>';
    document.getElementById('impl-lbl').innerHTML=L.impl+' <span id="impl-count">'+implants+'</span>';
    L.tools.forEach((t,i)=>document.getElementById('tb'+i).textContent=t);
    document.getElementById('instructions').textContent=L.instructions;
}

function setTool(t){
    tool=t;
    document.querySelectorAll('.tool-btn').forEach((b,i)=>b.classList.toggle('active',i===t));
}

function initGrid(){
    const grid=document.getElementById('grid');
    grid.innerHTML='';cells=[];
    for(let row=0;row<10;row++){
        for(let col=0;col<10;col++){
            const cell=document.createElement('div');
            cell.className='cell';
            const hasTooth=(row===1||row===2||row===7||row===8)&&col>=1&&col<=8;
            const data={el:cell,hasTooth,hp:hasTooth?100:0,removed:false,implant:false};
            cells.push(data);
            if(hasTooth){cell.classList.add('tooth');cell.textContent='🦷';}
            cell.onclick=()=>clickCell(data);
            grid.appendChild(cell);
        }
    }
}

function clickCell(c){
    if(!c.hasTooth)return;
    if(!c.removed){
        if(tool===0){c.hp-=40;score+=5;c.el.style.opacity=c.hp/100;}
        else if(tool===1&&c.hp<=50){c.removed=true;c.el.classList.remove('tooth');c.el.classList.add('removed');c.el.textContent='⭕';teethLeft--;score+=20;}
    }else if(c.removed&&!c.implant&&tool===2){
        c.implant=true;c.el.classList.add('implant');c.el.textContent='🔩';implants++;score+=50;
        if(implants>=4&&teethLeft<=16)endGame();
    }
    updateUI();
}

function endGame(){
    const L=T[lang];
    document.getElementById('result-title').textContent=L.win;
    document.getElementById('result-score').textContent=L.resultScore+' '+score;
    document.getElementById('result-impl').textContent=L.resultImpl+' '+implants;
    document.getElementById('result').classList.add('show');
}

document.addEventListener('keydown',e=>{
    if(e.key==='1')setTool(0);
    if(e.key==='2')setTool(1);
    if(e.key==='3')setTool(2);
});

initGrid();updateUI();
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
                return new Response(JSON.stringify({ status: 'ok', games: 4, version: '2.1' }), {
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
                });
            default:
                return new Response(\`<!DOCTYPE html><html><head><meta charset="UTF-8"><meta http-equiv="refresh" content="2;url=/"><title>404</title><style>body{background:#022c22;color:#10b981;font-family:Arial;display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column}h1{font-size:48px;margin-bottom:20px}p{color:#a7f3d0}</style></head><body><h1>404</h1><p>Redirecting to portal...</p></body></html>\`, { status: 404, headers });
        }
    }
};
