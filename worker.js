// Cloudflare Worker for MADENTA All-on-4 Game
// Serves the bilingual HTML game at madenta.2076.is

const HTML_CONTENT = `<!DOCTYPE html>
<html lang="is">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>MADENTA: All-on-4 Élmény / Reynsla</title>
    <meta name="description" content="Tapasztald meg az All-on-4 fogbeültetési műtétet játékformában / Upplifðu All-on-4 tannplantaaðgerðina í leikjaformi">
    <meta property="og:title" content="MADENTA: All-on-4 Játék / Leikur">
    <meta property="og:description" content="Oktató játék / Fræðandi leikur - Dr. Dávid Farkas">
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
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            background: rgba(255,255,255,0.15); backdrop-filter: blur(10px);
            border-radius: 12px; border: 1px solid rgba(255,255,255,0.3);
        }
        #top-left { top: 15px; left: 15px; }
        #top-right { top: 15px; right: 15px; text-align: right; }
        .stat-label { font-size: 11px; color: #064e3b; text-transform: uppercase; font-weight: 700; letter-spacing: 1.5px; margin-bottom: 5px; }
        .stat-val { font-size: 28px; font-weight: 900; margin-bottom: 8px; color: #065f46; }
        .bar-container {
            width: 240px; height: 14px; background: rgba(0,0,0,0.2);
            margin-bottom: 10px; border-radius: 10px; overflow: hidden;
            border: 2px solid rgba(255,255,255,0.4);
        }
        .bar-fill { height: 100%; transition: width 0.3s ease; border-radius: 8px; }
        #success-fill { background: linear-gradient(90deg, #10b981, #059669); width: 100%; box-shadow: 0 0 10px rgba(16, 185, 129, 0.5); }
        #time-fill { background: linear-gradient(90deg, #3b82f6, #2563eb); width: 100%; box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
        .lang-btn { padding: 8px 16px; border: none; background: transparent; color: #065f46; font-weight: 700; cursor: pointer; border-radius: 20px; transition: all 0.2s; font-size: 14px; }
        .lang-btn.active { background: #10b981; color: white; }
        h1 { font-size: 48px; margin: 0 0 15px 0; color: #d1fae5; text-shadow: 3px 3px 6px rgba(0,0,0,0.4); }
        .btn-primary {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white; border: none; padding: 18px 60px; font-size: 22px;
            font-family: inherit; font-weight: 800; cursor: pointer; margin-top: 35px;
            border-radius: 50px; box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4);
            transition: all 0.2s; text-transform: uppercase; letter-spacing: 1px;
        }
        .btn-primary:hover { transform: scale(1.05); }
        #overlay {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(135deg, rgba(6, 78, 59, 0.97), rgba(6, 95, 70, 0.97));
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            text-align: center; z-index: 100; padding: 30px;
        }
        .hidden { display: none !important; }
    </style>
</head>
<body>
    <div id="game-wrapper">
        <canvas id="gameCanvas" width="900" height="650"></canvas>
        <div style="position: absolute; top: 20px; left: 20px; display: flex; gap: 5px; background: rgba(255,255,255,0.9); border: 2px solid #10b981; border-radius: 25px; padding: 5px; z-index: 10;">
            <button class="lang-btn active" onclick="setLang('is')">🇮🇸</button>
            <button class="lang-btn" onclick="setLang('hu')">🇭🇺</button>
        </div>
        <div id="overlay">
            <h1 id="title">MADENTA: All-on-4 Reynslan</h1>
            <p style="font-size: 18px; color: #a7f3d0; margin-bottom: 25px;" id="subtitle">Fræðandi leikur um tannplantaaðgerðir</p>
            <div style="max-width: 600px; background: rgba(255,255,255,0.1); padding: 30px; border-radius: 16px;">
                <p style="line-height: 1.8;" id="desc">Spilaðu sem Dr. Dávid Farkas og framkvæmdu All-on-4® aðgerðina!<br><br>
                <b style="color: #6ee7b7;">Markmið:</b> Fjarlægja 28 tennur og setja títanímpplantur.</p>
            </div>
            <button class="btn-primary" onclick="startGame()">HEFJA AÐGERÐ</button>
            <div style="margin-top: 20px; font-size: 12px; color: rgba(255,255,255,0.7);">
                Með Dr. Dávid Farkas | <a href="https://madenta.is" target="_blank" style="color: #6ee7b7;">madenta.is</a>
            </div>
        </div>
    </div>
<script>
const LANG = {
    is: { title: "MADENTA: All-on-4 Reynslan", subtitle: "Fræðandi leikur um tannplantaaðgerðir", desc: "Spilaðu sem Dr. Dávid Farkas og framkvæmdu All-on-4® aðgerðina!<br><br><b style='color: #6ee7b7;'>Markmið:</b> Fjarlægja 28 tennur og setja títanímpplantur.", btn: "HEFJA AÐGERÐ" },
    hu: { title: "MADENTA: All-on-4 Élmény", subtitle: "Oktató játék a fogbeültetésről", desc: "Játssz Dr. Dávid Farkasként és végezd el az All-on-4® műtétet!<br><br><b style='color: #6ee7b7;'>Cél:</b> Mind a 28 fog eltávolítása és implantátumok behelyezése.", btn: "MŰTÉT INDÍTÁSA" }
};
let lang = 'is';
function setLang(l) {
    lang = l;
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.innerText.includes(l.toUpperCase())));
    document.getElementById('title').innerText = LANG[l].title;
    document.getElementById('subtitle').innerText = LANG[l].subtitle;
    document.getElementById('desc').innerHTML = LANG[l].desc;
    document.querySelector('.btn-primary').innerText = LANG[l].btn;
}
function startGame() {
    document.getElementById('overlay').classList.add('hidden');
    alert(lang === 'is' ? 'Leikur kemur fljótlega!' : 'A játék hamarosan érkezik!');
}
</script>
</body>
</html>`;

export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // Route handling
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(HTML_CONTENT, {
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          'Cache-Control': 'public, max-age=3600',
          'X-Powered-By': '2076 ehf',
        },
      });
    }
    
    // 404 for other routes
    return new Response('Not Found', { status: 404 });
  },
};
