/* =========================================================
   SocraChat — shared UI primitives (logo, icons, helpers)
   ========================================================= */

/* ---- LOGO ----
   Usage: <div data-sc-logo></div>  or  <div data-sc-logo="lg"></div>
*/
(function () {
  const script = document.currentScript;
  const assetBase = script?.src ? new URL('.', script.src).href : 'assets/';

  const MODEL_ICONS = {
    claude: { label: 'Claude', logo: 'claude.svg', color: 'var(--ai-claude)' },
    openai: { label: 'GPT', logo: 'openai.svg', color: 'var(--ai-gpt)' },
    gemini: { label: 'Gemini', logo: 'gemini.svg', color: 'var(--ai-gemini)' },
    perplexity: { label: 'Perplexity', logo: 'perplexity.svg', color: 'var(--ai-perplexity)' },
    grok: { label: 'Grok', logo: 'grok.svg', color: 'var(--ai-grok)' },
    deepseek: { label: 'DeepSeek', logo: 'deepseek.svg', color: 'var(--ai-deepseek)' },
  };

  function injectModelIconStyles() {
    if (document.getElementById('sc-model-icon-styles')) return;
    const style = document.createElement('style');
    style.id = 'sc-model-icon-styles';
    style.textContent = `
      [data-model-icon] {
        position: relative;
        display: inline-grid;
        place-items: center;
        overflow: hidden;
        color: transparent !important;
        text-indent: -9999px;
        background: var(--model-color, currentColor);
      }
      [data-model-icon]::before {
        content: "";
        width: 58%;
        height: 58%;
        display: block;
        background: #fff;
        mask: var(--model-logo-url) center / contain no-repeat;
        -webkit-mask: var(--model-logo-url) center / contain no-repeat;
      }
      .av-s[data-model-icon]::before,
      .pv-opt .models .av[data-model-icon]::before { width: 62%; height: 62%; }
      .av-l[data-model-icon]::before,
      .av-xl[data-model-icon]::before,
      .ai-dot[data-model-icon]::before,
      .chip[data-model-icon]::before { width: 56%; height: 56%; }
      .ai .ic[data-model-icon]::before { width: 60%; height: 60%; }
    `;
    document.head.appendChild(style);
  }

  function mountModelIcons() {
    injectModelIconStyles();
    document.querySelectorAll('[data-model-icon]:not([data-model-mounted])').forEach((el) => {
      const key = el.getAttribute('data-model-icon');
      const model = MODEL_ICONS[key];
      if (!model) return;
      el.setAttribute('data-model-mounted', '1');
      el.setAttribute('role', el.getAttribute('role') || 'img');
      el.setAttribute('aria-label', el.getAttribute('aria-label') || model.label);
      el.style.setProperty('--model-color', model.color);
      el.style.setProperty('--model-logo-url', `url("${assetBase}model-logos/${model.logo}")`);
    });
  }

  function mountLogos() {
    document.querySelectorAll('[data-sc-logo]:not([data-sc-mounted])').forEach((el) => {
      el.setAttribute('data-sc-mounted', '1');
      const size = el.getAttribute('data-sc-logo') || 'md';
      const hideText = el.hasAttribute('data-sc-mark-only');
      const ms = ({ sm: 22, md: 28, lg: 38, xl: 52 })[size] || 28;
      const fs = ({ sm: 15, md: 18, lg: 24, xl: 32 })[size] || 18;
      el.innerHTML = `
        <span class="sc-logo" style="display:inline-flex;align-items:center;gap:${Math.round(ms*0.32)}px;font-family:var(--font-ui);">
          <span class="sc-mark" style="
            width:${ms}px;height:${ms}px;border-radius:50%;
            position:relative;display:inline-block;flex-shrink:0;
            background: conic-gradient(from -110deg at 50% 50%, var(--accent) 0deg, var(--accent) 220deg, transparent 220deg, transparent 360deg);
          ">
            <span style="position:absolute;inset:${ms*0.18}px;border-radius:50%;background:var(--surface);"></span>
            <span style="position:absolute;inset:${ms*0.32}px;border-radius:50%;background:var(--accent);"></span>
          </span>
          ${hideText ? '' : `<span class="sc-word" style="font-size:${fs}px;font-weight:600;letter-spacing:-.02em;color:var(--fg-strong);">
            Socra<span style="color:var(--accent);">Chat</span>
          </span>`}
        </span>
      `;
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountLogos);
  else mountLogos();
  window.__SC_mountLogos = mountLogos;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountModelIcons);
  else mountModelIcons();
  window.__SC_mountModelIcons = mountModelIcons;
  window.SC_MODEL_ICONS = MODEL_ICONS;
})();

/* ---- ICONS (inline lucide subset) ---- */
window.SC_ICONS = {
  send:      '<path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/>',
  arrowRight:'<path d="M5 12h14M13 5l7 7-7 7"/>',
  arrowLeft: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
  chevronDown:'<path d="M6 9l6 6 6-6"/>',
  chevronRight:'<path d="M9 6l6 6-6 6"/>',
  plus:      '<path d="M12 5v14M5 12h14"/>',
  close:     '<path d="M18 6 6 18M6 6l12 12"/>',
  menu:      '<path d="M3 6h18M3 12h18M3 18h18"/>',
  search:    '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
  attach:    '<path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
  sparkles:  '<path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.2 4.2M14.2 14.2l4.2 4.2M18.4 5.6l-4.2 4.2M9.8 14.2l-4.2 4.2"/>',
  thinking:  '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M5 12H2M22 12h-3M7.05 7.05 4.93 4.93M19.07 19.07l-2.12-2.12M7.05 16.95l-2.12 2.12M19.07 4.93l-2.12 2.12"/>',
  list:      '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  grid:      '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
  chart:     '<path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/>',
  donut:     '<path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/><path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"/>',
  venn:      '<circle cx="9" cy="12" r="6"/><circle cx="15" cy="12" r="6"/>',
  link:      '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"/>',
  external:  '<path d="M15 3h6v6M10 14 21 3M21 14v7H3V3h7"/>',
  info:      '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  alert:     '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z"/><path d="M12 9v4M12 17h.01"/>',
  check:     '<path d="M20 6 9 17l-5-5"/>',
  user:      '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  bookmark:  '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
  copy:      '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  refresh:   '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>',
  filter:    '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
  voice:     '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8"/>',
  stop:      '<rect x="6" y="6" width="12" height="12" rx="1"/>',
  settings:  '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  download:  '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  history:   '<path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l4 2"/>',
  bot:       '<rect width="18" height="10" x="3" y="11" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4M8 16h.01M16 16h.01"/>',
};
window.SC_icon = (name, attrs = '') =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" ${attrs}>${window.SC_ICONS[name] || ''}</svg>`;
