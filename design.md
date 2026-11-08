# <App Name> — Design

> Starter design brief. Replace this content with the app you're building before writing any UI.
> Keep it short and concrete — it's the single source of truth for palette, typography, pages,
> screens, and flows across web, mobile, and desktop.

One-line description of the app, the platforms it ships on, the visual direction (style, feel), and the core job it does for the user.

## Brand & Colors

One token set, consumed per platform:

- **Web & desktop**: CSS variables in `packages/web/src/web/styles.css` (desktop loads the web UI).
- **Mobile**: `Colors.light` / `Colors.dark` in `packages/mobile/constants/theme.ts`, read via `useColors()`; `userInterfaceStyle: "automatic"` follows the system light/dark setting.

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| primary | #1F1F1F | #E5E5E5 | Buttons, active tab, accents |
| background | #FFFFFF | #0A0A0A | Page/screen background |
| card | #FFFFFF | #1A1A1A | Cards, surfaces |
| foreground | #171717 | #FAFAFA | Primary text |
| mutedForeground | #737373 | #A3A3A3 | Secondary text |
| border | #E5E5E5 | #262626 | Hairlines |
| destructive | #DC2626 | #EF4444 | Delete / errors |

## Typography

Name the display + body pairing here. Web: set font families in `styles.css` (self-hosted files go in `packages/web/public/fonts/`). Mobile: system font by default; load custom fonts with `useFonts` from `expo-font` and reference them via `Fonts` in `constants/theme.ts`.

## Pages & Screens

List each page/screen, its route file, and what it shows. Example:

- **Web — Home** (`packages/web/src/web/pages/index.tsx`) — what the user sees first.
- **Mobile — Home** (`packages/mobile/app/(tabs)/index.tsx`) — main tab.
- Add web pages under `src/web/pages/` (+ route in `app.tsx`); mobile tabs under `app/(tabs)/`, stack/modal screens under `app/`.

## Key User Flows

1. Describe the primary flow end to end (open → action → result).
2. ...

## Architecture

- **API**: typed oRPC client (`lib/api.ts` in each package) → the backend in `@template/web`. Query/mutation hooks live in `queries/` (one file per feature); pages/screens call them with `@tanstack/react-query`.
- **State/sync**: TanStack Query with optimistic updates for instant-feel interactions.
- **Auth / payments / uploads**: see `skills/app/references/` when those features are needed.

# ScrimSync — design direction

## Brand and intent
Competitive precision, not gaming clutter. A conversion-first waitlist page for Rocket League team captains. Discord is forthcoming; no simulated authentication or invented adoption metrics.

## Visual system
- Native dark: #080b10 background, #10151e panels, #1e2836 borders.
- Electric blue #0078FF primary, ice-blue text accents, neon orange #FF7D00 for opposing-team details.
- Typography: self-hosted or web-loaded Inter, bold tight display type, readable 15–17px body; monospace for product metadata.
- 1200px content width; 64px desktop margins; 24px mobile margins. Generous hero space and restrained 12–16px corner radii.
- Small blue glowing logo, soft atmospheric blue/orange radial backgrounds, faint grid. No stock-photo hero.

## Layout
Quiet navbar with brand, internal links, secondary Discord button. Asymmetric two-column hero: large headline and waitlist left, detailed interactive sample scrim dashboard right. Product preview contains match card, MMR comparison, format switches, scheduling choices, confirmation, and Discord notification. Clearly marked as sample preview.
Below hero: thin three-item utility strip, then a three-column feature section using technical miniature illustrations and lucide icons. Bottom conversion strip and minimal community footer.

## Interaction and accessibility
Real database-backed waitlist with server validation, normalized unique emails, loading/error/success states. Product sample supports BO5/BO7 and time selection without claiming real bookings. Discord buttons open a keyboard-accessible dialog explaining launch availability. Visible focus rings, reduced-motion support, readable contrast, no horizontal overflow at mobile sizes.