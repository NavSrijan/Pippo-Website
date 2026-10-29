const cards = [...document.querySelectorAll('.command-card')];
const search = document.querySelector('#command-search');
const filters = [...document.querySelectorAll('[data-filter]')];
let category = 'all';
function updateCatalog() {
  const query = search.value.trim().toLowerCase();
  let count = 0;
  for (const card of cards) {
    const show = (category === 'all' || card.dataset.category === category) && card.dataset.search.includes(query);
    card.hidden = !show;
    count += Number(show);
  }
  document.querySelector('#result-count').textContent = `Showing ${count} of ${cards.length} commands`;
  document.querySelector('.command-empty').hidden = count !== 0;
}
search.addEventListener('input', updateCatalog);
for (const filter of filters) filter.addEventListener('click', () => {
  category = filter.dataset.filter;
  for (const button of filters) {
    const active = button === filter;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  }
  updateCatalog();
});
document.querySelector('#reset-search').addEventListener('click', () => {
  search.value = '';
  filters[0].click();
  search.focus();
});
document.addEventListener('click', async event => {
  const opener = event.target.closest('[data-open]');
  if (opener) document.getElementById(opener.dataset.open).showModal();
  const close = event.target.closest('[data-close]');
  if (close) close.closest('dialog').close();
  const copy = event.target.closest('[data-copy]');
  if (copy) {
    try {
      await navigator.clipboard.writeText(copy.dataset.copy);
      const original = copy.textContent;
      copy.textContent = 'Copied!';
      setTimeout(() => { copy.textContent = original; }, 1800);
    } catch {
      copy.textContent = 'Select the example to copy';
    }
  }
});
for (const dialog of document.querySelectorAll('dialog')) dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  }
});
function openDeepLink() {
  const card = document.getElementById(location.hash.slice(1));
  if (card?.classList.contains('command-card')) document.getElementById('detail-' + card.id).showModal();
}
openDeepLink();
window.addEventListener('hashchange', openDeepLink);
