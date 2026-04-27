---
title: "Modal"
description: "Display stacked content in a responsive modal window. Manages position, keyboard interaction and stacking."
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Preview from '../../../content/examples/components/modal/preview.svelte';
	import Position from '../../../content/examples/components/modal/position.svelte';
	import Size from '../../../content/examples/components/modal/size.svelte';
	import Persistent from '../../../content/examples/components/modal/persistent.svelte';
</script>

# Modal component

The `kit:modal` component renders a floating content panel controlled by a bindable `open` prop. It closes on Escape by default and supports a `contain` mode for embedding within a parent element.

<LazyRepl title="modal.svelte" presentation lang="svelte" content={() => import('../../../content/examples/components/modal/preview.svelte?raw')}>
<Preview/>
</LazyRepl>

## Guide

`kit:modal` is a div-based overlay positioned fixed over the viewport. Unlike `kit:dialog`, it does not use the native `<dialog>` element and has no built-in backdrop — a global backdrop is typically managed at the application level. Use `contain` to embed the modal relative to its parent instead.

> `open` is bindable — set it to `true` to open, `false` to close, or bind it to react to closes.

## Usage

### position

Controls the vertical alignment of the content panel.

- **position**: `'top' | 'center' | 'bottom'` = `'center'`

<LazyRepl title="modal.svelte" lang="svelte" content={() => import('../../../content/examples/components/modal/position.svelte?raw')}>
<Position/>
</LazyRepl>

### size

Controls the max-width of the content panel. `'full'` renders as a bottom sheet spanning the full viewport width.

- **size**: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'` = `'md'`

<LazyRepl title="modal.svelte" lang="svelte" content={() => import('../../../content/examples/components/modal/size.svelte?raw')}>
<Size/>
</LazyRepl>

### persistent

When `persistent` is set, pressing Escape does not close the modal. The user must interact with the content to dismiss it.

- **persitent**: `boolean` = `false`

<LazyRepl title="modal.svelte" lang="svelte" content={() => import('../../../content/examples/components/modal/persistent.svelte?raw')}>
<Persistent/>
</LazyRepl>

### Without preprocess Lapikit

<LazyRepl lang="js" content={"import { Modal } from 'lapikit/labs/components';"} />

## API Reference

**`kit:modal`**

| props        | type                                             | description                                       | default     |
| ------------ | ------------------------------------------------ | ------------------------------------------------- | ----------- |
| open         | `boolean`                                        | Controls visibility. Bindable.                    | `false`     |
| persistent   | `boolean`                                        | Prevents closing on Escape.                       | `false`     |
| contain      | `boolean`                                        | Positions relative to parent instead of viewport. | `false`     |
| closeWithEsc | `boolean`                                        | Closes on Escape key.                             | `true`      |
| size         | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | Max-width of the content panel.                   | `'md'`      |
| position     | `'top' \| 'center' \| 'bottom'`                  | Vertical alignment on the viewport.               | `'center'`  |
| density      | `'compact' \| 'default' \| 'comfortable'`        | Padding inside the content panel.                 | `'default'` |
| rounded      | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`      | Border radius of the content panel.               | `'md'`      |
| classContent | `string \| string[]`                             | Class(es) applied to the inner content panel.     |             |
| color        | `string`                                         | Foreground color override (`--kit-modal-fg`).     |             |
| background   | `string`                                         | Background color override (`--kit-modal-bg`).     |             |
| children     | `Snippet`                                        | Modal content.                                    |             |
