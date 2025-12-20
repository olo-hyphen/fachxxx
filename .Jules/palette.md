## 2024-05-23 - Accessibility First: Icon Buttons
**Learning:** Icon-only buttons are often inaccessible to screen readers and can be confusing for mouse users if the icon is ambiguous.
**Action:** Always provide an `aria-label` for icon-only buttons. Additionally, using the `title` attribute as a fallback (or explicitly) provides a native tooltip for mouse users, improving clarity for everyone. This pattern (`title={title || ariaLabel}`) ensures both a11y compliance and better UX with minimal effort.
