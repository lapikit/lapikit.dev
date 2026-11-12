---
title: 'Migration Guide'
category: 'Extra Topics'
head:
  title: 'Migration Guide'
  description: 'Migrate from older Lapikit to recent versions. Find all the steps for updating. If necessary, contact the team Lapikit'
layout: 'doc_page'
keywords:
  - 'migration'
  - 'upgrade'
  - 'changelog'
  - 'breaking changes'
---

Learn how to migrate from older Lapikit versions to the latest release.

## Updating to version 0.8.0

### `trigger` replaces `activator` and the `children` of `kit:tooltip`

`kit:tooltip`, `kit:dropdown` and `kit:popover` share one `trigger(props)` snippet. Spread `props` on your trigger element: it holds the ARIA attributes and the handlers, so you no longer write `onclick={(e) => toggle(e.currentTarget)}`. `kit:tooltip` no longer wraps its trigger in a `<span>`.

```svelte
<!-- before -->
<kit:tooltip label="Save">
	<kit:btn>Save</kit:btn>
</kit:tooltip>

<kit:dropdown>
	{#snippet activator({ open, toggle }: ModelDropdownProps)}
		<kit:btn active={open} onclick={(e) => toggle(e.currentTarget)}>Menu</kit:btn>
	{/snippet}
	...
</kit:dropdown>

<!-- after -->
<kit:tooltip label="Save">
	{#snippet trigger(props: TooltipTriggerProps)}
		<kit:btn {...props}>Save</kit:btn>
	{/snippet}
</kit:tooltip>

<kit:dropdown>
	{#snippet trigger(props: DropdownTriggerProps, { open }: DropdownTriggerModel)}
		<kit:btn {...props} active={open}>Menu</kit:btn>
	{/snippet}
	...
</kit:dropdown>
```

- `openOnHover`: the `handleMouse` argument is gone, `props` holds the pointer handlers.
- Context menu: `toggle(event)` becomes `openAt(event)`, from the second argument of the dropdown `trigger`.
- Types: `ModelDropdownProps` and `ModelDropdownHandleProps` become `DropdownTriggerProps` and `DropdownTriggerModel`, `ModelPopoverProps` becomes `PopoverTriggerProps`, and `TooltipTriggerProps` is new.
- `kit:tooltip`: `forceMount` is removed (the tooltip is always in the DOM) and `ref` is now the tooltip panel.
- With `eslint-config-lapikit`, update it to know the `trigger` snippet.

