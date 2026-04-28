# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server at http://localhost:4200 (ng serve)
npm run build      # Dev build (output: dist/slot-fun)
ng build --prod    # Production build (uses environment.prod.ts)
npm test           # Unit tests (Karma + Jasmine)
npm run lint       # ESLint
ng deploy          # Deploy to Netlify
ng generate component <name>  # Scaffolding (standalone + SCSS, no test files)
```

## Architecture

Angular 17 slot machine game using PIXI.js 8 for reel rendering. Single-page app with no routing — everything renders through `AppComponent` → `SlotMachineComponent`.

### Key layers

- **Containers** (`containers/`): Smart components that own game logic
  - `slot-machine` — orchestrates betting, spinning, wallet, history. Coordinates between API results and the Reels renderer.
  - `reels` — standalone PIXI.js Application embedded via `ViewChild`. Owns the entire reel animation lifecycle: asset loading, tween-based spinning, win effects (buzz, glow, sparkle, rainbow). This is the rendering core.
- **Components** (`components/`): Presentational UI (chip, spin-button, bet-button, money-display, game-history, wallet-selection, etc.). All standalone components with SCSS.
- **Services** (`services/`):
  - `AuthService` — JWT login via `@auth0/angular-jwt`, stores token in localStorage
  - `ApiService` — HTTP calls to `gateway.api.jackpot2024.win` (join room, place order, history, balance)
  - `SocketService` — Socket.io connection to real-time game server
  - `LoadingService` — BehaviorSubject-based loading state for the animated loading overlay

### Reel mechanics

The `Reels` component uses a custom tween system (not PIXI's built-in). `startPlay(winRatio?)` accepts a win ratio number that maps to a specific symbol combination via `getSymbolsForWinRatio()`. Each reel has a pattern (`reelPatterns`) and weight system (`SYMBOL_WEIGHTS`) that determines final stopping position. The backout easing creates the slot-machine bounce effect.

Win ratios: 150=Bell, 100=Cherries, 90=Grapes, 80=Lemon, 70=Melon, 60=Orange, 50=Scatter, 0=Seven(Jackpot).

### State management

NgRx Store is imported but not actively used — state lives in component properties. Wallet switching triggers `outRoom()` → `joinRoom()` API sequence.

### Environment config

`src/environments/environment.ts` holds API URLs, socket URL, and KiwiIRC config. Production build swaps to `environment.prod.ts` via Angular file replacements.

### Schematics config

`angular.json` schematics set `skipTests: true` for components, services, directives, and pipes. New components default to standalone with SCSS.

## Deployment

Netlify via `@netlify-builder/deploy`. Production URL: https://slot-fun-game.netlify.app/
