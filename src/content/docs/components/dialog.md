---
title: "Dialog component"
category: "Components"
head:
  title: "Dialog"
  description: "Create modal dialogs with a fluid UX. Integrated focus, size, density and behavior management."
---

<script>
	import LazyRepl from '$components/lazy-repl.svelte';

	import Preview from '$examples/components/dialog/preview.svelte';
	import Position from '$examples/components/dialog/position.svelte';
	import Size from '$examples/components/dialog/size.svelte';
	import Persistent from '$examples/components/dialog/persistent.svelte';
</script>

The `kit:dialog` component is a modal window based on the native HTML element `<dialog>`. Thanks to this foundation, it benefits from accessible and semantic features by default, such as focus management, closing with the Escape key or clicking outside the box (unless persistent is enabled).

It can be used to display temporary content above the main interface: messages, forms, confirmations, etc. It is controlled via the prop bindable open, can be customized in position, size, density and style, and adapts easily to all usage contexts.

<LazyRepl title="dialog.svelte" presentation lang="svelte" content={() => import('$examples/components/dialog/preview.svelte?raw')}>
<Preview/>
</LazyRepl>

`kit:dialog` calls `showModal()` / `close()` on the native `<dialog>` element in reaction to `open`. The backdrop blocks page interaction and closes the dialog when clicked unless `persistent` is set. Scrolling the page while a dialog is open is disabled automatically.

> `open` is bindable set it to `true` to open, `false` to close, or bind it to react to user-initiated closes.

## Examples of dialog

### position

Controls the vertical alignment of the dialog on the viewport.

- **position**: `'top' | 'center' | 'bottom'` = `'center'`

<LazyRepl title="dialog.svelte" lang="svelte" content={() => import('$examples/components/dialog/position.svelte?raw')}>
<Position/>
</LazyRepl>

### size

Controls the max-width of the dialog content panel.

- **size**: `'xs' | 'sm' | 'md' | 'lg' | 'xl'` = `'md'`

<LazyRepl title="dialog.svelte" lang="svelte" content={() => import('$examples/components/dialog/size.svelte?raw')}>
<Size/>
</LazyRepl>

### persistent

When `persistent` is set, clicking the backdrop or pressing Escape does not close the dialog. The user must interact with the content to dismiss it.

- **persistent**: `boolean` = `false`

<LazyRepl title="dialog.svelte" lang="svelte" content={() => import('$examples/components/dialog/persistent.svelte?raw')}>
<Persistent/>
</LazyRepl>

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the components directly:

<LazyRepl lang="js" content={"import { Dialog } from 'lapikit/components';"} />

## API Reference

**`kit:dialog`**

| props          | type                                                                                                                                    | description                                     | default     |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ----------- |
| ref $bindable  | `HTMLElement`                                                                                                                           | Bindable reference to the rendered DOM element. | `null`      |
| s-class        | `'string' \| 'array' \| 'object'`                                                                                                       | Sets className on dialog.                       |             |
| s-style        | `'string' \| 'array' \| 'object'`                                                                                                       | Sets styles on dialog.                          |             |
| open $bindable | `boolean`                                                                                                                               | Controls visibility. Bindable.                  | `false`     |
| persistent     | `boolean`                                                                                                                               | Prevents closing on backdrop click or Escape.   | `false`     |
| size           | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                                                                  | Max-width of the content panel.                 | `'md'`      |
| position       | `'top' \| 'center' \| 'bottom'  \| 'top-left'  \| 'top-right'  \| 'center-left'  \| 'center-right'  \| 'bottom-left'  \| 'botom-right'` | Orientation dialog on viewport.                 | `'center'`  |
| density        | `'none' \| 'compact' \| 'default' \| 'comfortable'`                                                                                     | Padding inside the content panel.               | `'default'` |
| rounded        | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                                                             | Border radius of the content panel.             | `'md'`      |
| classContent   | `string \| string[]`                                                                                                                    | Class(es) applied to the inner content panel.   |             |
| color          | `string`                                                                                                                                | Foreground color override (`--kit-dialog-fg`).  |             |
| background     | `string`                                                                                                                                | Background color override (`--kit-dialog-bg`).  |             |
| children       | `Snippet`                                                                                                                               | Dialog content.                                 |             |
| elevation      | `'0' \| '1' \| '2' \| '3' \| '4' \| '5' \| ElevationState`                                                                              | Add shadow effect.                              | `'2'`       |

Remember to follow up with [Modal](/docs/components/modal) or [Popover](/docs/components/popover) to create complete user paths.
