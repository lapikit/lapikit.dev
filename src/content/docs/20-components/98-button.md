---
title: "Button"
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Preview from '../../../content/examples/components/btn/preview.svelte';
	import Variants from '../../../content/examples/components/btn/variants.svelte';
	import Size from '../../../content/examples/components/btn/size.svelte';
	import Icon from '../../../content/examples/components/btn/icon.svelte';
	import PrependAppend from '../../../content/examples/components/btn/prepend-append.svelte';
	import States from '../../../content/examples/components/btn/states.svelte';
	import Block from '../../../content/examples/components/btn/block.svelte';
	import AsLink from '../../../content/examples/components/btn/as-link.svelte';
</script>

# Button component

The `kit:btn` component is a flexible interactive element. It renders as a `<button>` by default and switches to `<a>` automatically when `href` is provided.

<LazyRepl title="button.svelte" presentation lang="svelte" content={() => import('../../../content/examples/components/btn/preview.svelte?raw')}>
<Preview/>
</LazyRepl>

## Usage

### Variants

| prop    | type                                          | default    |
| ------- | --------------------------------------------- | ---------- |
| variant | `'filled' \| 'outline' \| 'text' \| 'link'`  | `'filled'` |

<LazyRepl title="button.svelte" lang="svelte" content={() => import('../../../content/examples/components/btn/variants.svelte?raw')}>
<Variants/>
</LazyRepl>

### size

| prop | type                                   | default |
| ---- | -------------------------------------- | ------- |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`  |

<LazyRepl title="button.svelte" lang="svelte" content={() => import('../../../content/examples/components/btn/size.svelte?raw')}>
<Size/>
</LazyRepl>

### icon

Add `icon` to render a square button — width equals height. Useful for icon-only actions.

| prop | type      | default |
| ---- | --------- | ------- |
| icon | `boolean` | `false` |

<LazyRepl title="button.svelte" lang="svelte" content={() => import('../../../content/examples/components/btn/icon.svelte?raw')}>
<Icon/>
</LazyRepl>

### prepend and append snippets

Use `prepend` and `append` to place icons or elements on either side of the label.

| prop    | type      | description                         |
| ------- | --------- | ----------------------------------- |
| prepend | `Snippet` | Content rendered before the label.  |
| append  | `Snippet` | Content rendered after the label.   |

<LazyRepl title="button.svelte" lang="svelte" content={() => import('../../../content/examples/components/btn/prepend-append.svelte?raw')}>
<PrependAppend/>
</LazyRepl>

### States

`disabled` prevents interaction and dims the button. `loading` hides the content and shows a spinner overlay. `active` applies the pressed background.

| prop     | type      | default |
| -------- | --------- | ------- |
| disabled | `boolean` | `false` |
| loading  | `boolean` |         |
| active   | `boolean` | `false` |

<LazyRepl title="button.svelte" lang="svelte" content={() => import('../../../content/examples/components/btn/states.svelte?raw')}>
<States/>
</LazyRepl>

Use the `load` snippet to replace the default `...` spinner with custom content.

| prop | type      | description                         |
| ---- | --------- | ----------------------------------- |
| load | `Snippet` | Custom content shown while loading. |

### block and wide

`block` makes the button stretch to its container's full width. `wide` caps it at `16rem` and is intended to be centered.

| prop  | type      | default |
| ----- | --------- | ------- |
| block | `boolean` |         |
| wide  | `boolean` |         |

<LazyRepl title="button.svelte" lang="svelte" content={() => import('../../../content/examples/components/btn/block.svelte?raw')}>
<Block/>
</LazyRepl>

### As a link

Pass `href` to render the button as an `<a>` element. The `disabled` prop removes `href` automatically.

| prop | type     | description                               |
| ---- | -------- | ----------------------------------------- |
| href | `string` | Renders as `<a href="...">` when set.     |

<LazyRepl title="button.svelte" lang="svelte" content={() => import('../../../content/examples/components/btn/as-link.svelte?raw')}>
<AsLink/>
</LazyRepl>

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the component directly:

<LazyRepl lang="js" content={"import { Btn } from 'lapikit/labs/components';"} />

## API Reference

**`kit:btn`**

| props    | type                                          | description                                              | default    |
| -------- | --------------------------------------------- | -------------------------------------------------------- | ---------- |
| is       | `'button' \| 'a' \| 'input'`                  | HTML element to render. Overridden by `href` or `input`. | `'button'` |
| variant  | `'filled' \| 'outline' \| 'text' \| 'link'`  | Visual style.                                            | `'filled'` |
| size     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`       | Height and font size.                                    | `'md'`     |
| density  | `'compact' \| 'default' \| 'comfortable'`     | Padding and height multiplier.                           | `'default'`|
| rounded  | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`  | Border radius.                                           |            |
| href     | `string`                                      | Renders as `<a>`. Cleared when `disabled`.               |            |
| disabled | `boolean`                                     | Prevents interaction, dims the button.                   | `false`    |
| loading  | `boolean`                                     | Shows a spinner, hides content.                          |            |
| active   | `boolean`                                     | Applies the pressed background.                          | `false`    |
| icon     | `boolean`                                     | Makes width equal height for icon-only buttons.          |            |
| block    | `boolean`                                     | Stretches to full container width.                       |            |
| wide     | `boolean`                                     | Caps width at `16rem`.                                   |            |
| noRipple | `boolean`                                     | Disables the ripple animation on click.                  |            |
| prepend  | `Snippet`                                     | Content before the label.                                |            |
| append   | `Snippet`                                     | Content after the label.                                 |            |
| load     | `Snippet`                                     | Custom spinner content shown while loading.              |            |
| children | `Snippet`                                     | Button label.                                            |            |
