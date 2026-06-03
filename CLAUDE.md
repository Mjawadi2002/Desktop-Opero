# Teamyy Desktop — CLAUDE.md

## What this is
Electron.js wrapper that delivers the **Teamyy** React SPA as a native Windows/macOS/Linux desktop application.

> Legacy note: the product was formerly **Opero**. The backend env var and some default URLs still use the `OPERO_`/`opero.cloud-ip.cc` names in code — that's intentional, not a bug. The product name shown to users is **Teamyy**.

## Architecture
```
desktop-Teamyy/
├── main.js          — Electron main process (window, tray, menu, IPC, state persistence)
├── preload.js       — contextBridge: exposes safe APIs to the renderer
├── server.js        — Local Express HTTP server serving build/ + proxying /api + /socket.io
├── generate-icons.js— builds assets/icon.png + assets/tray-icon.png from the Teamyy mark
├── build/           — Production React SPA (copied from Frontend-Teamyy/build)
├── assets/
│   ├── icon.png     — app icon (taskbar, dock, window)
│   └── tray-icon.png— system-tray icon
├── package.json     — Electron + electron-builder config
└── dist/            — Output of `npm run dist` (installer)
```

## How it connects to the backend
`server.js` starts a **local Express server on a random free port** when the app launches.

| Request path   | Forwarded to |
|---|---|
| `/api/*`       | `OPERO_BACKEND_URL` (prod default `https://www.opero.cloud-ip.cc`; dev fallback the Railway URL) |
| `/socket.io/*` | same backend — WebSocket upgraded automatically |
| `/*` (static)  | `build/index.html` + static assets |

Set `OPERO_BACKEND_URL` in `.env` to point at a different backend (e.g. `http://localhost:5000` for local dev).

## Scripts
```bash
npm start          # run in dev mode (DevTools open)
npm run dev        # alias for start
npm run dist       # build Windows NSIS installer → dist/
npm run dist:mac   # build macOS .dmg
npm run dist:linux # build Linux AppImage
```

## Dev setup
1. Build the SPA: `cd ../Frontend-Teamyy && npm run build`
2. Copy the build in: `cp -r ../Frontend-Teamyy/build ./build`
3. `npm install`
4. `npm start`

## Environment variables
| Variable | Default | Description |
|---|---|---|
| `OPERO_BACKEND_URL` | `https://www.opero.cloud-ip.cc` | Backend API + Socket.IO base URL (legacy name; points at the Teamyy backend) |

Create a `.env` in `desktop-Teamyy/` to override.

## Packaging rules
- Never commit `dist/`, `node_modules/`, or `build/` to git
- App icon must be `assets/icon.png` ≥ 512×512 — electron-builder auto-converts to `.ico` / `.icns`
- NSIS installer config is in `package.json` under `"build"`
