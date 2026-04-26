---
title: 'Separator'
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Preview from '../../../content/examples/components/separator/preview.svelte';
	import Orientation from '../../../content/examples/components/separator/orientation.svelte';
	import Inset from '../../../content/examples/components/separator/inset.svelte';
</script>

# Separator component

The `kit:separator` component renders a thin horizontal or vertical dividing line.

<LazyRepl title="separator.svelte" presentation lang="svelte" content={() => import('../../../content/examples/components/separator/preview.svelte?raw')}>
<Preview/>
</LazyRepl>

## Guide

`kit:separator` renders as `<hr>` by default. It sets `role="separator"` and `aria-orientation` automatically. The color and opacity are token-based and can be overridden per-instance.

## Usage

### orientation

- **orientation**: `'horizontal' | 'vertical'` = `'horizontal'`

Vertical separators are inline-flex and stretch to fill their container's height.

<LazyRepl title="separator.svelte" lang="svelte" content={() => import('../../../content/examples/components/separator/orientation.svelte?raw')}>
<Orientation/>
</LazyRepl>

### inset

Adds a leading margin to indent the separator from the left edge — useful inside lists.

- **inset**: `boolean` = `false`

<LazyRepl title="separator.svelte" lang="svelte" content={() => import('../../../content/examples/components/separator/inset.svelte?raw')}>
<Inset/>
</LazyRepl>

### Without preprocess Lapikit

<LazyRepl lang="js" content={"import { Separator } from 'lapikit/labs/components';"} />

## API Reference

**`kit:separator`**

| props       | type                         | description                                      | default        |
| ----------- | ---------------------------- | ------------------------------------------------ | -------------- |
| is          | `'div' \| 'hr'`              | HTML element to render.                          | `'hr'`         |
| orientation | `'horizontal' \| 'vertical'` | Direction of the separator.                      | `'horizontal'` |
| inset       | `boolean`                    | Adds a leading indent.                           | `false`        |
| thickness   | `string \| number`           | Border width override (px number or CSS string). |                |
| opacity     | `string \| number`           | Opacity override.                                | `0.12`         |
| color       | `string`                     | Color override (`--kit-separator-color`).        |                |
