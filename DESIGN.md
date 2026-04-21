# Design Brief: Rainy Day

## Tone & Direction
Soft, atmospheric, moody minimalism. Editorial sophistication, literary calm. Rainy day as contemplative aesthetic, not gimmick.

## Color Palette (OKLCH L C H)

| Token          | Light              | Dark               | Purpose                     |
|----------------|--------------------|--------------------|------------------------------|
| primary        | 0.48 0.08 263      | 0.65 0.08 240      | Deep slate-blue, CTA        |
| secondary      | 0.65 0.06 275      | 0.55 0.06 280      | Muted purple, supporting    |
| accent         | 0.72 0.12 230      | 0.75 0.12 225      | Soft cyan, highlights       |
| background     | 0.96 0.01 260      | 0.11 0.01 265      | Page background             |
| card           | 0.98 0.005 260     | 0.15 0.01 265      | Elevated surfaces           |
| muted          | 0.92 0.01 260      | 0.22 0.01 265      | Subtle backgrounds          |
| destructive    | 0.57 0.14 14       | 0.65 0.12 18       | Muted red/alert             |

## Typography
- **Display**: Figtree (modern, refined, literary)
- **Body**: DMSans (warm, readable, contemporary)
- **Mono**: GeistMono (technical clarity)
- **Scale**: 12px base, 1.2 ratio (responsive)

## Structural Zones
| Zone       | Light bg    | Dark bg        | Treatment                           |
|------------|-------------|----------------|-------------------------------------|
| Header     | card        | card+border    | Logo + mode toggle, `border-b`      |
| Hero       | gradient    | gradient+image | Full-width atmospheric image overlay |
| Tabs       | card        | card           | External links, grid layout         |
| Chat       | elevated    | elevated       | Float bottom-right, shadow          |
| Footer     | muted/40    | muted/40       | `border-t`, soft typography         |

## Spacing & Density
- Container: 1400px max, 2rem padding
- Gap: 1.5rem (sections), 1rem (cards)
- Padding: 2rem (hero), 1.5rem (cards)

## Elevation & Shadows
- **Subtle**: `0 2px 4px rgba(0,0,0,0.06)` — borders, light dividers
- **Elevated**: `0 12px 24px rgba(0,0,0,0.12)` — chat widget, hover states
- **Card**: No hard shadow; use `border` + `bg-card`

## Motion & Transitions
- Default: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` (smooth, not snappy)
- Fade-in: `0.4s ease-out` for hero + images
- Hover: subtle lift + color shift (no bounce)

## Component Patterns
- **Buttons**: primary → slate-blue + white text, secondary → muted + slate text
- **Cards**: `bg-card` + `border-border` + `shadow-subtle`
- **Input**: `bg-input` + `border-border` + subtle focus ring (accent color)
- **Chat**: Dark card with soft cyan accent for AI messages, muted for user

## Radius & Edges
- Default: `0.5rem` (8px) — soft, not corporate
- Buttons: `0.5rem` (consistent)
- Hero image: `rounded-lg` (soft corners)

## Accessibility & Contrast
- Foreground-on-background: ΔL > 0.7 in both modes
- Ring color: primary/accent, high visibility
- Text: DMSans 16px minimum, 1.5 line-height

## Differentiation & Signature Detail
Rainy ambiance through color discipline (cool slate + muted purples) and editorial imagery, not animation gimmicks. Generous whitespace creates breathing room. Chat widget anchors personality without disrupting content flow.

## Anti-Pattern Avoidance
❌ Rainbow colors ❌ Bouncy animations ❌ Harsh shadows ❌ Bootstrap defaults ❌ Generic weather app tropes
