---
title: 'Icon component'
category: 'Components'
head:
  title: 'Icon'
  description: 'Insert icons easily with Lapikit. Manage sizes, colors, states and seamless integration into your components.'
layout: 'doc_page'
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Preview from '$examples/components/icon/preview.svelte';
	import Size from '$examples/components/icon/size.svelte';
	import Color from '$examples/components/icon/color.svelte';
	import Src from '$examples/components/icon/src.svelte';

	import previewCode from '$examples/components/icon/preview.svelte?raw';
	import sizeCode from '$examples/components/icon/size.svelte?raw';
	import colorCode from '$examples/components/icon/color.svelte?raw';
	import srcCode from '$examples/components/icon/src.svelte?raw';
</script>

The `kit:icon` component is a sizing and accessibility wrapper for icons. It supports three rendering modes: SVG component via `children`, image via `src`, or CSS icon font via `name`.

<LazyRepl title="icon.svelte" presentation lang="svelte" content={previewCode}>
<Preview/>
</LazyRepl>

`kit:icon` renders as an `<i>` by default. It sets a consistent `font-size` equal to the current size token, which becomes the `width` and `height` of the inner SVG or image. Child SVG components (e.g. lucide-svelte) inherit this size automatically.

All icons are decorative by default (`aria-hidden="true"`). Set `decorative={false}` with a `label` or `alt` to expose them to assistive technologies.

## Examples of icon

### size

When no `size` is set, the icon follows the size of the component around it: inside a `kit:btn`, a `kit:chip` or a `kit:textfield`, it takes the matching size. Elsewhere, it is `md`.

- **size**: `'default' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'` = `'default'`

| size | icon size         |
| ---- | ----------------- |
| `xs` | `0.75rem` (12px)  |
| `sm` | `0.875rem` (14px) |
| `md` | `1rem` (16px)     |
| `lg` | `1.125rem` (18px) |
| `xl` | `1.25rem` (20px)  |

> The sizes are in `rem`: the icon grows with the font size set in the browser, like the text around it. Override them with the `--kit-icon-size-*` variables.

<LazyRepl title="icon.svelte" lang="svelte" content={sizeCode}>
<Size/>
</LazyRepl>

### color

Pass a color of the palette (`success`, `error`...) or any CSS color (`#f00`, `oklch(...)`) to `color`. It sets `--kit-icon-color`, used by the icon and by the mask mode. Without `color`, the icon takes the color of the text around it.

- **color**: `string | false` = `undefined`

<LazyRepl title="icon.svelte" lang="svelte" content={colorCode}>
<Color/>
</LazyRepl>

### src image icons

Pass an image URL to `src`. For SVG sources, `colorMode="mask"` applies `currentColor` via CSS mask useful for single-color icons that need to follow the theme.

- **src**: `string` = `''`
- **colorMode**: `'auto' | 'mask' | 'filter' | 'none'` = `'auto'`
- **imgFilter**: `string` = `''`

<LazyRepl title="icon.svelte" lang="svelte" content={srcCode}>
<Src/>
</LazyRepl>

### Accessibility

By default icons are hidden from assistive technologies (`decorative={true}`, `aria-hidden="true"`). Set `decorative={false}` and provide `label` (or `alt` for image icons) when the icon carries meaning on its own.

- **decorative**: `boolean` = `true`
- **label**: `string | undefined` = `undefined`
- **alt**: `string | undefined` = `undefined`

### tooltip

Add a tooltip to the icon with the `tooltip` prop: a text, or options (`location`, `variant`, `delayDuration`...). See [the tooltip prop](/docs/components/tooltip#the-tooltip-prop).

<LazyRepl lang="svelte" content={'<kit:icon tooltip="More information">...</kit:icon>'} />

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the components directly:

<LazyRepl lang="js" content={"import { Icon } from 'lapikit/components';"} />

## API Reference

**`kit:icon`**

| props         | type                                                | description                                                                                                                                 | default     |
| ------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| ref $bindable | `HTMLElement`                                       | Bindable reference to the rendered DOM element.                                                                                             | `null`      |
| is            | `'i' \| 'span'`                                     | HTML element to render.                                                                                                                     | `'i'`       |
| class         | `string \| array \| object`                         | Classes of the icon, with the rules of Svelte (clsx).                                                                                       |             |
| style         | `string`                                            | Inline style of the icon.                                                                                                                   |             |
| s-class       | `string \| array \| object`                         | Classes of the icon, merged with `class`.                                                                                                   |             |
| s-style       | `object`                                            | Inline style as an object of property / value pairs.                                                                                        |             |
| size          | `'default' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | Icon size. `'default'` follows the parent component, else `md`.                                                                             | `'default'` |
| src           | `string`                                            | Image URL. Used instead of `children`.                                                                                                      |             |
| name          | `string`                                            | CSS class name for icon fonts.                                                                                                              |             |
| icon          | `string`                                            | Alias treated as `src` if it contains `/`, else `name`.                                                                                     |             |
| color         | `string \| false`                                   | A color of the palette or any CSS color (`--kit-icon-color`).                                                                               |             |
| colorMode     | `'auto' \| 'mask' \| 'filter' \| 'none'`            | How `color` is applied to image icons.                                                                                                      | `'auto'`    |
| imgFilter     | `string`                                            | CSS `filter` value used in `filter` mode.                                                                                                   |             |
| decorative    | `boolean`                                           | Hides from assistive tech when `true`.                                                                                                      | `true`      |
| label         | `string`                                            | Accessible label when `decorative={false}`.                                                                                                 |             |
| tooltip       | `string \| TooltipOptions`                          | Tooltip on hover, see [the tooltip prop](/docs/components/tooltip#the-tooltip-prop). The icon is then named by the tooltip, not decorative. |             |
| alt           | `string`                                            | Alt text for image icons.                                                                                                                   | `''`        |
| loading       | `'eager' \| 'lazy'`                                 | Image loading strategy.                                                                                                                     | `'eager'`   |
| decoding      | `'sync' \| 'async' \| 'auto'`                       | Image decoding hint.                                                                                                                        | `'async'`   |
| children      | `Snippet`                                           | SVG icon component (e.g. from lucide-svelte).                                                                                               |             |

Add `kit:icon` to your [Buttons](/docs/components/button), [Cards](/docs/components/card) or [Chips](/docs/components/chip) to visually guide your users.
