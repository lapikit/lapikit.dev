---
title: "Dropdown"
description: "Flexible drop-down menu for actions or selections. Manages focus, clicks and intelligent positioning."
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Preview from '../../../content/examples/components/dropdown/preview.svelte';
	import Position from '../../../content/examples/components/dropdown/position.svelte';
	import Hover from '../../../content/examples/components/dropdown/hover.svelte';
</script>

# Dropdown component

The `kit:dropdown` component positions a floating panel relative to a trigger element. It manages open/close state internally and exposes it through the `activator` snippet.

<LazyRepl title="dropdown.svelte" presentation lang="svelte" content={() => import('../../../content/examples/components/dropdown/preview.svelte?raw')}>
<Preview/>
</LazyRepl>

## Guide

`kit:dropdown` has no visible element of its own — it renders the `activator` snippet inline and the floating panel in a fixed-position `<div>` when open. The panel position is computed from the activator element's bounding rect and updates on scroll and resize.

The `activator` snippet receives two arguments:

```ts
activator(model: ModelDropdownProps, handleMouse: ModelDropdownHandleProps)
```

- **model.open**: `boolean`
- **model.close**: `() => void`
- **model.toogle**: `(element: HTMLElement | PointerEvent | null) => void`
- **handleMouse**: `(state: 'open' | 'close', element) => void`

## Usage

### position

- **position**: `'top' | 'bottom' | 'left' | 'right'` = `'bottom'`

<LazyRepl title="dropdown.svelte" lang="svelte" content={() => import('../../../content/examples/components/dropdown/position.svelte?raw')}>
<Position/>
</LazyRepl>

### openOnHover

When `openOnHover` is set, wire `handleMouse` to `onmouseenter` and `onmouseleave` on the activator. The dropdown stays open for 150ms after the mouse leaves to allow moving to the panel.

- **openOnHover**: `boolean` = `false`

<LazyRepl title="dropdown.svelte" lang="svelte" content={() => import('../../../content/examples/components/dropdown/hover.svelte?raw')}>
<Hover/>
</LazyRepl>

### closeOnClick

Closes the dropdown automatically when any element inside the panel is clicked.

- **closeOnClick**: `boolean` = `false`

### Without preprocess Lapikit

<LazyRepl lang="js" content={"import { Dropdown } from 'lapikit/labs/components';"} />

## API Reference

**`kit:dropdown`**

| props        | type                                                  | description                                             | default    |
| ------------ | ----------------------------------------------------- | ------------------------------------------------------- | ---------- |
| position     | `'top' \| 'bottom' \| 'left' \| 'right'`              | Preferred position relative to the activator.           | `'bottom'` |
| openOnHover  | `boolean`                                             | Opens on mouse enter — wire `handleMouse` on activator. | `false`    |
| closeOnClick | `boolean`                                             | Closes when content inside the panel is clicked.        | `false`    |
| rounded      | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| string` | Border radius of the floating panel.                    |            |
| color        | `string`                                              | Foreground color override (`--kit-dropdown-fg`).        |            |
| background   | `string`                                              | Background color override (`--kit-dropdown-bg`).        |            |
| activator    | `Snippet<[model, handleMouse]>`                       | Trigger element. Receives model and mouse handler.      |            |
| children     | `Snippet`                                             | Floating panel content.                                 |            |
