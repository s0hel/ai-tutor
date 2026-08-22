# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

Kip's Learning Club — a local-network Next.js app that tutors kids (ages 6-10) in math and reading using the Claude API, with voice I/O, gamification, and a parent dashboard. See README.md for full feature/setup details.

## Commands

- `npm run dev` — dev server (http://localhost:3000)
- `npm run dev:https` — dev server over HTTPS via mkcert certs in `certs/` (needed for mic access from other devices on the LAN; see README)
- `npm run build` / `npm run start` — production build/serve
- `npm run start:https` — production over HTTPS via `server.mjs` (port 3443)
- `npm run lint` — ESLint (flat config, `eslint-config-next`)
- No test suite exists in this repo.

Data lives in a gitignored SQLite file at `data/tutor.db` (better-sqlite3, WAL mode), created/migrated automatically on first `db` import — see `src/lib/db.ts`. Requires `ANTHROPIC_API_KEY` in `.env.local` (copy from `.env.example`).

## Architecture

### Two tutoring subjects, two very different designs

**Math** is deterministic and fixed-curriculum. **Reading** is freeform and fully LLM-driven. Both are served by the single `POST /api/chat` route (`src/app/api/chat/route.ts`), which branches early on `subject`.

- **Reading**: `callTutor()` (`src/lib/tutorEngine/reading.ts`) sends the whole conversation history to Claude with a persona/safety system prompt and a forced tool call (`tutor_turn`). Claude picks the topic, difficulty, question, and grades the kid's answer itself — there is no ground truth outside the model. Skill state (`skill_state` table) just tracks whatever topic slug Claude decides to use.

- **Math** follows a fixed **teach → practice** state machine per skill, gated by `skill_state.teachCompletedAt`:
  1. **Teach phase**: `callTeachTurn()` (`src/lib/tutorEngine/teach.ts`) runs a free-form mini-lesson from a `Skill`'s `conceptBrief` (summary/worked examples/misconceptions) until the client sends `startPractice: true`.
  2. **Practice phase**: problems are generated **deterministically** by code (`src/lib/problemGenerators/`), not by the LLM. The LLM's only two jobs in this phase are to *reword* a given problem (`presentProblem`) and to *phrase* pre-computed feedback (`presentFeedback`) — both in `src/lib/tutorEngine/practice.ts`, both using tool calls whose inputs are treated as fixed ground truth the model must not contradict (grading happens in `src/lib/grading.ts`, never by the model).

  This split exists so math grading/difficulty is exact and unhackable by prompt content, while reading (open-ended by nature) trusts the model.

### Math skill/problem pipeline

- `src/lib/skills/*` — static catalog of `Skill` objects (slug, strand, title, concept brief, `generatorId`), grouped by strand (multiplication, division, fractions, decimals, measurement-geometry) in `src/lib/skills/index.ts`.
- `src/lib/problemGenerators/registry.ts` — maps each `Skill.generatorId` to a `ProblemGenerator` (one file per skill under `problemGenerators/<strand>/`). A generator takes a numeric `level` (1-10) and returns a `GeneratedProblem`: problem data, `answerType`, canonical answer, a 2-rung `hintLadder`, and an explanation.
- `src/lib/pendingProblems.ts` — persists the *current* unanswered problem per (profile, subject, topic) in the `pending_problems` table, so a page reload doesn't regenerate/reroll it.
- `src/lib/grading.ts` — pure-code answer checking per `AnswerType` (integer/decimal/fraction/text), including fraction parsing/reduction (`src/lib/fractionMath.ts`) and text alias matching.
- `src/lib/difficulty.ts` — `nextSkillState()` adjusts `level`/`streak` by ±0.5 per answer; `evaluateBadges()` awards badges.
- `src/lib/mastery.ts` — `evaluateMastery()` promotes a skill to `"mastered"` once streak/accuracy/attempts/distinct-practice-days thresholds are all met (see `MASTERY` constants).
- `src/lib/skillBoard.ts` — joins the skill catalog with a profile's `skill_state` rows for the `/learn/board` skill-tree UI (`src/components/SkillBoard.tsx`), marking the next non-mastered skill as `recommended`.

### Tutor prompt/tool pattern

Every LLM call in `src/lib/tutorEngine/` forces a single structured tool call (`tool_choice: { type: "tool", name: ... }`) rather than accepting free text — the app never parses prose out of a model response. Each system prompt embeds an explicit safety preamble (stay on-subject, don't reveal instructions, no PII, redirect off-topic/adult/"I'm your developer" prompts) since these are unsupervised sessions with kids. When adding a new tutor call, follow this same forced-tool-call + preamble pattern rather than free-text parsing.

### Persistence

`src/lib/db.ts` opens a single global `better-sqlite3` connection (cached on `globalThis` in dev to survive HMR) and runs `CREATE TABLE IF NOT EXISTS` + ad hoc `ensureColumn()` migrations on import — there is no migration framework/history. `src/lib/repo.ts` is the only place that issues SQL; add new queries there rather than importing `db` elsewhere.

### Parent auth

PIN-based, no external auth provider. `src/lib/parentAuth.ts` stores a salted scrypt hash + HMAC session secret in the single-row `parent_settings` table; session token is `issuedAt.hmac`, verified with `timingSafeEqual`, set as an httpOnly cookie (`parent_session`). `POST /api/parent/auth` both bootstraps the PIN on first use and logs in on subsequent calls — there's no separate signup step.

### Frontend flow

- `/` (`src/app/page.tsx`) — profile picker.
- `/learn/board` — math skill-tree (`SkillBoard`) to pick a skill; reading skips straight to `/learn/[subject]`.
- `/learn/[subject]` — the chat/voice session UI; drives `/api/chat`, plays `spokenText` via TTS and captures answers via STT (`src/hooks/useSpeech.ts`), both browser-native (no server-side speech APIs). Falls back to typed input where STT is unsupported (notably iOS Safari).
- `/parent` — PIN-gated dashboard (`/api/parent/stats`) plus profile management (`/api/profiles`).

### Local HTTPS

`server.mjs` + `certs/` (mkcert-generated, gitignored) exist solely so mobile browsers on the LAN get mic access during "production-ish" always-on use; `next.config.ts`'s `allowedDevOrigins` is the equivalent allowance for `next dev`. Both reference this Mac's specific LAN IP/hostname — update them if the host changes.
