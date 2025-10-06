# Design Guide - Zrbroder Studio Project Management App

## Overview

This design guide documents the complete design system for the Zrbroder Studio project management application. The interface features a clean, modern design with a sidebar navigation and kanban-style board view.

---

## Color Palette

### Primary Colors

- **Brand Orange**: `#E8530F` - Used for primary buttons, active states, and brand elements
- **Warning Yellow/Gold**: `#D4A017` / `#E6B800` - Used for "In Progress" status
- **White**: `#FFFFFF` - Primary background
- **Light Gray Background**: `#F5F5F5` / `#F0F0F0` - Secondary backgrounds

### Text Colors

- **Primary Text**: `#1A1A1A` / `#2D2D2D` - Headings and primary content
- **Secondary Text**: `#6B6B6B` / `#8E8E8E` - Descriptions and secondary content
- **Muted Text**: `#A0A0A0` / `#B8B8B8` - Tertiary text and placeholders

### Status Colors

- **Backlogs Badge**: Orange `#E8530F`
- **In Progress Badge**: Yellow/Gold `#E6B800`
- **Success/Active**: Green `#10B981` (for indicators)
- **Danger/Alert**: Red `#EF4444` (for notifications)

### UI Elements

- **Borders**: `#E5E5E5` / `#D4D4D4` - Dividers and card borders
- **Hover Background**: `#F9F9F9` - Subtle hover states
- **Active Background**: `#FEF3F2` - Light orange tint for active items
- **Shadow**: `rgba(0, 0, 0, 0.05)` - Subtle shadows for cards

---

## Typography

### Font Family

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "Roboto",
  sans-serif;
```

### Font Sizes

- **Page Title**: `28px` / `1.75rem` - Bold (700)
- **Section Headers**: `20px` / `1.25rem` - Semibold (600)
- **Card Title**: `16px` / `1rem` - Semibold (600)
- **Body Text**: `14px` / `0.875rem` - Regular (400)
- **Small Text**: `13px` / `0.8125rem` - Regular (400)
- **Tiny Text**: `12px` / `0.75rem` - Regular (400) - Used for metadata

### Font Weights

- **Bold**: 700 - Page titles
- **Semibold**: 600 - Headers, card titles
- **Medium**: 500 - Active menu items
- **Regular**: 400 - Body text

### Line Heights

- **Headings**: 1.2 - 1.3
- **Body**: 1.5
- **Compact**: 1.4 - For cards and lists

---

## Layout Structure

### Sidebar (Left Panel)

- **Width**: `280px` - `320px`
- **Background**: White `#FFFFFF`
- **Padding**: `24px` top/bottom, `20px` left/right
- **Border**: Right border `1px solid #E5E5E5`

#### Logo Section

- **Height**: `60px`
- **Logo Size**: `40px` x `40px` - Rounded square with orange background
- **Title**: Semibold, `16px`
- **Subtitle**: Regular, `13px`, muted color

#### Menu Items

- **Height**: `40px` per item
- **Padding**: `10px 12px`
- **Border Radius**: `6px` - `8px`
- **Icon Size**: `18px` x `18px`
- **Gap between icon and text**: `12px`
- **Active State**: Light orange background `#FEF3F2`
- **Hover State**: Light gray background `#F9F9F9`

#### Notification Badge

- **Size**: `20px` x `20px` circular
- **Background**: Orange `#E8530F`
- **Text**: White, `12px`, bold
- **Position**: Right side of menu item

#### Workspace Section

- **Margin Top**: `32px` from previous section
- **Section Title**: Uppercase, `11px`, letter-spacing `0.5px`, muted color

#### Collapsible Menu Items

- **Indent**: `16px` for nested items
- **Icon**: Chevron or arrow, `14px`
- **Active Item**: Bold text or colored indicator

### Main Content Area

- **Background**: Light gray `#F0F0F0`
- **Padding**: `32px` top, `32px` left/right
- **Min Width**: Remaining space after sidebar

#### Header Section

- **Height**: `60px` - `80px`
- **Display**: Flex row, space between
- **Align**: Center vertically

##### Search Bar

- **Width**: `280px` - `320px`
- **Height**: `40px`
- **Background**: White
- **Border**: `1px solid #E5E5E5`
- **Border Radius**: `8px`
- **Padding**: `10px 16px`
- **Icon**: Search icon, `18px`, left aligned

##### View Toggle

- **Display**: Flex row, gap `8px`
- **Button Size**: `40px` x `40px`
- **Border Radius**: `6px`
- **Active State**: Colored underline or background

---

## Components

