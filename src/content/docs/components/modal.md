---
title: 'Modal'
description: 'Display stacked content in a responsive modal window. Manages position, keyboard interaction and stacking.'
---

<script>
	import LazyRepl from '$components/lazy-repl.svelte';

	import Preview from '$examples/components/modal/preview.svelte';
	import Position from '$examples/components/modal/position.svelte';
	import Size from '$examples/components/modal/size.svelte';
	import Persistent from '$examples/components/modal/persistent.svelte';
</script>

# Modal component

The `kit:modal` component displays an overlay panel above the main content. It is designed for dialogs, contextual messages, forms or alerts requiring direct interaction.

The modal can be centered, fixed at the top or bottom of the screen, and closes in different ways depending on the options activated (outside click, Escape key, etc.). It is a flexible alternative to [`kit:dialog`](/docs/components/dialog) when you need more control over the structure, behavior or styling of the modal content, or when you want to manage the backdrop at the application level.

<LazyRepl title="modal.svelte" presentation lang="svelte" content={() => import('$examples/components/modal/preview.svelte?raw')}>
<Preview/>
</LazyRepl>

`kit:modal` is a div-based overlay positioned fixed over the viewport. Unlike `kit:dialog`, it does not use the native `<dialog>` element and has no built-in backdrop a global backdrop is typically managed at the application level. Use `contain` to embed the modal relative to its parent instead.

> `open` is bindable set it to `true` to open, `false` to close, or bind it to react to closes.

## Examples of modal

### position

Controls the vertical alignment of the content panel.

- **position**: `'top' | 'center' | 'bottom'` = `'center'`

<LazyRepl title="modal.svelte" lang="svelte" content={() => import('$examples/components/modal/position.svelte?raw')}>
<Position/>
</LazyRepl>

### size

Controls the max-width of the content panel. `'full'` renders as a bottom sheet spanning the full viewport width.

- **size**: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'` = `'md'`

<LazyRepl title="modal.svelte" lang="svelte" content={() => import('$examples/components/modal/size.svelte?raw')}>
<Size/>
</LazyRepl>

### persistent

When `persistent` is set, pressing Escape does not close the modal. The user must interact with the content to dismiss it.

- **persitent**: `boolean` = `false`

<LazyRepl title="modal.svelte" lang="svelte" content={() => import('$examples/components/modal/persistent.svelte?raw')}>
<Persistent/>
</LazyRepl>

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the components directly:

<LazyRepl lang="js" content={"import { Modal } from 'lapikit/components';"} />

## API Reference

**`kit:modal`**

| props          | type                                                                                                                                    | description                                                  | default     |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ----------- |
| ref $bindable  | `HTMLElement`                                                                                                                           | Bindable reference to the rendered DOM element.              | `null`      |
| s-class        | `'string' \| 'array' \| 'object'`                                                                                                       | Sets className on modal.                                     |             |
| s-style        | `'string' \| 'array' \| 'object'`                                                                                                       | Sets styles on modal.                                        |             |
| open $bindable | `boolean`                                                                                                                               | Controls visibility.                                         | `false`     |
| persistent     | `boolean`                                                                                                                               | Prevents closing on Escape.                                  | `false`     |
| contain        | `boolean`                                                                                                                               | Positions relative to parent instead of viewport.            | `false`     |
| closeWithEsc   | `boolean`                                                                                                                               | Closes on Escape key.                                        | `true`      |
| size           | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`                                                                                        | Max-width of the content panel.                              | `'md'`      |
| position       | `'top' \| 'center' \| 'bottom'  \| 'top-left'  \| 'top-right'  \| 'center-left'  \| 'center-right'  \| 'bottom-left'  \| 'botom-right'` | Vertical alignment on the viewport.                          | `'center'`  |
| density        | `'none' \| 'compact' \| 'default' \| 'comfortable'`                                                                                     | Padding inside the content panel.                            | `'default'` |
| rounded        | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                                                             | Border radius of the content panel.                          | `'md'`      |
| classContent   | `string \| string[]`                                                                                                                    | Class(es) applied to the inner content panel.                |             |
| color          | `string`                                                                                                                                | Foreground color override (`--kit-modal-fg`).                |             |
| background     | `string`                                                                                                                                | Background color override (`--kit-modal-bg`).                |             |
| children       | `Snippet`                                                                                                                               | Modal content.                                               |             |
| space          | `string`                                                                                                                                | Add border space to viewport override (`--kit-modal-space`). |             |
| elevation      | `'0' \| '1' \| '2' \| '3' \| '4' \| '5' \| ElevationState`                                                                              | Add shadow effect.                                           | `'2'`       |

Complement the use of `kit:modal` with [Dialog](/docs/components/dialog) for confirmations or [Popover](/docs/components/popover) for light details.
