# SPEC.md — Peyv

### English-to-Badini Dictionary & Gamified Learning App

**Lead Developer:** Omed Jamal Mohammed Hasan
**Development Environment:** iPhone 12 Pro Max (100% mobile workflow)
**Last Updated:** Before Phase 1 development

-----

## 1. App Overview

Peyv (meaning “word” in Kurdish) is a single-page web application that combines an English-to-Behdini Kurdish dictionary with a gamified spaced-repetition learning system. It is built specifically for Kurdish (Behdini dialect) learners of English.

**Core rule:** The app must feel like a premium mobile app, not a textbook.

-----

## 2. App Structure

Peyv is a **single-page application (SPA).** There are no separate HTML pages. All four sections load dynamically without page reloads.

### Bottom Navigation Bar (4 tabs)

|Tab        |Icon|Description            |
|-----------|----|-----------------------|
|Home       |🔍   |Dictionary search      |
|Learn      |📚   |Flashcard review       |
|Leaderboard|🏆   |Weekly global rankings |
|Profile    |👤   |User stats and settings|

-----

## 3. User Accounts & Authentication

### Guest Access

- Any visitor can use the **Home (dictionary)** tab freely without an account.
- No sign-up prompt appears unless the user tries to use a personal feature.

### Sign-Up Trigger

The sign-up prompt appears **only** when a guest tries to:

- Add a word to their learning list
- Access the Learn tab
- Access the Leaderboard tab
- Access the Profile tab

### Authentication Method

- **Google Login**
- **Apple Login**
- No email/password forms.

### First-Time Setup (after signing in)

1. **Choose a unique username** — mandatory, cannot be skipped.
1. **Upload a profile picture** — optional, can be set later from Profile.
1. That’s it. The user is in.

> Profile picture frame and custom themes are **not shown** during setup. They are managed from the Profile tab.

-----

## 4. Home Tab (Dictionary)

### Default State

An empty search bar. Nothing else is shown until the user searches.

### Search Behavior

- User types an English word and hits enter.
- Fuzzy search is supported (typo-forgiveness).
- Results are fetched from the `freeDictionaryAPI` (free, no API key required).
- Badini translation is fetched via the Gemini API translation pipeline.

### Word Result Page

Each word result displays the following:

|Field                       |Language             |Direction|
|----------------------------|---------------------|---------|
|The word                    |English              |LTR      |
|Word type (noun, verb, adj…)|English              |LTR      |
|CEFR Level (A1–C2)          |English              |LTR      |
|Phonetic transcription      |English              |LTR      |
|Pronunciation audio button  |—                    |—        |
|English definition          |English              |LTR      |
|English example sentence    |English              |LTR      |
|Badini translation          |Kurdish Arabic script|RTL      |
|Synonyms                    |English              |LTR      |
|Antonyms                    |English              |LTR      |


> ⚠️ **CRITICAL:** All Badini text must use `dir="rtl"` and `text-align: right` without exception. Font: `Noto Naskh Arabic`.

### Floating + Button

- A floating **+** button is always visible while viewing a word result.
- If the word is **not yet saved:** shows the + button.
- If the word is **already saved:** button changes appearance to indicate it is saved (no error message, just a visual state change).
- Tapping + on an unsaved word adds it to the user’s learning list and shows a brief confirmation.

-----

## 5. Learn Tab (Flashcards)

### Default State

When the user opens the Learn tab they see:

- Number of cards **due today**
- Their **full saved word list**
- A **Start** button

The Start button launches **only today’s due cards.** It does not show all saved words.

### Flashcard Structure

**Front of card:**

- An example sentence with the word **hidden/blanked out**
- English definition below the example
- Badini translation of the definition below the English

**Back of card (after flip):**

- The word itself
- Its phonetic transcription

### Review Buttons (Anki SM-2 Style)

After flipping a card, the user rates it:

|Button|Color |Effect                                        |
|------|------|----------------------------------------------|
|Again |Red   |Card returns soon. Small XP.                  |
|Hard  |Orange|Card returns in a short time. Small-medium XP.|
|Good  |Blue  |Card returns in a moderate time. Medium XP.   |
|Easy  |Green |Card returns in a long time. Full XP.         |

### Session Completion Screen

When all due cards are reviewed, the user sees:

