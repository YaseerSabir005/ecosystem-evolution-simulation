# 🌱 Ecosystem Evolution Simulation

**Ecosystem Evolution Simulation** is an interactive, web-based simulation of a virtual ecosystem. It models the life cycles and interactions of different species competing for resources in a dynamic environment. Users can observe the principles of natural selection and population dynamics in real-time.

---

## 🚀 Features

✅ **Dynamic 2D World**  
A grid-based environment where life unfolds.

✅ **Multiple Species**

- **Grass**: The primary producer, grows randomly in the environment.
- **Herbivores**: Consumers that eat grass to gain energy.
- **Carnivores**: Predators that hunt herbivores to survive.

✅ **Life Cycle Simulation**  
Creatures are born, move, eat, reproduce, and die based on their energy levels.

✅ **Interactive Controls**

- **Start/Stop**: Play and pause the simulation.
- **Reset**: Start a new simulation with the current parameters.

✅ **Customizable Parameters**

- **Grid Size**: Adjust the size of the world.
- **Grass Growth Rate**: Control the speed at which food becomes available.
- **Initial Populations**: Set the starting number of herbivores and carnivores.

✅ **Real-time Statistics**  
Track the population of each species and the passage of time within the simulation.

✅ **Responsive Design**  
The interface adapts to different screen sizes, making it usable on both desktop and mobile devices.

---

## 🛠️ How to Use

You can run this simulation directly in your web browser.

### Option 1: Using the Provided HTML File

1. Save the file `ecosystem_simulation.html` to your computer.
2. Open the file in any modern web browser (e.g., Chrome, Firefox, Edge).

### Option 2: Using Separate Files

1. Place all three files — `index.html`, `style.css`, and `script.js` — in the same folder.
2. Open `index.html` in your web browser.

The simulation will load with default parameters, and you can start it by clicking the **Start** button.

---

## 🎮 Controls and Parameters

### Control Buttons

- **Start**: Begins or resumes the simulation.
- **Stop**: Pauses the simulation, freezing the ecosystem at its current state.
- **Reset**: Stops the current simulation and generates a new world based on the selected parameters.

### Parameters (Sliders)

- **Grid Size**: Changes the width and height of the simulation grid. A larger grid can support a larger population.
- **Grass Growth Rate**: Determines how many new patches of grass appear in each time step.
- **Initial Herbivores**: Sets the number of herbivores at the start of a new simulation.
- **Initial Carnivores**: Sets the number of carnivores at the start of a new simulation.

> **Note:** Changing any parameter will automatically reset the simulation.

---

## 🧠 Simulation Logic

The simulation operates in discrete time steps. In each step, the following occurs:

1. **Grass Growth**  
   New grass patches are added to the world at random locations.

2. **Creature Actions**  
   Each creature (herbivore and carnivore) performs an action:
   
   - **Movement**: Creatures move to an adjacent grid cell, consuming a small amount of energy.
   - **Eating**:
     - Herbivores eat grass to gain energy.
     - Carnivores eat herbivores if they share the same cell, gaining energy.
   - **Reproduction**: If a creature has enough energy, it reproduces, creating offspring in the same location and losing some energy in the process. A cooldown period prevents immediate re-reproduction.
   - **Survival Check**: Creatures whose energy drops to zero or below die and are removed from the simulation.

3. **Display Update**  
   The grid and statistics are redrawn to reflect the new state of the world.

---

## 💡 Future Enhancements

This simulation provides a solid foundation that can be extended with more complex features:

- **Genetic Traits**: Introduce traits like speed, size, or reproductive efficiency that can be passed down and mutate over time.
- **More Species**: Add omnivores, scavengers, or different types of plants.
- **Environmental Factors**: Simulate seasons, climate change, or natural disasters that affect the ecosystem.
- **Data Visualization**: Create charts to graph population changes over time.
- **Advanced AI**: Implement smarter creature behavior, such as herbivores actively seeking grass or carnivores hunting in packs.

---

## 💻 Technology Stack

- **HTML5**: Structure and content of the web page.
- **CSS3 (with Tailwind CSS)**: Styling and responsive user interface.
- **JavaScript (ES6)**: Simulation logic, DOM manipulation, and interactivity.
