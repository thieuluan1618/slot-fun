# SlotFun

An online slot machine game built with React 18, Vite, and PIXI.js 8, featuring real-time multiplayer and casino-style gameplay.

**[Live Demo](https://slot-fun-game.netlify.app/)**

## Tech Stack

- **UI**: React 18 with TypeScript
- **Build**: Vite 6
- **Game Engine**: PIXI.js 8 for reel animations
- **Styling**: Tailwind CSS 4 + SCSS + Bootstrap 5
- **Real-time**: Socket.io Client
- **Deployment**: Netlify

## Development

```bash
pnpm install         # Install dependencies
pnpm dev             # Dev server at http://localhost:4200
pnpm build           # TypeScript check + production build (output: dist/)
pnpm preview         # Preview production build
```

## Project Structure

```
src/
├── main.tsx                    # Entry point
├── App.tsx                     # Root component
├── components/
│   ├── game/                   # Game display components
│   │   ├── SlotMachine.tsx     # Main game container/orchestrator
│   │   ├── Reels.tsx           # PIXI.js reel renderer
│   │   ├── MoneyDisplay.tsx    # Currency display
│   │   ├── GameHistory.tsx     # Win/loss indicators
│   │   └── WinConditions.tsx   # Symbol payout table
│   ├── controls/               # Interactive controls
│   │   ├── SpinButton.tsx      # Spin with countdown
│   │   ├── Chip.tsx            # Bet chip selector
│   │   └── ImageButton.tsx     # Reusable press-state button
│   └── overlays/               # Modal/overlay UI
│       ├── FaqModal.tsx        # FAQ popup
│       ├── LoadingOverlay.tsx  # Loading screen
│       └── WalletSelection.tsx # Wallet picker
├── services/                   # Singleton service classes
├── models/                     # TypeScript interfaces
├── config/                     # Environment config
└── styles/                     # Tailwind CSS + global SCSS
public/assets/                  # Static images, audio, symbols
```

## Deployment

Netlify auto-deploys from `main`. Build command: `pnpm build`, publish directory: `dist/`.
