---
title: "Chip"
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Preview from '../../../content/examples/components/chip/preview.svelte';
	import Variants from '../../../content/examples/components/chip/variants.svelte';
	import Size from '../../../content/examples/components/chip/size.svelte';
	import PrependAppend from '../../../content/examples/components/chip/prepend-append.svelte';
	import States from '../../../content/examples/components/chip/states.svelte';
	import LabelStyle from '../../../content/examples/components/chip/label-style.svelte';
</script>

# Chip component

The `kit:chip` component is a compact, pill-shaped element used for tags, filters, and status badges. It shares most of its API with `kit:btn` but is always rounded and smaller by default.

<LazyRepl title="chip.svelte" presentation lang="svelte" content={() => import('../../../content/examples/components/chip/preview.svelte?raw')}>
<Preview/>
</LazyRepl>

## Guide

`kit:chip` renders as a `<div>` by default. It becomes interactive automatically when `onclick` is attached, `href` is set, or `is="button"`. Unlike `kit:btn`, it has no `rounded` prop — the pill shape is fixed.

## Usage

### Variants

| prop    | type                                         | default    |
| ------- | -------------------------------------------- | ---------- |
| variant | `'filled' \| 'outline' \| 'text' \| 'link'` | `'filled'` |

<LazyRepl title="chip.svelte" lang="svelte" content={() => import('../../../content/examples/components/chip/variants.svelte?raw')}>
<Variants/>
</LazyRepl>

### size

| prop | type                                    | default |
| ---- | --------------------------------------- | ------- |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`  |

<LazyRepl title="chip.svelte" lang="svelte" content={() => import('../../../content/examples/components/chip/size.svelte?raw')}>
<Size/>
</LazyRepl>

### prepend and append snippets

Use `prepend` for an icon before the label, and `append` for an action — typically a remove button.

| prop    | type      | description                         |
| ------- | --------- | ----------------------------------- |
| prepend | `Snippet` | Content rendered before the label.  |
| append  | `Snippet` | Content rendered after the label.   |

<LazyRepl title="chip.svelte" lang="svelte" content={() => import('../../../content/examples/components/chip/prepend-append.svelte?raw')}>
<PrependAppend/>
</LazyRepl>

### States

`disabled` dims and blocks interaction. `readonly` blocks interaction without the dim. `active` applies the pressed background — useful for toggled filter chips.

| prop     | type      | default |
| -------- | --------- | ------- |
| active   | `boolean` | `false` |
| disabled | `boolean` | `false` |
| readonly | `boolean` | `false` |

<LazyRepl title="chip.svelte" lang="svelte" content={() => import('../../../content/examples/components/chip/states.svelte?raw')}>
<States/>
</LazyRepl>

### labelStyle

`labelStyle` applies uppercase, bold, and slight letter-spacing — suited for category or status badges.

| prop       | type      | default |
| ---------- | --------- | ------- |
| labelStyle | `boolean` | `false` |

<LazyRepl title="chip.svelte" lang="svelte" content={() => import('../../../content/examples/components/chip/label-style.svelte?raw')}>
<LabelStyle/>
</LazyRepl>

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the component directly:

<LazyRepl lang="js" content={"import { Chip } from 'lapikit/labs/components';"} />

## API Reference

**`kit:chip`**

| props      | type                                         | description                                                   | default    |
| ---------- | -------------------------------------------- | ------------------------------------------------------------- | ---------- |
| is         | `'div' \| 'a' \| 'button' \| 'input'`        | HTML element. Overridden by `href` or event handlers.         | `'div'`    |
| variant    | `'filled' \| 'outline' \| 'text' \| 'link'` | Visual style.                                                 | `'filled'` |
| size       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`      | Height and font size.                                         | `'md'`     |
| density    | `'compact' \| 'default' \| 'comfortable'`    | Padding and height multiplier.                                | `'default'`|
| href       | `string`                                     | Renders as `<a>`. Cleared when `disabled` or `readonly`.      |            |
| active     | `boolean`                                    | Applies the pressed background.                               | `false`    |
| disabled   | `boolean`                                    | Dims and blocks all interaction.                              | `false`    |
| readonly   | `boolean`                                    | Blocks interaction without disabled styling.                  | `false`    |
| labelStyle | `boolean`                                    | Uppercase, bold, letter-spacing — for badges and categories.  | `false`    |
| loading    | `boolean`                                    | Shows a spinner, hides content.                               |            |
| noRipple   | `boolean`                                    | Disables the ripple animation on click.                       |            |
| prepend    | `Snippet`                                    | Content before the label.                                     |            |
| append     | `Snippet`                                    | Content after the label.                                      |            |
| load       | `Snippet`                                    | Custom spinner content shown while loading.                   |            |
| children   | `Snippet`                                    | Chip label.                                                   |            |
