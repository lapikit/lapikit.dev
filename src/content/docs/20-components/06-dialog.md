---
title: "Dialog"
description: "Create modal dialogs with a fluid UX. Integrated focus, size, density and behavior management."
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Preview from '../../../content/examples/components/dialog/preview.svelte';
	import Position from '../../../content/examples/components/dialog/position.svelte';
	import Size from '../../../content/examples/components/dialog/size.svelte';
	import Persistent from '../../../content/examples/components/dialog/persistent.svelte';
</script>

# Dialog component

The `kit:dialog` component wraps the native `<dialog>` element. It is controlled via the bindable `open` prop and closes on backdrop click by default.

<LazyRepl title="dialog.svelte" presentation lang="svelte" content={() => import('../../../content/examples/components/dialog/preview.svelte?raw')}>
<Preview/>
</LazyRepl>

## Guide

`kit:dialog` calls `showModal()` / `close()` on the native `<dialog>` element in reaction to `open`. The backdrop blocks page interaction and closes the dialog when clicked — unless `persistent` is set. Scrolling the page while a dialog is open is disabled automatically.

> `open` is bindable — set it to `true` to open, `false` to close, or bind it to react to user-initiated closes.

## Usage

### position

Controls the vertical alignment of the dialog on the viewport.

- **position**: `'top' | 'center' | 'bottom'` = `'center'`

<LazyRepl title="dialog.svelte" lang="svelte" content={() => import('../../../content/examples/components/dialog/position.svelte?raw')}>
<Position/>
</LazyRepl>

### size

Controls the max-width of the dialog content panel.

- **size**: `'xs' | 'sm' | 'md' | 'lg' | 'xl'` = `'md'`

<LazyRepl title="dialog.svelte" lang="svelte" content={() => import('../../../content/examples/components/dialog/size.svelte?raw')}>
<Size/>
</LazyRepl>

### persistent

When `persistent` is set, clicking the backdrop or pressing Escape does not close the dialog. The user must interact with the content to dismiss it.

- **persistent**: `boolean` = `false`

<LazyRepl title="dialog.svelte" lang="svelte" content={() => import('../../../content/examples/components/dialog/persistent.svelte?raw')}>
<Persistent/>
</LazyRepl>

### Without preprocess Lapikit

<LazyRepl lang="js" content={"import { Dialog } from 'lapikit/labs/components';"} />

## API Reference

**`kit:dialog`**

| props        | type                                        | description                                    | default     |
| ------------ | ------------------------------------------- | ---------------------------------------------- | ----------- |
| open         | `boolean`                                   | Controls visibility. Bindable.                 | `false`     |
| persistent   | `boolean`                                   | Prevents closing on backdrop click or Escape.  | `false`     |
| size         | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`      | Max-width of the content panel.                | `'md'`      |
| position     | `'top' \| 'center' \| 'bottom'`             | Vertical alignment on the viewport.            | `'center'`  |
| density      | `'compact' \| 'default' \| 'comfortable'`   | Padding inside the content panel.              | `'default'` |
| rounded      | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | Border radius of the content panel.            | `'md'`      |
| classContent | `string \| string[]`                        | Class(es) applied to the inner content panel.  |             |
| color        | `string`                                    | Foreground color override (`--kit-dialog-fg`). |             |
| background   | `string`                                    | Background color override (`--kit-dialog-bg`). |             |
| children     | `Snippet`                                   | Dialog content.                                |             |
