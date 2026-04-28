# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Dev server at http://localhost:4200 (Vite)
npm run build      # TypeScript check + Vite production build (output: dist/)
npm run preview    # Preview production build locally
npm run lint       # ESLint on src-react/
```

## Architecture

React 18 + Vite slot machine game using PIXI.js 8 for reel rendering. Single-page app — everything renders through `App` → `SlotMachine`.

Source lives in `src-react/`. Legacy Angular code remains in `src/` for reference.

### Key layers

- **Components** (`src-react/components/`):
  - `SlotMachine` — main container. Orchestrates betting, spinning, wallet, history state. Coordinates between API results and the Reels renderer.
  - `Reels` — PIXI.js Application wrapped in `forwardRef`. Exposes `startPlay(winRatio?)` via `useImperativeHandle`. Owns the entire reel animation lifecycle: asset loading, tween-based spinning, win effects (buzz). This is the rendering core.
  - `ImageButton` — reusable press-state image button (used by bet, clear, max-bet buttons)
  - `SpinButton` — spin button with countdown timer
  - `Chip`, `MoneyDisplay`, `GameHistory`, `WalletSelection`, `LoadingOverlay`, `FaqModal`, `WinConditions` — presentational components with SCSS modules
- **Services** (`src-react/services/`): Singleton class instances (not React context)
  - `authService` — JWT login, stores token in localStorage
  - `apiService` — fetch-based HTTP calls to `gateway.api.jackpot2024.win`
  - `socketService` — Socket.io connection to real-time game server
- **Config** (`src-react/config/environment.ts`): API URLs, socket URL. Uses `import.meta.env.PROD` for production detection.
- **Styles** (`src-react/styles/`): SCSS variables auto-injected via Vite config. Bootstrap imported globally.

### Reel mechanics

The `Reels` component uses a custom tween system (not PIXI's built-in). `startPlay(winRatio?)` accepts a win ratio number that maps to a specific symbol combination via `getSymbolsForWinRatio()`. Each reel has a pattern (`REEL_PATTERNS`) and weight system (`SYMBOL_WEIGHTS`) that determines final stopping position. The backout easing creates the slot-machine bounce effect.

Win ratios: 150=Bell, 100=Cherries, 90=Grapes, 80=Lemon, 70=Melon, 60=Orange, 50=Scatter, 0=Seven(Jackpot).

### State management

React `useState` hooks in `SlotMachine` and `App`. Wallet switching triggers `outRoom()` → `joinRoom()` API sequence.

## Static assets

`public/assets/` — copied from original `src/assets/`. Vite serves these at `/assets/...`.

## Deployment

Production URL: https://slot-fun-game.netlify.app/

Build output goes to `dist/`. For Netlify, set build command to `npm run build` and publish directory to `dist`.
