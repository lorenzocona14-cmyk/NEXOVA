// ─── LOGO SVG ───
const LOGO_SVG = `
<svg class="logo-mark" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="40" rx="9" fill="#0d0d0d"/>
  <rect width="40" height="40" rx="9" stroke="#00ff9d" stroke-width="1" stroke-opacity="0.3"/>
  <path d="M20 4 L22.2 17.8 L36 20 L22.2 22.2 L20 36 L17.8 22.2 L4 20 L17.8 17.8 Z" fill="#00ff9d"/>
  <path d="M20 13 L21.4 18.6 L27 20 L21.4 21.4 L20 27 L18.6 21.4 L13 20 L18.6 18.6 Z" fill="white" opacity="0.9"/>
  <circle cx="20" cy="20" r="2" fill="#00ff9d"/>
  <circle cx="20" cy="5.5" r="1" fill="#00ff9d" opacity="0.5"/>
  <circle cx="34.5" cy="20" r="1" fill="#00ff9d" opacity="0.5"/>
  <circle cx="20" cy="34.5" r="1" fill="#00ff9d" opacity="0.5"/>
  <circle cx="5.5" cy="20" r="1" fill="#00ff9d" opacity="0.5"/>
</svg>`;

// ─── INJECT NAV ───
function injectNav(activePage) {
  const pages = [
    { href: 'servicios.html',    label: 'Servicios' },
    { href: 'calculadora.html',  label: '💸 ¿Cuánto perdés?' },
    { href: 'configurador.html', label: '🧩 Armá tu pack' },
    { href: 'proceso.html',      label: 'Proceso' },
    { href: 'nosotros.html',     label: 'Nosotros' },
  ];

  const links = pages.map(p =>
    `<li><a href="${p.href}" class="${p.href === activePage ? 'active' : ''}">${p.label}</a></li>`
  ).join('');

  const mobileLinks = pages.map(p =>
    `<a href="${p.href}" class="${p.href === activePage ? 'orange' : ''}">${p.label}</a>`
  ).join('');

  document.getElementById('nav-placeholder').innerHTML = `
  <nav>
    <a href="index.html" class="logo">
      ${LOGO_SVG}
      <span class="logo-text">NEX<span>OVA</span></span>
    </a>
    <ul class="nav-links">${links}
      <li><a href="https://wa.me/+542612079647" target="_blank" class="btn-nav">Hablemos →</a></li>
    </ul>
    <button id="menu-btn" onclick="toggleMenu()">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2">
        <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </button>
  </nav>
  <div id="mobile-menu">
    ${mobileLinks}
    <a href="https://wa.me/+542612079647" target="_blank" class="btn-nav-mob">Hablemos →</a>
  </div>`;

  window.addEventListener('scroll', () => {
    document.querySelector('nav').style.boxShadow =
      window.scrollY > 20 ? '0 4px 30px rgba(0,0,0,0.4)' : 'none';
  });
}

// ─── INJECT FOOTER ───
function injectFooter() {
  document.getElementById('footer-placeholder').innerHTML = `
  <footer>
    <div class="footer-inner">
      <a href="index.html" class="logo">
        ${LOGO_SVG}
        <span class="logo-text">NEX<span>OVA</span></span>
      </a>
      <ul class="footer-links">
        <li><a href="servicios.html">Servicios</a></li>
        <li><a href="calculadora.html">Calculadora ROI</a></li>
        <li><a href="configurador.html">Configurador</a></li>
        <li><a href="proceso.html">Proceso</a></li>
        <li><a href="nosotros.html">Nosotros</a></li>
      </ul>
      <p class="footer-copy">© 2026 NEXOVA — Mendoza, Argentina</p>
    </div>
  </footer>`;
}

// ─── TICKER ───
function injectTicker() {
  const items = ['LANDING PAGE','WEB INSTITUCIONAL','E-COMMERCE','BOT WHATSAPP','AUTOMATIZACIÓN CON IA','AGENDAMIENTO DE TURNOS','MANTENIMIENTO MENSUAL'];
  const repeated = [...items, ...items].map(i => `${i} <span class="ticker-sep">✦</span>`).join(' ');
  const el = document.getElementById('ticker-placeholder');
  if (el) el.innerHTML = `<div class="ticker-wrap"><div class="ticker-inner">${repeated}&nbsp;${repeated}</div></div>`;
}

// ─── MOBILE MENU ───
function toggleMenu() {
  const m = document.getElementById('mobile-menu');
  m.style.display = m.style.display === 'flex' ? 'none' : 'flex';
}

// ─── SCROLL REVEAL ───
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ─── TABS (servicios) ───
function switchTab(tab, event) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  event.target.classList.add('active');
  const panel = document.getElementById('tab-' + tab);
  panel.classList.add('active');
  panel.querySelectorAll('.reveal').forEach(el => {
    el.classList.remove('visible');
    setTimeout(() => el.classList.add('visible'), 50);
  });
}

// ─── HERO DEMO COMPONENT ───
let demoChatStarted = false;

function switchDemoTab(tab, event) {
  document.querySelectorAll('.demo-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.demo-panel').forEach(p => p.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('demo-' + tab).classList.add('active');
  
  if (tab === 'chatbot' && !demoChatStarted) {
    startDemoChat();
  }
}

function startDemoChat() {
  demoChatStarted = true;
  const chatBody = document.getElementById('demo-chat-body');
  if (!chatBody) return;
  chatBody.innerHTML = '';
  
  const conversation = [
    { sender: 'client', text: 'Hola, quiero más información sobre sus servicios.', delay: 500 },
    { sender: 'ia', text: '¡Hola! Te ayudo. ¿Buscas una página web o una automatización?', delay: 2000 },
    { sender: 'client', text: 'Una automatización para mi negocio.', delay: 4000 },
    { sender: 'ia', text: 'Perfecto. Podemos automatizar atención al cliente, reservas y seguimiento de clientes automáticamente.', delay: 6000 },
    { sender: 'client', text: 'Suena interesante.', delay: 9000 },
    { sender: 'ia', text: 'Excelente. Podemos mostrarte una demo personalizada para tu negocio.', delay: 11000 }
  ];

  let typingIndicator = document.createElement('div');
  typingIndicator.className = 'chat-typing';
  typingIndicator.innerHTML = '<span></span><span></span><span></span>';

  conversation.forEach((msg, index) => {
    if (msg.sender === 'ia') {
      setTimeout(() => {
        chatBody.appendChild(typingIndicator);
        chatBody.scrollTop = chatBody.scrollHeight;
      }, msg.delay - 1000);
    }

    setTimeout(() => {
      if (msg.sender === 'ia' && typingIndicator.parentNode === chatBody) {
        chatBody.removeChild(typingIndicator);
      }
      
      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-msg ${msg.sender}`;
      msgDiv.textContent = msg.text;
      chatBody.appendChild(msgDiv);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, msg.delay);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (document.getElementById('demo-chat-body') && !demoChatStarted) {
      startDemoChat();
    }
  }, 1000);
});
