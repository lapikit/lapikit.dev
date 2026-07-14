---
title: 'Appbar'
description: 'Add an elegant, responsive application bar to your interfaces. Perfect for headers or navigation zones.'
---

<script>
	import LazyRepl from '$components/lazy-repl.svelte';

	import Preview from '$examples/components/appbar/preview.svelte';
	import Variants from '$examples/components/appbar/variants.svelte';
	import Density from '$examples/components/appbar/density.svelte';
	import ClassContent from '$examples/components/appbar/class-content.svelte';
</script>

# Appbar component

The `kit:appbar` is an essential component for structuring an application's header. It provides a dedicated space for displaying elements such as titles, icons, buttons or menus. Thanks to its many customization options, the `kit:appbar` integrates perfectly into a variety of designs, from minimalist to complex.

<LazyRepl title="appbar.svelte" presentation lang="svelte" content={() => import('$examples/components/appbar/preview.svelte?raw')}>
<Preview/>
</LazyRepl>

`kit:appbar` renders as a `<header>` by default. It wraps your content in an inner `kit-appbar__wrapper` div that fills the full width and aligns items in a row. Use `classContent` to apply a class to that wrapper typically to constrain the max-width of the content while the background spans the full width.

## Examples of app bar

### Base

The `variant` prop controls the background and border style.

- **variant**: `'filled' | 'outline' | 'text'` = `'filled'`

<LazyRepl title="appbar.svelte" lang="svelte" content={() => import('$examples/components/appbar/variants.svelte?raw')}>
<Variants/>
</LazyRepl>

### Density

`density` adjusts the height and horizontal padding of the appbar.

- **density**: `'compact' | 'default' | 'comfortable'` = `'default'`

<LazyRepl title="appbar.svelte" lang="svelte" content={() => import('$examples/components/appbar/density.svelte?raw')}>
<Density/>
</LazyRepl>

### classContent

`classContent` applies a CSS class to the inner content wrapper. Use it to constrain the max-width of the content while the appbar background spans the full width.

- **classContent**: `string | string[]` = `''`

<LazyRepl title="appbar.svelte" lang="svelte" content={() => import('$examples/components/appbar/class-content.svelte?raw')}>
<ClassContent/>
</LazyRepl>

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the component directly:

<LazyRepl lang="js" content={"import { Appbar } from 'lapikit/components';"} />

## API Reference

**`kit:appbar`**

| props         | type                                                       | description                                     | default     |
| ------------- | ---------------------------------------------------------- | ----------------------------------------------- | ----------- |
| ref $bindable | `HTMLElement`                                              | Bindable reference to the rendered DOM element. | `null`      |
| is            | `'div' \| 'header' \| 'nav'`                               | HTML element to render.                         | `'header'`  |
| s-class       | `'string' \| 'array' \| 'object'`                          | Sets className on appbar.                       |             |
| s-style       | `'string' \| 'array' \| 'object'`                          | Sets styles on appbar.                          |             |
| variant       | `'filled' \| 'outline' \| 'text'`                          | Visual style of the appbar.                     | `'filled'`  |
| density       | `'none' \| 'compact' \| 'default' \| 'comfortable'`        | Height and horizontal padding.                  | `'default'` |
| rounded       | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`      | Border radius.                                  | `0`         |
| color         | `string`                                                   | Foreground color override (`--kit-appbar-fg`).  |             |
| background    | `string`                                                   | Background color override (`--kit-appbar-bg`).  |             |
| classContent  | `string \| string[]`                                       | Class(es) applied to the inner content wrapper. |             |
| children      | `Snippet`                                                  | Appbar content.                                 |             |
| elevation     | `'0' \| '1' \| '2' \| '3' \| '4' \| '5' \| ElevationState` | Add shadow effect.                              |             |
| size          | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                     | Sizing height, font and gap for appbar.         | `'md'`      |

An effective `kit:appbar` goes well with [Dropdown](/docs/components/dropdown) for menus and [Avatars](/docs/components/avatar) for identification.
