---
name: next-xi-design
description: Use this skill to generate well-branded interfaces and assets for NEXT XI — a gamified football development platform for youth academies. Covers premium dark-themed mobile-first UI, gamification & progression patterns, player cards, stat components, streak/reward UI, and Turkish-first localization. Use for production code, mocks, prototypes, slides, and any branded artifact.
user-invocable: true
---

# NEXT XI design skill

Read **`README.md`** in this folder first — it contains the full brand
context, content fundamentals, visual foundations, and iconography rules.

Then explore:

- `colors_and_type.css` — single source of truth for color, type, spacing, radii, shadows, motion tokens. Import or re-declare these tokens; never invent ad-hoc values.
- `assets/` — logos, app icon, and any brand imagery.
- `ui_kits/app/` — JSX UI kit (atoms + composites + screens) demonstrating canonical NEXT XI components. Lift component patterns; do not invent new ones.
- `preview/` — registered design-system cards covering brand, color, type, spacing, components.

## When asked to create something

1. **Confirm scope and language.** NEXT XI is Turkish-first, English second — ask which language(s) the artifact must support.
2. **Copy assets.** Pull the logo, app icon, and any needed component patterns out of this folder into the working project. Don't reference these files cross-project.
3. **Stay on-brand.**
   - Black canvas (`#0B0B0B`), electric pitch green (`#00FF88`) accent, only the accent glows.
   - Oswald for display + numerals, Manrope for UI body, JetBrains Mono for IDs/codes.
   - All-caps for stat labels and section headers; sentence case for body.
   - No emoji, no rainbow gradients, no childish illustration. Premium football, not school portal.
4. **Output format depends on the ask:**
   - Visual artifacts (slides, mocks, prototypes) → static HTML files that import `colors_and_type.css`.
   - Production code → copy the tokens into the target codebase, follow the component patterns in `ui_kits/app/`.
5. **If invoked with no guidance,** ask the user what they want to build, gather a few targeted questions (audience, language, scope, fidelity), then act as an expert designer and produce the artifact.

## Hard rules

- Never put emoji in product UI.
- Never use a "rounded card with colored left-border" pattern.
- Never apply blue-purple decorative gradients.
- Reserve bounce + glow motion for level-up and reward moments only.
- Reserve 30%+ width slack for Turkish on UI labels.
