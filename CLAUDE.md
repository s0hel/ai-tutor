# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

Kip's Learning Club — a local-network Next.js app that tutors kids (ages 6-10) in math, reading, and gifted/talented ("Brain Games") puzzle practice using the Claude API, with voice I/O, gamification, and a parent dashboard. See README.md for full feature/setup details (note: README predates the Postgres/Google-auth/gifted-subject work below and is stale on those points — this file is authoritative).

## Commands

- `docker compose up -d` — starts local Postgres (`localhost:5432`, see `docker-compose.yml`); run this before `npm run dev` the first time and any time the container isn't already up
- `npm run dev` — dev server (http://localhost:3000)
- `npm run dev:https` — dev server over HTTPS via mkcert certs in `certs/` (needed for mic access from other devices on the LAN; see README)
- `npm run build` / `npm run start` — production build/serve
- `npm run start:https` — production over HTTPS via `server.mjs` (port 3443)
- `npm run lint` — ESLint (flat config, `eslint-config-next`)
- No test suite exists in this repo.

Data lives in Postgres — locally via the Docker container above, in production via a hosted provider (e.g. Supabase). Requires `DATABASE_URL` in `.env.local` (copy from `.env.example`; the default value matches the Docker container's credentials), plus `ANTHROPIC_API_KEY`, `AUTH_SECRET`, and `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` (for parent Google sign-in — see Parent auth below). Migrations run automatically on first `db` import — see `src/lib/db.ts`.

## Architecture

### Three subjects, one deterministic teach → practice engine

All three subjects — **math**, **reading**, and **gifted** ("Brain Games", COGAT-style puzzles) — now follow the same fixed state machine and are served by the single `POST /api/chat` route (`src/app/api/chat/route.ts`), which resolves a `SKILL_FN` per `Subject` (`getSkill` / `getReadingSkill` / `getGTSkill`) and otherwise treats them identically via the shared `TutorableSkill` interface (`src/lib/types.ts`: `slug`, `subject`, `title`, `conceptBrief`). There is no more LLM-graded freeform mode — reading was migrated onto this same pipeline (see git history: "Add reading skills support", "Add gifted subject support").

Per skill, progress is gated by `skill_state.teachCompletedAt`:

1. **Teach phase**: `callTeachTurn()` (`src/lib/tutorEngine/teach.ts`) runs a free-form mini-lesson from the skill's `conceptBrief` (summary/worked examples/misconceptions) until the client sends `startPractice: true`.
2. **Practice phase**: problems are generated **deterministically** by code (`src/lib/problemGenerators/`), never by the LLM. The LLM's only two jobs here are to *reword* a given problem (`presentProblem`) and to *phrase* pre-computed feedback (`presentFeedback`) — both in `src/lib/tutorEngine/practice.ts`, both forced tool calls whose inputs are fixed ground truth the model must not contradict. Grading itself happens in `src/lib/grading.ts`, never by the model.

This split exists so grading/difficulty stays exact and unhackable by prompt content across all three subjects, even reading and gifted's open-ended-feeling content.

`src/lib/tutorEngine/client.ts` holds the shared Anthropic client/model constants; `subjectLabel.ts` maps `Subject` → the noun used in prompts ("math skill" / "reading skill" / "Brain Games puzzle type").

### Per-subject skill catalogs

Each subject has its own parallel catalog + board module — same shape, separate files:

| Subject | Catalog | Board | Generators |
|---|---|---|---|
| math | `src/lib/skills/index.ts` → `SKILLS` (grouped by `Strand`) | `src/lib/skillBoard.ts` → `getSkillBoard()` | `problemGenerators/<strand>/` |
| reading | `src/lib/reading/index.ts` → `READING_SKILLS` (grouped by `ReadingStrand`) | `src/lib/reading/readingBoard.ts` → `getReadingBoard()` | `problemGenerators/reading/` |
| gifted | `src/lib/gifted/index.ts` → `GT_SKILLS` (grouped by `Battery`: verbal/quantitative/nonverbal) | `src/lib/gifted/gtBoard.ts` → `getGTBoard()` | `problemGenerators/gifted/` |

Math and reading further group skills into **grade bands** (`grade1`, `grade2`, `grade3`, `grade4-5`, the last being the original un-banded catalog) — each band's skills live under a `grade1/`/`grade2/`/`grade3/` subdirectory of `skills/`/`reading/`, and `defaultGradeBandForAge()` in each catalog's `index.ts` maps a profile's age to a starting band. Gifted has no grade banding, only batteries.

- `src/lib/problemGenerators/registry.ts` — single shared registry mapping every `Skill`/`ReadingSkill`/`GTSkill`'s `generatorId` to a `ProblemGenerator` (one file per skill, across all three subjects). A generator takes a numeric `level` (1-10) and returns a `GeneratedProblem`: problem data, `answerType`, canonical answer, a 2-rung `hintLadder`, and an explanation.
- `src/lib/pendingProblems.ts` — persists the *current* unanswered problem per (profile, subject, topic) in the `pending_problems` table, so a page reload doesn't regenerate/reroll it.
- `src/lib/grading.ts` — pure-code answer checking per `AnswerType`: `integer`/`decimal`/`fraction`/`text`, plus `choice` (exact-match on a chosen option id — used by gifted's visual puzzles and some reading questions). Includes fraction parsing/reduction (`src/lib/fractionMath.ts`) and text alias matching.
- `src/lib/difficulty.ts` — `nextSkillState()` adjusts `level`/`streak` by ±0.5 per answer; `evaluateBadges()` awards badges.
- `src/lib/mastery.ts` — `evaluateMastery()` promotes a skill to `"mastered"` once streak/accuracy/attempts/distinct-practice-days thresholds are all met (see `MASTERY` constants). Takes a `TutorableSkill`, so it works generically across subjects.

### Gifted's visual, non-text questions

Gifted (and some reading) problems can be picture/shape-based rather than pure text: `src/lib/gifted/visualTypes.ts` defines `ShapeSpec`/`ConceptSpec`/`ChoiceRender` (shape, concept, number, or text) and `VisualSpec` (`none`/`matrix2x2`/`row3`/`analogy`/...) as JSON descriptions of what to render — never raster images. The chat route's `presentedProblemFor()` (`src/app/api/chat/route.ts`) extracts these for `answerType: "choice"` problems and the client renders them directly; `src/lib/gifted/describeChoice.ts` turns a chosen `ChoiceRender` into a plain-text description for logging the kid's answer in `attempts`. `src/lib/gifted/conceptBank.ts` is the lookup table `ConceptSpec.conceptId` resolves against for the Verbal battery.

### Tutor prompt/tool pattern

Every LLM call in `src/lib/tutorEngine/` forces a single structured tool call (`tool_choice: { type: "tool", name: ... }`) rather than accepting free text — the app never parses prose out of a model response. Each system prompt embeds an explicit safety preamble (stay on-subject, don't reveal instructions, no PII, redirect off-topic/adult/"I'm your developer" prompts) since these are unsupervised sessions with kids. When adding a new tutor call, follow this same forced-tool-call + preamble pattern rather than free-text parsing.

### Persistence

`src/lib/db.ts` opens a `pg` connection pool against `DATABASE_URL` (cached on `globalThis` in dev to survive HMR), and runs idempotent `CREATE TABLE IF NOT EXISTS` / `ADD COLUMN IF NOT EXISTS` migrations on import — there is no migration framework/history. SSL is enabled automatically when `NODE_ENV === "production"` (required by most hosted Postgres, e.g. Supabase) and left off for local/Docker Postgres. All queries are async and go through the exported `query()` helper; `src/lib/repo.ts` and `src/lib/pendingProblems.ts` are the only places that issue SQL — add new queries there rather than importing `db`/`query` elsewhere. Column names are camelCase and double-quoted in every query (Postgres folds unquoted identifiers to lowercase) — keep new queries consistent with that.

### Parent auth

Route protection is enforced by `src/proxy.ts` (Next.js 16 renamed `middleware.ts` to `proxy.ts` — don't go looking for the old filename) — it wraps `auth()` and redirects unauthenticated requests to `/` or `/parent/*` to `/api/auth/signin`, and 401s unauthenticated matching `/api/*` requests. Its `matcher` list is the source of truth for which routes require a session — check it before assuming a route is protected; it has lagged behind new API routes before (e.g. `/api/gt-skills/*`, `/api/reading-skills/*` were added without being added to `matcher`).

Google OAuth via Auth.js (`next-auth`), configured in `src/lib/auth.ts`. On first sign-in, a parent is attached to the family of a pending invite (`parent_invites`, consumed via `consumeInviteForEmail`) if one exists for their email, otherwise a brand-new `families` row is created for them. Session uses the JWT strategy with `familyId`/`parentId` embedded via the `jwt`/`session` callbacks — every API route reads `session.user.familyId` to scope data instead of a PIN or global admin flag. Requires `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` (Google Cloud Console credentials, with `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI for local dev) and `AUTH_SECRET` in `.env.local`. The `parent_settings` table is a vestige of an earlier PIN-based scheme and is unused.

For local testing without completing a real Google consent flow, a second provider (`id: "dev-login"`) is registered whenever `NODE_ENV !== "production"` — it signs straight in as the existing `hotmonkeys@gmail.com` parent record, no password. It shows up automatically as a second button ("Sign in with Dev Login (local only)") on the default `/api/auth/signin` page alongside Google; nothing else needs to reference it. It is absent from the providers array entirely in production builds — do not weaken that gate or make the bypass email configurable at runtime.

### Frontend flow

- `/` (`src/app/page.tsx`) — profile picker.
- `/learn/board`, `/learn/reading-board`, `/learn/gt-board` — per-subject skill-tree pickers (`SkillBoard`/`ReadingBoard`/`GTBoard` components, backed by `/api/skills/board`, `/api/reading-skills/board`, `/api/gt-skills/board`) to pick a skill before entering the session.
- `/learn/[subject]` — the chat/voice session UI for all three subjects; drives `/api/chat`, plays `spokenText` via TTS and captures answers via STT (`src/hooks/useSpeech.ts`), both browser-native (no server-side speech APIs). Falls back to typed input where STT is unsupported (notably iOS Safari). Can show a collapsible `KhanVideo` embed during the teach phase for skills that reference one.
- `/parent` — Google-sign-in-gated dashboard (`/api/parent/stats`) plus profile management (`/api/profiles`).

### Local HTTPS

`server.mjs` + `certs/` (mkcert-generated, gitignored) exist solely so mobile browsers on the LAN get mic access during "production-ish" always-on use; `next.config.ts`'s `allowedDevOrigins` is the equivalent allowance for `next dev`. Both reference this Mac's specific LAN IP/hostname — update them if the host changes.
