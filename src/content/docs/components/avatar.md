---
title: 'Avatar component'
category: 'Components'
head:
  title: 'Avatar'
  description: 'Display profile images, icons or initials in a variety of formats. Perfect for lists, headers or cards.'
layout: 'doc_page'
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Preview from '$examples/components/avatar/preview.svelte';
	import Label from '$examples/components/avatar/label.svelte';
	import Image from '$examples/components/avatar/image.svelte';
	import Size from '$examples/components/avatar/size.svelte';
	import Density from '$examples/components/avatar/density.svelte';

	import previewCode from '$examples/components/avatar/preview.svelte?raw';
	import labelCode from '$examples/components/avatar/label.svelte?raw';
	import imageCode from '$examples/components/avatar/image.svelte?raw';
	import sizeCode from '$examples/components/avatar/size.svelte?raw';
	import densityCode from '$examples/components/avatar/density.svelte?raw';
</script>

The `kit:avatar` component is used to display images, icons or initials representing a person or object. It is often used in user interfaces to identify users, profiles or entities. Thanks to its many customization options, the `kit:avatar` component adapts easily to different styles and contexts.

<LazyRepl title="avatar.svelte" presentation lang="svelte" content={previewCode}>
<Preview/>
</LazyRepl>

`kit:avatar` has two rendering modes:

- **Label mode** - when `label` is set, the text is displayed uppercase and centered, its font size follows `size`.
- **Image mode** - when `children` is provided instead, the content fills the avatar: a direct child `<img>` covers it.

`size` and `density` set the diameter in both modes. `color` sets the background, the text follows its `on-` color or a contrasted color.

## Examples of avatar

### label

Pass a string to `label` to display initials or short text. The value is trimmed and uppercased automatically.

- **label**: `string | undefined` = `undefined`

<LazyRepl title="avatar.svelte" lang="svelte" content={labelCode}>
<Label/>
</LazyRepl>

### Image

Without `label`, pass an `<img>` (or any element) as `children`. The image fills the circle via `object-fit: cover`.

<LazyRepl title="avatar.svelte" lang="svelte" content={imageCode}>
<Image/>
</LazyRepl>

### size

Controls the diameter and font size in label mode.

- **size**: `'xs' | 'sm' | 'md' | 'lg' | 'xl'` = `'md'`

<LazyRepl title="avatar.svelte" lang="svelte" content={sizeCode}>
<Size/>
</LazyRepl>

### density

Adjusts the diameter on top of `size`, from `-4px` (`dense`) to `+4px` (`spacious`).

- **density**: `'dense' | 'compact' | 'default' | 'comfortable' | 'spacious'` = `'default'`

<LazyRepl title="avatar.svelte" lang="svelte" content={densityCode}>
<Density/>
</LazyRepl>

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the component directly:

<LazyRepl lang="js" content={"import { Avatar } from 'lapikit/components';"} />

## API Reference

**`kit:avatar`**

| props         | type                                                               | description                                                               | default     |
| ------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------- | ----------- |
| ref $bindable | `HTMLElement`                                                      | Bindable reference to the rendered DOM element.                           | `null`      |
| class         | `string \| array \| object`                                        | Classes of the avatar, with the rules of Svelte (clsx).                   |             |
| style         | `string`                                                           | Inline style of the avatar.                                               |             |
| s-class       | `string \| array \| object`                                        | Classes of the avatar, merged with `class`.                               |             |
| s-style       | `object`                                                           | Inline style as an object of property / value pairs.                      |             |
| label         | `string`                                                           | Text displayed inside the avatar (uppercased).                            |             |
| size          | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                             | Diameter (`2rem` to `4rem`) and font size of the label.                   | `'md'`      |
| density       | `'dense' \| 'compact' \| 'default' \| 'comfortable' \| 'spacious'` | Diameter from `-4px` to `+4px` on top of `size`.                          | `'default'` |
| rounded       | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`              | Border radius.                                                            | `'full'`    |
| children      | `Snippet`                                                          | Content when `label` is not set (typically an `<img>`).                   |             |
| elevation     | `'0' \| '1' \| '2' \| '3' \| '4' \| '5' \| ElevationState`         | Add shadow effect.                                                        |             |
| color         | `string \| false \| { base?, active? }`                            | Background color, the text follows its `on-` color or a contrasted color. |             |

Associate `kit:avatar` with user [Cards](/docs/components/card) or [Chips](/docs/components/chip) to display roles or status.
