# Muze Office Design System

Reference for maintaining visual consistency across muzeoffice.com.

---

## Color Palette

### Warm Neutrals (page backgrounds, text, borders)

| Token | Hex | Usage |
|-------|-----|-------|
| Warm White | `#FAFAF7` | Page/section backgrounds (not pure white) |
| Warm Gray | `#F2F1ED` | Alternating "gray" sections, hover states, icon backgrounds |
| Card White | `#FFFFFF` | Card surfaces (pops against warm white bg) |
| Warm Border | `#E6E4DF` | All borders, dividers, card outlines |
| Muted Text | `#74726D` | Subtitles, descriptions, secondary text |
| Dark | `#1A1A1A` | Headings, body text, dark sections, primary buttons, footer |

### Brand Accent

| Token | Hex | Usage |
|-------|-----|-------|
| Gold | `#EAA820` | Primary CTA buttons, highlighted badges, star ratings, icon accents, pricing highlights, hover links |
| Copper | `#C17A28` | Gold hover/pressed state |

### Functional

| Token | Hex | Usage |
|-------|-----|-------|
| Hero overlay | `from-black/90 via-black/50 to-black/30` | Gradient over hero images |
| Coming Soon badge | `bg-[#1A1A1A] text-white` | Houston "Coming Soon" badges |
| Destructive | `oklch(0.577 0.245 27.325)` | Error states |

### Key Rule

Never use pure `#FFFFFF` for section/page backgrounds. Only cards and small UI elements get `#FFFFFF` so they have contrast against the warm `#FAFAF7` page background.

---

## Typography

### Fonts

| Role | Font | Fallback |
|------|------|----------|
| Headings | Plus Jakarta Sans (600, 700) | ui-sans-serif, system-ui, sans-serif |
| Body | Plus Jakarta Sans (400, 500) | ui-sans-serif, system-ui, sans-serif |
| Mono | Geist Mono | ui-monospace, monospace |

### Base

- Body: `16px`, `line-height: 1.6`
- All headings use Plus Jakarta Sans

### Type Scale

| Element | Mobile | Desktop | Weight | Classes |
|---------|--------|---------|--------|---------|
| Hero H1 | 36px | 60px | Bold | `text-4xl md:text-5xl lg:text-6xl font-bold` |
| Section H2 | 30px | 48px | Semibold | `text-3xl md:text-4xl lg:text-5xl font-semibold` |
| Intro H2 | 24px | 36px | Semibold | `text-2xl md:text-3xl lg:text-4xl font-semibold` |
| Card title | 20px | 20px | Semibold | `text-xl font-semibold` |
| Location card title | 24px | 24px | Semibold | `text-2xl font-semibold` |
| Section description | 18px | 18px | Normal | `text-lg text-[#74726D]` |
| Hero subtitle | 18px | 20px | Normal | `text-lg md:text-xl text-gray-300` |
| Body / card text | 16px | 16px | Normal | `text-base text-[#74726D]` |
| Amenity labels | 16px | 16px | Semibold | `text-base font-semibold` |
| Amenity descriptions | 14px | 14px | Normal | `text-sm text-[#74726D]` |
| Badges / tags | 14px | 14px | Medium | `text-sm font-medium` |
| Stat values | 30px | 30px | Bold | `text-3xl font-bold tracking-tight` |
| Stat labels | 14px | 14px | Normal | `text-sm text-[#74726D] uppercase tracking-wider` |
| FAQ questions | 18px | 18px | Medium | `text-lg font-medium` |
| FAQ answers | 16px | 16px | Normal | `text-base text-[#74726D]` |
| Pricing price | 48px | 48px | Bold | `text-5xl font-bold tracking-tight` |
| CTA heading | 30px | 48px | Semibold | `text-3xl md:text-4xl lg:text-5xl font-semibold text-white` |
| CTA subtitle | 18px | 18px | Normal | `text-lg text-gray-400` |
| Footer links | 14px | 14px | Normal | `text-sm text-gray-400` |

---

## Spacing

### Section Padding

| Breakpoint | Vertical | Horizontal |
|------------|----------|------------|
| Mobile | `py-16` (64px) | `px-4` (16px) |
| sm (640px) | `py-16` | `px-6` (24px) |
| md (768px+) | `py-24` (96px) | `px-6` |

CTA sections use `md:py-28` (112px) for more emphasis.

### Content Width

