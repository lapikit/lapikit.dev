---
title: "Toolbar"
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Preview from '../../../content/examples/components/toolbar/preview.svelte';
	import Variants from '../../../content/examples/components/toolbar/variants.svelte';
	import Density from '../../../content/examples/components/toolbar/density.svelte';
	import Orientation from '../../../content/examples/components/toolbar/orientation.svelte';
</script>

# Toolbar component

The `kit:toolbar` component is a container for grouped action buttons or controls. It supports four visual variants, density control, and horizontal or vertical orientation.

<LazyRepl title="toolbar.svelte" presentation lang="svelte" content={() => import('../../../content/examples/components/toolbar/preview.svelte?raw')}>
<Preview/>
</LazyRepl>

## Guide

`kit:toolbar` renders as a `<div>` by default but can be changed to `<header>` or `<nav>`. It sets `role="toolbar"` automatically. Place `kit:btn`, `kit:separator`, or any other element as children.

## Usage

### Variants

| prop    | type                                          | default    |
| ------- | --------------------------------------------- | ---------- |
| variant | `'filled' \| 'outline' \| 'text' \| 'dash'`   | `'filled'` |

<LazyRepl title="toolbar.svelte" lang="svelte" content={() => import('../../../content/examples/components/toolbar/variants.svelte?raw')}>
<Variants/>
</LazyRepl>

### density

| prop    | type                                      | default     |
| ------- | ----------------------------------------- | ----------- |
| density | `'compact' \| 'default' \| 'comfortable'` | `'default'` |

<LazyRepl title="toolbar.svelte" lang="svelte" content={() => import('../../../content/examples/components/toolbar/density.svelte?raw')}>
<Density/>
</LazyRepl>

### orientation

| prop        | type                              | default        |
| ----------- | --------------------------------- | -------------- |
| orientation | `'horizontal' \| 'vertical'`      | `'horizontal'` |

<LazyRepl title="toolbar.svelte" lang="svelte" content={() => import('../../../content/examples/components/toolbar/orientation.svelte?raw')}>
<Orientation/>
</LazyRepl>

### location

Set `location` to `'top'` or `'bottom'` to pin the toolbar to the viewport edge (`position: fixed`). This is intended for app-level toolbars like a top navigation bar or a bottom action bar.

| prop     | type                    | description                              |
| -------- | ----------------------- | ---------------------------------------- |
| location | `'top' \| 'bottom'`     | Pins the toolbar to the viewport edge.   |

### Without preprocess Lapikit

<LazyRepl lang="js" content={"import { Toolbar } from 'lapikit/labs/components';"} />

## API Reference

**`kit:toolbar`**

| props        | type                                          | description                                              | default        |
| ------------ | --------------------------------------------- | -------------------------------------------------------- | -------------- |
| is           | `'div' \| 'header' \| 'nav'`                  | HTML element to render.                                  | `'div'`        |
| variant      | `'filled' \| 'outline' \| 'text' \| 'dash'`   | Visual style.                                            | `'filled'`     |
| density      | `'compact' \| 'default' \| 'comfortable'`     | Padding and size density.                                | `'default'`    |
| orientation  | `'horizontal' \| 'vertical'`                  | Layout direction.                                        | `'horizontal'` |
| location     | `'top' \| 'bottom'`                           | Pins to viewport edge (`position: fixed`).               |                |
| rounded      | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`  | Border radius.                                           | `'xl'` (1rem)  |
| classContent | `string \| string[]`                          | Class(es) applied to the inner wrapper.                  |                |
| color        | `string`                                      | Foreground color override (`--kit-toolbar-fg`).          |                |
| background   | `string`                                      | Background color override (`--kit-toolbar-bg`).          |                |
| children     | `Snippet`                                     | Toolbar content.                                         |                |
