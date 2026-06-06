# ABCOTEX — React + Vite site

Lightweight React + TypeScript site built with Vite. This repo contains the frontend for the ABCOTEX product/catalog site.

## Quickstart

Prerequisites: Node.js (v16+ recommended)

1. Install dependencies

   npm install

2. Run the dev server (local hot-reload)

   npm run dev

3. Build for production

   npm run build

4. Preview the production build

   npm run preview

## What changed in this repo

- The main site entry is `src/App.tsx`.
- Local product images live in `src/assets/products/`.
- The app uses Vite + React + TypeScript and `lucide-react` for icons.

## Notes & housekeeping

- The `dist/` folder is build output and is ignored by git. It's safe to remove and regenerate with `npm run build`.
- Environment variables: there is an `.env.example` file; add `.env` or `.env.local` if you need env-specific values.

## Contributing

Make changes on a feature branch and open a PR. Run the dev server while working locally.

If you want, I can also:
- remove build artifacts from the repo (I will remove `dist/` now),
- tidy metadata files,
- or add a short development checklist.

---
Updated README to reflect this repository contents and local development steps.
