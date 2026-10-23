---
title: 'Separator component'
category: 'Components'
head:
  title: 'Separator'
  description: 'Visually separate your UI blocks with customizable lines in size, color, orientation and opacity.'
layout: 'doc_page'
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Preview from '$examples/components/separator/preview.svelte';
	import Orientation from '$examples/components/separator/orientation.svelte';
	import Inset from '$examples/components/separator/inset.svelte';

	import previewCode from '$examples/components/separator/preview.svelte?raw';
	import orientationCode from '$examples/components/separator/orientation.svelte?raw';
	import insetCode from '$examples/components/separator/inset.svelte?raw';
</script>

The `kit:separator` component renders a thin horizontal or vertical dividing line.

<LazyRepl title="separator.svelte" presentation lang="svelte" content={previewCode}>
<Preview/>
</LazyRepl>

`kit:separator` renders as `<hr>` by default, which is a separator natively; with `is="div"` it sets `role="separator"`. `aria-orientation` is set automatically. The color (`--kit-color-border`) and the thickness can be overridden per-instance with `color` and `thickness`, or globally with the `--kit-separator-color` and `--kit-separator-thickness` variables.

## Examples of separator

### orientation

- **orientation**: `'horizontal' | 'vertical'` = `'horizontal'`

Vertical separators are inline-flex and stretch to fill their container's height.

<LazyRepl title="separator.svelte" lang="svelte" content={orientationCode}>
<Orientation/>
</LazyRepl>

### inset

Adds a leading margin to indent the separator from the left edge useful inside lists.

- **inset**: `boolean` = `false`

<LazyRepl title="separator.svelte" lang="svelte" content={insetCode}>
<Inset/>
</LazyRepl>

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the components directly:

<LazyRepl lang="js" content={"import { Separator } from 'lapikit/components';"} />

## API Reference

**`kit:separator`**

| props         | type                         | description                                                                | default        |
| ------------- | ---------------------------- | -------------------------------------------------------------------------- | -------------- |
| ref $bindable | `HTMLElement`                | Bindable reference to the rendered DOM element.                            | `null`         |
| is            | `'div' \| 'hr'`              | HTML element to render.                                                    | `'hr'`         |
| class         | `string \| array \| object`  | Classes of the separator, with the rules of Svelte (clsx).                 |                |
| style         | `string`                     | Inline style of the separator.                                             |                |
| s-class       | `string \| array \| object`  | Classes of the separator, merged with `class`.                             |                |
| s-style       | `object`                     | Inline style as an object of property / value pairs.                       |                |
| orientation   | `'horizontal' \| 'vertical'` | Direction of the separator.                                                | `'horizontal'` |
| inset         | `boolean`                    | Adds a leading indent.                                                     | `false`        |
| thickness     | `string \| number`           | Border width: a number in px or a CSS width (`--kit-separator-thickness`). | `'thin'`       |
| color         | `string \| false`            | A color of the palette or any CSS color (`--kit-separator-color`).         |                |

To organize your data, combine Separators with [List](/docs/components/list) for greater legibility.
