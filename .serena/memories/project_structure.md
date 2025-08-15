# Project Structure

## Root Level Files
- `package.json` - Project dependencies and scripts
- `angular.json` - Angular CLI configuration
- `tsconfig.json` - TypeScript compiler options
- `tslint.json` - TSLint configuration (legacy, project uses both TSLint and newer ESLint packages)
- `karma.conf.js` - Karma test runner configuration
- `.editorconfig` - Editor configuration for consistent formatting
- `README.md` - Project documentation

## Source Code Structure (`src/`)
- `main.ts` - Application entry point
- `index.html` - Main HTML template
- `styles.scss` - Global styles
- `polyfills.ts` - Browser polyfills

## Application Structure (`src/app/`)

### Core Files
- `app.module.ts` - Main application module
- `app.component.ts/html/scss` - Root application component
- `app-routing.module.ts` - Application routing configuration

### Organized by Type

#### Components (`src/app/components/`)
- `bet-button/` - Betting controls
- `chip/` - Casino chip components
- `spin-button/` - Spin action button
- `money-display/` - Current balance display
- `game-history/` - Game history viewer
- `wallet-selection/` - Wallet type selection
- `toggle-wallet/` - Wallet switching controls
- `chat-container/` - Embedded chat functionality
- `win-conditions/` - Win condition display
- `faq-button/`, `close-button/`, `clear-button/` - UI control buttons
- `light/` - Animation/visual effect components
- `max-bet-button/` - Maximum bet controls
- `your-luck-here-text/` - Game messaging

#### Containers (`src/app/containers/`)
- `slot-machine/` - Main slot machine container component
- `reels/` - Slot reel logic and animations

#### Services (`src/app/services/`)
- `api.service.ts` - API communication
- `auth.service.ts` - Authentication handling
- `socket.service.ts` - Real-time socket connections

#### Models (`src/app/models/`)
- `game-slot.model.ts` - Game data models

#### Shared (`src/app/shared/`)
- `scss/` - Shared SCSS files (mixins, variables, animations)
- `constants.ts` - Application constants
- `color.ts` - Color definitions

#### Utilities
- `pipes/safe.pipe.ts` - Safe HTML pipe for security
- `slot.const.ts` - Slot game constants

## Assets (`src/assets/`)
- `buttons/` - Button images and chip graphics
- `images/` - Game symbols, UI elements, backgrounds
- `slot-machines/` - Slot machine graphics (red, yellow, violet themes)
- `backgrounds/` - Background images for different themes
- `audio/` - Sound effects (spinning, payout, knob-pull)
- `wallet/` - Wallet-related graphics
- `symbols/` - Slot symbols (fruits, numbers, scatter, etc.)

## Environment Configuration
- `src/environments/environment.ts` - Development environment config
- `src/environments/environment.prod.ts` - Production environment config