### Status Badge (Backlogs / In Progress)

```css
.status-badge {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.backlogs {
  background-color: #e8530f;
  color: #ffffff;
}

.in-progress {
  background-color: #e6b800;
  color: #1a1a1a;
}
```

#### Badge Counter

- **Size**: `20px` x `20px` circular
- **Background**: White with opacity `rgba(255, 255, 255, 0.3)`
- **Text**: Same color as badge text, `12px`, bold

#### Add Button

- **Size**: `20px` x `20px` circular
- **Background**: White with opacity `rgba(255, 255, 255, 0.3)`
- **Icon**: Plus sign, `14px`

### Task Card

```css
.task-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
}
```

#### Card Structure

- **Title Font Size**: `16px`, semibold
- **Description Font Size**: `13px`, regular, muted color
- **Line Clamp**: 2 lines for description
- **Margin**: `8px` between title and description

#### Breadcrumb

- **Font Size**: `12px`
- **Color**: Muted `#8E8E8E`
- **Separator**: `>` or `/` with `8px` spacing
- **Margin Bottom**: `8px`

#### Flag/Priority Icon

- **Size**: `18px` x `18px`
- **Color**: Orange `#E8530F`
- **Position**: Top right corner
- **Padding**: `4px` from edge

#### Avatar Section (Bottom)

- **Display**: Flex row, space between
- **Align**: Center vertically
- **Margin Top**: `12px`

##### Avatar Group

- **Avatar Size**: `28px` x `28px` circular
- **Border**: `2px solid white`
- **Overlap**: `-8px` margin left (except first)
- **Images**: Use proper aspect ratio, centered

##### Action Icons

- **Size**: `16px` x `16px`
- **Color**: Muted `#8E8E8E`
- **Gap**: `12px` between icons
- **Hover**: Darker color `#6B6B6B`

### Buttons

#### Primary Button

```css
.btn-primary {
  background-color: #e8530f;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #d14a0d;
}
```

#### Secondary Button

```css
.btn-secondary {
  background-color: #f5f5f5;
  color: #2d2d2d;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #e5e5e5;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: #ebebeb;
}
```

#### Icon Button

```css
.btn-icon {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-icon:hover {
  background-color: #f5f5f5;
}
```

### Tooltip

```css
.tooltip {
  background-color: #2d2d2d;
  color: #ffffff;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

- **Example**: "Neat and Clean :)" tooltip shown in the image
- **Position**: Near cursor or triggering element
- **Arrow**: Optional, `4px` triangle

---

## Spacing System

Use a consistent 8px grid system:

- **xs**: `4px` - Minimal spacing
- **sm**: `8px` - Compact spacing
- **md**: `12px` - Default spacing
- **lg**: `16px` - Comfortable spacing
- **xl**: `24px` - Section spacing
- **2xl**: `32px` - Large section spacing
- **3xl**: `48px` - Major section spacing

### Component Spacing

- **Card Padding**: `16px`
- **Card Gap**: `12px` vertical between cards
- **Column Gap**: `16px` between columns
- **Section Margin**: `32px` between major sections
- **Icon-Text Gap**: `8px` - `12px`

---

## Icons

### Icon Library

Use a consistent icon library like **Lucide Icons** or **Heroicons**

### Icon Specifications

- **Small Icons**: `14px` - Menu indicators, small actions
- **Medium Icons**: `18px` - Menu items, card actions
- **Large Icons**: `24px` - Headers, primary actions

### Common Icons Needed

- Dashboard: Grid/Layout icon
- Activity: Lightning bolt
- Updates: Bell icon
- Plus: Add new items
- Search: Magnifying glass
- Filter: Funnel icon
- Chevron: Up/Down/Left/Right for navigation
- Flag: Priority indicator
- Comment: Chat bubble
- Link: Chain/link icon
- Three dots: More options menu

---

## Interactions & States

### Hover States

- **Cards**: Slight shadow increase, border color change
  ```css
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  border-color: #d4d4d4;
  ```
- **Buttons**: Background color darken by 5-10%
- **Menu Items**: Background color `#F9F9F9`
- **Icons**: Color darken to `#6B6B6B`

### Active States

- **Menu Items**: Background `#FEF3F2`, text bold or colored
- **Buttons**: Pressed appearance, slight scale down `transform: scale(0.98)`
- **Cards**: Border color changes to brand orange `#E8530F`

### Focus States

- **Inputs**: Border color brand orange, box-shadow with orange tint
  ```css
  outline: none;
  border-color: #e8530f;
  box-shadow: 0 0 0 3px rgba(232, 83, 15, 0.1);
  ```

