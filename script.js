// Shared interactions: ticker drift, mobile menu, knowledge garden hover, quote rotation.

(function () {
  // Mobile nav toggle
  const btn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');
  if (btn && nav) btn.addEventListener('click', () => nav.classList.toggle('open'));

  // Live drift numbers on ticker (small random pulse so it feels alive)
  const items = document.querySelectorAll('.ticker-item .val');
  if (items.length) {
    setInterval(() => {
      items.forEach((el) => {
        const base = parseFloat(el.dataset.base);
        if (isNaN(base)) return;
        const drift = (Math.random() - 0.5) * base * 0.0008;
        const next = base + drift;
        el.textContent = next.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      });
    }, 2200);
  }

  // Knowledge garden
  const garden = document.querySelector('[data-garden]');
  if (garden) {
    const nodes = garden.querySelectorAll('.node');
    const lines = garden.querySelectorAll('line[data-edge]');
    nodes.forEach((node) => {
      node.addEventListener('mouseenter', () => {
        const id = node.dataset.id;
        lines.forEach((l) => {
          const [a, b] = l.dataset.edge.split('|');
          const active = a === id || b === id;
          l.setAttribute('stroke', active ? '#3ddc97' : 'rgba(255,255,255,0.12)');
          l.setAttribute('stroke-width', active ? 0.35 : 0.18);
        });
        nodes.forEach((n) => {
          const connected = Array.from(lines).some((l) => {
            const [a, b] = l.dataset.edge.split('|');
            return (a === id && b === n.dataset.id) || (b === id && a === n.dataset.id) || n.dataset.id === id;
          });
          n.classList.toggle('active', connected);
        });
      });
      node.addEventListener('mouseleave', () => {
        lines.forEach((l) => { l.setAttribute('stroke', 'rgba(255,255,255,0.12)'); l.setAttribute('stroke-width', 0.18); });
        nodes.forEach((n) => n.classList.remove('active'));
      });
    });
  }

  // Quote rotator
  const quoteCard = document.querySelector('[data-quotes]');
  if (quoteCard) {
    const quotes = JSON.parse(quoteCard.dataset.quotes);
    const qP = quoteCard.querySelector('blockquote p');
    const qA = quoteCard.querySelector('blockquote footer');
    const dotWrap = quoteCard.querySelector('.q-dots');
    let i = 0;
    quotes.forEach((_, idx) => {
      const b = document.createElement('button');
      b.className = 'q-dot' + (idx === 0 ? ' active' : '');
      b.setAttribute('aria-label', 'Quote ' + (idx + 1));
      b.addEventListener('click', () => { i = idx; render(); });
      dotWrap.appendChild(b);
    });
    function render() {
      const q = quotes[i];
      qP.textContent = q.q;
      qA.textContent = '— ' + q.a;
      quoteCard.querySelector('blockquote').classList.remove('fade-in');
      void quoteCard.offsetWidth;
      quoteCard.querySelector('blockquote').classList.add('fade-in');
      dotWrap.querySelectorAll('.q-dot').forEach((d, idx) => d.classList.toggle('active', idx === i));
    }
    setInterval(() => { i = (i + 1) % quotes.length; render(); }, 6000);
  }

  // Mark active nav link based on pathname
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html') || (path === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();