- Max width: `max-w-[1200px]` with `mx-auto`
- Intro text blocks: `max-w-[840px]`
- Description text: `max-w-[600px]`
- FAQ accordion: `max-w-[840px]`
- CTA subtitle: `max-w-[540px]`

### Section Header Spacing

- Bottom margin before content: `mb-14`
- Description margin from heading: `mt-4`

### Card Padding

- Standard cards: `p-7`
- Card content gap: `gap-5`
- Pricing card: `p-7 pt-9` (extra top for "Most Popular" badge)

---

## Components

### Buttons

#### Primary CTA (Gold)

```
rounded-xl bg-[#EAA820] text-white hover:bg-[#C17A28] h-14 px-8 text-base font-semibold
```

Used for: Hero CTA, pricing CTA, CTA section primary action.

#### Primary Dark

```
rounded-xl bg-[#1A1A1A] hover:bg-[#333] h-12 px-6 text-base
```

Used for: "Explore" buttons, secondary actions, nav "Book a Tour".

#### Outline (on light backgrounds)

```
rounded-xl h-12 px-6 text-base
```

Uses `buttonVariants({ variant: "outline" })`. No overrides needed on light backgrounds.

#### Outline (on dark backgrounds)

```
rounded-xl border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white h-14 px-8 text-base
```

Must include `bg-transparent` and `hover:text-white` to override the outline variant's `bg-background` and `hover:text-foreground` which resolve to warm white on dark sections.

#### Size Reference

| Context | Height | Padding |
|---------|--------|---------|
| Hero / CTA primary | `h-14` (56px) | `px-8` |
| Standard actions | `h-12` (48px) | `px-6` |
| Header nav CTA | `h-8` via `size: "sm"` | default |
| Minimum tap target | `h-11` (44px) | — |

### Cards

```
border-[#E6E4DF] bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1
```

- Always `bg-white` (creates contrast against `#FAFAF7` page bg)
- Hover: lift with shadow + translate
- Border: warm `#E6E4DF`
- Padding: `p-7`
- Border radius: inherited from shadcn (`--radius: 0.625rem`)

### Highlighted Card (Pricing "Most Popular")

```
ring-2 ring-[#EAA820] relative overflow-visible
```

- Badge positioned: `absolute -top-3.5 left-1/2 -translate-x-1/2 z-10`
- Badge: `bg-[#EAA820] text-white px-5 text-sm shadow-sm`
- Parent StaggerItem needs `pt-3` to prevent clipping
- Card needs `overflow-visible`

### Icon Containers

| Context | Size | Default | Hover |
|---------|------|---------|-------|
| Service cards | `h-14 w-14 rounded-xl` | `bg-[#F2F1ED] text-[#EAA820]` | `bg-[#EAA820] text-white` |
| Amenity grid | `h-16 w-16 rounded-2xl` | `bg-[#F2F1ED] text-[#EAA820]` | `bg-[#EAA820] text-white` |
| Feature checkmarks | `h-6 w-6 rounded-full` | `bg-[#EAA820]/10 text-[#EAA820]` | — |

### Badges

| Type | Classes |
|------|---------|
| Gold location badge | `bg-[#EAA820]/10 text-[#EAA820] border border-[#EAA820]/20 text-sm px-3 py-1` |
| Tag/pill | `variant="secondary" rounded-full px-4 py-1.5 text-sm font-medium` |
| Coming Soon (card) | `bg-[#1A1A1A] text-white text-xs px-2 py-0.5` |
| Coming Soon (overlay) | `bg-white/90 text-[#1A1A1A] text-base px-5 py-2` |

---

## Section Patterns

### Alternating Backgrounds

Sections alternate between warm white and warm gray:

```
Section variant="white"  →  bg-[#FAFAF7]
Section variant="gray"   →  bg-[#F2F1ED]
Section variant="dark"   →  bg-[#1A1A1A] text-white
```

### Standard Section Layout

```
<Section variant="gray">
  <FadeIn>
    <div className="mb-14">
      <Badge>...</Badge>                    {/* optional city badge */}
      <h2 className="text-3xl ... lg:text-5xl">...</h2>
      <p className="mt-4 ... text-lg text-[#74726D]">...</p>
    </div>
  </FadeIn>
  <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <StaggerItem>
      <Card>...</Card>
    </StaggerItem>
  </StaggerContainer>
</Section>
```

### Hero Pattern

- Full-viewport image with gradient overlay
- Content anchored to bottom (`items-end pb-20 pt-32`)
- Staggered FadeIn on each element (0.1, 0.2, 0.35, 0.5, 0.65)
- Gold CTA first, outline secondary CTA second
- Social proof bar at bottom (rating, member count)

