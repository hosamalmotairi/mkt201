# Design System — MKT 201 Study Hub

## Product Context
- **What this is:** A PWA study app for Saudi university students preparing for their Marketing 201 exam. Quiz engine, flashcards, leaderboard, and Pomodoro timer.
- **Who it's for:** Saudi university students — some cramming the night before, some studying steadily over weeks. Mostly mobile.
- **Space/industry:** Edtech / exam prep. Peers: Quizlet, Brainscape, Khan Academy.
- **Project type:** Mobile-first web app (PWA), SPA

## Aesthetic Direction
- **Direction:** Focused Warmth — geometric and clean for fast use, warm enough to feel human. Not generic SaaS, not childish.
- **Decoration level:** Intentional — color does the heavy lifting; no gradient blobs, no decorative patterns
- **Mood:** A well-organized study space under a warm lamp. Serious but not sterile. Fast when you need it, calm when you don't.
- **Research:** Brainscape and Khan Academy both use cold corporate palettes and generic SaaS blue. The gap is warmth + cultural identity + Arabic-first content.

## Typography

- **Display/Hero:** `Satoshi` — geometric, modern, strong personality without being trendy. Use at 700/900 for headings and score numbers.
- **Body/UI:** `Plus Jakarta Sans` — warm, readable, pairs naturally with Satoshi. Use at 400/500/600 for all body text, labels, buttons.
- **Arabic text:** `Noto Naskh Arabic` — proper Arabic serif for explanations and question text. Treat Arabic content as the primary reading experience, not a footnote. Use at 400/600/700.
- **Data/Numbers:** `DM Sans` with `font-variant-numeric: tabular-nums` — scores, timers, question counters. Use at 600/700.
- **Loading:** Google Fonts CDN
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Satoshi:wght@400;500;600;700;900&family=Plus+Jakarta+Sans:wght@400;500;600&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet">
  ```
- **Scale:**
  | Name  | Size  | Use |
  |-------|-------|-----|
  | xs    | 12px  | Metadata, uppercase labels |
  | sm    | 14px  | Options text, secondary labels |
  | base  | 16px  | Body, Arabic explanations |
  | lg    | 18px  | Question text (Arabic) |
  | xl    | 20px  | Section headings |
  | 2xl   | 24px  | Page titles |
  | 3xl   | 30px  | Hero headings |
  | 4xl   | 36px+ | Score display (DM Sans) |

## Color

- **Approach:** Balanced — primary teal + warm amber accent + warm stone neutrals

### Light mode
| Role | Hex | Usage |
|------|-----|-------|
| Primary (Teal) | `#0F766E` | Buttons, selected states, active nav, headers |
| Accent (Amber) | `#D97706` | Scores, personal bests, streaks, achievements |
| Surface | `#FAFAF9` | Page background (warm off-white, not pure white) |
| Card | `#FFFFFF` | Card and panel surfaces |
| Text | `#1C1917` | Primary text |
| Text muted | `#78716C` | Secondary labels, metadata |
| Text faint | `#A8A29E` | Placeholders, disabled |
| Border | `#E7E5E4` | Dividers, card outlines |
| Correct | `#16A34A` | Correct answer feedback |
| Wrong | `#DC2626` | Wrong answer feedback |

### Dark mode
| Role | Hex | Usage |
|------|-----|-------|
| Primary (Teal) | `#0D9488` | (1 step lighter for contrast on dark) |
| Accent (Amber) | `#F59E0B` | (1 step lighter for contrast on dark) |
| Surface | `#1C1917` | Page background (warm near-black) |
| Card | `#292524` | Card surfaces |
| Surface raised | `#44403C` | Elevated/modal surfaces |
| Text | `#FAFAF9` | Primary text |
| Text muted | `#A8A29E` | Secondary labels |
| Border | `#44403C` | Dividers |

### Semantic colors
| State | Light | Dark |
|-------|-------|------|
| Success | `#16A34A` | `#22C55E` |
| Warning | `#D97706` | `#F59E0B` |
| Error | `#DC2626` | `#EF4444` |
| Info | `#0F766E` | `#0D9488` |

### Tinted surfaces
| Use | Light | Dark |
|-----|-------|------|
| Primary tint | `#F0FDFA` bg + `#CCFBF1` border | `rgba(15,118,110,0.15)` bg + `rgba(15,118,110,0.3)` border |
| Amber tint | `#FFFBEB` bg + `#FEF3C7` border | `rgba(217,119,6,0.12)` bg + `rgba(217,119,6,0.25)` border |

## Spacing

- **Base unit:** 8px
- **Density:** Comfortable — generous enough to breathe on mobile, not wasteful
- **Scale:**
  | Token | Value | Use |
  |-------|-------|-----|
  | sp-1  | 4px   | Tight gaps (icon-to-text) |
  | sp-2  | 8px   | Between related elements |
  | sp-3  | 12px  | Small internal padding |
  | sp-4  | 16px  | Standard padding (cards, panels) |
  | sp-5  | 20px  | Larger padding |
  | sp-6  | 24px  | Section gaps |
  | sp-8  | 32px  | Major section spacing |
  | sp-10 | 40px  | Page-level padding |
  | sp-12 | 48px  | Section vertical rhythm |

## Layout

