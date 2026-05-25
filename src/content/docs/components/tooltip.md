---
title: "Tooltip"
description: "Provide additional info without cluttering the UI. Display on hover with intelligent positioning."
---

<script>
	import LazyRepl from '$components/lazy-repl.svelte';

	import Preview from '../../../content/examples/components/tooltip/preview.svelte';
	import Location from '../../../content/examples/components/tooltip/location.svelte';
	import Arrow from '../../../content/examples/components/tooltip/arrow.svelte';
	import Custom from '../../../content/examples/components/tooltip/custom.svelte';
</script>

# Tooltip component

Display elegant tooltips with `kit:tooltip`. Fine-tuned customization, accessibility and SEO-friendliness for your Svelte components
The `kit:tooltip` component can be used to display a tooltip on hover, focus or via a controlled opening. It's designed to provide a simple, accessible way of delivering contextual information to the user, without cluttering up the interface.

`kit:tooltip` can be used with simple text using the label prop, or with richer HTML content using the tooltip slot.

It is particularly useful for enhancing the user experience by explaining icons, specifying actions or providing secondary details.

<LazyRepl title="tooltip.svelte" presentation lang="svelte" content={() => import('../../../content/examples/components/tooltip/preview.svelte?raw')}>
<Preview/>
</LazyRepl>

`kit:tooltip` wraps its `children` in a `<span>` that listens for `mouseenter`, `mouseleave`, `focusin`, and `focusout`. The tooltip appears after `delayDuration` milliseconds (default 850ms) and is positioned fixed via a separate element. Set `label` for a plain text tooltip, or use the `tooltip` snippet for rich content.

## Examples of tooltip

### location

The tooltip can be positioned in four directions relative to the trigger element: top, bottom, left or right. The component will attempt to keep the tooltip within the viewport by flipping its position if necessary (this can be disabled with `avoidCollisions`).

- **location**: `'top' | 'bottom' | 'left' | 'right'` = `'bottom'`

<LazyRepl title="tooltip.svelte" lang="svelte" content={() => import('../../../content/examples/components/tooltip/location.svelte?raw')}>
<Location/>
</LazyRepl>

### arrow variant

Add `variant="arrow"` to render a directional arrow on the tooltip panel.

- **variant**: `'arrow' | undefined` = `''`

<LazyRepl title="tooltip.svelte" lang="svelte" content={() => import('../../../content/examples/components/tooltip/arrow.svelte?raw')}>
<Arrow/>
</LazyRepl>

### Custom content

Use the `tooltip` snippet to render any content inside the tooltip panel. When `tooltip` is set, `forceMount` is enabled automatically and `label` is ignored.

- **tooltip**: `Snippet | undefined` = `undefined`

<LazyRepl title="tooltip.svelte" lang="svelte" content={() => import('../../../content/examples/components/tooltip/custom.svelte?raw')}>
<Custom/>
</LazyRepl>

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the components directly:

<LazyRepl lang="js" content={"import { Tooltip } from 'lapikit/labs/components';"} />

## API Reference

**`kit:tooltip`**

| props           | type                                        | description                                       | default     |
| --------------- | ------------------------------------------- | ------------------------------------------------- | ----------- |
| label           | `string`                                    | Plain text content of the tooltip.                |             |
| location        | `'top' \| 'bottom' \| 'left' \| 'right'`    | Preferred position relative to the trigger.       | `'bottom'`  |
| variant         | `'arrow'`                                   | Renders a directional arrow on the tooltip panel. |             |
| delayDuration   | `number`                                    | Hover delay before the tooltip appears (ms).      | `850`       |
| open            | `boolean`                                   | Controls visibility. Bindable.                    | `false`     |
| disabled        | `boolean`                                   | Prevents the tooltip from showing.                | `false`     |
| forceMount      | `boolean`                                   | Keeps the tooltip in the DOM when closed.         | `false`     |
| avoidCollisions | `boolean`                                   | Flips position to stay within the viewport.       | `true`      |
| density         | `'compact' \| 'default' \| 'comfortable'`   | Padding density.                                  | `'default'` |
| rounded         | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | Border radius.                                    |             |
| color           | `string`                                    | Foreground color override (`--kit-tooltip-fg`).   |             |
| background      | `string`                                    | Background color override (`--kit-tooltip-bg`).   |             |
| tooltip         | `Snippet`                                   | Rich content rendered inside the tooltip panel.   |             |
| children        | `Snippet`                                   | The trigger element.                              |             |

Tooltips complement your [Buttons](/docs/components/button) or [Icons](/docs/components/icon) by providing discreet but useful context for users.
