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
