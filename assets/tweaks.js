/* ===========================================================
   SocraChat Tweaks Panel — Figma-style live editor
   Vanilla JS. Mounts a floating panel that writes CSS var
   overrides to the parent doc + every same-origin iframe.
   =========================================================== */

(function () {
  const STORE_KEY = 'sc-tweaks-v1';
  const PRESET_STORE_KEY = 'sc-tweaks-presets-v1';

  // ===== Tweak definitions =====
  const PRESETS = {
    primary: [
      { name: 'Forest',  hex: '#2D5F4F', hover: '#234A3F', soft: '#E8EFEA', darkLight: '#7AAA94' },
      { name: 'Navy',    hex: '#1F3A5F', hover: '#162E4D', soft: '#E4EAF2', darkLight: '#7997C5' },
      { name: 'Sage',    hex: '#5E7A5E', hover: '#496149', soft: '#E9EEE9', darkLight: '#A2B89C' },
      { name: 'Plum',    hex: '#6B4A6B', hover: '#553955', soft: '#EEE7EE', darkLight: '#B695B6' },
      { name: 'Clay',    hex: '#B5613F', hover: '#964A2D', soft: '#F4E3D5', darkLight: '#D89E7E' },
      { name: 'Graphite',hex: '#3A3A3A', hover: '#222',    soft: '#EAEAE7', darkLight: '#9A9A95' },
    ],
    surface: [
      { name: 'Warm cream', bg: '#FBF9F4', sunken: '#F5F1EA', surface: '#FFFFFF', line: '#E8DECE', lineStrong: '#D2C5AE', fg: '#29251F', fgMuted: '#524A41', fgSubtle: '#8A8175' },
      { name: 'Neutral',    bg: '#FAFAFA', sunken: '#F2F2F2', surface: '#FFFFFF', line: '#E5E5E5', lineStrong: '#D0D0D0', fg: '#1A1A1A', fgMuted: '#525252', fgSubtle: '#8A8A8A' },
      { name: 'Cool',       bg: '#F7F8FA', sunken: '#EEF1F4', surface: '#FFFFFF', line: '#E1E5EA', lineStrong: '#CBD1D8', fg: '#1A2230', fgMuted: '#4A5567', fgSubtle: '#8590A0' },
    ],
    radius: [
      { name: 'Sharp',  sm: 4,  md: 6,  lg: 8,  xl: 10, _2xl: 14 },
      { name: 'Soft',   sm: 8,  md: 12, lg: 16, xl: 20, _2xl: 28 },
      { name: 'Round',  sm: 12, md: 16, lg: 22, xl: 28, _2xl: 36 },
    ],
    font: [
      { name: 'Inter',         ui: "'Inter','Noto Sans JP','Noto Sans KR',system-ui,sans-serif" },
      { name: 'IBM Plex',      ui: "'IBM Plex Sans','IBM Plex Sans JP','IBM Plex Sans KR',system-ui,sans-serif" },
      { name: 'Manrope',       ui: "'Manrope','Noto Sans JP','Noto Sans KR',system-ui,sans-serif" },
      { name: 'Geist',         ui: "'Geist','Noto Sans JP','Noto Sans KR',system-ui,sans-serif" },
      { name: 'Geo Sans',      ui: "'Plus Jakarta Sans','Noto Sans JP','Noto Sans KR',system-ui,sans-serif" },
    ],
  };

  const FONT_IMPORTS = [
    "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Sans+JP:wght@400;500;600;700&family=IBM+Plex+Sans+KR:wght@400;500;600;700&display=swap",
    "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap",
    "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap",
    "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",
  ];

  const DEFAULTS = {
    primary: 0,
    surface: 0,
    radius: 1,
    font: 0,
    fontSize: 14.5,
    density: 1.0,
    shadowIntensity: 1.0,
  };

  function load() {
    try {
      return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(STORE_KEY) || '{}'));
    } catch { return { ...DEFAULTS }; }
  }
  function save(s) { localStorage.setItem(STORE_KEY, JSON.stringify(s)); }

  function loadPresets() {
    try {
      const saved = JSON.parse(localStorage.getItem(PRESET_STORE_KEY) || 'null');
      if (saved && Array.isArray(saved)) return saved;
    } catch {}
    // seed presets
    return [
      { name: 'Default · Forest',  ts: 0, state: { ...DEFAULTS } },
      { name: 'Navy · Sharp',      ts: 0, state: { primary: 1, surface: 1, radius: 0, font: 1, fontSize: 14, density: 0.95, shadowIntensity: 0.7 } },
      { name: 'Sage · Round',      ts: 0, state: { primary: 2, surface: 0, radius: 2, font: 2, fontSize: 15, density: 1.1, shadowIntensity: 1.2 } },
      { name: 'Graphite · Cool',   ts: 0, state: { primary: 5, surface: 2, radius: 0, font: 3, fontSize: 14, density: 0.9, shadowIntensity: 0.5 } },
    ];
  }
  function savePresets(list) { localStorage.setItem(PRESET_STORE_KEY, JSON.stringify(list)); }

  let state = load();
  let presets = loadPresets();

  function statesEqual(a, b) {
    return Object.keys(DEFAULTS).every(k => Math.abs((a[k]||0) - (b[k]||0)) < 0.001 || a[k] === b[k]);
  }

  function currentMatchingPreset() {
    return presets.findIndex(p => statesEqual(p.state, state));
  }

  // ===== CSS override generation =====
  function buildOverrideCSS() {
    const p = PRESETS.primary[state.primary] || PRESETS.primary[0];
    const sf = PRESETS.surface[state.surface] || PRESETS.surface[0];
    const r = PRESETS.radius[state.radius] || PRESETS.radius[1];
    const f = PRESETS.font[state.font] || PRESETS.font[0];
    const dens = state.density;
    const sh = state.shadowIntensity;

    return `
      :root {
        --accent: ${p.hex};
        --accent-hover: ${p.hover};
        --accent-soft: ${p.soft};

        --bg: ${sf.bg};
        --bg-sunken: ${sf.sunken};
        --surface: ${sf.surface};
        --surface-hover: ${sf.sunken};
        --line: ${sf.line};
        --line-strong: ${sf.lineStrong};
        --fg: ${sf.fg};
        --fg-strong: ${sf.fg};
        --fg-muted: ${sf.fgMuted};
        --fg-subtle: ${sf.fgSubtle};

        --r-sm: ${r.sm}px;
        --r-md: ${r.md}px;
        --r-lg: ${r.lg}px;
        --r-xl: ${r.xl}px;
        --r-2xl: ${r._2xl}px;

        --font-ui: ${f.ui};
        --text-base: ${state.fontSize}px;
        --text-sm: ${(state.fontSize - 1.5).toFixed(1)}px;
        --text-md: ${(state.fontSize + 1.5).toFixed(1)}px;
        --text-lg: ${(state.fontSize + 3.5).toFixed(1)}px;

        --s-2: ${Math.round(8 * dens)}px;
        --s-3: ${Math.round(12 * dens)}px;
        --s-4: ${Math.round(16 * dens)}px;
        --s-5: ${Math.round(24 * dens)}px;
        --s-6: ${Math.round(32 * dens)}px;

        --shadow-sm: 0 1px 2px rgba(45, 35, 20, ${(0.05 * sh).toFixed(3)});
        --shadow-md: 0 2px 12px rgba(45, 35, 20, ${(0.06 * sh).toFixed(3)});
        --shadow-lg: 0 8px 32px rgba(45, 35, 20, ${(0.08 * sh).toFixed(3)});
        --shadow-xl: 0 24px 60px -16px rgba(45, 35, 20, ${(0.18 * sh).toFixed(3)});
        --shadow-focus: 0 0 0 3px ${p.hex}30;
      }
      :root[data-theme="dark"] {
        --accent: ${p.darkLight};
        --accent-hover: ${p.darkLight};
        --accent-soft: ${p.hex}33;
      }
    `;
  }

  // ===== Apply to a document (parent or iframe) =====
  function applyToDoc(doc) {
    if (!doc) return;
    let style = doc.getElementById('__sc-tweaks-override');
    if (!style) {
      style = doc.createElement('style');
      style.id = '__sc-tweaks-override';
      doc.head.appendChild(style);
    }
    style.textContent = buildOverrideCSS();

    // ensure fonts are imported
    if (!doc.getElementById('__sc-tweaks-fonts')) {
      const fontStyle = doc.createElement('style');
      fontStyle.id = '__sc-tweaks-fonts';
      fontStyle.textContent = FONT_IMPORTS.map(u => `@import url("${u}");`).join('\n');
      doc.head.insertBefore(fontStyle, doc.head.firstChild);
    }
  }

  function applyEverywhere() {
    applyToDoc(document);
    document.querySelectorAll('iframe').forEach(f => {
      try { applyToDoc(f.contentDocument); } catch (e) {}
    });
  }

  // ===== Mount panel UI =====
  function mountPanel() {
    if (document.getElementById('__sc-tweaks-panel')) return;

    const style = document.createElement('style');
    style.id = '__sc-tweaks-style';
    style.textContent = `
      #__sc-tweaks-toggle {
        position: fixed; right: 16px; bottom: 16px; z-index: 2147483646;
        width: 44px; height: 44px; border-radius: 50%;
        background: var(--surface, #fff);
        border: 1px solid var(--line, #e5e5e5);
        box-shadow: 0 8px 28px rgba(45,35,20,.16);
        color: var(--fg, #1a1a1a);
        display: grid; place-items: center; cursor: pointer;
        transition: transform 200ms cubic-bezier(.2,.8,.2,1);
      }
      #__sc-tweaks-toggle:hover { transform: scale(1.06); }
      #__sc-tweaks-toggle svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.75; }

      #__sc-tweaks-panel {
        position: fixed; right: 16px; bottom: 16px; z-index: 2147483646;
        width: 320px; max-height: calc(100vh - 32px);
        background: rgba(255,255,255,.92);
        -webkit-backdrop-filter: blur(20px) saturate(160%);
        backdrop-filter: blur(20px) saturate(160%);
        border: 1px solid rgba(45,35,20,.08);
        border-radius: 16px;
        box-shadow: 0 24px 60px -16px rgba(45,35,20,.25);
        display: flex; flex-direction: column;
        font-family: 'Inter', system-ui, sans-serif;
        font-size: 12px;
        color: #29251F;
        overflow: hidden;
      }
      :root[data-theme="dark"] #__sc-tweaks-panel {
        background: rgba(30,28,23,.92);
        color: #F0EBDE;
        border-color: rgba(255,255,255,.08);
      }

      #__sc-tweaks-panel header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 12px 12px 10px 16px;
        border-bottom: 1px solid rgba(0,0,0,.06);
      }
      :root[data-theme="dark"] #__sc-tweaks-panel header { border-bottom-color: rgba(255,255,255,.06); }
      #__sc-tweaks-panel header h3 {
        margin: 0; font-size: 12px; font-weight: 700; letter-spacing: -.005em;
        display: flex; align-items: center; gap: 6px;
      }
      #__sc-tweaks-panel header h3 svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 2; }
      #__sc-tweaks-panel header button.x {
        background: transparent; border: 0; padding: 4px; cursor: pointer;
        color: inherit; opacity: .5; border-radius: 6px;
      }
      #__sc-tweaks-panel header button.x:hover { opacity: 1; background: rgba(0,0,0,.06); }
      #__sc-tweaks-panel header button.x svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; }

      #__sc-tweaks-panel .body {
        overflow-y: auto; flex: 1;
        padding: 4px 12px 12px;
      }
      #__sc-tweaks-panel .body::-webkit-scrollbar { width: 6px; }
      #__sc-tweaks-panel .body::-webkit-scrollbar-thumb { background: rgba(0,0,0,.15); border-radius: 3px; }

      .twk-sec { padding: 10px 0 8px; border-bottom: 1px dashed rgba(0,0,0,.06); }
      :root[data-theme="dark"] .twk-sec { border-bottom-color: rgba(255,255,255,.06); }
      .twk-sec:last-child { border-bottom: 0; }
      .twk-sec h4 {
        margin: 0 0 8px; font-size: 10px; font-weight: 700;
        letter-spacing: .1em; text-transform: uppercase; opacity: .55;
      }
      .twk-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
      .twk-row:last-child { margin-bottom: 0; }
      .twk-row label { font-size: 11.5px; opacity: .8; flex-shrink: 0; min-width: 64px; }
      .twk-row .val {
        font-family: 'JetBrains Mono', monospace;
        font-size: 10.5px; opacity: .55;
        margin-left: auto; flex-shrink: 0;
        font-variant-numeric: tabular-nums;
      }
      .twk-row input[type="range"] {
        flex: 1; min-width: 0; height: 4px; accent-color: var(--accent, #2D5F4F);
      }

      .twk-swatches { display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px; }
      .twk-swatch {
        aspect-ratio: 1;
        border-radius: 10px; border: 0; cursor: pointer;
        position: relative; padding: 0;
        transition: transform 180ms cubic-bezier(.2,.8,.2,1);
      }
      .twk-swatch:hover { transform: scale(1.08); }
      .twk-swatch.on::after {
        content: ''; position: absolute; inset: -3px;
        border: 2px solid currentColor; border-radius: 13px;
        pointer-events: none;
      }
      .twk-swatch .nm {
        position: absolute; top: 100%; left: 50%; transform: translateX(-50%);
        font-size: 9px; margin-top: 3px;
        white-space: nowrap; opacity: 0;
        pointer-events: none;
        background: rgba(0,0,0,.7); color: #fff;
        padding: 2px 6px; border-radius: 4px;
      }
      .twk-swatch:hover .nm { opacity: 1; }
      .twk-surface-swatch {
        aspect-ratio: 1.4/1;
        position: relative; overflow: hidden;
      }
      .twk-surface-swatch .a, .twk-surface-swatch .b {
        position: absolute; inset: 0;
      }
      .twk-surface-swatch .b { clip-path: polygon(100% 0, 100% 100%, 0 100%); }

      .twk-radio { display: flex; gap: 2px; background: rgba(0,0,0,.05); padding: 2px; border-radius: 8px; }
      :root[data-theme="dark"] .twk-radio { background: rgba(255,255,255,.06); }
      .twk-radio button {
        flex: 1; background: transparent; border: 0; cursor: pointer;
        padding: 5px 8px; border-radius: 6px;
        font-family: inherit; font-size: 11px; font-weight: 500;
        color: inherit; opacity: .6;
      }
      .twk-radio button:hover { opacity: .9; }
      .twk-radio button.on {
        background: #fff;
        opacity: 1; font-weight: 600;
        box-shadow: 0 1px 3px rgba(0,0,0,.08);
      }
      :root[data-theme="dark"] .twk-radio button.on { background: rgba(255,255,255,.12); }

      .twk-reset {
        margin-top: 6px;
        background: transparent; border: 0; cursor: pointer;
        font-family: inherit; font-size: 11px; font-weight: 500;
        color: inherit; opacity: .55;
        text-decoration: underline; text-underline-offset: 2px;
        padding: 4px 0;
      }
      .twk-reset:hover { opacity: 1; }

      /* === PRESETS === */
      .twk-tabs {
        display: flex; padding: 0 12px; gap: 4px;
        border-bottom: 1px solid rgba(0,0,0,.06);
        background: rgba(0,0,0,.02);
      }
      :root[data-theme="dark"] .twk-tabs { border-bottom-color: rgba(255,255,255,.06); background: rgba(255,255,255,.03); }
      .twk-tabs button {
        background: transparent; border: 0; cursor: pointer;
        padding: 9px 12px;
        font-family: inherit; font-size: 11px; font-weight: 600;
        color: inherit; opacity: .55;
        border-bottom: 2px solid transparent;
        margin-bottom: -1px;
      }
      .twk-tabs button:hover { opacity: .85; }
      .twk-tabs button.on { opacity: 1; border-bottom-color: currentColor; }
      .twk-tabs button.dirty::after {
        content: '•'; margin-left: 4px;
        color: var(--accent, #2D5F4F);
      }

      .preset-save-bar {
        display: flex; gap: 6px; align-items: center;
        padding: 12px;
        background: rgba(0,0,0,.03);
        border-bottom: 1px solid rgba(0,0,0,.06);
      }
      :root[data-theme="dark"] .preset-save-bar { background: rgba(255,255,255,.03); border-bottom-color: rgba(255,255,255,.06); }
      .preset-save-bar input {
        flex: 1; min-width: 0;
        background: rgba(255,255,255,.7); border: 1px solid rgba(0,0,0,.08);
        padding: 7px 10px; border-radius: 8px;
        font-family: inherit; font-size: 11.5px;
        color: inherit; outline: none;
      }
      :root[data-theme="dark"] .preset-save-bar input { background: rgba(0,0,0,.3); border-color: rgba(255,255,255,.08); }
      .preset-save-bar input:focus { border-color: var(--accent, #2D5F4F); }
      .preset-save-bar button {
        background: var(--accent, #2D5F4F); color: #fff;
        border: 0; padding: 7px 14px; border-radius: 8px;
        font-family: inherit; font-size: 11.5px; font-weight: 600;
        cursor: pointer; flex-shrink: 0;
      }
      .preset-save-bar button:hover { filter: brightness(1.08); }
      .preset-save-bar button:disabled { opacity: .4; cursor: not-allowed; }

      .preset-list {
        display: flex; flex-direction: column;
        padding: 8px;
        gap: 4px;
      }
      .preset-empty { padding: 24px 12px; text-align: center; opacity: .5; font-size: 11.5px; }

      .preset-item {
        display: flex; align-items: center; gap: 8px;
        padding: 8px 10px;
        border-radius: 8px;
        cursor: pointer;
        position: relative;
        background: rgba(0,0,0,.02);
      }
      .preset-item:hover { background: rgba(0,0,0,.05); }
      .preset-item.active { background: rgba(45,95,79,.08); }
      :root[data-theme="dark"] .preset-item { background: rgba(255,255,255,.03); }
      :root[data-theme="dark"] .preset-item:hover { background: rgba(255,255,255,.06); }
      :root[data-theme="dark"] .preset-item.active { background: rgba(122,170,148,.12); }

      .preset-item .pswatch {
        width: 30px; height: 30px; border-radius: 8px;
        flex-shrink: 0;
        position: relative; overflow: hidden;
        border: 1px solid rgba(0,0,0,.05);
      }
      .preset-item .pswatch .pri {
        position: absolute; right: 0; top: 0; bottom: 0; width: 50%;
      }
      .preset-item .pname {
        flex: 1; min-width: 0;
        display: flex; flex-direction: column; gap: 1px;
      }
      .preset-item .pname .n {
        font-size: 12px; font-weight: 600;
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .preset-item .pname .m {
        font-size: 10px; opacity: .55;
        font-family: 'JetBrains Mono', monospace;
      }
      .preset-item .pactions {
        display: flex; gap: 2px;
        opacity: 0;
        transition: opacity 180ms;
      }
      .preset-item:hover .pactions, .preset-item.active .pactions { opacity: 1; }
      .preset-item .pactions button {
        background: transparent; border: 0; cursor: pointer;
        padding: 4px; border-radius: 6px;
        color: inherit; opacity: .6;
      }
      .preset-item .pactions button:hover { opacity: 1; background: rgba(0,0,0,.08); }
      .preset-item .pactions button.del:hover { background: rgba(184,80,76,.15); color: #B8504C; }
      .preset-item .pactions svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

      .preset-active-badge {
        position: absolute; top: 6px; right: 6px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 8px; font-weight: 700; letter-spacing: .1em;
        padding: 1px 5px; border-radius: 3px;
        background: var(--accent, #2D5F4F); color: #fff;
      }

      .preset-share {
        padding: 10px 12px 12px;
        border-top: 1px solid rgba(0,0,0,.06);
        display: flex; gap: 6px;
      }
      :root[data-theme="dark"] .preset-share { border-top-color: rgba(255,255,255,.06); }
      .preset-share button {
        flex: 1;
        background: transparent; border: 1px solid rgba(0,0,0,.1);
        cursor: pointer;
        padding: 7px 10px; border-radius: 8px;
        font-family: inherit; font-size: 11px; font-weight: 500;
        color: inherit;
        display: inline-flex; align-items: center; justify-content: center; gap: 5px;
      }
      :root[data-theme="dark"] .preset-share button { border-color: rgba(255,255,255,.12); }
      .preset-share button:hover { background: rgba(0,0,0,.05); }
      .preset-share button svg { width: 11px; height: 11px; fill: none; stroke: currentColor; stroke-width: 2; }
    `;
    document.head.appendChild(style);

    const toggle = document.createElement('button');
    toggle.id = '__sc-tweaks-toggle';
    toggle.title = 'Tweaks';
    toggle.innerHTML = `<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 10v6M4.22 4.22l4.24 4.24m7.07 7.07 4.24 4.24M1 12h6m10 0h6M4.22 19.78l4.24-4.24m7.07-7.07 4.24-4.24"/></svg>`;
    document.body.appendChild(toggle);

    const panel = document.createElement('div');
    panel.id = '__sc-tweaks-panel';
    panel.style.display = 'none';
    panel.innerHTML = `
      <header>
        <h3>
          <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          Tweaks
        </h3>
        <button class="x" id="__sc-tweaks-close"><svg viewBox="0 0 24 24" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
      </header>
      <div class="twk-tabs" id="__sc-tabs">
        <button data-tab="edit" class="on">Edit</button>
        <button data-tab="presets">Presets</button>
      </div>
      <div class="body" id="__sc-tweaks-body"></div>
    `;
    document.body.appendChild(panel);

    toggle.addEventListener('click', () => {
      panel.style.display = 'flex';
      toggle.style.display = 'none';
      renderBody();
    });
    document.getElementById('__sc-tweaks-close').addEventListener('click', () => {
      panel.style.display = 'none';
      toggle.style.display = 'grid';
    });

    document.querySelectorAll('#__sc-tabs button').forEach(b => {
      b.addEventListener('click', () => {
        document.querySelectorAll('#__sc-tabs button').forEach(x => x.classList.remove('on'));
        b.classList.add('on');
        currentTab = b.dataset.tab;
        renderBody();
      });
    });

    renderBody();
  }

  let currentTab = 'edit';

  function renderBody() {
    const body = document.getElementById('__sc-tweaks-body');
    if (!body) return;

    const matchIdx = currentMatchingPreset();
    const tabBtns = document.querySelectorAll('#__sc-tabs button');
    // mark Edit tab as dirty if state doesn't match any preset
    if (tabBtns[0]) tabBtns[0].classList.toggle('dirty', matchIdx < 0 && presets.length > 0);

    if (currentTab === 'presets') {
      renderPresets(body, matchIdx);
    } else {
      renderEdit(body);
    }
  }

  function renderPresets(body, matchIdx) {
    body.style.padding = '0';
    const listHTML = presets.length === 0
      ? `<div class="preset-empty">No saved presets yet.<br>Tweak above, then save.</div>`
      : presets.map((p, i) => {
          const pri = PRESETS.primary[p.state.primary]?.hex || '#888';
          const sf = PRESETS.surface[p.state.surface] || PRESETS.surface[0];
          const r = PRESETS.radius[p.state.radius]?.name || 'Soft';
          const f = PRESETS.font[p.state.font]?.name || 'Inter';
          const isActive = i === matchIdx;
          return `
            <div class="preset-item ${isActive ? 'active' : ''}" data-act="apply" data-i="${i}">
              <span class="pswatch" style="background:${sf.bg}">
                <span class="pri" style="background:${pri}"></span>
              </span>
              <span class="pname">
                <span class="n">${escapeHTML(p.name)}</span>
                <span class="m">${r} · ${f} · ${p.state.fontSize}px</span>
              </span>
              ${isActive ? '<span class="preset-active-badge">LIVE</span>' : ''}
              <span class="pactions">
                <button data-act="export" data-i="${i}" title="Copy as JSON"><svg viewBox="0 0 24 24"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></button>
                <button class="del" data-act="delete" data-i="${i}" title="Delete"><svg viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
              </span>
            </div>
          `;
        }).join('');

    body.innerHTML = `
      <div class="preset-save-bar">
        <input id="__preset-name" placeholder="社名 ・ e.g. Navy night" value="">
        <button id="__preset-save">+ 保存</button>
      </div>
      <div class="preset-list">${listHTML}</div>
      <div class="preset-share">
        <button data-act="import-json"><svg viewBox="0 0 24 24" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>JSONを貼り付け</button>
        <button data-act="export-current"><svg viewBox="0 0 24 24" stroke-linecap="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>現在をコピー</button>
      </div>
    `;

    const nameInput = body.querySelector('#__preset-name');
    body.querySelector('#__preset-save').addEventListener('click', () => {
      const name = (nameInput.value || '').trim() || `Preset ${presets.length + 1}`;
      presets.unshift({ name, ts: Date.now(), state: { ...state } });
      savePresets(presets);
      nameInput.value = '';
      renderBody();
    });
    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') body.querySelector('#__preset-save').click();
    });

    body.querySelectorAll('.preset-item').forEach(el => {
      el.addEventListener('click', (e) => {
        const t = e.target.closest('[data-act]');
        if (!t || t === el) {
          const i = parseInt(el.dataset.i, 10);
          state = { ...DEFAULTS, ...presets[i].state };
          save(state);
          renderBody();
          applyEverywhere();
          return;
        }
        const act = t.dataset.act;
        const i = parseInt(t.dataset.i, 10);
        e.stopPropagation();
        if (act === 'delete') {
          if (confirm(`Delete "${presets[i].name}"?`)) {
            presets.splice(i, 1);
            savePresets(presets);
            renderBody();
          }
        } else if (act === 'export') {
          const json = JSON.stringify(presets[i], null, 2);
          navigator.clipboard.writeText(json).then(() => alert('Preset copied to clipboard — paste to share or back up.'));
        }
      });
    });

    body.querySelector('[data-act="export-current"]').addEventListener('click', () => {
      const json = JSON.stringify({ name: 'current', state }, null, 2);
      navigator.clipboard.writeText(json).then(() => alert('Current tweaks copied as JSON.'));
    });
    body.querySelector('[data-act="import-json"]').addEventListener('click', () => {
      const raw = prompt('Paste preset JSON:');
      if (!raw) return;
      try {
        const obj = JSON.parse(raw);
        if (obj.state) {
          presets.unshift({ name: obj.name || 'Imported', ts: Date.now(), state: obj.state });
          savePresets(presets);
          renderBody();
        }
      } catch (e) {
        alert('Invalid JSON.');
      }
    });
  }

  function escapeHTML(s) {
    return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  }

  function renderEdit(body) {
    body.style.padding = '4px 12px 12px';

    const primaryHTML = PRESETS.primary.map((p, i) => `
      <button class="twk-swatch ${i === state.primary ? 'on' : ''}"
              style="background:${p.hex};color:${p.hex}"
              data-act="primary" data-i="${i}">
        <span class="nm">${p.name}</span>
      </button>
    `).join('');

    const surfaceHTML = PRESETS.surface.map((s, i) => `
      <button class="twk-swatch twk-surface-swatch ${i === state.surface ? 'on' : ''}"
              style="color:${s.fg}"
              data-act="surface" data-i="${i}" title="${s.name}">
        <span class="a" style="background:${s.bg}"></span>
        <span class="b" style="background:${s.sunken}"></span>
        <span class="nm">${s.name}</span>
      </button>
    `).join('');

    const radiusHTML = PRESETS.radius.map((r, i) => `
      <button class="${i === state.radius ? 'on' : ''}" data-act="radius" data-i="${i}">${r.name}</button>
    `).join('');

    const fontHTML = PRESETS.font.map((f, i) => `
      <button class="${i === state.font ? 'on' : ''}" data-act="font" data-i="${i}" style="font-family:${f.ui}">${f.name}</button>
    `).join('');

    body.innerHTML = `
      <div class="twk-sec">
        <h4>Primary color</h4>
        <div class="twk-swatches">${primaryHTML}</div>
      </div>

      <div class="twk-sec">
        <h4>Surface tone</h4>
        <div class="twk-swatches" style="grid-template-columns:repeat(3,1fr);">${surfaceHTML}</div>
      </div>

      <div class="twk-sec">
        <h4>Corner radius</h4>
        <div class="twk-radio">${radiusHTML}</div>
      </div>

      <div class="twk-sec">
        <h4>UI font</h4>
        <div class="twk-radio" style="display:grid;grid-template-columns:repeat(2,1fr);gap:2px;">${fontHTML}</div>
      </div>

      <div class="twk-sec">
        <h4>Type & spacing</h4>
        <div class="twk-row">
          <label>Font size</label>
          <input type="range" min="13" max="17" step="0.5" value="${state.fontSize}" data-act="fontSize">
          <span class="val">${state.fontSize}px</span>
        </div>
        <div class="twk-row">
          <label>Density</label>
          <input type="range" min="0.8" max="1.3" step="0.05" value="${state.density}" data-act="density">
          <span class="val">${state.density.toFixed(2)}×</span>
        </div>
        <div class="twk-row">
          <label>Shadow</label>
          <input type="range" min="0" max="2" step="0.1" value="${state.shadowIntensity}" data-act="shadowIntensity">
          <span class="val">${state.shadowIntensity.toFixed(1)}×</span>
        </div>
      </div>

      <button class="twk-reset" data-act="reset">↺ Reset to defaults</button>
    `;

    // wire up
    body.querySelectorAll('[data-act]').forEach(el => {
      const act = el.dataset.act;
      if (el.tagName === 'INPUT') {
        el.addEventListener('input', () => {
          state[act] = parseFloat(el.value);
          save(state);
          renderBody();
          applyEverywhere();
        });
      } else if (act === 'reset') {
        el.addEventListener('click', () => {
          state = { ...DEFAULTS };
          save(state);
          renderBody();
          applyEverywhere();
        });
      } else {
        el.addEventListener('click', () => {
          const i = parseInt(el.dataset.i, 10);
          state[act] = i;
          save(state);
          renderBody();
          applyEverywhere();
        });
      }
    });
  }

  // ===== init =====
  function init() {
    mountPanel();
    applyEverywhere();

    // re-apply to any iframe when it loads
    document.querySelectorAll('iframe').forEach(f => {
      f.addEventListener('load', () => {
        try { applyToDoc(f.contentDocument); } catch (e) {}
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // expose for re-applying on demand
  window.__SC_TWEAKS = { applyEverywhere, state: () => state };
})();
