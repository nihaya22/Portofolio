const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.work-card');
const toast = document.getElementById('toast');

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const selected = btn.dataset.filter;
    cards.forEach(card => {
      const cats = card.dataset.category || '';
      card.style.display = selected === 'all' || cats.includes(selected) ? '' : 'none';
    });
  });
});

document.querySelectorAll('[data-placeholder]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    toast.textContent = `${el.dataset.placeholder} link belum diisi — tinggal ganti di index.html ♡`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2600);
  });
});

const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeBtn.textContent = document.body.classList.contains('dark') ? '☾' : '☼';
});

/* ===== Slider di kartu karya ===== */
document.querySelectorAll('.image-wrap').forEach(wrap => {
  const imgs = [...wrap.querySelectorAll('img')];
  if (imgs.length < 2) return;
  wrap.classList.add('multi');
  imgs[0].classList.add('on');
  imgs.forEach(im => im.loading = 'eager');
  wrap.insertAdjacentHTML('beforeend', '<button class="sl-btn p" aria-label="Sebelumnya">‹</button><button class="sl-btn n" aria-label="Berikutnya">›</button><div class="sl-dots">' + imgs.map(() => '<i></i>').join('') + '</div>');
  const dots = [...wrap.querySelectorAll('.sl-dots i')];
  let i = 0, hold = false;
  const go = n => { imgs[i].classList.remove('on'); dots[i].classList.remove('on'); i = (n + imgs.length) % imgs.length; imgs[i].classList.add('on'); dots[i].classList.add('on'); };
  go(0);
  wrap.querySelector('.p').addEventListener('click', e => { e.stopPropagation(); go(i - 1); });
  wrap.querySelector('.n').addEventListener('click', e => { e.stopPropagation(); go(i + 1); });
  wrap.addEventListener('mouseenter', () => hold = true);
  wrap.addEventListener('mouseleave', () => hold = false);
  let x0 = 0;
  wrap.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; hold = true; }, { passive: true });
  wrap.addEventListener('touchend', e => { const d = e.changedTouches[0].clientX - x0; if (Math.abs(d) > 40) go(i + (d < 0 ? 1 : -1)); hold = false; });
  setInterval(() => !hold && go(i + 1), 3500);
});

/* ===== Mode presentasi ===== */
const deckData = [];
document.querySelectorAll('.work-card').forEach(c => {
  const m = { tag: c.querySelector('.mini-tag').textContent, title: c.querySelector('h3').textContent, desc: c.querySelector('.work-info p').textContent,
    links: [...c.querySelectorAll('.buttons a[target]')].map(a => `<a href="${a.href}" target="_blank" rel="noopener">${a.textContent}</a>`).join('') };
  c.querySelectorAll('img').forEach(im => deckData.push({ ...m, img: im.getAttribute('src'), card: c }));
});
const slideHTML = [
  { center: 1, h: '<img class="ava" src="assets/nihaya.webp" alt="Nihaya"><p class="tag">PORTFOLIO</p><h2>Nihaya ♥</h2><p class="d">my little creative space ♡<br>UI/UX · Web · Mobile · Design</p>' },
  ...deckData.map(w => ({ h: `<div class="pic"><img src="${w.img}" alt="${w.title}"></div><div><p class="tag">${w.tag}</p><h2>${w.title}</h2><p class="d">${w.desc}</p><div class="lk">${w.links}</div></div>` })),
  { center: 1, h: '<p class="tag">TERIMA KASIH</p><h2>Let\'s connect ♡</h2><p class="d">Instagram · GitHub · WhatsApp ada di bagian Links.</p><div class="lk"><a href="https://github.com/nihaya22" target="_blank" rel="noopener">GitHub ↗</a></div>' }
];
const deck = document.createElement('div');
deck.id = 'deck';
deck.innerHTML = `<div class="top"><span id="dCount"></span><span><button id="dPlay">⏵ Auto</button> <button id="dFull">⛶</button> <button id="dClose">✕ Tutup</button></span></div><div class="bar"><b id="dBar"></b></div><div class="stage">${slideHTML.map(s => `<section class="slide${s.center ? ' center' : ''}">${s.h}</section>`).join('')}</div><div class="nav-d"><button id="dPrev">‹ Prev</button><span>← → pindah slide · Esc keluar</span><button id="dNext">Next ›</button></div>`;
document.body.appendChild(deck);
const ds = [...deck.querySelectorAll('.slide')];
let di = 0, auto = null;
function deckGo(n) {
  di = Math.max(0, Math.min(ds.length - 1, n));
  ds.forEach((s, k) => { s.classList.toggle('on', k === di); s.classList.toggle('out', k < di); });
  document.getElementById('dCount').textContent = `${di + 1} / ${ds.length}`;
  document.getElementById('dBar').style.width = ((di + 1) / ds.length * 100) + '%';
}
function openDeck(n) { deck.classList.add('open'); document.body.style.overflow = 'hidden'; deckGo(n); }
function stopAuto() { clearInterval(auto); auto = null; document.getElementById('dPlay').textContent = '⏵ Auto'; }
function closeDeck() { deck.classList.remove('open'); document.body.style.overflow = ''; stopAuto(); if (document.fullscreenElement) document.exitFullscreen(); }
document.getElementById('dPlay').onclick = () => { if (auto) return stopAuto(); document.getElementById('dPlay').textContent = '⏸ Stop'; auto = setInterval(() => deckGo(di + 1 >= ds.length ? 0 : di + 1), 4500); };
document.getElementById('dFull').onclick = () => document.fullscreenElement ? document.exitFullscreen() : (deck.requestFullscreen && deck.requestFullscreen());
document.getElementById('dClose').onclick = closeDeck;
document.getElementById('dPrev').onclick = () => deckGo(di - 1);
document.getElementById('dNext').onclick = () => deckGo(di + 1);
document.addEventListener('keydown', e => {
  if (!deck.classList.contains('open')) return;
  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); deckGo(di + 1); }
  if (e.key === 'ArrowLeft') deckGo(di - 1);
  if (e.key === 'Escape') closeDeck();
});
let tx = 0;
deck.addEventListener('touchstart', e => tx = e.touches[0].clientX, { passive: true });
deck.addEventListener('touchend', e => { const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 50) deckGo(di + (d < 0 ? 1 : -1)); });
document.querySelectorAll('[data-deck]').forEach(b => b.addEventListener('click', () => openDeck(+b.dataset.deck)));
document.querySelectorAll('.work-card .image-wrap').forEach(w => w.addEventListener('click', () => {
  const card = w.closest('.work-card'); openDeck(deckData.findIndex(d => d.card === card) + 1);
}));
