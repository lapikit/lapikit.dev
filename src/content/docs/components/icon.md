---
title: 'Icon'
description: 'Insert icons easily with Lapikit. Manage sizes, colors, states and seamless integration into your components.'
---

<script>
	import LazyRepl from '$components/lazy-repl.svelte';

	import Preview from '$examples/components/icon/preview.svelte';
	import Size from '$examples/components/icon/size.svelte';
	import Color from '$examples/components/icon/color.svelte';
	import Src from '$examples/components/icon/src.svelte';
</script>

# Icon component

The `kit:icon` component is a sizing and accessibility wrapper for icons. It supports three rendering modes: SVG component via `children`, image via `src`, or CSS icon font via `name`.

<LazyRepl title="icon.svelte" presentation lang="svelte" content={() => import('$examples/components/icon/preview.svelte?raw')}>
<Preview/>
</LazyRepl>

`kit:icon` renders as an `<i>` by default. It sets a consistent `font-size` equal to the current size token, which becomes the `width` and `height` of the inner SVG or image. Child SVG components (e.g. lucide-svelte) inherit this size automatically.

All icons are decorative by default (`aria-hidden="true"`). Set `decorative={false}` with a `label` or `alt` to expose them to assistive technologies.

## Examples of icon

### size

When no `size` is set, the icon inherits the font-size of its parent useful inside buttons and chips where the size is already controlled.

- **size**: `'xs' | 'sm' | 'md' | 'lg' | 'xl'` = `inherits`

<LazyRepl title="icon.svelte" lang="svelte" content={() => import('$examples/components/icon/size.svelte?raw')}>
<Size/>
</LazyRepl>

### color

Pass a CSS color value to `color`. It sets both `color` and `--kit-icon-color` so the icon and mask mode both pick it up.

- **color**: `string` = `''`

<LazyRepl title="icon.svelte" lang="svelte" content={() => import('$examples/components/icon/color.svelte?raw')}>
<Color/>
</LazyRepl>

### src image icons

Pass an image URL to `src`. For SVG sources, `colorMode="mask"` applies `currentColor` via CSS mask useful for single-color icons that need to follow the theme.

- **src**: `string` = `''`
- **colorMode**: `'auto' | 'mask' | 'filter' | 'none'` = `'auto'`
- **imgFilter**: `string` = `''`

<LazyRepl title="icon.svelte" lang="svelte" content={() => import('$examples/components/icon/src.svelte?raw')}>
<Src/>
</LazyRepl>

### Accessibility

By default icons are hidden from assistive technologies (`decorative={true}`, `aria-hidden="true"`). Set `decorative={false}` and provide `label` (or `alt` for image icons) when the icon carries meaning on its own.

- **decorative**: `boolean` = `true`
- **label**: `string | undefined` = `undefined`
- **alt**: `string | undefined` = `undefined`

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the components directly:

<LazyRepl lang="js" content={"import { Icon } from 'lapikit/components';"} />

## API Reference

**`kit:icon`**

| props         | type                                     | description                                             | default   |
| ------------- | ---------------------------------------- | ------------------------------------------------------- | --------- |
| ref $bindable | `HTMLElement`                            | Bindable reference to the rendered DOM element.         | `null`    |
| is            | `string`                                 | HTML element to render.                                 | `'i'`     |
| s-class       | `'string' \| 'array' \| 'object'`        | Sets className on icon.                                 |           |
| s-style       | `'string' \| 'array' \| 'object'`        | Sets styles on icon.                                    |           |
| size          | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`   | Icon size token. Inherits from context when unset.      |           |
| src           | `string`                                 | Image URL. Used instead of `children`.                  |           |
| name          | `string`                                 | CSS class name for icon fonts.                          |           |
| icon          | `string`                                 | Alias treated as `src` if it contains `/`, else `name`. |           |
| color         | `string`                                 | Color applied to the icon and mask.                     |           |
| colorMode     | `'auto' \| 'mask' \| 'filter' \| 'none'` | How `color` is applied to image icons.                  | `'auto'`  |
| imgFilter     | `string`                                 | CSS `filter` value used in `filter` mode.               |           |
| decorative    | `boolean`                                | Hides from assistive tech when `true`.                  | `true`    |
| label         | `string`                                 | Accessible label when `decorative={false}`.             |           |
| alt           | `string`                                 | Alt text for image icons.                               | `''`      |
| loading       | `'eager' \| 'lazy'`                      | Image loading strategy.                                 | `'eager'` |
| decoding      | `'sync' \| 'async' \| 'auto'`            | Image decoding hint.                                    | `'async'` |
| children      | `Snippet`                                | SVG icon component (e.g. from lucide-svelte).           |           |

Add `kit:icon` to your [Buttons](/docs/components/button), [Cards](/docs/components/card) or [Chips](/docs/components/chip) to visually guide your users.
