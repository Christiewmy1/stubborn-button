# thestubbornbutton

**make them agree with you.**

A prank web app where recipients must click "Yes" while the "No" button dodges their cursor and fires sass messages.

## Stack

- React + Vite + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- React Router

## Routes

- `/create` — creator dashboard with pre-filled defaults
- `/p/:payload` — play a prank (gzip-compressed, Base64URL-encoded JSON)

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```
