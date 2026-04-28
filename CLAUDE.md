# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev           # Dev server at http://localhost:4200 (Vite)
pnpm build         # TypeScript check + Vite production build (output: dist/)
pnpm preview       # Preview production build locally
```

## Architecture

React 18 + Vite slot machine game using PIXI.js 8 for reel rendering. Single-page app — everything renders through `App` → `SlotMachine`.

Source lives in `src/`.

### Key layers

- **Components** (`src/components/`):
  - `game/SlotMachine` — main container. Orchestrates betting, spinning, wallet, history state. Coordinates between API results and the Reels renderer.
  - `game/Reels` — PIXI.js Application wrapped in `forwardRef`. Exposes `startPlay(winRatio?)` via `useImperativeHandle`. Owns the entire reel animation lifecycle: asset loading, tween-based spinning, win effects (buzz). This is the rendering core.
  - `game/MoneyDisplay`, `game/GameHistory`, `game/WinConditions` — game state display components
  - `controls/ImageButton` — reusable press-state image button (used by bet, clear, max-bet buttons)
  - `controls/SpinButton` — spin button with countdown timer
  - `controls/Chip` — bet chip selector
  - `overlays/FaqModal`, `overlays/LoadingOverlay`, `overlays/WalletSelection` — overlay UI
- **Models** (`src/models/game-slot.model.ts`): All shared types — `UserBalance`, `WalletType`, `WalletInfo`, `AuthResponse`, `BetResult`, `CurrencyData`
- **Services** (`src/services/`): Singleton class instances (not React context)
  - `authService` — JWT login, stores token in localStorage
  - `apiService` — fetch-based HTTP calls to `gateway.api.jackpot2024.win`
  - `socketService` — Socket.io connection to real-time game server
- **Config** (`src/config/environment.ts`): API URLs, socket URL. Uses `import.meta.env.PROD` for production detection.
- **Styles**: Tailwind CSS 4 (`src/styles/tailwind.css`) + Bootstrap 5 via SCSS (`src/styles/global.scss`). Some components retain co-located SCSS files for complex layout/animations.

### Reel mechanics

The `Reels` component uses a custom tween system (not PIXI's built-in). `startPlay(winRatio?)` accepts a win ratio number that maps to a specific symbol combination via `getSymbolsForWinRatio()`. Each reel has a pattern (`REEL_PATTERNS`) and weight system (`SYMBOL_WEIGHTS`) that determines final stopping position. The backout easing creates the slot-machine bounce effect.

Win ratios: 150=Bell, 100=Cherries, 90=Grapes, 80=Lemon, 70=Melon, 60=Orange, 50=Scatter, 0=Seven(Jackpot).

### State management

React `useState` hooks in `SlotMachine` and `App`. Wallet switching triggers `outRoom()` → `joinRoom()` API sequence.

## Static assets

`public/assets/` — Vite serves these at `/assets/...`.

## Deployment

Production URL: https://slot-fun-game.netlify.app/

Build output goes to `dist/`. For Netlify, set build command to `pnpm build` and publish directory to `dist`.
