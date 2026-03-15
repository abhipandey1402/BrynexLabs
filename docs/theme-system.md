# Theme System Documentation

## Architecture
The application uses a dual-theme architecture (Light/Dark) powered by `next-themes` and CSS variables (design tokens). 

### Key Components
- **ThemeProvider**: Manages the theme state and applies the `light` or `dark` class to the `html` element.
- **ThemeToggle**: Provides a UI for users to switch between themes.
- **globals.css**: Defines the semantic design tokens using RGB values for Tailwind compatibility.

## Design Tokens
Colors are defined in `src/app/globals.css`. We use RGB/RGBA values to allow Tailwind's opacity utilities to work seamlessly.

### Semantic Tokens
- `--background`: Primary surface color.
- `--foreground`: Primary text color.
- `--accent`: Brand accent color (Orange).
- `--border`: Standard border color with alpha support.

## Usage in Components
Always use Tailwind classes like `bg-background`, `text-foreground`, or `border-border` instead of hardcoded hex values.

```tsx
<div className="bg-background-card border border-border">
  <h2 className="text-foreground">Theme-Aware Card</h2>
</div>
```

## Maintenance
When adding new colors, define them in both `:root` (Light) and `.dark` blocks in `globals.css`. Ensure values are comma-separated RGB sets (e.g., `255, 255, 255`).