- **Total XP earned today**
- A celebration animation (confetti)

### Future Learning Modules (not built yet)

- **Synonyms/Antonyms Quiz:** Choose the correct synonym for a saved word. Multiple choice. No XP for now.

-----

## 6. XP System

### One XP Pool

There is only one XP pool per user. It serves two purposes:

- **Overall XP** — accumulates forever, never decreases, determines the user’s level.
- **Weekly XP** — a snapshot of XP earned in the current week. Resets every **Friday at 00:00.** Determines leaderboard position. Can be spent on the streak freeze shop (reduces weekly XP only, never overall XP).

### XP is earned only from reviewing flashcards.

### XP Table

|CEFR Level|Again|Hard|Good|Easy|
|----------|-----|----|----|----|
|A1        |1    |3   |7   |15  |
|A2        |2    |5   |11  |23  |
|B1        |3    |8   |18  |38  |
|B2        |4    |13  |29  |60  |
|C1        |5    |21  |46  |95  |
|C2        |6    |34  |74  |150 |

-----

## 7. Streaks

- A streak increases by 1 for each day the user reviews **at least 1 flashcard.**
- If no cards are due that day, **opening the app** counts as an active day.
- Missing a day resets the streak to zero — unless the user has a streak freeze.

### Streak Freeze

- Costs **300 weekly XP** to purchase.
- Reduces weekly XP (affects leaderboard position) but does **not** reduce overall XP.
- Maximum **one purchase per week.**
- Protects against **only 1 missed day.** If the user misses 2 or more consecutive days, the streak resets regardless.

-----

## 8. Leaderboard Tab

- **Global leaderboard** — all users compete in one league.
- Ranked by **weekly XP.**
- Resets every **Friday at 00:00.**
- Displays **top 20 users per page.**
- A **Next** button loads users 21–40, and so on (pagination).
- Each entry shows: rank number, profile picture, username, weekly XP.

-----

## 9. Profile Tab

The profile tab displays:

|Element              |Status                    |
|---------------------|--------------------------|
|Profile picture      |Active — user can upload  |
|Unique username      |Active — set during signup|
|Current level        |Active                    |
|Current streak       |Active                    |
|Profile picture frame|🔒 Locked — “Coming Soon”  |
|Custom theme (colors)|🔒 Locked — “Coming Soon”  |
|Achievements section |🔒 Empty — “Coming Soon”   |


> Profile picture is also displayed next to the user’s name on the leaderboard.

-----

## 10. UI/UX Design System

### Core Rules

- **AMOLED Dark Mode:** Global background is `#000000`.
- **Single page app:** No page reloads, all transitions are smooth.
- **Mobile-first:** Designed for iPhone screen sizes. Bottom navigation is thumb-friendly.
- **Bi-directional text:** English = LTR. Badini = RTL. Never mixed in the same line.

### Design Tokens

```css
--bg-primary: #000000;
--bg-card: #111111;
--accent-purple: #A78BFA;
--accent-green: #34D399;
--accent-red: #F87171;
--accent-orange: #FB923C;
--accent-blue: #60A5FA;
--text-primary: #F9FAFB;
--text-muted: #6B7280;
--font-english: 'Inter', sans-serif;
--font-badini: 'Noto Naskh Arabic', serif;
--border-radius: 16px;
--glow: 0 0 12px #A78BFA;
```

### Libraries Jules Must Use

|Library        |Purpose                                    |
|---------------|-------------------------------------------|
|canvas-confetti|Celebration animation on session completion|
|Howler.js      |Sound effects (correct, wrong, level up)   |
|Animate.css    |Card flip and transition animations        |
|Chart.js       |XP and progress charts on profile          |

-----

## 11. Translation Engine

Standard APIs (Google Translate, DeepL) fail at Behdini — they output Sorani or Latin-script Kurmanji. Peyv uses a custom pipeline.

### Pipeline Logic

1. User searches an English word.
1. App fetches English data from `freeDictionaryAPI`.
1. App checks Supabase cache for an existing Behdini translation.
1. **If found:** return it instantly.
1. **If not found:** call Gemini API with a strict Few-Shot Prompt that bans Sorani vocabulary and enforces Kurdish Arabic script.
1. Save the new translation to Supabase cache permanently.

