---
title: 'Dropdown component'
category: 'Components'
head:
  title: 'Dropdown'
  description: 'Flexible drop-down menu for actions or selections. Manages focus, clicks and intelligent positioning.'
layout: 'doc_page'
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Preview from '$examples/components/dropdown/preview.svelte';
	import Position from '$examples/components/dropdown/position.svelte';
	import Hover from '$examples/components/dropdown/hover.svelte';

	import previewCode from '$examples/components/dropdown/preview.svelte?raw';
	import positionCode from '$examples/components/dropdown/position.svelte?raw';
	import hoverCode from '$examples/components/dropdown/hover.svelte?raw';
</script>

The `kit:dropdown` component displays a menu or contextual content when opened, positioned around a trigger element. It can be opened by clicking or hovering, and closes automatically according to selected parameters (**closeOnClick**, **openOnHover**, etc.).

It's designed to offer great flexibility: configurable positioning, customizable appearance, and a `trigger` snippet to use any element as the trigger.

<LazyRepl title="dropdown.svelte" presentation lang="svelte" content={previewCode}>
<Preview/>
</LazyRepl>

`kit:dropdown` has no visible element of its own: it renders the `trigger` snippet inline and the menu in the top layer when open. The `trigger` snippet receives the props to spread on your trigger element, and the state of the menu:

```svelte
<kit:dropdown>
	{#snippet trigger(props, { open })}
		<kit:btn {...props} active={open}>Menu</kit:btn>
	{/snippet}
	...
</kit:dropdown>
```

`props` gives the trigger `aria-haspopup="menu"`, `aria-expanded`, `aria-controls` and the handlers of click, keyboard and hover (with `openOnHover`). No `onclick` to write: the menu opens next to the element that received the props.

### Keyboard

| key                                    | action                                                   |
| -------------------------------------- | -------------------------------------------------------- |
| `Enter`, `Space` on the trigger        | Opens the menu and focuses the first item.               |
| `ArrowDown` / `ArrowUp` on the trigger | Opens the menu on the first / last item.                 |
| `ArrowDown` / `ArrowUp` in the menu    | Moves to the next / previous item.                       |
| `Home` / `End`                         | Moves to the first / last item.                          |
| `Escape`                               | Closes the menu and gives the focus back to the trigger. |
| `Tab`                                  | Closes the menu.                                         |

The items are the elements with `role="menuitem"` (or `menuitemcheckbox`, `menuitemradio`); without them, the buttons and links of the menu.

## Examples of dropdown

### position

The `position` prop sets the preferred position of the dropdown panel relative to the trigger. The library will try to keep the panel within the viewport, flipping or adjusting as needed.

- **position**: `'top' | 'bottom' | 'left' | 'right'` = `'bottom'`

<LazyRepl title="dropdown.svelte" lang="svelte" content={positionCode}>
<Position/>
</LazyRepl>

### openOnHover

With `openOnHover`, the menu also opens when the pointer enters the trigger (not on touch screens). It stays open for 150ms after the pointer leaves, to allow moving to the menu.

- **openOnHover**: `boolean` = `false`

<LazyRepl title="dropdown.svelte" lang="svelte" content={hoverCode}>
<Hover/>
</LazyRepl>

### closeOnClick

Closes the dropdown automatically when any element inside the panel is clicked.

- **closeOnClick**: `boolean` = `false`

### Context menu

`openAt(event)` opens the menu at the position of the pointer, for a context menu:

```svelte
<kit:dropdown>
	{#snippet trigger(props, { openAt })}
		<div oncontextmenu={openAt}>Right click here</div>
	{/snippet}
	...
</kit:dropdown>
```

> The dropdown menu is displayed in the top layer of the page (Popover API): it is never cut by an `overflow: hidden` parent nor hidden behind a modal. It follows its trigger when the page or a parent scrolls, flips to the opposite side when there is not enough space, and stays in the viewport.

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the components directly:

<LazyRepl lang="js" content={"import { Dropdown } from 'lapikit/components';"} />

## API Reference

**`kit:dropdown`**

| props          | type                                                               | description                                                                        | default     |
| -------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------- | ----------- |
| ref $bindable  | `HTMLElement`                                                      | Bindable reference to the rendered DOM element.                                    | `null`      |
| open $bindable | `boolean`                                                          | Controls visibility. Bindable.                                                     | `false`     |
| class          | `string \| array \| object`                                        | Classes of the dropdown, with the rules of Svelte (clsx).                          |             |
| style          | `string`                                                           | Inline style of the dropdown.                                                      |             |
| s-class        | `string \| array \| object`                                        | Classes of the dropdown, merged with `class`.                                      |             |
| s-style        | `object`                                                           | Inline style as an object of property / value pairs.                               |             |
| position       | `'top' \| 'bottom' \| 'left' \| 'right'`                           | Preferred position relative to the trigger.                                        | `'bottom'`  |
| openOnHover    | `boolean`                                                          | Also opens when the pointer enters the trigger.                                    | `false`     |
| closeOnClick   | `boolean`                                                          | Closes when content inside the panel is clicked.                                   | `false`     |
| rounded        | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`              | Border radius.                                                                     | `'md'`      |
| color          | `string \| false \| { base?, active? }`                            | Background color, the text follows its `on-` color or a contrasted color.          |             |
| trigger        | `Snippet<[DropdownTriggerProps, DropdownTriggerModel]>`            | The trigger element, receives the props to spread on it and the state of the menu. |             |
| children       | `Snippet`                                                          | Floating panel content.                                                            |             |
| density        | `'dense' \| 'compact' \| 'default' \| 'comfortable' \| 'spacious'` | Padding, from `-4px` to `+4px`.                                                    | `'default'` |
| elevation      | `'0' \| '1' \| '2' \| '3' \| '4' \| '5' \| ElevationState`         | Add shadow effect.                                                                 |             |

**DropdownTriggerProps**

The props to spread on the trigger element.

| props          | type                             | description                          |
| -------------- | -------------------------------- | ------------------------------------ |
| aria-haspopup  | `'menu'`                         | The trigger opens a menu.            |
| aria-expanded  | `boolean`                        | Whether the menu is open.            |
| aria-controls  | `string`                         | The id of the menu.                  |
| onclick        | `(event: MouseEvent) => void`    | Opens or closes the menu.            |
| onkeydown      | `(event: KeyboardEvent) => void` | Opens the menu with the arrow keys.  |
| onpointerenter | `(event: PointerEvent) => void`  | With `openOnHover`: opens the menu.  |
| onpointerleave | `(event: PointerEvent) => void`  | With `openOnHover`: closes the menu. |

**DropdownTriggerModel**

| props  | type                          | description                                            |
| ------ | ----------------------------- | ------------------------------------------------------ |
| open   | `boolean`                     | Whether the menu is open. Useful to style the trigger. |
| close  | `() => void`                  | Closes the menu.                                       |
| openAt | `(event: MouseEvent) => void` | Opens the menu at the position of the pointer.         |

Combine `kit:dropdown` with an [Appbar](/docs/components/appbar) or [Popover](/docs/components/popover) for improved navigation ergonomics.
