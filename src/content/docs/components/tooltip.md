---
title: 'Tooltip component'
category: 'Components'
head:
  title: 'Tooltip'
  description: 'Provide additional info without cluttering the UI. Display on hover with intelligent positioning.'
layout: 'doc_page'
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Preview from '$examples/components/tooltip/preview.svelte';
	import Location from '$examples/components/tooltip/location.svelte';
	import Arrow from '$examples/components/tooltip/arrow.svelte';
	import Custom from '$examples/components/tooltip/custom.svelte';
	import Prop from '$examples/components/tooltip/prop.svelte';

	import previewCode from '$examples/components/tooltip/preview.svelte?raw';
	import locationCode from '$examples/components/tooltip/location.svelte?raw';
	import arrowCode from '$examples/components/tooltip/arrow.svelte?raw';
	import customCode from '$examples/components/tooltip/custom.svelte?raw';
	import propCode from '$examples/components/tooltip/prop.svelte?raw';
</script>

Display elegant tooltips with `kit:tooltip`. Fine-tuned customization, accessibility and SEO-friendliness for your Svelte components
The `kit:tooltip` component can be used to display a tooltip on hover, focus or via a controlled opening. It's designed to provide a simple, accessible way of delivering contextual information to the user, without cluttering up the interface.

`kit:tooltip` can be used with simple text using the label prop, or with richer HTML content using the `tooltip` snippet. For a simple text on a button, a chip or an icon, the [`tooltip` prop](#the-tooltip-prop) is even shorter.

It is particularly useful for enhancing the user experience by explaining icons, specifying actions or providing secondary details.

<LazyRepl title="tooltip.svelte" presentation lang="svelte" content={previewCode}>
<Preview/>
</LazyRepl>

`kit:tooltip` adds no element around its trigger: the `trigger` snippet receives the props to spread on your own element.

```svelte
<kit:tooltip label="Save">
	{#snippet trigger(props)}
		<kit:btn {...props}>Save</kit:btn>
	{/snippet}
</kit:tooltip>
```

`props` links the trigger to the tooltip with `aria-describedby` (or `aria-labelledby` with `asLabel`, to name an icon button) and holds the pointer and focus handlers. The tooltip:

- appears after `delayDuration` on hover (850ms by default), never on touch screens;
- appears at once on keyboard focus, not on a mouse click;
- hides when the trigger is pressed, and after `closeDelay` when the pointer leaves;
- stays open while the pointer is on it, and closes with `Escape`, as required by [WCAG 1.4.13](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html).

## Examples of tooltip

### location

The tooltip can be positioned in four directions relative to the trigger element: top, bottom, left or right. The component will attempt to keep the tooltip within the viewport by flipping its position if necessary (this can be disabled with `avoidCollisions`).

- **location**: `'top' | 'bottom' | 'left' | 'right'` = `'bottom'`

<LazyRepl title="tooltip.svelte" lang="svelte" content={locationCode}>
<Location/>
</LazyRepl>

### arrow variant

Add `variant="arrow"` to render a directional arrow on the tooltip panel.

- **variant**: `'arrow' | undefined` = `''`

<LazyRepl title="tooltip.svelte" lang="svelte" content={arrowCode}>
<Arrow/>
</LazyRepl>

### Custom content

Use the `tooltip` snippet to render any content inside the tooltip panel. When `tooltip` is set, `label` becomes the accessible name of the panel.

- **tooltip**: `Snippet | undefined` = `undefined`

<LazyRepl title="tooltip.svelte" lang="svelte" content={customCode}>
<Custom/>
</LazyRepl>

> The tooltip is displayed in the top layer of the page (Popover API): it is never cut by an `overflow: hidden` parent nor hidden behind a modal. It follows its trigger when the page or a parent scrolls, flips to the opposite side when there is not enough space, and stays in the viewport.

## The tooltip prop

`kit:btn`, `kit:chip` and `kit:icon` take a `tooltip` prop: a text, or the options `label`, `location`, `variant`, `density`, `rounded`, `delayDuration` and `closeDelay`.

<LazyRepl title="tooltip.svelte" lang="svelte" content={propCode}>
<Prop/>
</LazyRepl>

- One tooltip is shared by the whole page. It is loaded and added to the DOM on the first hover or focus: a page without hover adds no element and no code.
- A button without text (an icon button) gets the text of the tooltip as its `aria-label`. The others get it as a description, while focused.
- `kit:icon` with a tooltip is no longer decorative: it gets `role="img"` and the text as its name.
- A disabled `kit:btn` or `kit:chip` with a tooltip stays focusable and hoverable to show it: it uses `aria-disabled` instead of `disabled`, and its click does nothing.

Use `kit:tooltip` for rich content, a controlled `open`, or any other element.

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the components directly:

<LazyRepl lang="js" content={"import { Tooltip } from 'lapikit/components';"} />

## API Reference

**`kit:tooltip`**

| props           | type                                                               | description                                                                      | default     |
| --------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------- | ----------- |
| label           | `string`                                                           | Plain text content of the tooltip.                                               |             |
| asLabel         | `boolean`                                                          | Names the trigger with the tooltip (`aria-labelledby`) instead of describing it. | `false`     |
| location        | `'top' \| 'bottom' \| 'left' \| 'right'`                           | Preferred position relative to the trigger.                                      | `'bottom'`  |
| variant         | `'arrow'`                                                          | Renders a directional arrow on the tooltip panel.                                |             |
| delayDuration   | `number`                                                           | Hover delay before the tooltip appears (ms).                                     | `850`       |
| closeDelay      | `number`                                                           | Delay before the tooltip hides when the pointer leaves (ms).                     | `100`       |
| ref $bindable   | `HTMLElement`                                                      | Bindable reference to the tooltip panel.                                         | `null`      |
| open            | `boolean`                                                          | Controls visibility. Bindable.                                                   | `false`     |
| disabled        | `boolean`                                                          | Prevents the tooltip from showing.                                               | `false`     |
| avoidCollisions | `boolean`                                                          | Flips position to stay within the viewport.                                      | `true`      |
| density         | `'dense' \| 'compact' \| 'default' \| 'comfortable' \| 'spacious'` | Padding, from `-4px` to `+4px`.                                                  | `'default'` |
| rounded         | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`              | Border radius.                                                                   | `'xs'`      |
| color           | `string \| false \| { base?, active? }`                            | Background color, the text follows its `on-` color or a contrasted color.        |             |
| tooltip         | `Snippet`                                                          | Rich content rendered inside the tooltip panel.                                  |             |
| trigger         | `Snippet<[TooltipTriggerProps]>`                                   | The trigger element, receives the props to spread on it.                         |             |

**TooltipTriggerProps**

The props to spread on the trigger element.

| props                              | type                            | description                                    |
| ---------------------------------- | ------------------------------- | ---------------------------------------------- |
| aria-describedby / aria-labelledby | `string`                        | The id of the tooltip.                         |
| onpointerenter / onpointerleave    | `(event: PointerEvent) => void` | Shows and hides the tooltip on hover.          |
| onpointerdown                      | `(event: PointerEvent) => void` | Hides the tooltip.                             |
| onfocus / onblur                   | `(event: FocusEvent) => void`   | Shows the tooltip on keyboard focus, hides it. |

Tooltips complement your [Buttons](/docs/components/button) or [Icons](/docs/components/icon) by providing discreet but useful context for users.
