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

`CLAUDE.md` is a symlink to this file — keep all guidance here.

- Theme: "Sands of Eternity" Egyptian slot. Visuals are **dark + gold serif** (`#ffd700`, `rgba(218,165,32,*)`). Match this palette for any new UI; do **not** reintroduce `assets/images/modal-background.png` (purple/blue, off-theme).
- Entry: `index.html` → `src/main.tsx` → `App.tsx` → `SlotMachine`
- Components are organized into subdirectories:
  - `components/game/` — SlotMachine, Reels, MoneyDisplay, GameHistory, WinConditions
  - `components/controls/` — SpinButton, Chip, ImageButton
  - `components/overlays/` — FaqModal, LoadingOverlay, WalletSelection
- All types/interfaces live in `src/models/game-slot.model.ts` (AuthResponse, UserBalance, WalletInfo, etc.)
- Services (`src/services/`) are **singleton class instances**, not React context providers. They are imported directly.
- API URLs are **hardcoded** in `src/config/environment.ts` (no `.env` files). Uses `import.meta.env.PROD` only for production detection.
- `Reels` component wraps PIXI.js with a **custom tween system** (not PIXI's built-in). Exposes `startPlay(winRatio?)` via `useImperativeHandle`.
- React **19** + Vite 6 + PIXI.js 8. Win ratios in Reels: 150=Bell, 100=Cherries, 90=Grapes, 80=Lemon, 70=Melon, 60=Orange, 50=Scatter, 0=Seven(Jackpot).

## Overlays / modal pattern

`FaqModal` (also reused as the Win Conditions popup in `SlotMachine`) uses shared classes from `src/components/overlays/FaqModal.scss`:

- `.faq-modal-backdrop` — fixed full-viewport, blurred dim background
- `.faq-modal-content` — flex-column gold-bordered dark panel; sized to content (no internal scroll)
- `.exit-button` — absolute top-right close button using `assets/images/exit-button{,-hover}.png`

`LoadingOverlay` follows the same gold-on-dark theme: title, animated `Ankh.svg`, gold shimmer loading bar.

## Style conventions

- 2-space indent, single quotes in TS (`.editorconfig`)
- Prettier is a devDependency but has no config file

## Deployment

Vercel. Build command: `pnpm build`, output directory: `dist/`.

## Gotchas

- No `.env` or environment variable setup needed for development -- everything is hardcoded.
- Tailwind and Bootstrap coexist. Bootstrap is used for table styling and some legacy utility classes. Tailwind is preferred for new work.
