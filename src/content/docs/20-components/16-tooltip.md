---
title: "Tooltip"
description: "Provide additional info without cluttering the UI. Display on hover with intelligent positioning."
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Preview from '../../../content/examples/components/tooltip/preview.svelte';
	import Location from '../../../content/examples/components/tooltip/location.svelte';
	import Arrow from '../../../content/examples/components/tooltip/arrow.svelte';
	import Custom from '../../../content/examples/components/tooltip/custom.svelte';
</script>

# Tooltip component

The `kit:tooltip` component shows a small floating label when the user hovers or focuses the trigger element.

<LazyRepl title="tooltip.svelte" presentation lang="svelte" content={() => import('../../../content/examples/components/tooltip/preview.svelte?raw')}>
<Preview/>
</LazyRepl>

## Guide

`kit:tooltip` wraps its `children` in a `<span>` that listens for `mouseenter`, `mouseleave`, `focusin`, and `focusout`. The tooltip appears after `delayDuration` milliseconds (default 850ms) and is positioned fixed via a separate element. Set `label` for a plain text tooltip, or use the `tooltip` snippet for rich content.

## Usage

### location

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
