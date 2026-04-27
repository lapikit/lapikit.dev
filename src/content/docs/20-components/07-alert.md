---
title: "Alert"
description: "Display alert or status messages. Manage variants, densities and info types for effective user feedback."
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Preview from '../../../content/examples/components/alert/preview.svelte';
	import Tones from '../../../content/examples/components/alert/tones.svelte';
	import Variants from '../../../content/examples/components/alert/variants.svelte';
	import Density from '../../../content/examples/components/alert/density.svelte';
	import Closable from '../../../content/examples/components/alert/closable.svelte';
	import PrependAppend from '../../../content/examples/components/alert/prepend-append.svelte';
	import Close from '../../../content/examples/components/alert/close.svelte';
</script>

# Alert component

The `kit:alert` component displays a contextual message to the user. It supports multiple tones, visual variants, and optional slots for custom prepend, append, and close content.

<LazyRepl title="alert.svelte" presentation lang="svelte" content={() => import('../../../content/examples/components/alert/preview.svelte?raw')}>
<Preview/>
</LazyRepl>

## Guide

`kit:alert` renders as a `<div role="alert">` by default. It has no internal logic beyond visibility — the `open` prop controls whether it is rendered, and `closable` adds a close button that sets `open` to `false`.

The tone can be set via the `tone` prop or using the boolean shorthand props `info`, `success`, `warning`, and `error`.

## Usage

### Tones

Use the `tone` prop to communicate the nature of the message.

- **tone**: `'default' | 'info' | 'success' | 'warning' | 'error'` = `'default'`

<LazyRepl title="alert.svelte" lang="svelte" content={() => import('../../../content/examples/components/alert/tones.svelte?raw')}>
<Tones/>
</LazyRepl>

### Variants

The `variant` prop controls the visual style of the alert.

- **variant**: `'filled' | 'outline' | 'text'` = `'filled'`

<LazyRepl title="alert.svelte" lang="svelte" content={() => import('../../../content/examples/components/alert/variants.svelte?raw')}>
<Variants/>
</LazyRepl>

### Density

`density` adjusts the padding and spacing inside the alert.

- **density**: `'compact' | 'default' | 'comfortable'` = `'default'`

<LazyRepl title="alert.svelte" lang="svelte" content={() => import('../../../content/examples/components/alert/density.svelte?raw')}>
<Density/>
</LazyRepl>

### closable

Add `closable` to display a close button. The `open` prop is bindable so you can react to the dismissal externally.

- **open**: `boolean` = `true`
- **closable**: `boolean` = `'false'`

<LazyRepl title="alert.svelte" lang="svelte" content={() => import('../../../content/examples/components/alert/closable.svelte?raw')}>
<Closable/>
</LazyRepl>

### prepend and append snippets

Use `prepend` to add an icon or element before the content, and `append` to add one after — for example a link or action button.

- **prepend**: `Snippet | undefined` = `undefined`
- **append**: `Snippet | undefined` = `undefined`

<LazyRepl title="alert.svelte" lang="svelte" content={() => import('../../../content/examples/components/alert/prepend-append.svelte?raw')}>
<PrependAppend/>
</LazyRepl>

### close snippet

Use the `close` snippet to replace the default `×` character with a custom close element.

- **close**: `Snippet | undefined` = `undefined`

<LazyRepl title="alert.svelte" lang="svelte" content={() => import('../../../content/examples/components/alert/close.svelte?raw')}>
<Close/>
</LazyRepl>

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the component directly:

<LazyRepl lang="js" content={"import { Alert } from 'lapikit/labs/components';"} />

## API Reference

**`kit:alert`**

| props      | type                                                       | description                                      | default     |
| ---------- | ---------------------------------------------------------- | ------------------------------------------------ | ----------- |
| is         | `'div' \| 'section' \| 'aside' \| 'article'`               | HTML element to render.                          | `'div'`     |
| open       | `boolean`                                                  | Controls visibility. Bindable.                   | `true`      |
| closable   | `boolean`                                                  | Adds a close button that sets `open` to `false`. | `false`     |
| variant    | `'filled' \| 'outline' \| 'text'`                          | Visual style of the alert.                       | `'filled'`  |
| density    | `'compact' \| 'default' \| 'comfortable'`                  | Spacing inside the alert.                        | `'default'` |
| tone       | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | Semantic color tone.                             | `'default'` |
| rounded    | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                | Border radius.                                   | `'md'`      |
| color      | `string`                                                   | Foreground color override (`--kit-alert-fg`).    |             |
| background | `string`                                                   | Background color override (`--kit-alert-bg`).    |             |
| prepend    | `Snippet`                                                  | Content rendered before the main text.           |             |
| append     | `Snippet`                                                  | Content rendered after the main text.            |             |
| close      | `Snippet`                                                  | Custom content inside the close button.          |             |
| children   | `Snippet`                                                  | Main alert content.                              |             |