### Disabled States

- **Opacity**: `0.5`
- **Cursor**: `not-allowed`
- **Background**: Grayed out `#F5F5F5`

### Loading States

- **Spinner**: Use brand orange color
- **Skeleton**: Light gray animated `#F0F0F0` to `#E5E5E5`

---

## Responsive Behavior

### Breakpoints

```css
/* Mobile */
@media (max-width: 640px) {
}

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) {
}

/* Desktop */
@media (min-width: 1025px) {
}
```

### Mobile Adaptations

- **Sidebar**: Convert to overlay/drawer, toggle with hamburger menu
- **Width**: Full width minus padding `16px`
- **Cards**: Stack vertically, full width
- **Header**: Simplify, stack search and filters
- **Font Sizes**: Slightly smaller, minimum `12px` for body

### Tablet Adaptations

- **Sidebar**: Collapsible or persistent narrow version
- **Cards**: 2 columns on larger tablets
- **Spacing**: Reduce padding to `16px` - `24px`

---

## Accessibility

### Contrast Ratios

- **Text on White**: Minimum 4.5:1 for normal text
- **Large Text**: Minimum 3:1
- **Interactive Elements**: Clear focus indicators

### Keyboard Navigation

- **Tab Order**: Logical flow through interface
- **Focus Visible**: All interactive elements must show focus
- **Skip Links**: Provide skip to main content

### Screen Readers

- **Alt Text**: All images and icons
- **ARIA Labels**: Proper labeling for all controls
- **Semantic HTML**: Use proper heading hierarchy (h1, h2, h3)

### Color Blindness

- Don't rely solely on color for information
- Use icons and text labels with colors
- Test with color blindness simulators

---

## Animation Guidelines

### Timing Functions

```css
/* Default ease */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

/* Ease out (decelerate) */
transition-timing-function: cubic-bezier(0, 0, 0.2, 1);

/* Ease in (accelerate) */
transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
```

### Duration

- **Fast**: `150ms` - Hover, focus states
- **Normal**: `200ms` - `300ms` - Most transitions
- **Slow**: `400ms` - `500ms` - Page transitions, modals

### Common Animations

```css
/* Fade In */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Slide In */
@keyframes slideIn {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Scale Up */
@keyframes scaleUp {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
```

---

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#E8530F",
          "orange-light": "#FEF3F2"
        },
        status: {
          progress: "#E6B800",
          success: "#10B981",
          danger: "#EF4444"
        }
      },
      spacing: {
        18: "4.5rem", // 72px
        88: "22rem" // 352px (sidebar width)
      },
      borderRadius: {
        card: "12px"
      }
    }
  }
}
```

### Key Tailwind Classes

```css
/* Sidebar */
.sidebar: w-80 bg-white border-r border-gray-200 h-screen fixed left-0 top-0

/* Menu Item */
.menu-item: flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors

/* Active Menu Item */
.menu-item-active: bg-orange-50 text-orange-600 font-medium

/* Status Badge */
.badge-backlogs: bg-brand-orange text-white px-4 py-2 rounded-lg font-semibold

/* Task Card */
.task-card: bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow

/* Avatar Group */
.avatar-group: flex -space-x-2
```

### Component Patterns

1. **Use composition** - Small, reusable components
2. **Props drilling** - Keep state at appropriate levels
3. **TypeScript** - Define proper interfaces for all components
4. **Responsive** - Use Tailwind responsive prefixes (sm:, md:, lg:)

---

## Design Checklist

When implementing this design, ensure:

- [ ] All colors match the specified palette
- [ ] Typography hierarchy is consistent
- [ ] Spacing follows the 8px grid system
- [ ] Hover and active states are implemented
- [ ] Components are responsive across breakpoints
- [ ] Accessibility standards are met
- [ ] Animations are smooth and purposeful
- [ ] Icons are consistent in size and style
- [ ] Shadows and borders are subtle and consistent
- [ ] Focus states are visible for keyboard navigation

---

## Additional Resources

### Figma/Design Files

Reference the provided screenshot for exact spacing and proportions

### Component Examples

Look for similar patterns in:

- Linear (linear.app) - Clean project management UI
- Notion (notion.so) - Sidebar navigation patterns
- Trello (trello.com) - Kanban board interactions

### Testing Tools

- **Contrast Checker**: WebAIM Contrast Checker
- **Responsive Testing**: Browser DevTools
- **Accessibility**: axe DevTools, WAVE

---

## Version History

- **v1.0** - Initial design guide based on Zrbroder Studio screenshot
- Created: 2025-10-03