For a simple text on a button, a chip or an icon, the new [`tooltip` prop](/docs/components/tooltip#the-tooltip-prop) replaces `kit:tooltip`:

```svelte
<kit:btn icon tooltip="Save"><Save /></kit:btn>
```

### `kit:textfield`: `min` and `max` become `minlength` and `maxlength`

`min` and `max` set the length of the value, and `max` cut the value when it was too long. `kit:textfield` now uses the native attributes: `minlength` and `maxlength` limit the length, and the counter shows `maxlength`. `min` and `max` go to the input, as the bounds of a `type="number"` field.

```svelte
<!-- before -->
<kit:textfield max={20} counter />

<!-- after -->
<kit:textfield maxlength={20} counter />
```

A value set by code is no longer cut: `maxlength` only stops the user from typing more.

## Updating to versions 0.7.6 and 0.7.7

These versions keep the API of 0.7.4, with two changes of behavior and one removal.

### `kit:modal` is a non-blocking window

`kit:modal` is meant for content that lives next to the page (chat, tool panel, notice): the page stays usable behind it. Since 0.7.6 it is built on a native `<dialog>` opened with `show()`, so it no longer locks the scroll and no longer announces itself as `aria-modal`. `ref` is now the `<dialog>` element (`HTMLDialogElement`).

If your modal must block the page until the user answers, use [`kit:dialog`](/docs/components/dialog) instead: it has a backdrop, traps the focus and locks the scroll.

### The `theme` store is removed

The `theme` store of `lapikit/actions` never followed the active theme. Read the theme with `createGlobalTheme().active`, and change it with [`useTheme()`](/docs/hooks/use-theme):

```svelte
<script>
	import { createGlobalTheme, useTheme } from 'lapikit/actions';

	const app = createGlobalTheme();
</script>

<kit:btn onclick={() => useTheme(app.active === 'dark' ? 'light' : 'dark')}>
	Theme: {app.active}
</kit:btn>
```

With SSR, add [`themeScript()`](/docs/hooks/use-theme#avoid-the-flash-of-the-wrong-theme) to your root layout to apply the stored theme before the first paint.

## Guide to migrating to version 0.7.4

Version **0.7.4** of Lapikit moves every component to a common structure: the same color system, the same densities, sizes in `rem` and `class` with the rules of Svelte. Most of your code keeps working, but some props, values and CSS variables change. This guide lists them, from the most common to the rarest.

### Svelte 5.20 or later

Lapikit 0.7.4 needs **Svelte 5.20 or later** (`peerDependencies`: `svelte@^5.20.0`): the components use `$props.id()` to give the same ids on the server and the client. Update Svelte if your project uses an older version:

```bash
npm install svelte@latest
```

### `background` is removed, use `color`

The `background` prop is removed from every component (`kit:btn`, `kit:card`, `kit:chip`, `kit:alert`, `kit:avatar`, `kit:list`, `kit:toolbar`, `kit:appbar`, `kit:accordion`, `kit:dialog`, `kit:modal`, `kit:textfield`, `kit:tooltip`, `kit:popover`, `kit:dropdown`). `color` now gives the main color of the component, and the text color follows it: the `on-` color of the palette, or a contrasted color for any CSS color.

**Before (≤ 0.7.3)**

```svelte
<kit:btn background="accent" color="on-accent">Get started</kit:btn>
```

**After (≥ 0.7.4)**

```svelte
<kit:btn color="accent">Get started</kit:btn>
```

For a transparent background, use a variant instead: `variant="text"` (or `outline`, `plain`...).

### `color` is the main color, not the text color

Before 0.7.4, `color` only changed the text color. It is now the main color of the component, used according to the variant:

- `filled`: the background, with a contrasted text;
- `tonal` and `surface`: a tint of the color, with the text in the color;
- `outline`: the border and the text;
- `text` and `plain`: the text.

**Before (≤ 0.7.3)**

```svelte
<!-- a surface button with a primary text -->
<kit:btn color="primary">Save</kit:btn>
```

**After (≥ 0.7.4)**

```svelte
<!-- a primary button with a contrasted text -->
<kit:btn color="primary">Save</kit:btn>

<!-- to keep a colored text -->
<kit:btn variant="text" color="primary">Save</kit:btn>
```

`color` also accepts `{ base, active }` for the active state, and `false` for no color: `color={isActive && 'accent'}`.

### `kit:alert`: `tone` and role

`tone` keeps working and gives the default color of the alert; `color` overrides it. The role now follows the tone: `role="alert"` for `warning` and `error`, `role="status"` for `default`, `info` and `success`, so the screen readers no longer interrupt the user for a simple information. Pass `role="alert"` to keep the previous behavior.

### Densities

Every component now has five densities: `dense`, `compact`, `default`, `comfortable` and `spacious`. The value `none` is removed. It had no style: by accident, it removed the padding and the minimal height of the component. Use `dense` for a tighter component, or set the size variables to `0` to keep the previous rendering.

**Before (≤ 0.7.3)**

```svelte
<kit:list density="none">...</kit:list>
```

**After (≥ 0.7.4)**

```svelte
<!-- a tighter list -->
<kit:list density="dense">...</kit:list>

<!-- the same rendering as density="none": no padding, no minimal height -->
<kit:list s-style={{ '--kit-list-item-h': '0px', '--kit-list-item-p': '0px' }}>...</kit:list>
```

`default` keeps the same rendering. `compact` and `comfortable` of `kit:list` and `kit:modal` change slightly: they now use the same offsets as the other components (`-4px` and `+4px`).

### Sizes in `rem`

The sizes of the components and the `--kit-font-*` variables are now in `rem`: they follow the font size set in the browser. With the default font size (16px), the rendering is the same, with two exceptions:

- the text of `kit:btn` follows its `size` (`14px` in `md`) instead of inheriting the font size of its parent;
- the icons in `kit:btn` and `kit:chip` now follow the size of the button.

### Renamed CSS variables and classes

If you style the internal parts of a component, update these names:

| component       | before                                                     | after                                                    |
| --------------- | ---------------------------------------------------------- | -------------------------------------------------------- |
| `kit:textfield` | `--kit-textfield-*`                                        | `--kit-field-*`                                          |
| `kit:textfield` | `.kit-textfield__field`                                    | `.kit-field__box`                                        |
| `kit:popover`   | `--kit-popover-bg`, `--kit-popover-fg`                     | `--kit-popover-content-bg`, `--kit-popover-content-fg`   |
| `kit:dropdown`  | `--kit-dropdown-bg`, `--kit-dropdown-fg`                   | `--kit-dropdown-content-bg`, `--kit-dropdown-content-fg` |
| `kit:tooltip`   | `.kit-tooltip__content` in a `.kit-tooltip` wrapper        | `.kit-tooltip` (no wrapper)                              |
| `kit:separator` | `--kit-separator-top-width`, `--kit-separator-right-width` | `--kit-separator-thickness`                              |
| every component | `--kit-*-hover-bg`, `--kit-*-active-bg`, `--kit-*-bd`      | `--kit-*-hover`, `--kit-*-active`, `--kit-*-border`      |

To change the color of a component globally, prefer its color variable: it keeps the contrast and the states.

```css
.kit-btn {
	--kit-btn-color: hsl(262 80% 50%);
}
```

The default values of the variables now have a zero specificity: a simple selector is enough to override them, see [Customize](/docs/customize).

### `class` and `s-class`

`class` and `s-class` now accept a string, an array or an object, with the rules of Svelte (clsx), on every component. In the object form of `s-class`, a string value no longer replaces the class name: `s-class={{ theme: 'dark' }}` gives the class `theme`. To get the class `dark`, use an array: `s-class={['dark']}`, or a condition: `s-class={{ dark: isDark }}`.

On `kit:tooltip`, `class` and `s-class` both go on the tooltip (before, `s-class` went on its trigger).

### `kit:textfield` attributes go on the input

The attributes of an input (`required`, `pattern`, `oninput`, `onchange`, `aria-label`...) now go on the `<input>`, like on a native input. Before, only `id`, `name`, `autocomplete` and `inputmode` reached it. `class`, `style`, `s-class` and `s-style` stay on the field. If you passed an attribute meant for the wrapper (a `data-*` attribute for your tests, for example), it is now on the input.

`kit:textfield` is now built on the new [Field](/docs/components/field) component, which you can use to wrap your own controls.

### `kit:tooltip`, `kit:popover` and `kit:dropdown`

These components now use the Popover API: they are displayed in the top layer of the page, above every element, so a `z-index` is no longer needed. `kit:popover` and `kit:dropdown` follow their activator when the page scrolls instead of closing, and close with `Escape`.

### `kit:toolbar`

`variant` and `orientation` no longer accept an object (a remain of the breakpoints, removed in 0.5): use a single value.

### Migration steps summary to 0.7.4

1. Update Svelte to 5.20 or later.
2. Replace `background` with `color`, and remove the `on-*` colors that came with it.
3. Check the components where `color` was used alone: add `variant="text"` to keep a colored text.
4. Replace `density="none"` with `density="dense"`, or with the size variables set to `0` to keep the same rendering.
5. Rename the CSS variables and classes listed above in your styles.
6. Replace `s-class={{ name: 'value' }}` with an array or a condition (`s-class={{ value: true }}`).
7. Check the attributes passed to `kit:textfield`, and the `role` of your alerts.
8. Restart your dev server.

---

## Guide to migrating from version from 0.2.x to 0.5

Version **0.5** of Lapikit introduces several significant changes related to the preprocessor, component syntax, and styles are loaded. This guide outlines each of these changes and provides detailed instructions for updating your configuration.

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
import { lapikitPreprocess } from 'lapikit/preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: lapikitPreprocess(),
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
```

Remove any Lapikit-related entries from your `vite.config.js`. After updating, restart your dev server.

### Component syntax with `<kit:*>`

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

### Migration steps summary from 0.2.x to 0.5

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

## And guide to migrating from version from 0.2.3 to 0.2.4

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

### Migration steps summary from 0.2.3 to 0.2.4

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
