const softwareGrid = document.querySelectorAll('.software-grid');
const tiledViewBtn = document.getElementById('tiledViewBtn');
const detailedViewBtn = document.getElementById('detailedViewBtn');

// Hide the grid initially
softwareGrid.forEach(grid => grid.style.visibility = 'hidden');

// Check and set initial view from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedView = localStorage.getItem('viewMode');
    
    if (savedView === 'detailed') {
        setDetailedView();
    } else {
        setTiledView();
    }
    
    // Once the view is applied, show the grid
    softwareGrid.forEach(grid => grid.style.visibility = 'visible');
});

tiledViewBtn.addEventListener('click', () => {
    setTiledView();
    localStorage.setItem('viewMode', 'tiled'); // Save the selected view mode
});

detailedViewBtn.addEventListener('click', () => {
    setDetailedView();
    localStorage.setItem('viewMode', 'detailed'); // Save the selected view mode
});

function setTiledView() {
    softwareGrid.forEach(grid => {
        grid.classList.remove('list-view');
        grid.classList.add('grid-view');
    });
}

function setDetailedView() {
    softwareGrid.forEach(grid => {
        grid.classList.remove('grid-view');
        grid.classList.add('list-view');
    });
}

// Detect current language from URL path
const isRussian = window.location.pathname.includes('/ru/');

// Store data in JSON file
const currentPage = window.location.pathname
  .split("/")
  .pop()
  .replace(".html", "");

fetch('../../../js/data.json') // adjust as needed
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('software-list');
    if (!container) return;

    data
      .filter(item => item.pages.includes(currentPage))
      .forEach(item => {
        container.innerHTML += `
          <div class="software-item">
            <a href="${item.link}">
              <img src="${item.image}">
              <p>${isRussian ? item['title-ru'] : item.title}</p>
            </a>
          </div>
        `;
      });
  })
  .catch(error => console.error("Error loading data:", error));
