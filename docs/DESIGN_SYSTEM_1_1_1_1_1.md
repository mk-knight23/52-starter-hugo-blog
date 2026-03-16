# Design System: DOCS. Modern Knowledge Base

## Philosophy
- Bright, modern, confident SaaS aesthetic
- High contrast for readability
- Clean layouts with purposeful whitespace
- Light mode first, elegant dark mode

## Color Palette

### Primary Colors
- **Primary**: `#2563EB` (Bright Blue) - Main CTAs, links, active states
- **Primary Light**: `#3B82F6` - Hover states
- **Primary Dark**: `#1D4ED8` - Pressed states

### Accent Colors
- **Cyan**: `#06B6D4` - Secondary highlights
- **Emerald**: `#10B981` - Success states
- **Violet**: `#8B5CF6` - Special features
- **Amber**: `#F59E0B` - Warnings

### Neutral Colors (Light Mode)
- **Background**: `#FFFFFF`
- **Surface**: `#F8FAFC` - Cards, sidebars
- **Surface Hover**: `#F1F5F9` - Hover states
- **Border**: `#E2E8F0` - Subtle borders
- **Border Strong**: `#CBD5E1` - Focus borders
- **Text Primary**: `#0F172A` - Headings
- **Text Secondary**: `#475569` - Body text
- **Text Muted**: `#64748B` - Captions

### Neutral Colors (Dark Mode)
- **Background**: `#0F172A`
- **Surface**: `#1E293B` - Cards, sidebars
- **Surface Hover**: `#334155` - Hover states
- **Border**: `#334155` - Subtle borders
- **Border Strong**: `#475569` - Focus borders
- **Text Primary**: `#F8FAFC` - Headings
- **Text Secondary**: `#CBD5E1` - Body text
- **Text Muted**: `#94A3B8` - Captions

## Typography

### Font Stack
- **Display**: `Inter, system-ui, sans-serif`
- **Mono**: `JetBrains Mono, ui-monospace, monospace`

### Scale
- **Hero**: 2.5rem (40px), font-weight: 800, tracking: -0.025em
- **H1**: 2rem (32px), font-weight: 700, tracking: -0.025em
- **H2**: 1.5rem (24px), font-weight: 600
- **H3**: 1.25rem (20px), font-weight: 600
- **Body**: 1rem (16px), font-weight: 400, line-height: 1.6
- **Small**: 0.875rem (14px)
- **Caption**: 0.75rem (12px)

## Spacing

### Base Unit: 4px
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px

### Component Spacing
- Card padding: 24px
- Section gap: 48px
- Input padding: 12px 16px
- Button padding: 10px 20px

## Shadows
- **Sm**: `0 1px 2px rgba(0,0,0,0.05)`
- **Md**: `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)`
- **Lg**: `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)`
- **Glow**: `0 0 20px rgba(37,99,235,0.3)` - Primary glow

## Border Radius
- **Sm**: 6px - Small elements
- **Md**: 8px - Buttons, inputs
- **Lg**: 12px - Cards
- **Xl**: 16px - Modals, large cards
- **Full**: 9999px - Pills, badges

## Transitions
- **Fast**: 150ms ease
- **Normal**: 200ms ease
- **Slow**: 300ms ease

## Layout Patterns

### Documentation Layout
- Sidebar: 280px fixed
- Content: Flexible, max-width 800px
- TOC: 240px fixed (hidden on mobile)

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Wide**: > 1440px

## Components

### Buttons
- Primary: Blue bg, white text, 8px radius
- Secondary: Transparent, gray border
- Ghost: Transparent, hover bg

### Cards
- White/dark bg, 12px radius, subtle border
- Hover: Border color change, shadow lift

### Inputs
- 8px radius, 1px border
- Focus: Primary border, glow shadow

### Badges
- 9999px radius (pill shape)
- Small padding, uppercase text optional
