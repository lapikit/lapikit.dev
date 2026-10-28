---
title: 'Alert component'
category: 'Components'
head:
  title: 'Alert'
  description: 'Display alert or status messages. Manage variants, densities and info types for effective user feedback.'
layout: 'doc_page'
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Preview from '$examples/components/alert/preview.svelte';
	import Tones from '$examples/components/alert/tones.svelte';
	import Variants from '$examples/components/alert/variants.svelte';
	import Density from '$examples/components/alert/density.svelte';
	import Closable from '$examples/components/alert/closable.svelte';
	import PrependAppend from '$examples/components/alert/prepend-append.svelte';
	import Close from '$examples/components/alert/close.svelte';
	import Color from '$examples/components/alert/color.svelte';

	import previewCode from '$examples/components/alert/preview.svelte?raw';
	import tonesCode from '$examples/components/alert/tones.svelte?raw';
	import variantsCode from '$examples/components/alert/variants.svelte?raw';
	import densityCode from '$examples/components/alert/density.svelte?raw';
	import closableCode from '$examples/components/alert/closable.svelte?raw';
	import prependAppendCode from '$examples/components/alert/prepend-append.svelte?raw';
	import closeCode from '$examples/components/alert/close.svelte?raw';
	import colorCode from '$examples/components/alert/color.svelte?raw';
</script>

The `kit:alert` component displays a contextual message to the user. It supports multiple tones, visual variants, and optional snippets for custom prepend, append, and close content. It is ideal for providing feedback, warnings, or important information in a way that stands out from the rest of the interface.

<LazyRepl title="alert.svelte" presentation lang="svelte" content={previewCode}>
<Preview/>
</LazyRepl>

`kit:alert` renders as a `<div>` by default. It has no internal logic beyond visibility: the `open` prop controls whether it is rendered, and `closable` adds a close button that sets `open` to `false`.

The role follows the tone: `role="alert"` for `warning` and `error` (the screen reader announces the message right away), `role="status"` for the other tones (announced politely). Pass `role` to override it.

## Examples of alert

### Tones

For greater expressiveness, an alert can be marked by a status: `info`, `success`, `warning`, `error`.
Each tone applies its color of the palette (`--kit-color-info`...) and the matching role, to convey the right signal to the user. Add an icon with the `prepend` snippet.

- **tone**: `'default' | 'info' | 'success' | 'warning' | 'error'` = `'default'`

<LazyRepl title="alert.svelte" lang="svelte" content={tonesCode}>
<Tones/>
</LazyRepl>

### Variants

The `kit:alert` can adopt different visual styles via the props `variant`:

- **filled** (default): solid background, the tone color with a contrasted text (`--kit-color-surface-2` without tone).
- **tonal**: light tint of the tone color, text in the color.
- **outline**: transparent background with a border.
- **surface**: very light tint of the tone color with a soft border.
- **text**: transparent background, text in the color.

These variants can be adapted to different visual contexts or levels of importance.

- **variant**: `'filled' | 'tonal' | 'outline' | 'surface' | 'text'` = `'filled'`

> The border thickness of `outline` and `surface` is set by the global variable `--kit-outline-weight` (`1px` by default).

<LazyRepl title="alert.svelte" lang="svelte" content={variantsCode}>
<Variants/>
</LazyRepl>

### Density

Props `density` adjusts the padding and the minimal height of the alert, from `-4px` (`dense`) to `+4px` (`spacious`). Ideal for adapting alerts to different levels of hierarchy or UI density.

- **density**: `'dense' | 'compact' | 'default' | 'comfortable' | 'spacious'` = `'default'`

<LazyRepl title="alert.svelte" lang="svelte" content={densityCode}>
<Density/>
</LazyRepl>

### Colors and multiline

`color` accepts a color of the palette or any CSS color. Without `color`, the tone gives the color; with `color`, the color is overridden but the tone keeps its role.

