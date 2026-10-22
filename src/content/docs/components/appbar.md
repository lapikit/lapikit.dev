---
title: 'Appbar component'
category: 'Components'
head:
  title: 'Appbar'
  description: 'Add an elegant, responsive application bar to your interfaces. Perfect for headers or navigation zones.'
layout: 'doc_page'
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Preview from '$examples/components/appbar/preview.svelte';
	import Variants from '$examples/components/appbar/variants.svelte';
	import Density from '$examples/components/appbar/density.svelte';
	import ClassContent from '$examples/components/appbar/class-content.svelte';

	import previewCode from '$examples/components/appbar/preview.svelte?raw';
	import variantsCode from '$examples/components/appbar/variants.svelte?raw';
	import densityCode from '$examples/components/appbar/density.svelte?raw';
	import classContentCode from '$examples/components/appbar/class-content.svelte?raw';
</script>

The `kit:appbar` is an essential component for structuring an application's header. It provides a dedicated space for displaying elements such as titles, icons, buttons or menus. Thanks to its many customization options, the `kit:appbar` integrates perfectly into a variety of designs, from minimalist to complex.

<LazyRepl title="appbar.svelte" presentation lang="svelte" content={previewCode}>
<Preview/>
</LazyRepl>

`kit:appbar` renders as a `<header>` by default. It wraps your content in an inner `kit-appbar__wrapper` div that fills the full width and aligns items in a row. Use `classContent` to apply a class to that wrapper typically to constrain the max-width of the content while the background spans the full width.

## Examples of app bar

### Base

The `variant` prop controls the background and border style, `color` gives the color.

- **filled** (default): surface background (`--kit-color-surface-1`), or the `color` with a contrasted text.
- **tonal**: light tint of the color, text in the color.
- **outline**: transparent background with a border.
- **surface**: very light tint of the color with a soft border.
- **text**: transparent background, text in the color.

- **variant**: `'filled' | 'tonal' | 'outline' | 'surface' | 'text'` = `'filled'`
- **color**: `string | false | { base?, active? }` = `undefined`

<LazyRepl title="appbar.svelte" lang="svelte" content={variantsCode}>
<Variants/>
</LazyRepl>

### Density

`density` adjusts the height and the padding of the appbar, from `-4px` (`dense`) to `+4px` (`spacious`).

- **density**: `'dense' | 'compact' | 'default' | 'comfortable' | 'spacious'` = `'default'`

<LazyRepl title="appbar.svelte" lang="svelte" content={densityCode}>
<Density/>
</LazyRepl>

### classContent

`classContent` applies a CSS class to the inner content wrapper. Use it to constrain the max-width of the content while the appbar background spans the full width.

- **classContent**: `string | array | object` = `undefined`

<LazyRepl title="appbar.svelte" lang="svelte" content={classContentCode}>
<ClassContent/>
</LazyRepl>

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the component directly:

<LazyRepl lang="js" content={"import { Appbar } from 'lapikit/components';"} />

## API Reference

**`kit:appbar`**

| props         | type                                                               | description                                             | default     |
| ------------- | ------------------------------------------------------------------ | ------------------------------------------------------- | ----------- |
| ref $bindable | `HTMLElement`                                                      | Bindable reference to the rendered DOM element.         | `null`      |
| is            | `'div' \| 'header' \| 'nav'`                                       | HTML element to render.                                 | `'header'`  |
| class         | `string \| array \| object`                                        | Classes of the appbar, with the rules of Svelte (clsx). |             |
| style         | `string`                                                           | Inline style of the appbar.                             |             |
| s-class       | `string \| array \| object`                                        | Classes of the appbar, merged with `class`.             |             |
| s-style       | `object`                                                           | Inline style as an object of property / value pairs.    |             |
| variant       | `'filled' \| 'tonal' \| 'outline' \| 'surface' \| 'text'`          | Visual style of the appbar.                             | `'filled'`  |
| density       | `'dense' \| 'compact' \| 'default' \| 'comfortable' \| 'spacious'` | Height and padding, from `-4px` to `+4px`.              | `'default'` |
| rounded       | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`              | Border radius.                                          | `0`         |
| color         | `string \| false \| { base?, active? }`                            | Appbar color, its use depends on the variant.           |             |
| classContent  | `string \| array \| object`                                        | Classes of the inner content wrapper (clsx).            |             |
| children      | `Snippet`                                                          | Appbar content.                                         |             |
| elevation     | `'0' \| '1' \| '2' \| '3' \| '4' \| '5' \| ElevationState`         | Add shadow effect.                                      |             |
| size          | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                             | Sizing height, font and gap for appbar.                 | `'md'`      |

An effective `kit:appbar` goes well with [Dropdown](/docs/components/dropdown) for menus and [Avatars](/docs/components/avatar) for identification.
