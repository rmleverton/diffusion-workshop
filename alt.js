document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('container');
    // const tileSize = 64; // Assuming 1024x1024 canvas with 16x16 grid
    let tileSize = 64; // Declare tileSize variable
    let selectedTile = null;
    let counter = 5;
    const counterElement = document.getElementById('counter');
    const changesLeftElement = document.getElementById('changes-left');
    const resetButton = document.getElementById('reset-button');

     // Function to resize elements based on window size
function resizeElements() {
    console.log("Resizing");
    // const menuContainer = document.querySelector('.menu-container');
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const maxWidth = 2 * windowWidth / 3;

    // Set canvas dimensions
    // canvas.style.maxWidth = `${maxWidth}px`;
    // canvas.style.maxHeight = `${windowHeight}px`;

    // Calculate tile size based on the smaller dimension
    tileSize = Math.min(maxWidth / 16, windowHeight / 16);

    // Set container width and height
    container.style.width = `${16 * tileSize}px`;
    container.style.height = `${16 * tileSize}px`;

    // Set menu container position
    // menuContainer.style.top = `${windowHeight}px`;

    // Recreate tiles with new size
    // createTiles();
    tiles.forEach(tile => tile.resizeAndReposition(tileSize));

}


    // Call resizeElements function on page load and window resize
    window.addEventListener('load', function() {
        resizeElements();
        createTiles();
    });

    window.addEventListener('resize', resizeElements);

    // Color options
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(colorOption => {
        colorOption.addEventListener('click', function() {
            if (selectedTile) {
                selectedTile.style.backgroundColor = getComputedStyle(colorOption).getPropertyValue('--color');
                selectedTile.classList.remove('hover');
                selectedTile.classList.remove('selected');
                selectedTile = null;
                counter--;
                updateCounter();
                if (counter === 0) {
                    container.classList.add('inactive');
                    changesLeftElement.textContent = 'No changes left';
                }
            }
        });
    });

    // Function to create tiles
    function createTiles() {
        // Clear existing tiles
        container.innerHTML = '';

        // Create tiles
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                const x = i * tileSize;
                const y = j * tileSize;
                const tileDiv = document.createElement('div');
                tileDiv.className = 'tile';
                tileDiv.style.position = 'absolute';
                tileDiv.style.left = x + 'px';
                tileDiv.style.top = y + 'px';
                tileDiv.style.width = tileSize + 'px';
                tileDiv.style.height = tileSize + 'px';
                tileDiv.style.backgroundColor = getRandomColor();
                container.appendChild(tileDiv);

                // Add event listeners for hovering over tiles
                tileDiv.addEventListener('mouseenter', function() {
                    if (!selectedTile) {
                        tileDiv.classList.add('hover');
                    }
                });

                tileDiv.addEventListener('mouseleave', function() {
                    if (!selectedTile) {
                        tileDiv.classList.remove('hover');
                    }
                });

                // Add event listener for selecting tiles
                tileDiv.addEventListener('click', function() {
                    if (!container.classList.contains('inactive')) {
                        if (selectedTile === tileDiv) {
                            selectedTile.classList.remove('selected');
                            selectedTile = null;
                        } else {
                            if (selectedTile) {
                                selectedTile.classList.remove('selected');
                            }
                            selectedTile = tileDiv;
                            selectedTile.classList.add('selected');
                        }
                    }
                });
            }
        }
    }

    // Initial creation of tiles
    createTiles();

    // Function to get random color from color options
    function getRandomColor() {
        return getComputedStyle(colorOptions[Math.floor(Math.random() * colorOptions.length)]).getPropertyValue('--color');
    }

    // Update the counter
    function updateCounter() {
        counterElement.textContent = counter;
    }

    updateCounter(); // Initial update

    // Reset game when "Next player" button is clicked
    resetButton.addEventListener('click', function() {
        container.classList.remove('inactive');
        changesLeftElement.textContent = 'Changes left';
        counter = 5;
        updateCounter();
    });
});
