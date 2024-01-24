# re:member - An Incremental Game

## Project Description/Objectives

Inspired by games like Universal Paperclips and A Dark Room, Re:member is a product of my curiosity-driven exploration of game design, aiming to construct an engaging experience where various components intricately depend on each other, offering users meaningful choices. The project is specifically crafted to deepen my understanding of TypeScript within the React framework and to master the use of Sass for CSS styling. In addition to learning more about Typescript & Sass, this project also served as a valuable opportunity for me to enhance my proficiency in testing using Vitest and Jest, adding another layer to my skill set.

While the game currently has a defined endpoint, I have exciting plans for the future, including expanding the narrative and introducing new game mechanics to keep the experience dynamic and engaging.

### Key Features:

- **Interconnected Gameplay Mechanics:** The game's core is the dynamic "gameState" object, tracking user progress. Player choices drive mechanic and upgrade unlocking, determining availability speed. This system allows players to create individual strategies. A key mechanic is a simon-says-like game, part of a decryption method to unlock in-game cryptocurrency.

- **TypeScript and React Integration:** The game combines TypeScript and React for reliable game logic in a streamlined development process, utilizing modern technologies for efficiency and a smooth experience.

- **Responsive Design for Seamless Gaming:** Enjoy seamless gaming on desktop and mobile. Responsive design ensures a user-friendly interface, featuring simple tabbing for mobile and a neat bento-box layout for desktop convenience.

- **Local Storage & Base64 Encoding:** The game employs local storage for automatic game saving, ensuring player progress is always preserved. To facilitate easy loading, a base64 encoded string is generated that can be saved for loading later on.

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

### Testing

- Vitest
- Jest

## Features

- Responsive design for various screen sizes
- Dynamic game state management
- Use of local storage and base64 for automatic and manual game saving/loading

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

Email: davidsmolen@gmail.com
