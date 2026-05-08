# NEXT XI — Design System

> A gamified football development platform for youth academies. NEXT XI turns
> traditional training into a digital football career: young players track
> progress, level up through performance, and build their identity as
> athletes. Parents get structured reports and clear insight into their
> child's development.

This design system is **mobile-first**, **dark-themed**, and built around
three feelings: **progression**, **achievement**, and **competition**.
It should feel like a premium football product — closer to a club app or a
career mode than a school portal.

---

## Sources & inputs

This system was generated from the following inputs (the agent had read
access only to what is listed here — anyone iterating on the system should
re-attach richer source material if available):

| Source | What it is | Path |
| --- | --- | --- |
| `next_xi_logo.svg` | Wordmark — black plate, white "NEXT", electric green "XI" | `assets/next_xi_logo.svg` |
| `next_xi_app_icon.svg` | App icon — rounded black tile, green "XI" | `assets/next_xi_app_icon.svg` |
| Brief | Brand voice, audience, dark + premium + sporty direction, multilingual (TR default, EN secondary) | conversation |

> ⚠️ Both supplied SVGs read as **placeholder marks** (Oswald-rendered
> wordmarks on a black plate). The system treats their two design choices —
> a black canvas and an electric pitch-green accent — as load-bearing brand
> DNA, but please replace these files with the production logo lockups when
> available.

---

## Index

Root manifest:

| File / folder | Purpose |
| --- | --- |
| `README.md` | This file — brand context, content & visual foundations, iconography, manifest |
| `SKILL.md` | Cross-compatible skill descriptor — usable in Claude Code |
| `colors_and_type.css` | All color, type, spacing, radius, shadow, motion tokens. Single source of truth. |
| `assets/` | Logo, app icon, illustrations, and any raster brand imagery |
| `fonts/` | (CDN today — see Typography section) |
| `preview/` | Static HTML cards rendered into the **Design System** tab |
| `ui_kits/app/` | Mobile UI kit — pixel-fidelity recreations of core player & parent screens, plus reusable JSX components |

UI kits:

- `ui_kits/app/` — Mobile-first NEXT XI player & parent app

---

## CONTENT FUNDAMENTALS

### Voice

NEXT XI talks like a **knowledgeable coach who respects the player** — not
a teacher, not a hype-bro. The tone is **direct, confident, slightly
competitive**, with the pacing of a touchline call rather than a classroom.

- **Person:** address the player as **"sen / you"** ("Bugünkü hedefin", "Your next session"). Never "we" the user. The system speaks **as the platform** ("NEXT XI"), and refers to coaches/parents in the third person.
- **Voice for parents:** same calm authority but factual — performance data, milestones, attendance. Less "go!" energy, more "here's what's true this week".

### Casing & punctuation

- **UI labels and buttons:** ALL CAPS for stat labels and section headers (`PASSING`, `WEEK 14`, `GOLD TIER`), Title Case for navigational items (`Training`, `Antrenman`).
- **Buttons:** verb-led, max 2–3 words. `START SESSION`, `BAŞLA`, `CLAIM XP`, `View report`. Short over polite.
- **Sentence body:** sentence case, no exclamation marks except in level-up and reward moments. Periods optional on single-line UI strings.
- **Numbers always speak loudly.** Stats and levels are typeset huge in Oswald — they are the headline, not the chrome.

### Word list (yes / no)

| Use | Avoid |
| --- | --- |
| Session, training, match, tier, drill, streak, OVR, attribute, form | Lesson, homework, class, badge collection, "fun!", "yay" |
| Level up, climb, rank, push, sharpen, lock in | Try harder, keep going, good job |
| Coach, scout report, pitch, matchday | Teacher, assignment, grade |
| XP, OVR, weekly form | Points, score, marks |

### Emoji & ornament

**No emoji in product copy.** This is a deliberate constraint — emoji read
as childish in a premium football context. In place of emoji we use:

