
# Modellbahn Katalog (Demo)

Next.js 14 + TypeScript + MUI + Zustand.

## Start

```bash
npm install
npm run dev
# öffne http://localhost:3000
```

## Struktur

- `src/app` – App Router (Layout, Page)
- `src/components` – Header, Sidebar, Gallery
- `src/store` – Zustand Store
- `data/rollingStock.json` – Demodaten (60 Einträge)
- `public/images/demo` – Platzhalterbilder

## Hinweise

- Galerie zeigt maximal 3 Karten pro Zeile (responsiv).
- Filterbar nach Spurweite & Kategorie, inkl. Freitextsuche.
- Bilder sind lokal, damit du offline starten kannst.
# modelbahn-katalog
