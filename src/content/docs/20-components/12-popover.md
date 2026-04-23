---
title: "Popover"
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Preview from '../../../content/examples/components/popover/preview.svelte';
	import Position from '../../../content/examples/components/popover/position.svelte';
</script>

# Popover component

The `kit:popover` component positions a floating content panel relative to a trigger element. It closes automatically when clicking outside.

<LazyRepl title="popover.svelte" presentation lang="svelte" content={() => import('../../../content/examples/components/popover/preview.svelte?raw')}>
<Preview/>
</LazyRepl>

## Guide

`kit:popover` renders the `activator` snippet inline and the panel in a fixed-position `<div>` when open. The panel position is computed from the activator's bounding rect and updates on scroll and resize. Scrolling the page while a popover is open closes it automatically.

The `activator` snippet receives one argument:

```ts
activator(model: ModelPopoverProps)
```

| argument       | type                              | description                                     |
| -------------- | --------------------------------- | ----------------------------------------------- |
| `model.toggle` | `(element: HTMLElement) => void`  | Toggles the popover, anchored to the element.   |

## Usage

### position

| prop     | type                                        | default    |
| -------- | ------------------------------------------- | ---------- |
| position | `'top' \| 'bottom' \| 'left' \| 'right'`   | `'bottom'` |

<LazyRepl title="popover.svelte" lang="svelte" content={() => import('../../../content/examples/components/popover/position.svelte?raw')}>
<Position/>
</LazyRepl>

### Without preprocess Lapikit

<LazyRepl lang="js" content={"import { Popover } from 'lapikit/labs/components';"} />

## API Reference

**`kit:popover`**

| props      | type                                                  | description                                              | default    |
| ---------- | ----------------------------------------------------- | -------------------------------------------------------- | ---------- |
| open       | `boolean`                                             | Controls visibility. Bindable.                           | `false`    |
| position   | `'top' \| 'bottom' \| 'left' \| 'right'`             | Preferred position relative to the activator.            | `'bottom'` |
| rounded    | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| string` | Border radius of the floating panel.                   |            |
| color      | `string`                                              | Foreground color override (`--kit-popover-fg`).          |            |
| background | `string`                                              | Background color override (`--kit-popover-bg`).          |            |
| activator  | `Snippet<[model]>`                                    | Trigger element. Receives model with `toggle`.           |            |
| children   | `Snippet`                                             | Floating panel content.                                  |            |