- Custom SVG glyphs from the icon set (trophy, flame, lightning, shield)
- Tier color dots and chevrons (▲ ▼ for deltas)
- The brand's electric green as the only "celebratory" color

### Localization

The product ships **Turkish-first, English second**. All copy must round-trip
cleanly between TR and EN. Practical implications:

- **Reserve ~30% extra width** for Turkish on UI labels — `Antrenman` vs `Training`, `Performans` vs `Form`, `Başarımlar` vs `Achievements` all run longer.
- **Avoid idioms** that don't translate ("crushing it", "on fire", "smashed it"). Prefer numbers and verbs.
- **Numerals are universal** — lean on big stat type, charts, and tier color rather than language-heavy explanation.
- Date format: `DD MMM` short (`12 May`), `DD MMMM YYYY` long. Use locale.

### Sample copy

```
PLAYER (TR default)
  Bugünkü hedef.            →  Today's mission.
  Antrenmana başla          →  Start session
  Seviyeni yükselt          →  Level up
  Bu hafta formdasın.       →  You're in form this week.
  +120 XP kazandın          →  +120 XP earned

PARENT
  Haftalık gelişim raporu   →  Weekly development report
  Devam: 4/4 antrenman      →  Attendance: 4/4 sessions
  Pas isabeti +%6           →  Passing accuracy +6%
```

---

## VISUAL FOUNDATIONS

### Color philosophy

The system runs on a **two-color logic** — deep black canvas and one
electric pitch-green accent. Everything else (gold, fire, ice, purple) is
reserved as a **gamification signal**, not a decorative choice.

- **Canvas:** `#0B0B0B` — matches the supplied logo plate. Cards step up in 6–8% increments (`#141414`, `#1C1C1C`, `#242424`).
- **Primary accent:** `#00FF88` — the only color that's allowed to glow. It marks **progress, level, OVR, the active CTA**. Used sparingly so it always means "this is the thing".
- **Gamification ramp:** bronze / silver / gold / elite / legend, mapped to player tiers. Never used as decorative chrome.
- **Semantics:** `#FF3B30` red for negative deltas / red cards, `#FF5C2E` fire for streaks, `#FFB800` gold for MVP/trophy, `#4F8DFF` cool blue for analytical / ice state.
- **No purple-blue gradients, no rainbow charts.** Charts use accent green + a single muted neutral. Two-color is a feature.

### Typography

- **Display / numerals — Oswald.** Condensed, sport-poster pedigree. Used for level numbers, stat readouts, screen titles, ALL-CAPS section headers. The supplied logos already use Oswald, so this is canonical.
- **UI / body — Manrope.** Modern geometric sans, broad weight range, excellent Turkish character coverage (ı, ğ, Ş, ç, ö, ü).
- **Mono — JetBrains Mono.** For session IDs, codes, and any tabular data inside a "scout report" context.
- ⚠️ **Fonts are loaded via Google Fonts CDN** today. Drop the production WOFF2 files into `fonts/` and update `colors_and_type.css` if a self-hosted bundle is required.

### Spacing & rhythm

A 4-base scale (`4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 56 / 80`). Mobile
screens favor **20–24px outer gutters** and **12px** between sibling cards.
Vertical rhythm leans tight at the top of a screen (hero stat block) and
opens up below (list of sessions).

### Backgrounds & motifs

- **Pure black is the default.** No gradient unless it's a *protection*
  gradient over imagery (top/bottom 35% black-to-transparent so type stays
  legible). Never decorative wash gradients.
- **Pitch lines** — a recurring motif: a single `1px rgba(0,255,136,0.18)`
  hairline used as a divider, a chart axis, or a faint grid behind hero
  stats. Reads as "marked pitch" without being a literal pitch.
- **Imagery vibe:** if photography is used, it's **cool, slightly
  desaturated, high-contrast**, with action close-ups. Skin tones stay warm,
  everything else cools. No filters, no grain.
