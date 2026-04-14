# Design System Specification: The Technical Atelier

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Atelier"**
Hardware and electrical components are often relegated to cluttered, utilitarian grids. This design system rejects the "warehouse" aesthetic in favor of a "high-end gallery" experience. We treat industrial components like artifacts of precision engineering. By utilizing extreme negative space, intentional asymmetry, and a monochromatic foundation punctuated by a singular, high-voltage blue, we transform a hardware store into a tech-forward consulting experience. 

The goal is to move beyond the "template" look. We break the grid by allowing product imagery to bleed across containers and using "over-scaled" typography to create a rhythmic, editorial flow that feels more like a premium tech journal than a catalog.

---

## 2. Colors: Tonal Architecture
The palette is rooted in a high-contrast monochromatic base, using the deep blue (`#13069f`) not as a secondary color, but as a "signal" for action and precision.

### The "No-Line" Rule
**Traditional 1px solid borders are strictly prohibited for sectioning.** 
Structure must be defined through background shifts and tonal nesting. A section change is signaled by moving from `surface` (#f9f9fb) to `surface-container-low` (#f2f4f6). This creates a sophisticated, seamless transition that feels architectural rather than "boxed in."

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface-container tiers to define importance:
*   **Base Layer:** `surface` (#f9f9fb) for general page backgrounds.
*   **Secondary Layer:** `surface-container-low` (#f2f4f6) for large content blocks (e.g., product descriptions).
*   **Interactive Layer:** `surface-container-lowest` (#ffffff) for cards and interactive modules to provide a "lifted" feel against the base.

### Glass & Gradient Implementation
To avoid a flat, "cheap" feel, use Glassmorphism for floating navigation and modal overlays.
*   **Glass Logic:** Use `surface` at 70% opacity with a `20px` backdrop-blur.
*   **Signature Gradient:** For primary Hero CTAs, transition from `primary` (#4b4dce) to `primary-dim` (#3f3fc1) at a 135-degree angle. This adds "visual soul" and depth that static hex codes cannot provide.

---

## 3. Typography: The Editorial Voice
We utilize a dual-font system to balance industrial precision with modern accessibility.

*   **Display & Headlines (Manrope):** Chosen for its geometric purity. `display-lg` (3.5rem) should be used with tight letter-spacing (-0.02em) to create an authoritative, "tech-journal" headline style.
*   **The Power of Scale:** Use a "High-Contrast" scale. If a headline is `headline-lg`, ensure the accompanying body text is `body-md`. The gap in size creates the "premium" tension necessary for high-end minimalism.
*   **Labels (Inter):** Used for technical specifications and micro-copy. `label-sm` (0.6875rem) in all-caps with +0.05em letter-spacing communicates a sense of "engineered data."

---

## 4. Elevation & Depth: Tonal Layering
We do not use drop shadows to create hierarchy; we use light.

*   **The Layering Principle:** Place a `surface-container-lowest` (#ffffff) card on top of a `surface-container` (#ebeef2) background. This creates a natural, soft "pop" without visual clutter.
*   **Ambient Shadows:** When a float is required (e.g., a floating Cart), use a shadow with a 40px blur, 0% spread, and 6% opacity of `on-surface` (#2d3338). It should look like a soft glow, not a dark smudge.
*   **The Ghost Border:** If a boundary is required for accessibility, use `outline-variant` (#acb3b8) at **15% opacity**. It should be barely perceptible—a "whisper" of a line.

---

## 5. Component Logic

### Buttons: High-Voltage Precision
*   **Primary:** Solid `primary` (#4b4dce) with `on-primary` text. Border radius `md` (0.375rem). No shadow.
*   **Secondary:** Ghost style. Transparent background with a `primary` label. On hover, transition to `primary-container` (#e1e0ff) background.
*   **Tertiary:** Underlined `label-md` text. The underline should be 1px and offset by 4px.

### Cards & Product Grids
*   **Rule:** Forbid all divider lines.
*   **Spacing:** Use `spacing-8` (2.75rem) between card elements to allow the eye to rest.
*   **Image Treatment:** Products should be shot on `surface-container-highest` (#dde3e9) backgrounds to create a seamless "infinite floor" effect within the card.

### Input Fields
*   **Style:** Minimalist underline or soft-filled. Use `surface-container-high` (#e4e9ee) as the field background with a `sm` (0.125rem) bottom-only radius.
*   **Focus State:** The bottom border transforms into a 2px `primary` signal.

### The "Spec-Sheet" Component (Custom)
For an electrical store, technical data is key. Create a "Technical Drawer" component using `surface-container-lowest` that slides out, utilizing `label-sm` for data-heavy specs to maintain the "Atelier" precision.

---

## 6. Do’s and Don’ts

### Do:
*   **Embrace Asymmetry:** Place a `display-md` headline on the left and a small `body-md` paragraph on the far right, leaving the center empty.
*   **Use the Spacing Scale:** Stick strictly to the increments (e.g., using `spacing-20` for hero margins) to ensure mathematical harmony.
*   **Monochromatic Product Shots:** Ensure product photography is de-saturated or high-key to match the `surface` palette.

### Don’t:
*   **No "Hardware Yellow/Orange":** Never use traditional industrial colors. The only "warning" or "action" colors are our Primary Blue or the specific `error` (#9e3f4e) tone.
*   **No Heavy Borders:** If you feel the need to add a border, increase the `spacing` or change the `surface` tier instead.
*   **No Clutter:** Never place more than 6 products in a single row. The goal is curation, not volume.