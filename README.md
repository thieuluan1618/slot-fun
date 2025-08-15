# SlotFun 🎰

An engaging online slot machine game built with Angular and PIXI.js, featuring real-time multiplayer chat and immersive casino-style gameplay.

**[🎮 Live Demo](https://slot-fun-game.netlify.app/)**

## 🚀 Features

- **Slot Machine Gameplay**: Animated slot reels with various fruit symbols and win conditions
- **Virtual Betting System**: Multiple chip denominations and wallet management
- **Real-time Multiplayer**: Socket.io powered real-time game synchronization
- **Integrated Chat**: KiwiIRC embedded chat for player interaction
- **Game History**: Track your wins, losses, and betting patterns
- **Audio Experience**: Immersive sound effects for spins and payouts
- **Responsive Design**: Optimized for desktop with mobile compatibility

## 🛠️ Tech Stack

- **Frontend**: Angular 17.3.12 with TypeScript 5.4.5
- **Game Engine**: PIXI.js 8.5.0 for smooth animations
- **Styling**: SCSS with Bootstrap 5.3.2
- **State Management**: NgRx Store 17.2.0
- **Real-time**: Socket.io Client 4.8.0
- **Authentication**: Auth0 Angular JWT 5.2.0
- **Testing**: Karma + Jasmine

## 🏗️ Development

### Prerequisites
- Node.js (latest LTS)
- npm or yarn
- Modern web browser

### Setup
```bash
# Clone the repository
git clone https://github.com/thieuluan1618/slot-fun.git
cd slot-fun

# Install dependencies
npm install
```

### Development Server
```bash
# Start development server
npm start
# or
ng serve
```
Navigate to `http://localhost:4200/`. The app will automatically reload when you make changes.

### Available Scripts
```bash
# Development
npm start          # Start dev server with increased memory allocation
ng serve           # Standard dev server

# Building
ng build           # Development build
ng build --prod    # Production build

# Testing
ng test            # Run unit tests
ng e2e             # Run end-to-end tests

# Code Quality
ng lint            # Run TSLint checks

# Deployment
ng deploy          # Deploy to Netlify
```

### Code Scaffolding
```bash
ng generate component component-name
ng generate service service-name
ng generate directive|pipe|guard|interface|enum|module
```

## 📁 Project Structure

```
src/
├── app/
│   ├── components/        # Reusable UI components
│   ├── containers/        # Smart components (slot-machine, reels)
│   ├── services/          # API, auth, and socket services
│   ├── models/            # TypeScript interfaces and models
│   ├── shared/            # Shared utilities, constants, and styles
│   └── pipes/             # Custom pipes
├── assets/                # Static assets
│   ├── images/            # Game symbols and UI graphics
│   ├── audio/             # Sound effects
│   ├── buttons/           # Button graphics and chips
│   └── backgrounds/       # Theme backgrounds
└── environments/          # Environment configurations
```

## 🎮 Game Mechanics

- **Betting**: Choose chip values (10, 20, 50, 100, 250, 500)
- **Spinning**: Click spin button to start the reels
- **Winning**: Match symbols across paylines for payouts
- **Wallets**: Switch between primary and promotional wallets
- **Chat**: Interact with other players in real-time

## 🚀 Deployment

The project is automatically deployed to Netlify when changes are merged to the `main` branch.

**Production URL**: https://slot-fun-game.netlify.app/

### Manual Deployment
```bash
ng build --prod
ng deploy
```

## Ideas

-Only winning condition is added and implemented from requirement, Its great idea to add fail(lose) too
-Desktop design only provided, not apt for small devices
-Better user interface ideas can be implement

