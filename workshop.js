// document.addEventListener("DOMContentLoaded", function() {
//     const container = document.getElementById('container');
//     let tileSize = 64; // Declare tileSize variable
//     let selectedTile = null;
//     let counter = 5;
//     const counterElement = document.getElementById('counter');
//     const changesLeftElement = document.getElementById('changes-left');
//     const resetButton = document.getElementById('reset-button');

//     function resizeElements() {
//         console.log("Resizing");
//         //const menuContainer = document.querySelector('.menu-container');
//         const windowHeight = window.innerHeight;
//         const windowWidth = window.innerWidth;
//         const maxWidth = 2 * windowWidth / 3;

//         // Set menu container position
//         //menuContainer.style.top = '10px'; // Adjust the position as needed

//         // Calculate tile size based on the smaller dimension
//         tileSize = Math.min(maxWidth / 16, windowHeight / 16);

//         // Set container width and height
//         container.style.width = `${16 * tileSize}px`;
//         container.style.height = `${16 * tileSize}px`;

//         // Resize and reposition tiles
//         tiles.forEach(tile => tile.resizeAndReposition(tileSize));
//     }


//     // Call resizeElements function on page load and window resize
//     window.addEventListener('load', function() {
//         resizeElements();
//         createTiles();
//     });

//     window.addEventListener('resize', resizeElements);

//     // Color options
//     const colorOptions = document.querySelectorAll('.color-option');
//     colorOptions.forEach(colorOption => {
//         colorOption.addEventListener('click', function() {
//             if (selectedTile) {
//                 selectedTile.color = getComputedStyle(colorOption).getPropertyValue('--color');
//                 selectedTile.element.style.backgroundColor = selectedTile.color;
//                 selectedTile.element.classList.remove('hover');
//                 selectedTile.element.classList.remove('selected');
//                 selectedTile = null;
//                 counter--;
//                 updateCounter();
//                 if (counter === 0) {
//                     container.classList.add('inactive');
//                     changesLeftElement.textContent = 'No changes left';
//                 }
//             }
//         });
//     });

//     // Tile class definition
// class Tile {
//     constructor(x, y, size) {
//         this.x = x;
//         this.y = y;
//         this.size = size;
//         this.color = getRandomColor();
//         this.element = null;

        
//     }

//     draw() {
//         if (!this.element) {
//             this.element = document.createElement('div');
//             this.element.className = 'tile';
//             this.element.style.position = 'absolute';
//             container.appendChild(this.element);
//         }

//         this.element.style.left = this.x + 'px';
//         this.element.style.top = this.y + 'px';
//         this.element.style.width = this.size + 'px';
//         this.element.style.height = this.size + 'px';
//         this.element.style.backgroundColor = this.color;
//     }

//     resizeAndReposition(newSize) {
//         // Calculate new position
//         const newX = Math.round(this.x / this.size) * newSize;
//         const newY = Math.round(this.y / this.size) * newSize;

//         // Update position and size
//         this.x = newX;
//         this.y = newY;
//         this.size = newSize;

//         // Redraw the tile
//         this.draw();
//     }
// }


//     // Create tiles
//     const tiles = [];
//     for (let i = 0; i < 16; i++) {
//         for (let j = 0; j < 16; j++) {
//             const x = i * tileSize;
//             const y = j * tileSize;
//             const tile = new Tile(x, y, tileSize);
            
//             tiles.push(tile);
//         }
//     }

//     // Draw tiles
//     function drawTiles() {
//         tiles.forEach(tile => tile.draw());
//     }

//     // Initial draw of tiles
//     drawTiles();

//     // Function to get random color from color options
//     function getRandomColor() {
//         return getComputedStyle(colorOptions[Math.floor(Math.random() * colorOptions.length)]).getPropertyValue('--color');
//     }

//     // Update the counter
//     function updateCounter() {
//         counterElement.textContent = counter;
//     }

//     updateCounter(); // Initial update

//     // Reset game when "Next player" button is clicked
//     resetButton.addEventListener('click', function() {
//         container.classList.remove('inactive');
//         changesLeftElement.textContent = 'Changes left';
//         counter = 5;
//         updateCounter();
//     });
// });
(function() {
    const container = document.getElementById('container');
    let tileSize = 64; // Declare tileSize variable
    let selectedTile = null;
    let selectedColor = null; // Store the selected color
    let counter = 5;
    const counterElement = document.getElementById('counter');
    const changesLeftElement = document.getElementById('changes-left');
    const resetButton = document.getElementById('reset-button');
    let tiles = []; // Define tiles array

    function resizeElements() {
        console.log("Resizing");
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        const maxWidth = 2 * windowWidth / 3;

        tileSize = Math.min(maxWidth / 16, windowHeight / 16);

        container.style.width = `${16 * tileSize}px`;
        container.style.height = `${16 * tileSize}px`;

        tiles.forEach(tile => tile.resizeAndReposition(tileSize));
    }

    window.addEventListener('load', function() {
        createTiles();
    });

    window.addEventListener('resize', resizeElements);

    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(colorOption => {
        colorOption.addEventListener('click', function() {
            selectedColor = getComputedStyle(colorOption).getPropertyValue('--color');
            colorOptions.forEach(option => option.classList.remove('selected'));
            colorOption.classList.add('selected');
        });
    });

    class Tile {
        constructor(x, y, size) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = getRandomColor();
            this.element = null;
        }

        draw() {
            if (!this.element) {
                this.element = document.createElement('div');
                this.element.className = 'tile';
                this.element.style.position = 'absolute';
                container.appendChild(this.element);
            }

            this.element.style.left = this.x + 'px';
            this.element.style.top = this.y + 'px';
            this.element.style.width = this.size + 'px';
            this.element.style.height = this.size + 'px';
            this.element.style.backgroundColor = this.color;

            // Add click event listener to select tile
            this.element.addEventListener('click', () => {
                if (selectedColor && counter > 0) {
                    this.color = selectedColor;
                    this.element.style.backgroundColor = selectedColor;
                    counter--;
                    updateCounter();
                    if (counter === 0) {
                        container.classList.add('inactive');
                        changesLeftElement.textContent = 'No changes left';
                    }
                }
            });
        }

        resizeAndReposition(newSize) {
            const newX = Math.round(this.x / this.size) * newSize;
            const newY = Math.round(this.y / this.size) * newSize;

            this.x = newX;
            this.y = newY;
            this.size = newSize;

            this.draw();
        }
    }

    function createTiles() {
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                const x = i * tileSize;
                const y = j * tileSize;
                const tile = new Tile(x, y, tileSize);
                tiles.push(tile);
            }
        }
        resizeElements(); // Call resizeElements after tiles are created
    }

    function getRandomColor() {
        return getComputedStyle(colorOptions[Math.floor(Math.random() * colorOptions.length)]).getPropertyValue('--color');
    }

    function updateCounter() {
        counterElement.textContent = counter;
    }

    updateCounter(); // Initial update

    resetButton.addEventListener('click', function() {
        container.classList.remove('inactive');
        changesLeftElement.textContent = 'Changes left';
        counter = 5;
        updateCounter();
    });
})();
