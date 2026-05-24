---
title: 'Migration Guide'
description: 'Migrate from older Lapikit to recent versions. Find all the steps for updating. If necessary, contact the team Lapikit'
keywords:
  - 'migration'
  - 'upgrade'
  - 'changelog'
  - 'breaking changes'
---

## Migration Guide

Learn how to migrate from older Lapikit versions to the latest release.

---

## From 0.2.x to 0.5

Lapikit v0.5 introduces several breaking changes that affect the preprocessor, component syntax, and how styles are loaded. This guide walks through each change and how to update your setup.

### Preprocessor - from Vite to Svelte

Lapikit no longer ships a Vite plugin. The preprocessor is now a **Svelte preprocessor**, configured directly in `svelte.config.js`.

**Before (≤ 0.2.x)**

The Lapikit plugin was registered in `vite.config.js` or `vite.config.ts`:

```javascript
// vite.config.js
import { lapikit } from 'lapikit/vite';

export default {
	plugins: [lapikit()]
};
```

**After (≥ 0.5)**

Register the preprocessor in `svelte.config.js` instead:

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-node';
import { lapikitPreprocess } from 'lapikit/labs/preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: lapikitPreprocess(),
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
```

Remove any Lapikit-related entries from your `vite.config.js`. After updating, restart your dev server.

---

### Component syntax - `<kit:*>`

Components are no longer imported manually. Lapikit v0.5 introduces the `<kit:*>` template syntax, powered by the Svelte preprocessor. Imports are injected automatically at compile time.

**Before (≤ 0.2.x)**

```svelte
<script>
	import { Button } from 'lapikit';
</script>

<Button>Click me</Button>
```

**After (≥ 0.5)**

```svelte
<kit:btn>Click me</kit:btn>
```

The preprocessor resolves `<kit:btn>` to the correct component and injects the import automatically. You can still use manual imports when needed - for example, to alias a component or use it conditionally. Both approaches are compatible.

Here is a more complete example:

```svelte
<kit:app>
	<kit:appbar>
		<kit:btn variant="text">Menu</kit:btn>
	</kit:appbar>

	<kit:card>
		<kit:chip>New</kit:chip>
		Hello world
	</kit:card>
</kit:app>
```

---

### Scoped style imports

Component styles are now loaded in a **scoped** manner. Each component only loads the styles it actually uses, rather than injecting a global stylesheet at startup.

This change improves rendering performance and prevents global CSS collisions, but it means you should no longer import a global Lapikit stylesheet manually.

**Before (≤ 0.2.x)**

```javascript
// main.js or app entry
import 'lapikit/styles';
```

**After (≥ 0.5)**

No global import is needed. Styles are handled automatically per component when you use the `<kit:*>` syntax with the preprocessor in place.

If you were customizing component styles via global overrides, you will need to migrate those to CSS custom properties (see the theming section below) or use the `s-class` / `s-style` props for per-instance customization.

---

### Breakpoints and theming - from JS config to CSS variables

In v0.5, `createLapikit()` has been removed entirely. There is no longer a JS/TS configuration file for Lapikit. Breakpoints, themes, colors, and design tokens are now defined directly via **CSS custom properties** in your project's global stylesheet.

**Before (≤ 0.2.x)**

Breakpoints and theme colors were declared in `src/plugins/lapikit.ts`:

```typescript
export default createLapikit({
  breakpoints: {
    devices: { desktop: 1024, tablet: 768, mobile: 640 },
    thresholds: { sm: 640, md: 768, lg: 1024, xl: 1280 }
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          label: { primary: '#000000' }
        }
      }
    }
  }
});
```

**After (≥ 0.5)**

Delete `src/plugins/lapikit.ts` (or `lapikit.js`) entirely. All customization now lives in your CSS via Lapikit's CSS custom properties - colors, backgrounds, radius, and more are all exposed as `--kit-*` variables that you can override in your global stylesheet.

Breakpoint logic should be handled with standard CSS media queries or any responsive utility (Tailwind, etc.) - Lapikit no longer owns that responsibility.

For the full list of available variables and how to customize them, see the [Customize](/docs/customize) page.

---

### Migration steps summary (0.2.x → 0.5)

1. Remove the Lapikit Vite plugin from `vite.config.js`.
2. Add `lapikitPreprocess()` to `svelte.config.js`.
3. Replace component imports and `<KitBtn>` usage with `<kit:btn>` syntax.
4. Remove any global Lapikit stylesheet imports - scoped styles are now automatic.
5. Delete `src/plugins/lapikit.(js|ts)` - `createLapikit()` no longer exists.
6. Move your theme colors, tokens, and design values to CSS custom properties in your global stylesheet (`:root { --kit-* }`).
7. Handle breakpoints with standard CSS media queries or a utility of your choice.
8. Restart your dev server.

### Quick comparison

| Feature            | Before (0.2.x)                 | After (0.5)                                 |
| ------------------ | ------------------------------ | ------------------------------------------- |
| Preprocessor       | Vite plugin (`vite.config.js`) | Svelte preprocessor (`svelte.config.js`)    |
| Component usage    | Manual import + `<KitBtn>`     | `<kit:btn>` (auto-imported)                 |
| Stylesheet loading | Global import at app entry     | Scoped per component, automatic             |
| Theme & colors     | `createLapikit()` JS config    | CSS custom properties (`:root { --kit-* }`) |
| Breakpoints        | Built into `createLapikit()`   | Removed - handle with CSS media queries     |
| JS config file     | `src/plugins/lapikit.(js\|ts)` | No longer needed - delete it                |

---

## From 0.2.3 to 0.2.4

Lapikit v0.2.4 introduced major changes to configuration, theming, and the CLI.

### CLI changes

| Before (≤ 0.2.3)   | After (≥ 0.2.4) |
| ------------------ | --------------- |
| `npx lapikit init` | `npx lapikit`   |

The CLI no longer needs `init`. Running `npx lapikit` will guide you through setup and automatically create your configuration files.

By default, a config file is generated at `src/plugins/lapikit.(js|ts)`. This makes installation faster and ensures a consistent structure across projects.

### New configuration format

Lapikit now uses a single entry point: `createLapikit()`. This simplifies customization and centralizes everything in one place: themes, variables, breakpoints, and store integration.

```typescript
// src/plugins/lapikit.ts
import createLapikit from 'lapikit';

