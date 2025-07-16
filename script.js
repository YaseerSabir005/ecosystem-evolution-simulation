// DOM Elements
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const gridContainer = document.getElementById('grid-container');
const timeStepsEl = document.getElementById('time-steps');
const herbivoreCountEl = document.getElementById('herbivore-count');
const carnivoreCountEl = document.getElementById('carnivore-count');

// Parameter Inputs
const gridSizeInput = document.getElementById('grid-size');
const grassGrowthInput = document.getElementById('grass-growth');
const initialHerbivoresInput = document.getElementById('initial-herbivores');
const initialCarnivoresInput = document.getElementById('initial-carnivores');

// Parameter Value Displays
const gridSizeValue = document.getElementById('grid-size-value');
const grassGrowthValue = document.getElementById('grass-growth-value');
const initialHerbivoresValue = document.getElementById('initial-herbivores-value');
const initialCarnivoresValue = document.getElementById('initial-carnivores-value');

// Simulation State
let simulationInterval;
let world;
let timeSteps = 0;

// Base class for all creatures in the simulation
class Creature {
    constructor(x, y, energy) {
        this.x = x;
        this.y = y;
        this.energy = energy;
    }

    move(world) {
        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
        const direction = directions[Math.floor(Math.random() * directions.length)];
        const newX = (this.x + direction[0] + world.size) % world.size;
        const newY = (this.y + direction[1] + world.size) % world.size;
        this.x = newX;
        this.y = newY;
        this.energy--;
    }

    isAlive() {
        return this.energy > 0;
    }
}

// Herbivore class, consumes grass
class Herbivore extends Creature {
    constructor(x, y) {
        super(x, y, 10); // Initial energy
        this.reproductionCooldown = 0;
    }

    eat(world) {
        if (world.grid[this.y][this.x] === 1) {
            this.energy += 5;
            world.grid[this.y][this.x] = 0;
        }
    }

    reproduce(world) {
        if (this.energy > 15 && this.reproductionCooldown === 0) {
            this.energy -= 10;
            this.reproductionCooldown = 10; // Cooldown period
            return new Herbivore(this.x, this.y);
        }
        if (this.reproductionCooldown > 0) {
            this.reproductionCooldown--;
        }
        return null;
    }

    update(world) {
        this.move(world);
        this.eat(world);
        return this.reproduce(world);
    }
}

// Carnivore class, consumes herbivores
class Carnivore extends Creature {
    constructor(x, y) {
        super(x, y, 20); // Initial energy
        this.reproductionCooldown = 0;
    }

    eat(world) {
        // Find a herbivore at the same location
        const preyIndex = world.herbivores.findIndex(h => h.x === this.x && h.y === this.y);
        if (preyIndex !== -1) {
            this.energy += 15;
            world.herbivores.splice(preyIndex, 1); // Remove the eaten herbivore
        }
    }
    
    reproduce(world) {
        if (this.energy > 30 && this.reproductionCooldown === 0) {
            this.energy -= 20;
            this.reproductionCooldown = 20; // Cooldown period
            return new Carnivore(this.x, this.y);
        }
        if (this.reproductionCooldown > 0) {
            this.reproductionCooldown--;
        }
        return null;
    }

    update(world) {
        this.move(world);
        this.eat(world);
        return this.reproduce(world);
    }
}

// World class to manage the simulation environment
class World {
    constructor(size, grassRate, initialHerbs, initialCarns) {
        this.size = size;
        this.grassRate = grassRate;
        this.grid = Array(size).fill(0).map(() => Array(size).fill(0));
        this.herbivores = [];
        this.carnivores = [];
        this.initialize(initialHerbs, initialCarns);
    }

