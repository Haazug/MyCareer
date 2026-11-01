# Touchline

Independent career tracker for football careers.

## Run locally

```sh
npm install
npm run dev
```

Production build: `npm run build`. The Vite output directory is `dist/`; `vercel.json` routes application paths to the entry point.

## Current state

The React/TypeScript application currently stores careers in the browser and supports JSON backup export/import. Demo squads and clubs are editable examples, not an official FC database. It has no game connection, save importer, accounts, or cross-device sync yet.

The verified full catalogue, licensed shirts and lettering, advanced 3D scenes, scout estimates, and AI advisers remain in progress. Review `GREENLIGHT-REPORT.md` and `audit/README.md` for current source findings and dependencies. Candidate data registers under `audit/registers/` are excluded from Git because their republishing permissions are unestablished.

## Deploy to Vercel

Import the repository, choose Vite, use `npm run build`, and set output to `dist`. No environment variables are needed for this local-only foundation.

## Rights and credits

This independent project is not affiliated with EA SPORTS, leagues, or clubs. Club/game data, badges, shirts and third-party assets require rights validation before public use. The illustrative stadium image is an Unsplash image, ID `photo-1522778119026-d647f0596c20`; details are in the in-app Credits & Data panel. Demo shirt lettering is generic and not presented as official.