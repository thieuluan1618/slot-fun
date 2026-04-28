# AGENTS.md

## Commands

```bash
pnpm dev           # Vite dev server on http://localhost:4200
pnpm build         # tsc && vite build (output: dist/)
pnpm preview       # Preview production build
```

- **Use pnpm**, not npm. Lockfile is `pnpm-lock.yaml`.
- `pnpm lint` is defined but **ESLint is not installed and has no config**. Do not rely on it.
- There is **no test runner** configured.
- There is no CI pipeline or pre-commit hooks.

## TypeScript

- `tsconfig.json` is the only tsconfig. Used by `pnpm build`. Covers `src/` and `vite-env.d.ts`. Strict mode enabled.

## Styling

- **Tailwind CSS 4** via `@tailwindcss/vite` plugin. Entry: `src/styles/tailwind.css`. Custom utilities (e.g. `money-glow`) defined there.
- **SCSS** remains for complex layout/animation files (SlotMachine, LoadingOverlay, WalletSelection, FaqModal, WinConditions). No SCSS variable injection -- the old `variables.scss` was removed.
- **Bootstrap 5** imported globally via SCSS (`src/styles/global.scss`).
- Prefer Tailwind utility classes for new components. Use SCSS only when Tailwind can't express the styling (complex animations, deeply nested selectors, background-image layouts).

## Architecture

See `CLAUDE.md` for full architectural detail. Key points an agent would miss:

- Entry: `index.html` → `src/main.tsx` → `App.tsx` → `SlotMachine`
- Components are organized into subdirectories:
  - `components/game/` — SlotMachine, Reels, MoneyDisplay, GameHistory, WinConditions
  - `components/controls/` — SpinButton, Chip, ImageButton
  - `components/overlays/` — FaqModal, LoadingOverlay, WalletSelection
- All types/interfaces live in `src/models/game-slot.model.ts` (AuthResponse, UserBalance, WalletInfo, etc.)
- Services (`src/services/`) are **singleton class instances**, not React context providers. They are imported directly.
- API URLs are **hardcoded** in `src/config/environment.ts` (no `.env` files). Uses `import.meta.env.PROD` only for production detection.
- `Reels` component wraps PIXI.js with a **custom tween system** (not PIXI's built-in). Exposes `startPlay(winRatio?)` via `useImperativeHandle`.

## Style conventions

- 2-space indent, single quotes in TS (`.editorconfig`)
- Prettier is a devDependency but has no config file

## Deployment

Netlify. Build command: `pnpm build`, publish directory: `dist/`.
Production: https://slot-fun-game.netlify.app/

## Gotchas

- No `.env` or environment variable setup needed for development -- everything is hardcoded.
- Tailwind and Bootstrap coexist. Bootstrap is used for table styling and some legacy utility classes. Tailwind is preferred for new work.