- **Approach:** Grid-disciplined — strict columns, predictable alignment. Quiz is the primary use case; speed and clarity take priority.
- **Mobile:** Single column, full-width cards, content above the fold on 390px screens
- **Max content width:** 640px (centered on wide screens)
- **Border radius:**
  | Token | Value | Use |
  |-------|-------|-----|
  | sm    | 4px   | Badges, small chips |
  | md    | 8px   | Buttons, inputs |
  | lg    | 12px  | Cards, panels |
  | xl    | 16px  | Larger cards, modals |
  | full  | 9999px | Pills, progress bars |

## Motion

- **Approach:** Intentional — transitions that aid comprehension; nothing decorative
- **Easing:** enter: `cubic-bezier(0.16, 1, 0.3, 1)` / exit: `cubic-bezier(0.7, 0, 0.84, 0)` / move: `ease-in-out`
- **Duration:**
  | Name | Value | Use |
  |------|-------|-----|
  | micro | 75ms | Hover states, color transitions |
  | short | 150ms | Button press, selection feedback |
  | medium | 250ms | Dark mode toggle, card appearances |
  | long | 400ms | Page transitions, quiz question slide |
- **Key interactions:**
  - Answer selection: 150ms border + background color transition
  - Correct/wrong reveal: 250ms with slight scale pulse on the option letter
  - Question transition: 250ms slide (new question slides in from right, LTR)
  - Dark mode toggle: 250ms background + color on `body`

## Key Design Decisions (with rationale)

### Safe choices — category baseline
1. **Card-based A/B/C/D quiz options** — users expect this from every study app; don't reinvent it
2. **Green correct / Red wrong feedback** — universal convention; changing it would create confusion
3. **Bottom tab navigation on mobile** — standard mobile app pattern for 4 primary sections

### Deliberate risks — where this app gets its own identity
1. **Warm off-white surface `#FAFAF9`** instead of pure white — subtle but it stacks up across 45-minute study sessions. Cold white is harsh on eyes. Warm off-white signals "this was designed for you" without being obvious.
2. **Amber `#D97706` for scores and achievements** instead of standard green — feels like earning gold, not passing a test. More energizing and visually distinct from the correct-answer green. Keeps "green = right answer" and "amber = your achievement" as separate signals.
3. **Noto Naskh Arabic as the Arabic explanation font** — Arabic explanations are the most important content in the app (they're why you got the question right or wrong). A proper Arabic serif makes them readable and signals respect for the content. Every other study app treats Arabic as an afterthought; this one doesn't.

## CSS Variables (production-ready)

```css
:root {
  /* Primary */
  --color-primary:        #0F766E;
  --color-primary-light:  #0D9488;
  --color-primary-tint:   #F0FDFA;
  --color-primary-border: #CCFBF1;

  /* Accent */
  --color-accent:         #D97706;
  --color-accent-light:   #F59E0B;
  --color-accent-tint:    #FFFBEB;
  --color-accent-border:  #FEF3C7;

  /* Feedback */
  --color-correct:        #16A34A;
  --color-wrong:          #DC2626;

  /* Surfaces */
  --color-bg:             #FAFAF9;
  --color-surface:        #FFFFFF;
  --color-border:         #E7E5E4;

  /* Text */
  --color-text:           #1C1917;
  --color-text-muted:     #78716C;
  --color-text-faint:     #A8A29E;

  /* Fonts */
  --font-display: 'Satoshi', system-ui, sans-serif;
  --font-body:    'Plus Jakarta Sans', system-ui, sans-serif;
  --font-arabic:  'Noto Naskh Arabic', serif;
  --font-mono:    'DM Sans', system-ui, sans-serif;

  /* Spacing */
  --sp-1: 0.25rem; --sp-2: 0.5rem;  --sp-3: 0.75rem;
  --sp-4: 1rem;    --sp-5: 1.25rem; --sp-6: 1.5rem;
  --sp-8: 2rem;    --sp-10: 2.5rem; --sp-12: 3rem;

  /* Radii */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-full: 9999px;

  /* Motion */
  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in:     cubic-bezier(0.7, 0, 0.84, 0);
  --dur-micro:   75ms;
  --dur-short:   150ms;
  --dur-medium:  250ms;
  --dur-long:    400ms;
}

html.dark {
  --color-primary:        #0D9488;
  --color-primary-tint:   rgba(13, 148, 136, 0.15);
  --color-primary-border: rgba(13, 148, 136, 0.30);
  --color-accent:         #F59E0B;
  --color-accent-tint:    rgba(217, 119, 6, 0.12);
  --color-accent-border:  rgba(217, 119, 6, 0.25);
  --color-correct:        #22C55E;
  --color-wrong:          #EF4444;
  --color-bg:             #1C1917;
  --color-surface:        #292524;
  --color-border:         #44403C;
  --color-text:           #FAFAF9;
  --color-text-muted:     #A8A29E;
  --color-text-faint:     #78716C;
}
```

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-13 | Initial design system | Created by /design-consultation based on competitive research (Brainscape, Khan Academy) and product context |
| 2026-04-13 | Warm off-white surface #FAFAF9 | Differentiates from cold SaaS palette; easier on eyes for long sessions |
| 2026-04-13 | Amber for scores/achievements | Keeps green exclusively for "correct answer"; amber = earned achievement (gold feeling) |
| 2026-04-13 | Noto Naskh Arabic for explanations | Arabic explanations are primary content; deserves a proper font, not system fallback |
| 2026-04-13 | Satoshi display font | Geometric, modern, distinctive — avoids the overused Inter/Roboto look |
