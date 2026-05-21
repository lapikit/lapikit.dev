---
title: "Button"
description: "Stylish, customizable Svelte buttons with Lapikit. Variants, icons, colors, states: everything's ready."
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

The `kit:btn` component is a central component of Lapikit. It allows you to create buttons that are adaptable, accessible and easily customized, either via props or CSS variables.

It automatically manages variants, states (`active`, `loading`, etc.), accessibility, colors, sizes, and integrates with icons or additional content (`prepend`, `append`, `load`).

<LazyRepl title="button.svelte" presentation lang="svelte" content={() => import('../../../content/examples/components/btn/preview.svelte?raw')}>
<Preview/>
</LazyRepl>

## Examples of button

### Variants

Variants control the overall style of the button. They enable adaptation to different interface contexts, while maintaining visual consistency.

- **filled** (default): solid button, generally used for main actions.
- **outline**: button with outline, often used for secondary actions.
- **text**: discreet button with no background or border, perfect for actions in a text flow.
- **link**: styled as a hyperlink, ideal for navigation or less prominent actions.

- **variant**: `'filled' | 'outline' | 'text' | 'link'` = `'filled'`

<LazyRepl title="button.svelte" lang="svelte" content={() => import('../../../content/examples/components/btn/variants.svelte?raw')}>
<Variants/>
</LazyRepl>

### size

The `size` prop adjusts the button's height and font size. It allows you to create buttons that fit different contexts, from compact icon buttons to large call-to-action buttons.

- **size**: `'xs' | 'sm' | 'md' | 'lg' | 'xl'` = `'md'`

<LazyRepl title="button.svelte" lang="svelte" content={() => import('../../../content/examples/components/btn/size.svelte?raw')}>
<Size/>
</LazyRepl>

### icon

Add `icon` to render a square button width equals height. Useful for icon-only actions.

- **icon**: `boolean` = `false`

<LazyRepl title="button.svelte" lang="svelte" content={() => import('../../../content/examples/components/btn/icon.svelte?raw')}>
<Icon/>
</LazyRepl>

### prepend and append snippets

Use `prepend` and `append` to place icons or elements on either side of the label.

- **prepend**: `Snippet | undefined` = `undefined`
- **append**: `Snippet | undefined` = `undefined`

<LazyRepl title="button.svelte" lang="svelte" content={() => import('../../../content/examples/components/btn/prepend-append.svelte?raw')}>
<PrependAppend/>
</LazyRepl>

### States

The `kit:btn` component can reflect several visual or functional states, useful for informing the user or managing interaction. These states can be combined in certain cases (e.g. loading + success), but some, such as disabled, take precedence over all.

Here are the main states available:

- **disabled**: `boolean` = `false`
- **loading**: `boolean` = `false`
- **active**: `boolean` = `false`

Each state can be styled automatically via Lapikit themes or customized via CSS classes or variables.

<LazyRepl title="button.svelte" lang="svelte" content={() => import('../../../content/examples/components/btn/states.svelte?raw')}>
<States/>
</LazyRepl>

Use the `load` snippet to replace the default `...` spinner with custom content.

- **load**: `Snippet | undefined` = `undefined`

### block and wide

`block` makes the button stretch to its container's full width. `wide` caps it at `16rem` and is intended to be centered.

- **block**: `boolean` = `false`
- **wide**: `boolean` = `false`

<LazyRepl title="button.svelte" lang="svelte" content={() => import('../../../content/examples/components/btn/block.svelte?raw')}>
<Block/>
</LazyRepl>

### As a link

Pass `href` to render the button as an `<a>` element. The `disabled` prop removes `href` automatically.

- **href**: `string | undefined` = `undefined`

<LazyRepl title="button.svelte" lang="svelte" content={() => import('../../../content/examples/components/btn/as-link.svelte?raw')}>
<AsLink/>
</LazyRepl>

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the component directly:

<LazyRepl lang="js" content={"import { Btn } from 'lapikit/labs/components';"} />

## API Reference

**`kit:btn`**

| props    | type                                        | description                                              | default     |
| -------- | ------------------------------------------- | -------------------------------------------------------- | ----------- |
| is       | `'button' \| 'a' \| 'input'`                | HTML element to render. Overridden by `href` or `input`. | `'button'`  |
| variant  | `'filled' \| 'outline' \| 'text' \| 'link'` | Visual style.                                            | `'filled'`  |
| size     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`      | Height and font size.                                    | `'md'`      |
| density  | `'compact' \| 'default' \| 'comfortable'`   | Padding and height multiplier.                           | `'default'` |
| rounded  | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | Border radius.                                           |             |
| href     | `string`                                    | Renders as `<a>`. Cleared when `disabled`.               |             |
| disabled | `boolean`                                   | Prevents interaction, dims the button.                   | `false`     |
| loading  | `boolean`                                   | Shows a spinner, hides content.                          |             |
| active   | `boolean`                                   | Applies the pressed background.                          | `false`     |
| icon     | `boolean`                                   | Makes width equal height for icon-only buttons.          |             |
| block    | `boolean`                                   | Stretches to full container width.                       |             |
| wide     | `boolean`                                   | Caps width at `16rem`.                                   |             |
| noRipple | `boolean`                                   | Disables the ripple animation on click.                  |             |
| prepend  | `Snippet`                                   | Content before the label.                                |             |
| append   | `Snippet`                                   | Content after the label.                                 |             |
| load     | `Snippet`                                   | Custom spinner content shown while loading.              |             |
| children | `Snippet`                                   | Button label.                                            |             |

`kit:btn` become more effective with [Tooltips](/docs/components/tooltip), a [Toolbar](/docs/components/toolbar) or [Popover](/docs/components/popover) interactions.
