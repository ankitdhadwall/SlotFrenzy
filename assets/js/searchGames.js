document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('searchInput');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const gamesGrid = document.getElementById('gamesGrid');
  const allGames = Array.from(gamesGrid.children);

  const BATCH_SIZE = 9;
  let currentFilter = 'all';
  let currentSearch = '';
  let currentIndex = 0;

  function updateVisibleGames() {
    const filteredGames = allGames.filter(card => {
      const type = (card.dataset.type || '').toLowerCase();
      const name = card.querySelector('h2').textContent.toLowerCase();

      const matchesType = (currentFilter === 'all') || (type === currentFilter);
      const matchesSearch = name.includes(currentSearch);

      return matchesType && matchesSearch;
    });

    allGames.forEach(card => card.classList.add('hidden'));

    const toShow = filteredGames.slice(0, currentIndex + BATCH_SIZE);
    toShow.forEach(card => card.classList.remove('hidden'));

    if (toShow.length >= filteredGames.length) {
      loadMoreBtn.classList.add('hidden');
    } else {
      loadMoreBtn.classList.remove('hidden');
    }
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove 'active' classes / gradients / borders
      filterButtons.forEach(b => {
        b.classList.remove('bg-gradient-to-r', 'from-pink-500', 'to-teal-400', 'text-white');
        b.classList.add('border', 'border-pink-500/40');
      });

      // Add active styles to clicked
      btn.classList.add('bg-gradient-to-r', 'from-pink-500', 'to-teal-400', 'text-white');
      btn.classList.remove('border', 'border-pink-500/40');

      currentFilter = btn.dataset.filter.toLowerCase();
      currentIndex = 0;
      updateVisibleGames();
    });
  });

  searchInput.addEventListener('input', () => {
    currentSearch = searchInput.value.toLowerCase();
    currentIndex = 0;
    updateVisibleGames();
  });

  loadMoreBtn.addEventListener('click', () => {
    currentIndex += BATCH_SIZE;
    updateVisibleGames();
  });

  // Init: set first button as active & load games
  currentIndex = 0;
  updateVisibleGames();
});