    initialize(initialHerbs, initialCarns) {
        // Initial grass placement
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                if (Math.random() < 0.3) {
                    this.grid[y][x] = 1; // 1 represents grass
                }
            }
        }

        // Initial herbivore placement
        for (let i = 0; i < initialHerbs; i++) {
            const x = Math.floor(Math.random() * this.size);
            const y = Math.floor(Math.random() * this.size);
            this.herbivores.push(new Herbivore(x, y));
        }

        // Initial carnivore placement
        for (let i = 0; i < initialCarns; i++) {
            const x = Math.floor(Math.random() * this.size);
            const y = Math.floor(Math.random() * this.size);
            this.carnivores.push(new Carnivore(x, y));
        }
    }

    growGrass() {
        for (let i = 0; i < this.grassRate; i++) {
            const x = Math.floor(Math.random() * this.size);
            const y = Math.floor(Math.random() * this.size);
            this.grid[y][x] = 1;
        }
    }

    update() {
        this.growGrass();
        
        // Update herbivores
        const newHerbivores = [];
        this.herbivores.forEach(h => {
            const offspring = h.update(this);
            if (offspring) newHerbivores.push(offspring);
        });
        this.herbivores.push(...newHerbivores);

        // Update carnivores
        const newCarnivores = [];
        this.carnivores.forEach(c => {
            const offspring = c.update(this);
            if (offspring) newCarnivores.push(offspring);
        });
        this.carnivores.push(...newCarnivores);

        // Remove dead creatures
        this.herbivores = this.herbivores.filter(h => h.isAlive());
        this.carnivores = this.carnivores.filter(c => c.isAlive());
    }
}

// Function to draw the world grid
function drawWorld(world) {
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `repeat(${world.size}, minmax(0, 1fr))`;
    
    const displayGrid = Array(world.size).fill(0).map(() => Array(world.size).fill(''));

    // Mark grass positions
    for (let y = 0; y < world.size; y++) {
        for (let x = 0; x < world.size; x++) {
            if (world.grid[y][x] === 1) {
                displayGrid[y][x] = 'grass';
            }
        }
    }
    
    // Mark herbivore positions
    world.herbivores.forEach(h => {
        displayGrid[h.y][h.x] = 'herbivore';
    });
    
    // Mark carnivore positions
    world.carnivores.forEach(c => {
        displayGrid[c.y][c.x] = 'carnivore';
    });

    // Create and append cell elements
    for (let y = 0; y < world.size; y++) {
        for (let x = 0; x < world.size; x++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell ' + displayGrid[y][x];
            gridContainer.appendChild(cell);
        }
    }
}

// Function to update statistics
function updateStats() {
    timeStepsEl.textContent = timeSteps;
    herbivoreCountEl.textContent = world.herbivores.length;
    carnivoreCountEl.textContent = world.carnivores.length;
}

// Main simulation loop
function simulationLoop() {
    timeSteps++;
    world.update();
    drawWorld(world);
    updateStats();
    
    // Stop simulation if all creatures are gone
    if (world.herbivores.length === 0 && world.carnivores.length === 0) {
        clearInterval(simulationInterval);
        simulationInterval = null;
    }
}

// Function to reset and initialize the simulation
function resetSimulation() {
    clearInterval(simulationInterval);
    simulationInterval = null;
    timeSteps = 0;
    const gridSize = parseInt(gridSizeInput.value);
    const grassRate = parseInt(grassGrowthInput.value);
    const initialHerbs = parseInt(initialHerbivoresInput.value);
    const initialCarns = parseInt(initialCarnivoresInput.value);
    world = new World(gridSize, grassRate, initialHerbs, initialCarns);
    drawWorld(world);
    updateStats();
}

// Event Listeners for controls
startBtn.addEventListener('click', () => {
    if (!simulationInterval) {
        simulationInterval = setInterval(simulationLoop, 200);
    }
});

stopBtn.addEventListener('click', () => {
    clearInterval(simulationInterval);
    simulationInterval = null;
});

resetBtn.addEventListener('click', resetSimulation);

// Event listeners for parameter changes
gridSizeInput.addEventListener('input', (e) => {
    gridSizeValue.textContent = `${e.target.value}x${e.target.value}`;
    resetSimulation();
});
grassGrowthInput.addEventListener('input', (e) => {
    grassGrowthValue.textContent = e.target.value;
    resetSimulation();
});
initialHerbivoresInput.addEventListener('input', (e) => {
    initialHerbivoresValue.textContent = e.target.value;
    resetSimulation();
});
initialCarnivoresInput.addEventListener('input', (e) => {
    initialCarnivoresValue.textContent = e.target.value;
    resetSimulation();
});

// Initial setup on page load
document.addEventListener('DOMContentLoaded', resetSimulation);
