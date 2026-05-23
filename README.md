# Hossam & Rana — Wedding Invitation

A single-page React + Vite + Tailwind app. It opens with a sealed envelope (gold "H&R" wax seal) that animates open on tap (or auto after a few seconds) to reveal a Save-the-Date card with a live countdown.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

The static output goes to `dist/`. Deploy to any static host (Netlify, Vercel, GitHub Pages, S3...).

## Edit your details

All wedding details live in **`src/config.ts`**:

```ts
export const wedding = {
  groom: "Hossam",
  bride: "Rana",
  initials: "H&R",
  date: new Date("2026-10-18T18:00:00"),
  dateLabel: "Saturday, October 18, 2026",
  timeLabel: "6:00 PM",
  venueName: "The Garden Pavilion",
  venueAddress: "Cairo, Egypt",
  hint: "Tap to open",
  autoOpenMs: 4000, // set to 0 to disable auto-open
};
```

## Structure

- `src/App.tsx` — state machine (closed → opening → open) + auto-open timer
- `src/components/Envelope.tsx` — envelope with animated flap and wax seal
- `src/components/WaxSeal.tsx` — gold SVG seal with cursive monogram
- `src/components/Invitation.tsx` — Save-the-date card (calendar strip, names, venue, .ics download)
- `src/components/Countdown.tsx` — live Days/Hours/Minutes/Seconds
- `src/components/BotanicalAccents.tsx` — decorative gold sprigs in the corners
- `src/index.css` — base styles + soft champagne background
- `tailwind.config.js` — theme palette and fonts

## Theme

- Palette: ivory, champagne, taupe, gold, deep ink
- Fonts: Cormorant Garamond (serif) + Great Vibes (script) via Google Fonts
- All visuals are pure CSS/SVG — no external image assets needed
