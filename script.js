const TRACKS = [
  { num: '01', title: 'Escape', meta: 'Demo · 2026', href: 'https://streetvoice.com/thehamasen/songs/863198/' },
  { num: '02', title: 'Hamasen', meta: 'Demo · 2026', href: 'https://drive.google.com/file/d/1HJSiUnER0Ch9KtLkZa2Yew11BHrljzi8/view?usp=drive_link' },
  { num: '03', title: 'Lasting', meta: 'Demo · 2026', href: 'https://streetvoice.com/thehamasen/songs/881137/' },
];

const VIDEOS = [
  { title: 'Drift Test Session (Planning)', meta: 'TBD · 2026 TBD', href: '#' },
];

const ASSETS = [
  {
    file: 'og-cover.jpg',
    name: { zh: '團照', en: 'Band Photo', ja: 'バンド写真' },
    meta: 'JPG · 1567×1045 · 420 KB',
  },
  {
    file: 'happy-cover.jpg',
    name: { zh: '專輯封面', en: 'Cover Art', ja: 'カバーアート' },
    meta: 'JPG · 1567×1045 · 388 KB',
  },
  {
    file: 'logo-transparent.png',
    name: { zh: 'Logo（透明背景）', en: 'Logo (Transparent)', ja: 'ロゴ（透過）' },
    meta: 'PNG · 842×842 · 211 KB',
  },
  {
    file: 'logo.jpg',
    name: { zh: 'Logo', en: 'Logo', ja: 'ロゴ' },
    meta: 'JPG · 842×842 · 59 KB',
  },
];

const SOCIAL = [
  { platform: 'Instagram', handle: '@thehamasen', href: 'https://www.instagram.com/thehamasen/' },
  { platform: 'StreetVoice', handle: '@thehamasen', href: 'https://streetvoice.com/thehamasen/' },
  { platform: 'YouTube', handle: '濱線 Hamasen', href: 'https://www.youtube.com/@thehamasen' },
  { platform: 'Spotify', handle: '濱線 Hamasen (Construting...)', href: '#' },
  { platform: 'Eggs（エッグス）', handle: '@thehamasen', href: 'https://eggs.mu/artist/thehamasen' },
];

function renderTracks(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = TRACKS.map(t => `
    <a class="track-item" href="${t.href}" target="_blank" rel="noopener noreferrer">
      <span class="track-num">${t.num}</span>
      <span class="track-title">${t.title}</span>
      <span class="track-meta">${t.meta}</span>
      <span class="list-arrow">→</span>
    </a>`).join('');
}

function renderVideos(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = VIDEOS.map(v => `
    <a class="video-item" href="${v.href}" target="_blank" rel="noopener noreferrer">
      <div class="video-play">▶</div>
      <div class="video-info">
        <div class="video-title">${v.title}</div>
        <div class="video-meta">${v.meta}</div>
      </div>
      <span class="list-arrow">→</span>
    </a>`).join('');
}

const ASSET_HINT = {
  zh: '點擊卡片下載原始檔案',
  en: 'Click a card to download the original file',
  ja: 'カードをクリックして原本をダウンロード',
};

function renderAssets(lang) {
  const el = document.getElementById('assets-' + lang);
  if (!el) return;
  el.innerHTML = ASSETS.map(a => `
    <a class="asset-card" href="${a.file}" download>
      <div class="asset-thumb"><img src="${a.file}" alt="${a.name[lang]}" loading="lazy"></div>
      <div class="asset-info">
        <div class="asset-name">${a.name[lang]}</div>
        <div class="asset-meta">${a.meta}</div>
      </div>
      <span class="asset-download">↓</span>
    </a>`).join('');
}

function renderSocial(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = SOCIAL.map(s => `
    <a class="social-link" href="${s.href}" target="_blank" rel="noopener noreferrer">
      <span class="social-link-platform">${s.platform}</span>${s.handle}
    </a>`).join('');
}

const TOP_LABEL = { zh: '首頁', en: 'Top', ja: 'トップ' };
let sectionObserver = null;

function buildSideNav(lang) {
  const nav = document.getElementById('side-nav');
  const section = document.getElementById('lang-' + lang);
  if (!nav || !section) return;

  const hero = section.querySelector('.hero');
  if (hero) hero.id = `top-${lang}`;

  const sections = Array.from(section.querySelectorAll('section'));
  sections.forEach((sec, i) => { sec.id = `sec-${lang}-${i}`; });

  const items = [{ id: `top-${lang}`, label: TOP_LABEL[lang] || 'Top' }];
  sections.forEach(sec => {
    const labelEl = sec.querySelector('.section-label');
    if (labelEl) items.push({ id: sec.id, label: labelEl.textContent.trim() });
  });

  nav.innerHTML = items.map(it => `
    <a class="side-nav-item" href="#${it.id}" data-target="${it.id}">
      <span class="side-nav-dot"></span>
      <span class="side-nav-label">${it.label}</span>
    </a>`).join('');

  if (sectionObserver) sectionObserver.disconnect();
  sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      nav.querySelectorAll('.side-nav-item').forEach(a => {
        a.classList.toggle('active', a.dataset.target === id);
      });
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  [hero, ...sections].filter(Boolean).forEach(el => sectionObserver.observe(el));
}

function setLang(lang) {
  document.querySelectorAll('.lang-section').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.lang-btn').forEach(el => el.classList.remove('active'));
  document.getElementById('lang-' + lang).classList.add('active');
  document.querySelector(`.lang-btn[onclick="setLang('${lang}')"]`).classList.add('active');
  buildSideNav(lang);
}

(function init() {
  ['zh', 'en', 'ja'].forEach(lang => {
    renderTracks('tracks-' + lang);
    renderVideos('videos-' + lang);
    renderAssets(lang);
    renderSocial('social-' + lang);
  });

  const nav = (navigator.language || navigator.userLanguage || 'zh').toLowerCase();
  let lang = 'zh';
  if (nav.startsWith('ja')) lang = 'ja';
  else if (nav.startsWith('zh')) lang = 'zh';
  else lang = 'en';
  setLang(lang);
})();
