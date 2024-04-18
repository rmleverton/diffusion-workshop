(function() {
    const container = document.getElementById('container');
    let tileSize = 64; // Declare tileSize variable
  
    let selectedTile = null;
    let selectedColor = null; // Store the selected color
  
    let generation = 0; // Initialize generation number
    let counter = 10;
    const counterElement = document.getElementById('counter');
    const changesLeftElement = document.getElementById('changes-left');
    const resetButton = document.getElementById('reset-button');
    const generationTitle = document.getElementById('generation-title'); // Get reference to generation title element
    let tiles = []; // Define tiles array outside createTiles
  
    function resizeElements() {
      console.log("Resizing");
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      const maxWidth = 2 * windowWidth / 3;
  
      tileSize = Math.min(maxWidth / 16, windowHeight / 16);
  
      container.style.width = `${16 * tileSize}px`;
      container.style.height = `${16 * tileSize}px`;
      container.style.marginLeft = `-${8 * tileSize}px`; // Adjust to center horizontally
      container.style.marginTop = `-${8 * tileSize}px`; // Adjust to center vertically
  
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
  
    function resetButtonHandler() {
        container.classList.remove('inactive');
        changesLeftElement.textContent = 'Changes left';
        counter = 10;
        selectedColor = null; // Reset selectedColor
        colorOptions.forEach(option => option.classList.remove('selected')); // Remove 'selected' class from all color options
        updateCounter();
        
        // Increment generation number and update title
        generation++;
        generationTitle.textContent = `Generation: ${generation}`;
    }
  
    resetButton.removeEventListener('click', resetButtonHandler); // Remove existing event listener
    resetButton.addEventListener('click', resetButtonHandler); // Add event listener again
    
})();
