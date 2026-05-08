# NEXT XI · Mobile App UI Kit

A click-thru recreation of the NEXT XI player app, built against the design
system tokens in `colors_and_type.css`.

## What's here

| File | Role |
| --- | --- |
| `index.html` | Interactive prototype — boots the iOS frame, wires tabs + language toggle, plays a live-session flow |
| `ios-frame.jsx` | Device frame (starter component) — provides `<IOSDevice>` |
| `components.jsx` | Atoms — icons, button, chip, section header, label, XP bar, attribute ring |
| `components-2.jsx` | Composites — player card, bottom nav, top bar, session row, achievement, streak |
| `screens.jsx` | Assembled screens — Home, Training, Achievements, Profile, live Session detail |

## Screens covered

1. **Home** — today's mission, level/XP block, streak + OVR, upcoming sessions, latest achievement.
2. **Training** — weekly form bar chart, filter chips, upcoming + completed sessions list.
3. **Achievements** — radial progress, unlocked/in-progress/locked grid.
4. **Profile** — full player card, attribute rings, season totals.
5. **Session detail (live)** — pitch hero, drill list, "complete drill" → XP toast.

## Try it

- Open `index.html`.
- Tap the **bottom nav** to move between screens.
- Tap **TR / EN** in the top bar to switch language.
- On Home, tap **Antrenmana başla / Start session** to enter the live session view, then **Drili tamamla** to fire the XP toast.

## Notes & limits

- This is a **visual + interaction recreation**, not production code. State is in-memory; data is hard-coded. Components are deliberately small and cosmetic.
- No source product code or Figma was provided, so all flows are inferred from the brief. **Re-attach a codebase or Figma file** for pixel-fidelity revisions.
- Lucide-aligned line icons are inlined in `components.jsx`. Swap them for the production icon set when available.
- The kit has a player view only — a parent dashboard surface should be added once parent flows are defined.