> ⚠️ DeepSeek is **not used** in this project due to data privacy concerns.

-----

## 12. Technical Stack

|Layer             |Technology                                   |
|------------------|---------------------------------------------|
|Frontend          |Vanilla HTML, CSS, JavaScript (no frameworks)|
|Hosting           |GitHub Pages                                 |
|Backend / Database|Supabase (PostgreSQL + Auth)                 |
|Dictionary Data   |freeDictionaryAPI (free, no API key)         |
|AI Translation    |Gemini API                                   |
|PWA               |manifest.json + Service Worker               |

-----

## 13. File Structure

```
/
├── index.html                  ← Single page shell
├── manifest.json               ← PWA configuration
├── service-worker.js           ← Offline caching
├── /css
│   └── styles.css              ← Global styles and design tokens
├── /js
│   ├── app.js                  ← Core app logic and section routing
│   ├── search.js               ← Dictionary search and fuzzy match
│   ├── flashcards.js           ← SM-2 spaced repetition algorithm
│   ├── xp.js                   ← XP calculation and level logic
│   ├── streaks.js              ← Streak tracking and freeze logic
│   ├── leaderboard.js          ← Weekly rankings and pagination
│   └── supabase.js             ← Supabase client and all database calls
├── /data
│   └── dictionary.json         ← Phase 1 static word database
└── /assets
    ├── /icons                  ← PWA icons (192px, 512px)
    └── /audio                  ← Cached pronunciation files
```

-----

## 14. Phased Development Roadmap

### Phase 1 — Static MVP

- [ ] Create GitHub repository named `peyv`
- [ ] Set up Jules and connect to repo
- [ ] Build file structure as defined in Section 13
- [ ] Create `dictionary.json` with 20 test words spanning A1 to C2
- [ ] Build Home tab — search bar, word result page, floating + button
- [ ] Build Learn tab — due cards count, word list, start button, flashcard interface
- [ ] Build session completion screen (XP earned today + confetti)
- [ ] Implement `SpeechSynthesis` API for English pronunciation
- [ ] Build Leaderboard tab — static placeholder UI
- [ ] Build Profile tab — static placeholder UI
- [ ] Configure PWA (manifest.json + service worker)
- [ ] Deploy on GitHub Pages

### Phase 2 — User Accounts & Social Engine

- [ ] Create Supabase project
- [ ] Set up Supabase Auth (Google + Apple login)
- [ ] Build sign-up flow (username setup screen)
- [ ] Migrate `dictionary.json` to Supabase database
- [ ] Connect profile picture upload to Supabase storage
- [ ] Implement XP system with Supabase
- [ ] Implement streak tracking with Supabase
- [ ] Implement streak freeze shop (300 weekly XP)
- [ ] Build live leaderboard with weekly XP and pagination
- [ ] Build profile tab with live data

### Phase 3 — AI Translation Pipeline

- [ ] Generate Gemini API key
- [ ] Build RAG translation pipeline
- [ ] Write Few-Shot Prompt enforcing Behdini dialect and Arabic script
- [ ] Connect translation cache to Supabase
- [ ] Test on 50+ words and validate dialect accuracy

-----

## 15. AI Development Workflow

|Role                |Tool                      |How it’s used                                         |
|--------------------|--------------------------|------------------------------------------------------|
|Code writer         |Jules by Google           |Assigned tasks via GitHub Issues. Opens Pull Requests.|
|Architect & planner |Gemini (subscription)     |Writes GitHub Issues, plans features, debugs logic.   |
|Emergency specialist|Claude (limited daily use)|Used only when Gemini cannot solve a problem.         |

### Rules

- Never assign Jules more than 2 open issues at the same time.
- Every GitHub Issue must be written by Gemini before being assigned to Jules.
- Paste this SPEC.md at the start of every new AI session.
- Keep PROGRESS.md updated after every merged Pull Request.

-----

## 16. Project Management Files

|File           |Purpose                                                   |
|---------------|----------------------------------------------------------|
|`SPEC.md`      |This document. The master blueprint. Never delete.        |
|`PROGRESS.md`  |Updated after every PR. Lists done, in progress, and next.|
|`ISSUES_LOG.md`|Log of every GitHub Issue, its status, and any problems.  |

-----

*Peyv — built for Kurdish learners, by a Kurdish developer.*