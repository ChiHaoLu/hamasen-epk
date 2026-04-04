const TRACKS = [
  { num: '01', title: 'Escape', meta: 'Demo · 2026', href: '#' },
  { num: '02', title: 'Cosmic Explosion', meta: 'Demo · 2026', href: '#' },
  { num: '03', title: 'Hamasen', meta: 'Demo · 2026', href: '#' },
];

const VIDEOS = [
  { title: 'Performance Title Placeholder', meta: 'Venue · 2026', href: '#' },
  { title: 'Performance Title Placeholder', meta: 'Venue · 2026', href: '#' },
  { title: 'Performance Title Placeholder', meta: 'Venue · 2026', href: '#' },
];

const SOCIAL = [
  { platform: 'Instagram', handle: '@thehamasen', href: 'https://www.instagram.com/thehamasen/' },
  { platform: 'StreetVoice', handle: '@thehamasen', href: 'https://streetvoice.com/thehamasen/' },
  { platform: 'YouTube', handle: '濱線 Hamasen', href: 'https://www.youtube.com/@thehamasen' },
  { platform: 'Spotify', handle: '濱線 Hamasen', href: '#' },
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

function setLang(lang) {
  document.querySelectorAll('.lang-section').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.lang-btn').forEach(el => el.classList.remove('active'));
  document.getElementById('lang-' + lang).classList.add('active');
  document.querySelector(`.lang-btn[onclick="setLang('${lang}')"]`).classList.add('active');
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
