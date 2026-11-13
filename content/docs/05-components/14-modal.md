---
title: 'Modal component'
category: 'Components'
head:
  title: 'Modal'
  description: 'Display stacked content in a responsive modal window. Manages position, keyboard interaction and stacking.'
navigation:
  label: 'Modal'
  name: 'kit:modal'
  description: 'Full-screen overlay for focused tasks or content.'
---

The `kit:modal` component displays a floating window above the main content, without blocking the page: the user can still click, scroll and type behind it. It is designed for chat panels, tool panels, notices or any content that lives next to the page.

The modal can be centered or fixed to a corner or an edge of the screen, and closes with the Escape key (the top modal first). When the page must wait for an answer, use [`kit:dialog`](/docs/components/dialog) instead: it blocks the page, traps the focus and has a backdrop.

```repl svelte
/// title: modal.svelte
/// presentation
/// example: components/modal/preview.svelte
```

`kit:modal` renders a native `<dialog>` opened with `show()`: it is announced as a dialog, takes the focus when it opens and gives it back when it closes, but it does not lock the scroll and has no backdrop. Use `contain` to embed the modal in its parent, with an overlay over that parent only.

> `contain` is not a full-screen mode: the overlay and the modal scroll with their parent, and the page behind stays interactive. For a search palette, a confirmation or any window that covers the whole screen, use [`kit:dialog`](/docs/components/dialog).

> `open` is bindable set it to `true` to open, `false` to close, or bind it to react to closes.

## Examples of modal

### position

Controls the vertical alignment of the content panel.

- **position**: `'top' | 'center' | 'bottom'` = `'center'`

```repl svelte
/// title: modal.svelte
/// example: components/modal/position.svelte
```

### size

Controls the max-width of the content panel. `'full'` renders as a bottom sheet spanning the full viewport width.

- **size**: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'` = `'md'`

```repl svelte
/// title: modal.svelte
/// example: components/modal/size.svelte
```

### persistent

When `persistent` is set, pressing Escape does not close the modal. The user must interact with the content to dismiss it.

- **persitent**: `boolean` = `false`

```repl svelte
/// title: modal.svelte
/// example: components/modal/persistent.svelte
```

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the components directly:

```repl js
import { Modal } from 'lapikit/components';
```

## API Reference

**`kit:modal`**

| props          | type                                                                                                                                    | description                                                                              | default     |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ----------- |
| ref $bindable  | `HTMLDialogElement`                                                                                                                     | Bindable reference to the `<dialog>` element.                                            | `null`      |
| class          | `string \| array \| object`                                                                                                             | Classes of the modal, with the rules of Svelte (clsx).                                   |             |
| style          | `string`                                                                                                                                | Inline style of the modal.                                                               |             |
| s-class        | `string \| array \| object`                                                                                                             | Classes of the modal, merged with `class`.                                               |             |
| s-style        | `object`                                                                                                                                | Inline style as an object of property / value pairs.                                     |             |
| open $bindable | `boolean`                                                                                                                               | Controls visibility.                                                                     | `false`     |
| persistent     | `boolean`                                                                                                                               | Prevents closing on Escape.                                                              | `false`     |
| contain        | `boolean`                                                                                                                               | Positions relative to parent instead of viewport.                                        | `false`     |
| closeWithEsc   | `boolean`                                                                                                                               | Closes on Escape key.                                                                    | `true`      |
| size           | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`                                                                                        | Max-width of the content panel.                                                          | `'md'`      |
| position       | `'top' \| 'center' \| 'bottom'  \| 'top-left'  \| 'top-right'  \| 'center-left'  \| 'center-right'  \| 'bottom-left'  \| 'botom-right'` | Vertical alignment on the viewport.                                                      | `'center'`  |
| density        | `'dense' \| 'compact' \| 'default' \| 'comfortable' \| 'spacious'`                                                                      | Padding of the content panel, from `-4px` to `+4px`.                                     | `'default'` |
| rounded        | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`                                                                                   | Border radius of the content panel.                                                      | `'md'`      |
| classContent   | `string \| array \| object`                                                                                                             | Classes of the inner content panel (clsx).                                               |             |
| color          | `string \| false \| { base?, active? }`                                                                                                 | Background of the content panel, the text follows its `on-` color or a contrasted color. |             |
| children       | `Snippet`                                                                                                                               | Modal content.                                                                           |             |
| space          | `string`                                                                                                                                | Add border space to viewport override (`--kit-modal-space`).                             |             |
| elevation      | `'0' \| '1' \| '2' \| '3' \| '4' \| '5' \| ElevationState`                                                                              | Add shadow effect.                                                                       | `'2'`       |

Complement the use of `kit:modal` with [Dialog](/docs/components/dialog) for confirmations or [Popover](/docs/components/popover) for light details.
