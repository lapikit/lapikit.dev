---
title: "Icon"
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Preview from '../../../content/examples/components/icon/preview.svelte';
	import Size from '../../../content/examples/components/icon/size.svelte';
	import Color from '../../../content/examples/components/icon/color.svelte';
	import Src from '../../../content/examples/components/icon/src.svelte';
</script>

# Icon component

The `kit:icon` component is a sizing and accessibility wrapper for icons. It supports three rendering modes: SVG component via `children`, image via `src`, or CSS icon font via `name`.

<LazyRepl title="icon.svelte" presentation lang="svelte" content={() => import('../../../content/examples/components/icon/preview.svelte?raw')}>
<Preview/>
</LazyRepl>

## Guide

`kit:icon` renders as an `<i>` by default. It sets a consistent `font-size` equal to the current size token, which becomes the `width` and `height` of the inner SVG or image. Child SVG components (e.g. lucide-svelte) inherit this size automatically.

All icons are decorative by default (`aria-hidden="true"`). Set `decorative={false}` with a `label` or `alt` to expose them to assistive technologies.

## Usage

### size

| prop | type                                    | default    |
| ---- | --------------------------------------- | ---------- |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | inherits   |

When no `size` is set, the icon inherits the font-size of its parent — useful inside buttons and chips where the size is already controlled.

| value | size      |
| ----- | --------- |
| `xs`  | `0.875rem`|
| `sm`  | `1rem`    |
| `md`  | `1.125rem`|
| `lg`  | `1.25rem` |
| `xl`  | `1.375rem`|

<LazyRepl title="icon.svelte" lang="svelte" content={() => import('../../../content/examples/components/icon/size.svelte?raw')}>
<Size/>
</LazyRepl>

### color

Pass a CSS color value to `color`. It sets both `color` and `--kit-icon-color` so the icon and mask mode both pick it up.

| prop  | type     | description             |
| ----- | -------- | ----------------------- |
| color | `string` | Any valid CSS color.    |

<LazyRepl title="icon.svelte" lang="svelte" content={() => import('../../../content/examples/components/icon/color.svelte?raw')}>
<Color/>
</LazyRepl>

### src — image icons

Pass an image URL to `src`. For SVG sources, `colorMode="mask"` applies `currentColor` via CSS mask — useful for single-color icons that need to follow the theme.

| prop      | type                                  | description                                              |
| --------- | ------------------------------------- | -------------------------------------------------------- |
| src       | `string`                              | Image URL (PNG, SVG, …).                                 |
| colorMode | `'auto' \| 'mask' \| 'filter' \| 'none'` | Color application mode. `auto` uses mask for SVG.    |
| imgFilter | `string`                              | CSS `filter` value applied in `filter` mode.             |

<LazyRepl title="icon.svelte" lang="svelte" content={() => import('../../../content/examples/components/icon/src.svelte?raw')}>
<Src/>
</LazyRepl>

### Accessibility

By default icons are hidden from assistive technologies (`decorative={true}`, `aria-hidden="true"`). Set `decorative={false}` and provide `label` (or `alt` for image icons) when the icon carries meaning on its own.

| prop       | type      | description                                               | default |
| ---------- | --------- | --------------------------------------------------------- | ------- |
| decorative | `boolean` | `true` = `aria-hidden`. `false` = `role="img"` + label.  | `true`  |
| label      | `string`  | Accessible label when `decorative={false}`.               |         |
| alt        | `string`  | Alt text for image icons when `decorative={false}`.       | `''`    |

### Without preprocess Lapikit

<LazyRepl lang="js" content={"import { Icon } from 'lapikit/labs/components';"} />

## API Reference

**`kit:icon`**

| props      | type                                        | description                                              | default   |
| ---------- | ------------------------------------------- | -------------------------------------------------------- | --------- |
| is         | `string`                                    | HTML element to render.                                  | `'i'`     |
| size       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`     | Icon size token. Inherits from context when unset.       |           |
| src        | `string`                                    | Image URL. Used instead of `children`.                   |           |
| name       | `string`                                    | CSS class name for icon fonts.                           |           |
| icon       | `string`                                    | Alias — treated as `src` if it contains `/`, else `name`.|           |
| color      | `string`                                    | Color applied to the icon and mask.                      |           |
| colorMode  | `'auto' \| 'mask' \| 'filter' \| 'none'`   | How `color` is applied to image icons.                   | `'auto'`  |
| imgFilter  | `string`                                    | CSS `filter` value used in `filter` mode.                |           |
| decorative | `boolean`                                   | Hides from assistive tech when `true`.                   | `true`    |
| label      | `string`                                    | Accessible label when `decorative={false}`.              |           |
| alt        | `string`                                    | Alt text for image icons.                                | `''`      |
| loading    | `'eager' \| 'lazy'`                         | Image loading strategy.                                  | `'eager'` |
| decoding   | `'sync' \| 'async' \| 'auto'`              | Image decoding hint.                                     | `'async'` |
| children   | `Snippet`                                   | SVG icon component (e.g. from lucide-svelte).            |           |
