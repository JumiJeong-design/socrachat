/* =========================================================
   SocraChat — shared shell helpers
   Controls: design picker · lang · viewport · theme
   Toolbar: fixed floating, draggable, z-index 9999
   Events dispatched: sc:lang, sc:theme, sc:design, sc:vp
   ========================================================= */

(function () {
  const TLBR_ID = '__sc-toolbar';
  const root = document.documentElement;

  const DESIGNS = [
    { value: 'sc',     label: 'SC — SocraChat'  },
    { value: 'apple',  label: 'AP — Apple HIG'  },
    { value: 'notion', label: 'NT — Notion'      },
  ];

  function dispatch(type, detail) {
    document.dispatchEvent(new CustomEvent(type, { detail }));
  }

  // --- THEME ---
  function applyTheme(name) {
    root.setAttribute('data-theme', name);
    localStorage.setItem('sc-theme', name);
    dispatch('sc:theme', { theme: name });
    paintToolbar();
  }
  function getTheme() { return localStorage.getItem('sc-theme') || 'light'; }

  // --- DESIGN ---
  function applyDesign(name) {
    if (name === 'sc' || !name) {
      root.removeAttribute('data-design');
    } else {
      root.setAttribute('data-design', name);
    }
    localStorage.setItem('sc-design', name);
    dispatch('sc:design', { design: name });
    paintToolbar();
  }
  function getDesign() { return localStorage.getItem('sc-design') || 'sc'; }

  // --- LANG ---
  function applyLang(lang) {
    root.setAttribute('data-lang', lang);
    localStorage.setItem('sc-lang', lang);
    const dict = (window.__SC_I18N || {})[lang] || {};
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = dict[key];
      if (val == null) return;
      if (el.hasAttribute('data-i18n-attr')) {
        el.setAttribute(el.getAttribute('data-i18n-attr'), val);
      } else if (el.tagName === 'INPUT') {
        el.setAttribute('placeholder', val);
      } else if (el.tagName === 'TEXTAREA') {
        el.value = val;
      } else {
        el.innerHTML = val;
      }
    });
    document.querySelectorAll('[data-i18n-content]').forEach((el) => {
      const key = el.getAttribute('data-i18n-content');
      const val = dict[key];
      if (val == null) return;
      if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
        el.value = val;
      } else {
        el.innerHTML = val;
      }
    });
    dispatch('sc:lang', { lang });
    paintToolbar();
  }
  function getLang() { return localStorage.getItem('sc-lang') || 'ja'; }

  // --- VIEWPORT ---
  function applyViewport(vp) {
    document.body.setAttribute('data-vp', vp);
    localStorage.setItem('sc-vp', vp);
    dispatch('sc:vp', { vp });
    paintToolbar();
  }
  function getViewport() { return localStorage.getItem('sc-vp') || 'desktop'; }

  function paintToolbar() {
    const tb = document.getElementById(TLBR_ID);
    if (!tb) return;
    const theme  = getTheme();
    const lang   = getLang();
    const design = getDesign();
    const vp     = getViewport();

    const sel = tb.querySelector('.design-select');
    if (sel) sel.value = design;

    tb.querySelectorAll('[data-lang-btn]').forEach(b => {
      b.classList.toggle('active', b.dataset.langBtn === lang);
    });

    tb.querySelectorAll('[data-vp-btn]').forEach(b => {
      b.classList.toggle('active', b.dataset.vpBtn === vp);
    });

    const ti = tb.querySelector('.theme-icon');
    if (ti) ti.innerHTML = theme === 'dark'
      ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
      : '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>';
  }

  function injectViewportCSS() {
    if (document.getElementById('__sc-vp-style')) return;
    if (document.querySelector('.stage')) return; // flow.html manages its own
    const s = document.createElement('style');
    s.id = '__sc-vp-style';
    s.textContent = `
      body[data-vp="mobile"] {
        width: 390px !important;
        max-width: 390px !important;
        margin-left: auto !important;
        margin-right: auto !important;
        border-left: 1px solid var(--line, rgba(0,0,0,.1)) !important;
        border-right: 1px solid var(--line, rgba(0,0,0,.1)) !important;
        overflow-x: hidden !important;
      }
      body[data-vp="mobile"] .container {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
      body[data-vp="mobile"] nav .links a:not(.cta) { display: none !important; }
      body[data-vp="mobile"] .pillars,
      body[data-vp="mobile"] .steps,
      body[data-vp="mobile"] .pv-opts,
      body[data-vp="mobile"] .layout,
      body[data-vp="mobile"] .board,
      body[data-vp="mobile"] .cards,
      body[data-vp="mobile"] .grid {
        grid-template-columns: 1fr !important;
      }
      body[data-vp="mobile"] .hero { padding-top: 30px !important; padding-bottom: 50px !important; }
      body[data-vp="mobile"] .features,
      body[data-vp="mobile"] .how,
      body[data-vp="mobile"] .quote { padding-top: 70px !important; padding-bottom: 70px !important; }
      body[data-vp="mobile"] .sb-nav { display: none !important; }
      body[data-vp="mobile"] .sb-content { padding: 32px 20px 80px !important; }
      body[data-vp="mobile"] .side { position: static !important; }
      body[data-vp="desktop"] {
        width: auto !important;
        max-width: none !important;
        border-left: 0 !important;
        border-right: 0 !important;
      }
    `;
    document.head.appendChild(s);
  }

  function injectStyles() {
    if (document.getElementById('__sc-tb-style')) return;
    const s = document.createElement('style');
    s.id = '__sc-tb-style';
    s.textContent = `
      #${TLBR_ID} {
        position: fixed; top: 14px; right: 16px; z-index: 9999;
        display: flex; align-items: center; gap: 4px;
        background: var(--surface, #fff);
        border: 1px solid var(--line, rgba(0,0,0,.12));
        border-radius: 999px;
        padding: 3px;
        box-shadow: 0 2px 16px rgba(0,0,0,.14), 0 0 0 .5px rgba(0,0,0,.06);
        font-family: var(--font-ui, system-ui, -apple-system, sans-serif);
        cursor: grab;
        user-select: none;
        touch-action: none;
      }
      #${TLBR_ID}.dragging { cursor: grabbing; box-shadow: 0 6px 24px rgba(0,0,0,.20); }
      #${TLBR_ID} .design-select {
        appearance: none;
        background: var(--bg-sunken, #f0f0f0);
        border: 0; outline: 0;
        border-radius: 999px;
        padding: 4px 22px 4px 10px;
        font-size: 11px; font-weight: 600;
        color: var(--fg-muted, #666);
        cursor: pointer;
        font-family: inherit;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23999' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 7px center;
      }
      #${TLBR_ID} .design-select:hover { color: var(--fg, #1a1a1a); }
      #${TLBR_ID} .tb-group {
        display: flex; align-items: center;
        background: var(--bg-sunken, #f0f0f0);
        border-radius: 999px;
        padding: 2px;
        gap: 1px;
      }
      #${TLBR_ID} [data-lang-btn], #${TLBR_ID} [data-vp-btn] {
        background: transparent; border: 0;
        padding: 4px 8px;
        font-size: 11px; font-weight: 600;
        color: var(--fg-subtle, #999);
        border-radius: 999px;
        letter-spacing: .03em;
        transition: all 150ms;
        cursor: pointer;
        line-height: 100%;
        display: inline-flex; align-items: center; justify-content: center;
      }
      #${TLBR_ID} [data-vp-btn] { width: 26px; height: 22px; padding: 0; }
      #${TLBR_ID} [data-vp-btn] svg {
        width: 13px; height: 13px;
        fill: none; stroke: currentColor;
        stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round;
        pointer-events: none;
      }
      #${TLBR_ID} [data-lang-btn]:hover, #${TLBR_ID} [data-vp-btn]:hover { color: var(--fg, #1a1a1a); }
      #${TLBR_ID} [data-lang-btn].active, #${TLBR_ID} [data-vp-btn].active {
        background: var(--surface, #fff);
        color: var(--accent, #2D5F4F);
        box-shadow: 0 1px 4px rgba(0,0,0,.10);
      }
      #${TLBR_ID} .theme-btn {
        background: transparent; border: 0;
        width: 28px; height: 28px;
        display: grid; place-items: center;
        border-radius: 999px; color: var(--fg-muted, #666);
        cursor: pointer; flex-shrink: 0;
      }
      #${TLBR_ID} .theme-btn:hover { background: var(--surface-hover, #f5f5f5); color: var(--fg, #1a1a1a); }
      #${TLBR_ID} .theme-btn svg {
        width: 14px; height: 14px;
        fill: none; stroke: currentColor;
        stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round;
        pointer-events: none;
      }
      #${TLBR_ID} .tb-div { width: 1px; height: 14px; background: var(--line, rgba(0,0,0,.1)); margin: 0 1px; flex-shrink: 0; }

      @media (max-width: 540px) {
        #${TLBR_ID} { top: auto !important; bottom: 12px; right: 12px; left: auto !important; }
      }
    `;
    document.head.appendChild(s);
  }

  function makeDraggable(tb) {
    let ox = 0, oy = 0, dragging = false;

    const saved = localStorage.getItem('sc-tb-pos');
    if (saved) {
      try {
        const { x, y } = JSON.parse(saved);
        const clampX = Math.max(0, Math.min(x, window.innerWidth - 60));
        const clampY = Math.max(0, Math.min(y, window.innerHeight - 40));
        tb.style.left   = clampX + 'px';
        tb.style.top    = clampY + 'px';
        tb.style.right  = 'auto';
        tb.style.bottom = 'auto';
      } catch(e) {}
    }

    tb.addEventListener('mousedown', e => {
      const tag = e.target.tagName;
      if (tag === 'BUTTON' || tag === 'SELECT' || tag === 'OPTION') return;
      dragging = true;
      tb.classList.add('dragging');
      const r = tb.getBoundingClientRect();
      ox = e.clientX - r.left;
      oy = e.clientY - r.top;
      e.preventDefault();
    });

    document.addEventListener('mousemove', e => {
      if (!dragging) return;
      const x = Math.max(0, Math.min(e.clientX - ox, window.innerWidth  - tb.offsetWidth));
      const y = Math.max(0, Math.min(e.clientY - oy, window.innerHeight - tb.offsetHeight));
      tb.style.left   = x + 'px';
      tb.style.top    = y + 'px';
      tb.style.right  = 'auto';
      tb.style.bottom = 'auto';
      localStorage.setItem('sc-tb-pos', JSON.stringify({ x, y }));
    });

    document.addEventListener('mouseup', () => {
      if (!dragging) return;
      dragging = false;
      tb.classList.remove('dragging');
    });
  }

  function injectToolbar() {
    if (document.getElementById(TLBR_ID)) return;
    try {
      if (window.frameElement && window.frameElement.dataset.scEmbed != null) return;
    } catch (e) {}
    injectStyles();
    injectViewportCSS();

    const optionsHTML = DESIGNS.map(d =>
      `<option value="${d.value}">${d.label}</option>`
    ).join('');

    const tb = document.createElement('div');
    tb.id = TLBR_ID;
    tb.innerHTML = `
      <select class="design-select" title="Design system">${optionsHTML}</select>
      <div class="tb-div"></div>
      <div class="tb-group">
        <button data-lang-btn="ko" title="한국어">KO</button>
        <button data-lang-btn="ja" title="日本語">JA</button>
        <button data-lang-btn="en" title="English">EN</button>
      </div>
      <div class="tb-div"></div>
      <div class="tb-group">
        <button data-vp-btn="desktop" title="Desktop">
          <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
        </button>
        <button data-vp-btn="mobile" title="Mobile">
          <svg viewBox="0 0 24 24"><rect x="7" y="2" width="10" height="20" rx="2"/><circle cx="12" cy="18.5" r="1" fill="currentColor" stroke="none"/></svg>
        </button>
      </div>
      <div class="tb-div"></div>
      <button class="theme-btn" title="Light / Dark">
        <svg class="theme-icon" viewBox="0 0 24 24"></svg>
      </button>
    `;
    document.body.appendChild(tb);

    tb.querySelector('.design-select').addEventListener('change', e => applyDesign(e.target.value));
    tb.querySelectorAll('[data-lang-btn]').forEach(b => b.addEventListener('click', () => applyLang(b.dataset.langBtn)));
    tb.querySelectorAll('[data-vp-btn]').forEach(b => b.addEventListener('click', () => applyViewport(b.dataset.vpBtn)));
    tb.querySelector('.theme-btn').addEventListener('click', () => applyTheme(getTheme() === 'light' ? 'dark' : 'light'));

    makeDraggable(tb);
  }

  function init() {
    applyTheme(getTheme());
    applyDesign(getDesign());
    applyLang(getLang());
    applyViewport(getViewport());
    if (new URLSearchParams(location.search).get('figma') !== '1') {
      injectToolbar();
      paintToolbar();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.__SC = { applyTheme, applyDesign, applyLang, applyViewport, getTheme, getDesign, getLang, getViewport };
})();
