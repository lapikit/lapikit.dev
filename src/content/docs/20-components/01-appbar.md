---
title: "Appbar"
description: "Add an elegant, responsive application bar to your interfaces. Perfect for headers or navigation zones."
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Preview from '../../../content/examples/components/appbar/preview.svelte';
	import Variants from '../../../content/examples/components/appbar/variants.svelte';
	import Density from '../../../content/examples/components/appbar/density.svelte';
	import ClassContent from '../../../content/examples/components/appbar/class-content.svelte';
</script>

# Appbar component

The `kit:appbar` component is a horizontal bar used as a top navigation or page header. It handles layout, sizing, and visual style — content is fully up to you via `children`.

<LazyRepl title="appbar.svelte" presentation lang="svelte" content={() => import('../../../content/examples/components/appbar/preview.svelte?raw')}>
<Preview/>
</LazyRepl>

## Guide

`kit:appbar` renders as a `<header>` by default. It wraps your content in an inner `kit-appbar__wrapper` div that fills the full width and aligns items in a row. Use `classContent` to apply a class to that wrapper — typically to constrain the max-width of the content while the background spans the full width.

## Usage

### Variants

The `variant` prop controls the background and border style.

- **variant**: `'filled' | 'outline' | 'text'` = `'filled'`

<LazyRepl title="appbar.svelte" lang="svelte" content={() => import('../../../content/examples/components/appbar/variants.svelte?raw')}>
<Variants/>
</LazyRepl>

### Density

`density` adjusts the height and horizontal padding of the appbar.

- **density**: `'compact' | 'default' | 'comfortable'` = `'default'`

<LazyRepl title="appbar.svelte" lang="svelte" content={() => import('../../../content/examples/components/appbar/density.svelte?raw')}>
<Density/>
</LazyRepl>

### classContent

`classContent` applies a CSS class to the inner content wrapper. Use it to constrain the max-width of the content while the appbar background spans the full width.

- **classContent**: `string | string[]` = `''`

<LazyRepl title="appbar.svelte" lang="svelte" content={() => import('../../../content/examples/components/appbar/class-content.svelte?raw')}>
<ClassContent/>
</LazyRepl>

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the component directly:

<LazyRepl lang="js" content={"import { Appbar } from 'lapikit/labs/components';"} />

## API Reference

**`kit:appbar`**

| props        | type                                                  | description                                     | default     |
| ------------ | ----------------------------------------------------- | ----------------------------------------------- | ----------- |
| is           | `'div' \| 'header' \| 'nav'`                          | HTML element to render.                         | `'header'`  |
| variant      | `'filled' \| 'outline' \| 'text'`                     | Visual style of the appbar.                     | `'filled'`  |
| density      | `'compact' \| 'default' \| 'comfortable'`             | Height and horizontal padding.                  | `'default'` |
| rounded      | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| string` | Border radius. Accepts a custom `px` value.     | `0`         |
| color        | `string`                                              | Foreground color override (`--kit-appbar-fg`).  |             |
| background   | `string`                                              | Background color override (`--kit-appbar-bg`).  |             |
| classContent | `string \| string[]`                                  | Class(es) applied to the inner content wrapper. |             |
| children     | `Snippet`                                             | Appbar content.                                 |             |
