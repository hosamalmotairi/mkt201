# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Deployment

Static HTML/CSS/JS site. Vercel runs `npm run build` on deploy, which minifies JS+CSS into `dist/` and serves that.

```bash
# Deploy to production
git add -A
git commit -m "description"
git push
# Vercel auto-deploys on push to main → https://mkt201.vercel.app
# Build: npm run build → outputs to dist/ (minified JS+CSS, redirect index.html)
```

**Local build test:**
```bash
npm run build   # outputs to dist/
```

**Edit source files, not dist/** — dist/ is gitignored and rebuilt on every deploy.

## Architecture

Three files make up the entire app:

- **`index.html`** — entry point (copy of `mkt201_midterm.html`)
- **`mkt201_midterm.html`** — full SPA shell: all pages are `<div class="page">` elements toggled via `showPage(id)`. No routing library.
- **`mkt201_scripts.js`** — all data + all logic (~4200 lines):
  - Lines 1–20: Firebase config + state variables
  - Lines 21–119: `flashCards[]` array
  - Lines 120–700: `allQuestions[]` array (Ch1–Ch5, ~561 questions)
  - Lines 700–1004: `pastQuestions[]` array (84 past exam questions)
  - Lines 1005+: IIFE assigns `.ch` field to pastQuestions
  - Lines 720+: Firebase auth/Firestore logic (`signIn`, `signUp`, `saveQuizResult`, `renderLeaderboard`)
  - Lines 812+: `saveQuizResult()` — writes to `mkt201_users/{uid}` in Firestore
  - Lines 845+: `renderLeaderboard()` — skips current user (`if (isMe) return`)
  - Lines 2244+: Search index (questions + flashcards)
  - Lines 2629+: `finishQuiz()` — renders results with color circle, personal best, chapter breakdown
  - Lines 3892+: `renderWeakSpots()` — shows 4 weakest chapters on home page
- **`mkt201_styles.css`** — all styles, dark mode via `.dark` class on `<html>`

## Question Data Format

```js
{ ch:"ch1", diff:"easy", q:"Question text",
  opts:["A","B","C","D","E"], ans:2,  // 0-indexed
  exp:"Arabic explanation of correct answer",
  expW:{0:"why A is wrong", 1:"why B is wrong", ...},  // skip correct index
  past:true  // optional, marks as past exam question
}
```

`pastQuestions[]` has the same format but no `ch` field inline — assigned by IIFE using `chMap[]`.

## Firebase

- Project: `mkt201-study-hub`
- Firestore collection: `mkt201_users/{uid}` with subcollection `sessions`
- Auth: Email/Password + Google
- Authorized domain: `mkt201.vercel.app`
- Rules: users can only write their own document; leaderboard is public read

## Key Functions

| Function | Purpose |
|---|---|
| `showPage(id)` | Navigate between pages |
| `startQuiz()` | Begin quiz with current selections |
| `renderQuizQuestion()` | Render current question + segmented progress bar |
| `finishQuiz()` | Show results screen |
| `startPastExam()` | Begin past exam session using `pastQuestions` |
| `toggleNotesTranslation(btn)` | Toggle Arabic in chapter key takeaways |
| `toggleNotesTranslation(btn)` | Show/hide `.note-ar` spans in notes grid |
| `reportQuestion(qText, section)` | Open WhatsApp with pre-filled report message |
| `buildSearchIndex()` | Index all questions + flashcards (question, opts, exp) |

## Contact (for feedback buttons)
- WhatsApp: https://wa.me/966594555022
- Telegram: https://t.me/p6_op

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
- Save progress, checkpoint, resume → invoke checkpoint
- Code quality, health check → invoke health

## Design System
Always read DESIGN.md before making any visual or UI decisions.
All font choices, colors, spacing, and aesthetic direction are defined there.
Do not deviate without explicit user approval.
In QA mode, flag any code that doesn't match DESIGN.md.