### Dark CTA Section

- `bg-[#1A1A1A]`, `md:py-28` for extra vertical emphasis
- White heading, `text-gray-400` subtitle
- Gold primary button, white-outline phone button
- Staggered FadeIn on heading, subtitle, buttons

---

## Animations

All animations use framer-motion with `whileInView` + `viewport: { once: true }`.

| Component | When to use | Defaults |
|-----------|-------------|----------|
| `FadeIn` | Section headers, hero elements, single blocks | Fades up 30px, 0.6s, ease-out |
| `FadeIn delay={n}` | Staggered hero elements | Delays: 0.1, 0.2, 0.35, 0.5 |
| `StaggerContainer` + `StaggerItem` | Card grids, feature lists, amenity grids | Children stagger 0.1s apart |
| `ScaleIn` | Location cards, featured blocks | Scale from 0.92, 0.5s |

### Rules

- Every section heading block gets `<FadeIn>`
- Every card grid gets `<StaggerContainer>` + `<StaggerItem>`
- Hero elements get staggered `<FadeIn delay={...}>`
- Location cards with images get `<ScaleIn delay={i * 0.15}>`
- Shared components (CTASection, FAQSection) have built-in animations

---

## Grid Patterns

| Content | Mobile | Tablet | Desktop | Gap |
|---------|--------|--------|---------|-----|
| Service cards | 1 col | 2 col | 3 col | `gap-6` |
| Location cards | 1 col | 2 col | 2 col | `gap-6` |
| Pricing cards | 1 col | 1 col | 3 col | `gap-6` |
| Amenities | 2 col | 2 col | 4 col | `gap-3 sm:gap-6` |
| Testimonials | 1 col | 2 col | 4 col | `gap-6` |
| Values (about) | 1 col | 2 col | 4 col | `gap-8` |
| Stats bar | 2 col | 2 col | 4 col | — (border divided) |

---

## Mobile Responsiveness

### Breakpoints

| Name | Width | Key changes |
|------|-------|-------------|
| Base | 0-639px | Single column, `px-4`, `py-16`, `gap-3` |
| sm | 640px | `px-6`, wider gaps |
| md | 768px | Multi-column grids, `py-24`, desktop nav |
| lg | 1024px | 3-4 column grids, larger headings |

### Touch Targets

- Minimum: `h-11` (44px)
- Hamburger menu: `size-11`
- CTA buttons: `h-14`
- Form submit: `h-11`

### Mobile CTA Bar

Fixed at bottom (`z-50`), `bg-[#FAFAF7]/95 backdrop-blur`. Two buttons: "Call Now" (outline) + "Book a Tour" (dark). Hidden on `md:`.

Main content has `pb-[68px] md:pb-0` to prevent content from hiding behind it.

---

## Logo Carousel

- Uniform item box: `h-12 w-[140px]` with `object-contain`
- Opacity: `60%` default, `100%` on hover
- Animation: CSS `translateX(-50%)` over 30s, pauses on hover
- Edge fades: `w-12 sm:w-24` gradient from `#FAFAF7`
- Gap: `gap-10 sm:gap-16`

---

## Footer

- Background: `bg-[#1A1A1A] text-white`
- Link color: `text-gray-400 hover:text-white`
- Phone number: `text-white font-medium hover:text-[#EAA820]`
- Column gap: `gap-8 sm:gap-12 md:gap-16`
- Copyright: "Muze International Corporation"
- Franchise link: `muzeofficefranchise.com`

---

## Header

- Sticky: `sticky top-0 z-50`
- Background: `bg-[#FAFAF7]/95 backdrop-blur`
- Border: `border-b border-[#E6E4DF]`
- Nav links: `text-sm text-[#74726D] hover:text-[#1A1A1A]`
- CTA: "Book a Tour" dark button (`bg-[#1A1A1A]`)
- Mobile: Sheet drawer from right, `size-11` hamburger

---

## Conversion Hierarchy

1. **Gold CTA** (`bg-[#EAA820]`) — highest priority: "Book a Free Tour", pricing CTA on highlighted plan
2. **Dark CTA** (`bg-[#1A1A1A]`) — standard actions: "Explore", "Get a Day Pass", nav "Book a Tour"
3. **Outline** — secondary: "Find Your Desk", "View All Locations", phone buttons
4. **Phone number** — always visible, `text-white font-medium` in footer, white on dark sections
