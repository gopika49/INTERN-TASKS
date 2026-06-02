const stateMap = document.getElementById('indiaMap');
const detailsTitle = document.getElementById('detailsTitle');
const detailsSubtitle = document.getElementById('detailsSubtitle');
const detailsList = document.getElementById('detailsList');
const stateSearch = document.getElementById('stateSearch');
const resetButton = document.getElementById('resetSelection');

let statesData = [];
let activePath = null;
let aliasMap = {
  'Jammu & Kashmir': 'Jammu and Kashmir',
  'Dadra & Diu': 'Dadra and Nagar Haveli and Daman and Diu',
  'Andaman & Nicobar': 'Andaman and Nicobar Islands'
};

fetch('states.json')
  .then((response) => response.json())
  .then((data) => {
    statesData = data;
    initializeMap();
    initializeSearch();
  })
  .catch((error) => {
    console.error('Failed to load state data:', error);
    detailsTitle.textContent = 'Data failed to load';
    detailsSubtitle.textContent = 'Please refresh the page.';
  });

function initializeMap() {
  const statePaths = stateMap.querySelectorAll('.map-state');
  const stateLabels = stateMap.querySelectorAll('.state-label');

  statePaths.forEach((path) => {
    path.addEventListener('click', () => {
      const stateName = path.dataset.state;
      const state = statesData.find((item) => item.name === stateName);
      if (state) {
        selectState(path, state);
      }
    });

    path.addEventListener('mouseenter', () => path.classList.add('hover'));
    path.addEventListener('mouseleave', () => path.classList.remove('hover'));
  });

  stateLabels.forEach((label) => {
    label.addEventListener('click', () => {
      const rawText = label.textContent.trim();
      const stateName = aliasMap[rawText] || rawText;
      const state = statesData.find((item) => item.name === stateName);
      if (state) {
        const path = stateMap.querySelector(`.map-state[data-state="${state.name}"]`);
        if (path) {
          selectState(path, state);
        }
      }
    });

    label.addEventListener('mouseenter', () => label.classList.add('hover'));
    label.addEventListener('mouseleave', () => label.classList.remove('hover'));
  });
}

function initializeSearch() {
  if (!stateSearch || !resetButton) {
    return;
  }

  stateSearch.addEventListener('input', handleSearchInput);
  stateSearch.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      findExactMatch();
    }
  });

  resetButton.addEventListener('click', () => {
    stateSearch.value = '';
    resetSelection();
  });
}

function handleSearchInput() {
  const query = stateSearch.value.trim().toLowerCase();
  const matches = statesData.filter((item) => item.name.toLowerCase().includes(query));
  updateSearchHighlights(matches);

  if (query.length === 0) {
    detailsSubtitle.textContent = 'Click a region on the map to see five important points.';
    return;
  }

  if (matches.length === 1) {
    const path = stateMap.querySelector(`.map-state[data-state="${matches[0].name}"]`);
    if (path) {
      selectState(path, matches[0], false);
    }
  } else if (matches.length === 0) {
    detailsSubtitle.textContent = 'No matching state found. Try another name.';
  } else {
    detailsSubtitle.textContent = `${matches.length} possible matches found. Refine your search or click a highlighted state.`;
  }
}

function findExactMatch() {
  const query = stateSearch.value.trim().toLowerCase();
  if (!query) {
    return;
  }

  const exactMatch = statesData.find((item) => item.name.toLowerCase() === query);
  if (exactMatch) {
    const path = stateMap.querySelector(`.map-state[data-state="${exactMatch.name}"]`);
    if (path) {
      selectState(path, exactMatch);
      return;
    }
  }

  detailsSubtitle.textContent = 'No exact state match found. Try a different name.';
}

function updateSearchHighlights(matches) {
  const statePaths = stateMap.querySelectorAll('.map-state');
  statePaths.forEach((path) => {
    path.classList.remove('match');
  });

  matches.forEach((state) => {
    const path = stateMap.querySelector(`.map-state[data-state="${state.name}"]`);
    if (path) {
      path.classList.add('match');
    }
  });
}

function resetSelection() {
  if (activePath) {
    activePath.classList.remove('active');
    activePath = null;
  }

  const statePaths = stateMap.querySelectorAll('.map-state');
  statePaths.forEach((path) => path.classList.remove('match'));

  detailsTitle.textContent = 'Select a state';
  detailsSubtitle.textContent = 'Click a region on the map to see five important points.';
  detailsList.innerHTML = '<p class="note">State information appears here after selection.</p>';
}

function selectState(path, state, smoothScroll = true) {
  if (activePath) {
    activePath.classList.remove('active');
  }
  activePath = path;
  activePath.classList.add('active');

  detailsTitle.textContent = state.name;
  detailsSubtitle.textContent = `${state.type}`;

  detailsList.innerHTML = `
    <div class="detail-point">
      <strong>Capital</strong>
      <span>${state.capital}</span>
    </div>
    <div class="detail-point">
      <strong>Official Language</strong>
      <span>${state.language}</span>
    </div>
    <div class="detail-point">
      <strong>Famous Tourist Place</strong>
      <span>${state.touristPlace}</span>
    </div>
    <div class="detail-point">
      <strong>Major Industry</strong>
      <span>${state.industry}</span>
    </div>
    <div class="detail-point">
      <strong>Interesting Fact</strong>
      <span>${state.fact}</span>
    </div>
  `;

  if (smoothScroll) {
    path.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

