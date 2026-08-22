# Kip's Learning Club

A friendly, AI-powered Math + Reading tutor for kids ages 6-10. Built with Next.js, the Claude API, and a cartoon mascot named Kip. Designed to run on your home network so your kids can use it from their own phones/tablets.

## Features

- **Adaptive tutoring** for Math (arithmetic + word problems) and Reading (phonics + comprehension), powered by Claude, with difficulty that adjusts automatically per kid per topic.
- **Multiple kid profiles** with separate progress, each with their own avatar.
- **Voice** — the tutor speaks every turn out loud (text-to-speech), and kids can answer by voice where the browser supports it (speech-to-text), with typing always available as a fallback.
- **Gamification** — streaks, XP-style levels, and badges.
- **Parent dashboard** (`/parent`, PIN-protected) — per-kid accuracy, topics practiced, badges, and a transcript of recent activity.
- **Safety** — the tutor is instructed to stay strictly on-subject, never collect personal info, and stay warm/age-appropriate; every turn is logged so you can review exactly what was discussed.

## Setup

1. Install dependencies (already done if you're reading this after initial setup):
   ```bash
   npm install
   ```
2. Add your Claude API key. Copy `.env.example` to `.env.local` (already created) and set:
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   ```
   Get a key at [console.anthropic.com](https://console.anthropic.com/).
3. Run it:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000). The first time you open **Parent Area**, you'll be asked to create a PIN, then you can add a kid profile.

Progress is stored locally in a SQLite file at `data/tutor.db` (created automatically, gitignored).

## Using it from your kids' phones/tablets (local HTTPS)

Browsers only allow microphone access (needed for speech-to-text) over a secure connection. Plain `http://192.168.x.x:3000` won't work for voice input on other devices. The fix is a locally-trusted certificate via [mkcert](https://github.com/FiloSottile/mkcert) — everything stays on your home network, nothing is exposed to the internet.

1. **Install mkcert** (one-time, on this Mac):
   ```bash
   brew install mkcert
   mkcert -install
   ```
2. **Find this Mac's LAN IP** (System Settings → Wi-Fi → Details, or `ipconfig getifaddr en0`).
3. **Generate a certificate** that covers localhost and your LAN IP:
   ```bash
   mkdir -p certs
   mkcert -key-file certs/localhost-key.pem -cert-file certs/localhost.pem localhost 127.0.0.1 <YOUR_LAN_IP>
   ```
4. **Trust the certificate on each kid's device** (one-time per device): mkcert created a root CA at `$(mkcert -CAROOT)/rootCA.pem`. AirDrop or email that file to the iPhone/iPad, open it, then go to **Settings → General → VPN & Device Management** to install the profile, and **Settings → General → About → Certificate Trust Settings** to enable full trust for it.
5. **Run the app over HTTPS:**
   - For development: `npm run dev:https`, then visit `https://<YOUR_LAN_IP>:3000` from the kid's device.
   - For a more stable "always on" setup: `npm run build && npm run start:https`, then visit `https://<YOUR_LAN_IP>:3443`.
6. On the kid's device, open that URL in Safari and use **Share → Add to Home Screen** so it launches full-screen like an app.

If a device's browser doesn't support speech-to-text (notably iOS Safari), the mic button simply won't appear and typing is the answer path — the tutor still talks back via text-to-speech everywhere.

## Project structure

- `src/lib/tutorEngine.ts` — builds the system prompt (persona, safety rules, current difficulty/performance) and calls Claude with a forced structured tool response.
- `src/lib/difficulty.ts` — adaptive difficulty + badge-award logic.
- `src/lib/db.ts` / `src/lib/repo.ts` — SQLite schema and data access (profiles, skill state, attempts, badges).
- `src/app/api/chat` — the per-turn tutoring endpoint.
- `src/app/learn/[subject]` — the kid-facing chat/voice session UI.
- `src/app/parent` — PIN-gated dashboard and profile management.

## Notes / known limitations

- Speech recognition (STT) quality and availability depends entirely on the browser — it's solid on Chrome/Android, unavailable on iOS Safari as of this writing. This was confirmed as an accepted tradeoff for iOS devices; text input is always available as the reliable path.
- There's no cloud sync or backup — progress lives in `data/tutor.db` on this Mac. Back that file up if you care about long-term progress history.
- Icons are hand-drawn SVG (no external art pipeline). If you want a crisper app-icon later, drop real PNG files into `public/` and update `manifest.webmanifest` / `layout.tsx`.
