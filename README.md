# re:member - An Incremental Game

## Project Description/Objectives

Inspired by games like Universal Paperclips and A Dark Room, Re:member is a product of my curiosity-driven exploration of game design, aiming to construct an engaging experience where various components intricately depend on each other, offering users meaningful choices. The project is specifically crafted to deepen my understanding of TypeScript within the React framework and to master the use of Sass for CSS styling.

While the game currently has a defined endpoint, I have exciting plans for the future, including expanding the narrative and introducing new game mechanics to keep the experience dynamic and engaging.

### Key Features:

- **Interconnected Gameplay Mechanics:** At the heart of the game is a dynamic "gameState" object that encapsulates the user's progress and decisions. The player's choices intricately shape the unlocking of new mechanics and upgrades, influencing both the timing and speed at which these elements become available. This interconnected system creates a personalized and evolving gaming experience based on individual player strategies and decisions. Notably, a featured game mechanic involves a simon-says-like game, serving as part of a decryption method to unlock an in-game cryptocurrency.

- **TypeScript and React Integration:** The game is built on the foundations of TypeScript integrated with React. TypeScript's strong typing offers a structured & reliable environment for implementing game logic. This integration simplifies development, ensuring a smooth and manageable project. It reflects a practical approach to utilizing modern technologies for the sake of efficiency and a more enjoyable game development experience.

- **Responsive Design for Seamless Shopping:** Experience a smooth gaming journey on various devices. Whether you're on your computer or a mobile device, the responsive design ensures a user-friendly interface, making gameplay enjoyable wherever you are. On mobile, the game features a simple tabbing structure for quick navigation, while the desktop version keeps things neatly organized in a straightforward bento-box layout. It's all about making the gaming experience accessible and comfortable, without any unnecessary fuss.

- **Local Storage & Base64 Encoding:** Game Saving and Loading Made Simple: The game employs local storage for automatic game saving, ensuring your progress is always preserved. To facilitate easy loading, a base64 encoded string is generated. It's a straightforward and practical solution for a hassle-free gaming experience.

## Table of Contents

- [Project Description](#project-description)
- [Table of Contents](#table-of-contents)
- [Live Demo](#demo)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Features](#features)
- [Contact](#contact)

## Demo

If you'd like to play the game and explore the project, you can do so by visiting https://mellifluous-sprinkles-ccda1b.netlify.app/

## Screenshots

### Desktop View

<img src="/src/assets/desktop-view.png" alt="Desktop View" width="800" />

### Mobile Resources View

<img src="/src/assets/resources-component.png" alt="Resources View" width="300" />

### Mobile File Explorer View

<img src="/src/assets/explorer-component.png" alt="File Explorer View" width="300"/>

### Mobile Networks View

<img src="/src/assets/network-component.png" alt="Networks View" width="300" />

### Mobile Decryption View

<img src="/src/assets/decryption-component.png" alt="File Explorer View" width="300"/>

### Mobile Save/Load Game View

<img src="/src/assets/save-game-component.png" alt="File Explorer View" width="300"/>

## Installation

### Cloning the repository

1. Clone the repository: `git clone https://github.com/itsdavehimself/incremental-game.git`

2. Navigate to the project directory: `cd incremental-game`

### Install Dependencies

3. Install dependencies: `cd client && npm install`

### Starting the App

4. You can start the client by running the following code: `npm run dev`

## Usage

Open your browser and navigate to `http://localhost:5173`

## Technologies

### Frontend

- React
- TypeScript
- Sass
- Vite

### Development Tools

- npm
- Git
- GitHub
- Visual Studio Code
- ESLint
- Prettier

## Features

- Responsive design for various screen sizes
- Dynamic game state management
- Use of local storage and base64 for automatic and manual game saving/loading

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

Email: davidsmolen@gmail.com
