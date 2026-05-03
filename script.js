const TRACKS = [
  { num: '01', title: 'Hamasen', meta: 'Jamming · 2026', href: 'https://drive.google.com/file/d/1RCe3KepdEVyOqJRE-JZnSpYkW7CltA4u/view?usp=sharing' },
  { num: '02', title: 'Escape', meta: 'Jamming · 2026', href: 'https://drive.google.com/file/d/1avisl84I_Ya1Lh-XqSUKRSXkdLs6AoMn/view?usp=sharing' },
  { num: '03', title: 'Unsaid Night', meta: 'Jamming · 2026', href: 'https://drive.google.com/file/d/1lGH4PCE7JFY0xKlc9N8jfxzd2H2wktRP/view?usp=sharing' },
  { num: '04', title: 'Lasting', meta: 'Writing · 2026', href: '#' },
  { num: '05', title: 'Cosmic Explosion', meta: 'Writing · 2026', href: '#' },
];

const VIDEOS = [
  { title: 'First Session (Planning)', meta: 'Revolver · 2026 July', href: '#' },
  { title: 'Drift Test Session (Planning)', meta: 'Riff Bar Taipei · 2026 August', href: '#' },
  { title: 'Regular Session Somewhere (Planning)', meta: 'Venue · 2026 August', href: '#' }
];

const SOCIAL = [
  { platform: 'Instagram', handle: '@thehamasen', href: 'https://www.instagram.com/thehamasen/' },
  { platform: 'StreetVoice', handle: '@thehamasen', href: 'https://streetvoice.com/thehamasen/' },
  { platform: 'YouTube', handle: '濱線 Hamasen', href: 'https://www.youtube.com/@thehamasen' },
  { platform: 'Spotify', handle: '濱線 Hamasen (Construting...)', href: '#' },
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
    renderSocial('social-' + lang);
  });

  const nav = (navigator.language || navigator.userLanguage || 'zh').toLowerCase();
  let lang = 'zh';
  if (nav.startsWith('ja')) lang = 'ja';
  else if (nav.startsWith('zh')) lang = 'zh';
  else lang = 'en';
  setLang(lang);
})();
