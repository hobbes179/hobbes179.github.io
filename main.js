// ── Tag filtering ─────────────────────────────────────────
// Reads data-tags from each .card, builds filter chips,
// and shows/hides cards when a chip is clicked.

(function () {
  const grid      = document.getElementById('projectGrid');
  const chipsEl   = document.getElementById('filterChips');
  const emptyMsg  = document.getElementById('emptyMsg');
  const cards     = Array.from(grid.querySelectorAll('.card'));

  // Collect all unique tags across cards
  const tagSet = new Set();
  cards.forEach(card => {
    card.dataset.tags.split(',').map(t => t.trim()).forEach(t => tagSet.add(t));
  });

  // Build a chip for each tag
  tagSet.forEach(tag => {
    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.dataset.tag = tag;
    btn.textContent = tag;
    chipsEl.appendChild(btn);
  });

  // Filter logic
  function applyFilter(tag) {
    let visible = 0;
    cards.forEach(card => {
      const tags = card.dataset.tags.split(',').map(t => t.trim());
      const show = tag === 'all' || tags.includes(tag);
      card.classList.toggle('hidden', !show);
      if (show) visible++;
    });
    emptyMsg.hidden = visible > 0;
  }

  // Click handler
  chipsEl.addEventListener('click', e => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    chipsEl.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    applyFilter(btn.dataset.tag);
  });
})();
