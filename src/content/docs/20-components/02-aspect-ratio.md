---
title: "Aspect Ratio"
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Preview from '../../../content/examples/components/aspect-ratio/preview.svelte';
	import Ratios from '../../../content/examples/components/aspect-ratio/ratios.svelte';
	import Fit from '../../../content/examples/components/aspect-ratio/fit.svelte';
	import Inline from '../../../content/examples/components/aspect-ratio/inline.svelte';
</script>

# Aspect Ratio component

The `kit:aspect-ratio` component constrains its content to a fixed ratio. It works with any media — images, videos, iframes, or arbitrary content.

<LazyRepl title="aspect-ratio.svelte" presentation lang="svelte" content={() => import('../../../content/examples/components/aspect-ratio/preview.svelte?raw')}>
<Preview/>
</LazyRepl>

## Guide

`kit:aspect-ratio` sets `aspect-ratio` on the container and stretches child media elements (`img`, `video`, `iframe`, `canvas`, `svg`) to fill it via `object-fit`. The `ratio` prop accepts a number, a `/`-separated string (`"16/9"`), or a `:`-separated string (`"16:9"`). It falls back to `16/9` if the value is invalid.

> `aspectRatio` is an alias for `ratio` — both are equivalent.

## Usage

### ratio

Pass `ratio` as a string (`"16/9"`, `"4:3"`) or a plain number (`1.777`).

| prop        | type               | default  |
| ----------- | ------------------ | -------- |
| ratio       | `string \| number` | `16/9`   |
| aspectRatio | `string \| number` | `16/9`   |

<LazyRepl title="aspect-ratio.svelte" lang="svelte" content={() => import('../../../content/examples/components/aspect-ratio/ratios.svelte?raw')}>
<Ratios/>
</LazyRepl>

### fit

`fit` controls the `object-fit` applied to child media elements.

| prop | type                          | default   |
| ---- | ----------------------------- | --------- |
| fit  | `'cover' \| 'contain' \| 'fill'` | `'cover'` |

<LazyRepl title="aspect-ratio.svelte" lang="svelte" content={() => import('../../../content/examples/components/aspect-ratio/fit.svelte?raw')}>
<Fit/>
</LazyRepl>

### inline

`inline` switches the container from `block` to `inline-block`, letting it sit inside text flow. Width is no longer 100% — set it manually via `style`.

| prop   | type      | default |
| ------ | --------- | ------- |
| inline | `boolean` | `false` |

<LazyRepl title="aspect-ratio.svelte" lang="svelte" content={() => import('../../../content/examples/components/aspect-ratio/inline.svelte?raw')}>
<Inline/>
</LazyRepl>

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the component directly:

<LazyRepl lang="js" content={"import { AspectRatio } from 'lapikit/labs/components';"} />

## API Reference

**`kit:aspect-ratio`**

| props       | type                                                      | description                                           | default   |
| ----------- | --------------------------------------------------------- | ----------------------------------------------------- | --------- |
| is          | `'div' \| 'span' \| 'figure' \| 'section' \| 'article'`  | HTML element to render.                               | `'div'`   |
| ratio       | `string \| number`                                        | Aspect ratio. Accepts `"w/h"`, `"w:h"`, or a number. | `16/9`    |
| aspectRatio | `string \| number`                                        | Alias for `ratio`.                                    | `16/9`    |
| fit         | `'cover' \| 'contain' \| 'fill'`                         | `object-fit` applied to child media elements.         | `'cover'` |
| inline      | `boolean`                                                 | Renders as `inline-block` with `width: auto`.         | `false`   |
| children    | `Snippet`                                                 | Content to constrain.                                 |           |
