---
title: 'Popover component'
category: 'Components'
head:
  title: 'Popover'
  description: 'Show contextual information on click or hover. Ideal for enhancing your buttons, links or interactive elements.'
layout: 'doc_page'
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Preview from '$examples/components/popover/preview.svelte';
	import Position from '$examples/components/popover/position.svelte';

	import previewCode from '$examples/components/popover/preview.svelte?raw';
	import positionCode from '$examples/components/popover/position.svelte?raw';
</script>

The `kit:popover` component displays contextual content next to a trigger. It is useful for providing additional information, options or secondary actions without overloading the main interface.

Popovers open from a trigger and can be positioned in several directions: _top_, bottom, left or right. It is bindable and customizable in terms of theme, density, color, etc.

<LazyRepl title="popover.svelte" presentation lang="svelte" content={previewCode}>
<Preview/>
</LazyRepl>

`kit:popover` renders the `trigger` snippet inline and the panel in the top layer when open. The `trigger` snippet receives the props to spread on your trigger element:

```svelte
<kit:popover aria-label="Settings">
	{#snippet trigger(props)}
		<kit:btn {...props}>Settings</kit:btn>
	{/snippet}
	...
</kit:popover>
```

`props` gives the trigger `aria-haspopup="dialog"`, `aria-expanded`, `aria-controls` and the click handler that opens and closes the popover.

### Focus

The panel is a `role="dialog"`. Give it a name with `aria-label` or `aria-labelledby`, passed to the panel.

- On open, the focus moves to the first focusable element of the panel (or the panel itself).
- `Escape` closes the popover and gives the focus back to the trigger.
- The popover closes when the focus moves to another element of the page, or on a click outside.

## Examples of popover

### position

- **position**: `'top' | 'bottom' | 'left' | 'right'` = `'bottom'`

<LazyRepl title="popover.svelte" lang="svelte" content={positionCode}>
<Position/>
</LazyRepl>

> The popover is displayed in the top layer of the page (Popover API): it is never cut by an `overflow: hidden` parent nor hidden behind a modal. It follows its trigger when the page or a parent scrolls, flips to the opposite side when there is not enough space, and stays in the viewport.

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the components directly:

<LazyRepl lang="js" content={"import { Popover } from 'lapikit/components';"} />

## API Reference

**`kit:popover`**

| props          | type                                                               | description                                                               | default     |
| -------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------- | ----------- |
| ref $bindable  | `HTMLElement`                                                      | Bindable reference to the rendered DOM element.                           | `null`      |
| class          | `string \| array \| object`                                        | Classes of the popover, with the rules of Svelte (clsx).                  |             |
| style          | `string`                                                           | Inline style of the popover.                                              |             |
| s-class        | `string \| array \| object`                                        | Classes of the popover, merged with `class`.                              |             |
| s-style        | `object`                                                           | Inline style as an object of property / value pairs.                      |             |
| open $bindable | `boolean`                                                          | Controls visibility. Bindable.                                            | `false`     |
| position       | `'top' \| 'bottom' \| 'left' \| 'right'`                           | Preferred position relative to the trigger.                               | `'bottom'`  |
| rounded        | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`              | Border radius.                                                            | `'md'`      |
| color          | `string \| false \| { base?, active? }`                            | Background color, the text follows its `on-` color or a contrasted color. |             |
| trigger        | `Snippet<[PopoverTriggerProps]>`                                   | The trigger element, receives the props to spread on it.                  |             |
| children       | `Snippet`                                                          | Floating panel content.                                                   |             |
| elevation      | `'0' \| '1' \| '2' \| '3' \| '4' \| '5' \| ElevationState`         | Add shadow effect.                                                        | `'2'`       |
| density        | `'dense' \| 'compact' \| 'default' \| 'comfortable' \| 'spacious'` | Padding, from `-4px` to `+4px`.                                           | `'default'` |

**PopoverTriggerProps**

The props to spread on the trigger element.

| props         | type                          | description                  |
| ------------- | ----------------------------- | ---------------------------- |
| aria-haspopup | `'dialog'`                    | The trigger opens a dialog.  |
| aria-expanded | `boolean`                     | Whether the popover is open. |
| aria-controls | `string`                      | The id of the popover.       |
| onclick       | `(event: MouseEvent) => void` | Opens or closes the popover. |

`kit:popover` are the ideal complement to [Dialogs](/docs/components/dialog) or [Buttons](/docs/components/button) in modern interfaces.
