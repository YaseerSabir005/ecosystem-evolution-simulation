Ecosystem Evolution Simulation
This project is an interactive, web-based simulation of a virtual ecosystem. It models the life cycles and interactions of different species competing for resources in a dynamic environment. Users can observe the principles of natural selection and population dynamics in real-time.

🚀 Features
Dynamic 2D World: A grid-based environment where life unfolds.

Multiple Species:

Grass: The primary producer, grows randomly in the environment.

Herbivores: Consumers that eat grass to gain energy.

Carnivores: Predators that hunt herbivores to survive.

Life Cycle Simulation: Creatures are born, move, eat, reproduce, and die based on their energy levels.

Interactive Controls:

Start/Stop: Play and pause the simulation.

Reset: Start a new simulation with the current parameters.

Customizable Parameters:

Grid Size: Adjust the size of the world.

Grass Growth Rate: Control the speed at which food becomes available.

Initial Populations: Set the starting number of herbivores and carnivores.

Real-time Statistics: Track the population of each species and the passage of time within the simulation.

Responsive Design: The interface adapts to different screen sizes, making it usable on both desktop and mobile devices.

🛠️ How to Use
You can run this simulation directly in your web browser.

Option 1: Using the Provided HTML file
If you have the single ecosystem_simulation.html file:

Save the file to your computer.

Open the file in any modern web browser (like Chrome, Firefox, or Edge).

Option 2: Using Separate Files
If you have the code split into index.html, style.css, and script.js:

Place all three files in the same folder.

Open the index.html file in your web browser.

The simulation will load with default parameters, and you can start it by clicking the "Start" button.

🎮 Controls and Parameters
Control Buttons
Start: Begins or resumes the simulation.

Stop: Pauses the simulation, freezing the ecosystem at its current state.

Reset: Stops the current simulation and generates a new world based on the selected parameters.

Parameters (Sliders)
Grid Size: Changes the width and height of the simulation grid. A larger grid can support a larger population.

Grass Growth Rate: Determines how many new patches of grass appear in each time step.

Initial Herbivores: Sets the number of herbivores at the start of a new simulation.

Initial Carnivores: Sets the number of carnivores at the start of a new simulation.

Note: Changing any parameter will automatically reset the simulation.

🧠 Simulation Logic
The simulation operates in discrete time steps. In each step, the following occurs:

Grass Growth: New grass patches are added to the world at random locations.

Creature Actions: Each creature (herbivore and carnivore) performs an action:

Movement: Creatures move to an adjacent grid cell, which consumes a small amount of energy.

Eating:

If a herbivore is on a grass cell, it eats the grass and gains energy.

If a carnivore and a herbivore are on the same cell, the carnivore eats the herbivore and gains energy.

Reproduction: If a creature has enough energy, it reproduces, creating an offspring in the same location and losing some energy in the process. There is a cooldown period before it can reproduce again.

Survival Check: Any creature whose energy drops to zero or below dies and is removed from the simulation.

Display Update: The grid and statistics are redrawn to reflect the new state of the world.

💡 Future Enhancements
This simulation provides a solid foundation that can be extended with more complex features:

Genetic Traits: Introduce traits like speed, size, or reproductive efficiency that can be passed down and mutate over time.

More Species: Add omnivores, scavengers, or different types of plants.

Environmental Factors: Simulate seasons, climate change, or natural disasters that affect the ecosystem.

Data Visualization: Create charts to graph population changes over time.

Advanced AI: Implement more intelligent movement for creatures, such as herbivores actively seeking grass or carnivores hunting in packs.

💻 Technology Stack
HTML5: For the structure and content of the web page.

CSS3 (with Tailwind CSS): For styling and creating a responsive user interface.

JavaScript (ES6): For all the simulation logic, DOM manipulation, and interactivity.
