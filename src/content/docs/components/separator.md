---
title: 'Separator component'
category: 'Components'
head:
  title: 'Separator'
  description: 'Visually separate your UI blocks with customizable lines in size, color, orientation and opacity.'
layout: 'doc_page'
---

<script>
	import LazyRepl from '$components/lazy-repl.svelte';

	import Preview from '$examples/components/separator/preview.svelte';
	import Orientation from '$examples/components/separator/orientation.svelte';
	import Inset from '$examples/components/separator/inset.svelte';
</script>

The `kit:separator` component renders a thin horizontal or vertical dividing line.

<LazyRepl title="separator.svelte" presentation lang="svelte" content={() => import('$examples/components/separator/preview.svelte?raw')}>
<Preview/>
</LazyRepl>

`kit:separator` renders as `<hr>` by default. It sets `role="separator"` and `aria-orientation` automatically. The color and opacity are token-based and can be overridden per-instance.

## Examples of separator

### orientation

- **orientation**: `'horizontal' | 'vertical'` = `'horizontal'`

Vertical separators are inline-flex and stretch to fill their container's height.

<LazyRepl title="separator.svelte" lang="svelte" content={() => import('$examples/components/separator/orientation.svelte?raw')}>
<Orientation/>
</LazyRepl>

### inset

Adds a leading margin to indent the separator from the left edge useful inside lists.

- **inset**: `boolean` = `false`

<LazyRepl title="separator.svelte" lang="svelte" content={() => import('$examples/components/separator/inset.svelte?raw')}>
<Inset/>
</LazyRepl>

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the components directly:

<LazyRepl lang="js" content={"import { Separator } from 'lapikit/components';"} />

## API Reference

**`kit:separator`**

| props         | type                              | description                                      | default        |
| ------------- | --------------------------------- | ------------------------------------------------ | -------------- |
| ref $bindable | `HTMLElement`                     | Bindable reference to the rendered DOM element.  | `null`         |
| is            | `'div' \| 'hr'`                   | HTML element to render.                          | `'hr'`         |
| s-class       | `'string' \| 'array' \| 'object'` | Sets className on separator.                     |                |
| s-style       | `'string' \| 'array' \| 'object'` | Sets styles on separator.                        |                |
| orientation   | `'horizontal' \| 'vertical'`      | Direction of the separator.                      | `'horizontal'` |
| inset         | `boolean`                         | Adds a leading indent.                           | `false`        |
| thickness     | `string \| number`                | Border width override (px number or CSS string). |                |
| color         | `string`                          | Color override (`--kit-separator-color`).        |                |

To organize your data, combine Separators with [List](/docs/components/list) for greater legibility.