`multiline` aligns the snippets on the first line instead of the center, for messages on several lines.

- **color**: `string | false | { base?: string | false; active?: string | false }` = `undefined`
- **multiline**: `boolean` = `false`

<LazyRepl title="alert.svelte" lang="svelte" content={colorCode}>
<Color/>
</LazyRepl>

### closable

Add `closable` to display a close button. The `open` prop is bindable so you can react to the dismissal externally.

- **open**: `boolean` = `true`
- **closable**: `boolean` = `false`

<LazyRepl title="alert.svelte" lang="svelte" content={closableCode}>
<Closable/>
</LazyRepl>

### prepend and append snippets

Use `prepend` to add an icon or element before the content, and `append` to add one after for example a link or action button.

- **prepend**: `Snippet | undefined` = `undefined`
- **append**: `Snippet | undefined` = `undefined`

<LazyRepl title="alert.svelte" lang="svelte" content={prependAppendCode}>
<PrependAppend/>
</LazyRepl>

### close snippet

Use the `close` snippet to replace the default close icon with a custom element. The close button keeps its `aria-label="Close"`.

- **close**: `Snippet | undefined` = `undefined`

<LazyRepl title="alert.svelte" lang="svelte" content={closeCode}>
<Close/>
</LazyRepl>

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the component directly:

<LazyRepl lang="js" content={"import { Alert } from 'lapikit/components';"} />

## API Reference

**`kit:alert`**

| props          | type                                                               | description                                            | default     |
| -------------- | ------------------------------------------------------------------ | ------------------------------------------------------ | ----------- |
| ref $bindable  | `HTMLElement`                                                      | Bindable reference to the rendered DOM element.        | `null`      |
| is             | `'div' \| 'section' \| 'aside' \| 'article'`                       | HTML element to render.                                | `'div'`     |
| class          | `string \| array \| object`                                        | Classes of the alert, with the rules of Svelte (clsx). |             |
| style          | `string`                                                           | Inline style of the alert.                             |             |
| s-class        | `string \| array \| object`                                        | Classes of the alert, merged with `class`.             |             |
| s-style        | `object`                                                           | Inline style as an object of property / value pairs.   |             |
| open $bindable | `boolean`                                                          | Controls visibility. Bindable.                         | `true`      |
| closable       | `boolean`                                                          | Adds a close button that sets `open` to `false`.       | `false`     |
| closeLabel     | `string`                                                           | Accessible name of the close button.                   | `'Close'`   |
| variant        | `'filled' \| 'tonal' \| 'outline' \| 'surface' \| 'text'`          | Visual style of the alert.                             | `'filled'`  |
| density        | `'dense' \| 'compact' \| 'default' \| 'comfortable' \| 'spacious'` | Padding and minimal height.                            | `'default'` |
| tone           | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'`         | Semantic tone: default color and role.                 | `'default'` |
| rounded        | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`              | Border radius.                                         | `'md'`      |
| color          | `string \| false \| { base?, active? }`                            | Alert color, overrides the color of the tone.          |             |
| size           | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                             | Sizing height, font and gap for alert.                 | `'md'`      |
| prepend        | `Snippet`                                                          | Content rendered before the main text.                 |             |
| append         | `Snippet`                                                          | Content rendered after the main text.                  |             |
| close          | `Snippet`                                                          | Custom content inside the close button.                |             |
| children       | `Snippet`                                                          | Main alert content.                                    |             |
| multiline      | `boolean`                                                          | Aligns the snippets on the first line.                 | `false`     |
| elevation      | `'0' \| '1' \| '2' \| '3' \| '4' \| '5' \| ElevationState`         | Add shadow effect.                                     |             |

> `class:` and `style:` directives also work on `kit:alert` with the Lapikit preprocessor, see [Class and Style](/docs/essentials/class-and-style).

To enhance your `kit:alert`, think of [Icon](/docs/components/icon) for legibility, or [Button](/docs/components/button) for integrated actions.
