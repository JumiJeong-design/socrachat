/* =========================================================
   SocraChat — shared shell helpers
   - i18n: KR / EN / JA switcher (data-i18n attrs + dict per page)
   - theme: light / dark switcher
   - top-right floating toolbar
   ========================================================= */

(function () {
  const TLBR_ID = '__sc-toolbar';
  const root = document.documentElement;

  // --- THEME ---
  function applyTheme(name) {
    root.setAttribute('data-theme', name);
    localStorage.setItem('sc-theme', name);
    paintToolbar();
  }
  function getTheme() { return localStorage.getItem('sc-theme') || 'light'; }

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
      } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.setAttribute('placeholder', val);
      } else {
        el.innerHTML = val;
      }
    });
    paintToolbar();
  }
  function getLang() { return localStorage.getItem('sc-lang') || 'ja'; }

  function paintToolbar() {
    const tb = document.getElementById(TLBR_ID);
    if (!tb) return;
    const theme = getTheme();
    const lang = getLang();
    tb.querySelectorAll('[data-lang-btn]').forEach(b => {
      b.classList.toggle('active', b.dataset.langBtn === lang);
    });
    const ti = tb.querySelector('.theme-icon');
    if (ti) ti.innerHTML = theme === 'dark'
      ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
      : '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>';
  }

  function injectStyles() {
    if (document.getElementById('__sc-tb-style')) return;
    const s = document.createElement('style');
    s.id = '__sc-tb-style';
    s.textContent = `
      #${TLBR_ID} {
        position: fixed; top: 14px; right: 16px; z-index: 999;
        display: flex; align-items: center; gap: 6px;
        background: var(--surface);
        border: 1px solid var(--line);
        border-radius: 999px;
        padding: 4px;
        box-shadow: var(--shadow-md);
        font-family: var(--font-ui);
      }
      #${TLBR_ID} .lang-group {
        display: flex; align-items: center;
        background: var(--bg-sunken);
        border-radius: 999px;
        padding: 2px;
      }
      #${TLBR_ID} [data-lang-btn] {
        background: transparent; border: 0;
        padding: 4px 10px;
        font-size: 11px; font-weight: 600;
        color: var(--fg-subtle);
        border-radius: 999px;
        letter-spacing: .04em;
        transition: all 180ms cubic-bezier(.2,.8,.2,1);
      }
      #${TLBR_ID} [data-lang-btn]:hover { color: var(--fg); }
      #${TLBR_ID} [data-lang-btn].active {
        background: var(--surface); color: var(--accent);
        box-shadow: var(--shadow-sm);
      }
      #${TLBR_ID} .theme-btn {
        background: transparent; border: 0;
        width: 28px; height: 28px;
        display: grid; place-items: center;
        border-radius: 999px; color: var(--fg-muted);
      }
      #${TLBR_ID} .theme-btn:hover { background: var(--surface-hover); color: var(--fg); }
      #${TLBR_ID} .theme-btn svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; }
      #${TLBR_ID} .divider { width: 1px; height: 16px; background: var(--line); margin: 0 2px; }

      @media (max-width: 540px) {
        #${TLBR_ID} { top: auto; bottom: 12px; right: 12px; }
      }
    `;
    document.head.appendChild(s);
  }

  function injectToolbar() {
    if (document.getElementById(TLBR_ID)) return;
    // Skip floating toolbar when embedded in flow/canvas chrome
    try {
      if (window.frameElement && window.frameElement.dataset.scEmbed != null) return;
    } catch (e) {}
    injectStyles();
    const tb = document.createElement('div');
    tb.id = TLBR_ID;
    tb.innerHTML = `
      <div class="lang-group">
        <button data-lang-btn="ko" title="한국어">KO</button>
        <button data-lang-btn="ja" title="日本語">JA</button>
        <button data-lang-btn="en" title="English">EN</button>
      </div>
      <div class="divider"></div>
      <button class="theme-btn" title="theme">
        <svg class="theme-icon" viewBox="0 0 24 24"></svg>
      </button>
    `;
    document.body.appendChild(tb);
    tb.querySelectorAll('[data-lang-btn]').forEach(b => {
      b.addEventListener('click', () => applyLang(b.dataset.langBtn));
    });
    tb.querySelector('.theme-btn').addEventListener('click', () => {
      applyTheme(getTheme() === 'light' ? 'dark' : 'light');
    });
  }

  // ---- init ----
  function init() {
    applyTheme(getTheme());
    applyLang(getLang());
    injectToolbar();
    paintToolbar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // expose for re-running after dynamic content
  window.__SC = { applyTheme, applyLang, getTheme, getLang };
})();