export default createLapikit({
  breakpoints: {
    devices: {
      desktop: 1024,
      tablet: 768,
      mobile: 640


    },
    thresholds: {
      base: 0,
      xs: 448,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
      '3xl': 1792
    }
  },
  theme: {
    defaultTheme: 'light',
    colorScheme: true,
    themes: {
      light: {
        dark: false,
        colors: {
          label: {
            primary: '#000000'
          }
        }
      }
    },
    variables: {
      'test-variable': '1rem'
    }
  },
  typography: {
    defaultTypography: 'default',
    fonts: {
      default: {
        serif: ['Merriweather', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif']
      }
    }
  },
  styles: {
    spacing: '0.125rem',
    shape: {
      sm: '0.125rem'
    }
  }
});
```

### Breakpoints and hooks

Breakpoints were restructured for clarity and consistency.

| Before (≤ 0.2.3)                                           | After (≥ 0.2.4)                        |
| ---------------------------------------------------------- | -------------------------------------- |
| `mobileBreakpoint`, `tabletBreakpoint`, `laptopBreakpoint` | `devices: { mobile, tablet, desktop }` |

Breakpoints moved from `rem` to `px`. Lapikit also exposed runes to access breakpoints directly in JS/TS, allowing you to show or hide elements dynamically without relying only on CSS.

### Theming system

The theme system became more modular: each theme is independent and can override colors, tokens, and variables. Light and dark modes can be toggled globally or per component.

### Device utility classes

| Before (≤ 0.2.3)                                       | After (≥ 0.2.4)                                                            |
| ------------------------------------------------------ | -------------------------------------------------------------------------- |
| `.hidden-mobile`, `.display-tablet`, `.display-laptop` | `.kit-device--d-mobile`, `.kit-device--h-tablet`, `.kit-device--h-desktop` |

`d` = display, `h` = hide.

### Migration steps summary (0.2.3 → 0.2.4)

1. Replace `npx lapikit init` with `npx lapikit`.
2. Move your config to `src/plugins/lapikit.(js|ts)`.
3. Wrap your config in `createLapikit()`.
4. Update breakpoints to use `devices` and `thresholds`.
5. Replace `.hidden-*` and `.display-*` classes with `.kit-device--*`.
6. Update your theme and font structure.
7. Restart your dev server.

---

## Need help?

You can find detailed release notes and discussions on [Lapikit GitHub Releases](https://github.com/lapikit/lapikit/releases).

If something doesn't work after migration, [open an issue](https://github.com/lapikit/lapikit/issues) or join the discussion on Discord. The community is active and always open to feedback.
