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

	import previewCode from '$examples/components/tooltip/preview.svelte?raw';
	import locationCode from '$examples/components/tooltip/location.svelte?raw';
	import arrowCode from '$examples/components/tooltip/arrow.svelte?raw';
	import customCode from '$examples/components/tooltip/custom.svelte?raw';
</script>

Display elegant tooltips with `kit:tooltip`. Fine-tuned customization, accessibility and SEO-friendliness for your Svelte components
The `kit:tooltip` component can be used to display a tooltip on hover, focus or via a controlled opening. It's designed to provide a simple, accessible way of delivering contextual information to the user, without cluttering up the interface.

`kit:tooltip` can be used with simple text using the label prop, or with richer HTML content using the tooltip slot.

It is particularly useful for enhancing the user experience by explaining icons, specifying actions or providing secondary details.

<LazyRepl title="tooltip.svelte" presentation lang="svelte" content={previewCode}>
<Preview/>
</LazyRepl>

`kit:tooltip` wraps its `children` in a `<span>` that listens for `mouseenter`, `mouseleave`, `focusin`, and `focusout`. The tooltip appears after `delayDuration` milliseconds on hover (default 850ms), right away on focus, and is shown in the top layer next to its trigger. The pointer can move onto the tooltip without closing it, and Escape closes it, as required by [WCAG 1.4.13](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html). Set `label` for a plain text tooltip, or use the `tooltip` snippet for rich content.

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

Use the `tooltip` snippet to render any content inside the tooltip panel. When `tooltip` is set, `forceMount` is enabled automatically and `label` is ignored.

- **tooltip**: `Snippet | undefined` = `undefined`

<LazyRepl title="tooltip.svelte" lang="svelte" content={customCode}>
<Custom/>
</LazyRepl>

> The tooltip is displayed in the top layer of the page (Popover API): it is never cut by an `overflow: hidden` parent nor hidden behind a modal. It follows its activator when the page or a parent scrolls, flips to the opposite side when there is not enough space, and stays in the viewport.

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the components directly:

<LazyRepl lang="js" content={"import { Tooltip } from 'lapikit/components';"} />

## API Reference

**`kit:tooltip`**

| props           | type                                                               | description                                                               | default     |
| --------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------- | ----------- |
| label           | `string`                                                           | Plain text content of the tooltip.                                        |             |
| location        | `'top' \| 'bottom' \| 'left' \| 'right'`                           | Preferred position relative to the trigger.                               | `'bottom'`  |
| variant         | `'arrow'`                                                          | Renders a directional arrow on the tooltip panel.                         |             |
| delayDuration   | `number`                                                           | Hover delay before the tooltip appears (ms).                              | `850`       |
| open            | `boolean`                                                          | Controls visibility. Bindable.                                            | `false`     |
| disabled        | `boolean`                                                          | Prevents the tooltip from showing.                                        | `false`     |
| forceMount      | `boolean`                                                          | Keeps the tooltip in the DOM when closed.                                 | `false`     |
| avoidCollisions | `boolean`                                                          | Flips position to stay within the viewport.                               | `true`      |
| density         | `'dense' \| 'compact' \| 'default' \| 'comfortable' \| 'spacious'` | Padding, from `-4px` to `+4px`.                                           | `'default'` |
| rounded         | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`              | Border radius.                                                            | `'xs'`      |
| color           | `string \| false \| { base?, active? }`                            | Background color, the text follows its `on-` color or a contrasted color. |             |
| tooltip         | `Snippet`                                                          | Rich content rendered inside the tooltip panel.                           |             |
| children        | `Snippet`                                                          | The trigger element.                                                      |             |

Tooltips complement your [Buttons](/docs/components/button) or [Icons](/docs/components/icon) by providing discreet but useful context for users.