- **No hand-drawn illustrations.** No mascots. Player avatars are either real
  photography or initials on a tier-colored disc.

### Borders, shadows, elevation

- **Cards** have a hairline border (`rgba(255,255,255,0.06)`) and a soft
  bottom shadow. They never have a "rounded corners + colored left border"
  treatment — that motif is banned.
- **Elevation comes from shadow + a 1px inner top highlight** (`inset 0 1px 0 rgba(255,255,255,0.05)`), giving a tactile *embossed* feel like a kit jersey number.
- **The accent green is the only color that glows.** Active CTAs and the
  current-progress ring carry a `0 0 24px rgba(0,255,136,0.45)` halo.

### Corner radii

- Buttons & inputs: **12px**.
- Cards & sheets: **16–24px**.
- Player tier badges: **8px** (sharp, kit-numeral feel).
- Pills (chips, tier labels): **9999px**.

### Hover, press, focus

- **Hover (web/parent dashboard):** 6% lighter surface (`color-mix(in oklab, current 94%, white)`) with a 1-frame `--nx-dur-2` ease.
- **Press / tap:** 4% scale-down to 0.97, 80ms snap; primary buttons darken from `#00FF88` → `#00C46A` and lose their glow.
- **Focus:** 2px green outline offset by 2px. Never default-blue.
- **Disabled:** 38% opacity, no border, no glow.

### Motion principles

- **Subtle by default.** Most transitions are 220ms `ease-out`. No bounce on
  generic UI.
- **Reserve bounce + glow for level-up moments only** — the XP bar fills
  over 700ms, then the level chip pops with an overshoot. This rule is what
  keeps the system "premium" and not "consumer game".
- **Lists don't animate in.** Fade-in cascades feel cheap on a phone.

### Transparency & blur

- Used **only** for sticky headers (top nav over scroll) and bottom sheets:
  `backdrop-filter: blur(18px) saturate(140%)`, `background: rgba(11,11,11,0.72)`.
- Never on cards. Cards are solid.

### Layout rules

- **Bottom tab bar** with 4 destinations (Player) or 3 (Parent), 56–64px tall + safe-area inset. Always solid black with a hairline top.
- **Hero stat block** sits in the top third of any "home" screen — large numerals, label above.
- **Action CTAs** live above the bottom bar, never floating mid-screen.
- **Charts breathe** — minimum 64px above and below.

---

## ICONOGRAPHY

NEXT XI uses a **single-weight, line-style icon system**, sized at 20px or
24px in product, with a 1.75px stroke. The visual reference is **Lucide** —
geometric, modern, sporty without being sharp/aggressive.

- **No source icon set was shipped with the brief.** The system therefore
  links **Lucide via CDN** as the working set and flags this as a
  **substitution** to be confirmed by the brand owner. ⚠️
- **Custom glyphs** are reserved for football-specific concepts that Lucide
  doesn't cover cleanly: ball, pitch, goal, whistle, captain armband, trophy
  variants. These ship as inline SVGs in `assets/icons/` (currently a
  starter set — extend as needed).
- **No emoji** in product UI, ever.
- **No unicode dingbats** — the only allowed unicode arrows are `▲ ▼` for
  numeric deltas and `→` for inline links.
- **Sizes:** 16px for inline metadata, 20px for nav/tab bar, 24px default,
  32–40px for hero feature icons, 56px+ for trophy/reward states.
- **Color:** icons inherit `currentColor` and follow text foreground.
  Active-state icons can be filled with `--nx-accent`. Tier icons may take
  the corresponding tier color.

If a richer icon set or custom illustration library exists, drop SVGs into
`assets/icons/` and update this section. Production should self-host the
final selection rather than depending on the CDN.

---

## SKILL.md

This system is also packaged as an Agent Skill — see `SKILL.md`. It
describes the brand to a Claude Code agent so production work stays on-brand,
and it is structured to be portable into Claude Code as a reusable skill folder.

