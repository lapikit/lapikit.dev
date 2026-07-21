---
title: 'Avatar component'
category: 'Components'
head:
  title: 'Avatar'
  description: 'Display profile images, icons or initials in a variety of formats. Perfect for lists, headers or cards.'
layout: 'doc_page'
---

<script>
	import LazyRepl from '$components/lazy-repl.svelte';

	import Preview from '$examples/components/avatar/preview.svelte';
	import Label from '$examples/components/avatar/label.svelte';
	import Image from '$examples/components/avatar/image.svelte';
	import Size from '$examples/components/avatar/size.svelte';
	import Density from '$examples/components/avatar/density.svelte';
</script>

The `kit:avatar` component is used to display images, icons or initials representing a person or object. It is often used in user interfaces to identify users, profiles or entities. Thanks to its many customization options, the `kit:avatar` component adapts easily to different styles and contexts.

<LazyRepl title="avatar.svelte" presentation lang="svelte" content={() => import('$examples/components/avatar/preview.svelte?raw')}>
<Preview/>
</LazyRepl>

`kit:avatar` has two rendering modes:

- **Label mode** - when `label` is set, the text is displayed uppercase and centered. `size` and `density` scale the avatar in this mode.
- **Image mode** - when `children` is provided instead, the content (typically an `<img>`) fills the circle. `size` and `density` have no effect in this mode.

## Examples of avatar

### label

Pass a string to `label` to display initials or short text. The value is trimmed and uppercased automatically.

- **label**: `string | undefined` = `undefined`

<LazyRepl title="avatar.svelte" lang="svelte" content={() => import('$examples/components/avatar/label.svelte?raw')}>
<Label/>
</LazyRepl>

### Image

Without `label`, pass an `<img>` (or any element) as `children`. The image fills the circle via `object-fit: cover`.

<LazyRepl title="avatar.svelte" lang="svelte" content={() => import('$examples/components/avatar/image.svelte?raw')}>
<Image/>
</LazyRepl>

### size

Controls the diameter and font size in label mode.

- **size**: `'xs' | 'sm' | 'md' | 'lg' | 'xl'` = `'md'`

<LazyRepl title="avatar.svelte" lang="svelte" content={() => import('$examples/components/avatar/size.svelte?raw')}>
<Size/>
</LazyRepl>

### density

Scales the diameter by a multiplier on top of `size`, in label mode only.

- **density**: `'compact' | 'default' | 'comfortable'` = `'default'`

<LazyRepl title="avatar.svelte" lang="svelte" content={() => import('$examples/components/avatar/density.svelte?raw')}>
<Density/>
</LazyRepl>

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the component directly:

<LazyRepl lang="js" content={"import { Avatar } from 'lapikit/components';"} />

## API Reference

**`kit:avatar`**

| props         | type                                                       | description                                             | default     |
| ------------- | ---------------------------------------------------------- | ------------------------------------------------------- | ----------- |
| ref $bindable | `HTMLElement`                                              | Bindable reference to the rendered DOM element.         | `null`      |
| s-class       | `'string' \| 'array' \| 'object'`                          | Sets className on avatar.                               |             |
| s-style       | `'string' \| 'array' \| 'object'`                          | Sets styles on avatar.                                  |             |
| label         | `string`                                                   | Text displayed inside the avatar (uppercased).          |             |
| size          | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                     | Diameter and font size. Label mode only.                | `'md'`      |
| density       | `'none' \| 'compact' \| 'default' \| 'comfortable'`        | Size multiplier applied on top of `size`. Label only.   | `'default'` |
| rounded       | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`      | Border radius.                                          | `'full'`    |
| children      | `Snippet`                                                  | Content when `label` is not set (typically an `<img>`). |             |
| elevation     | `'0' \| '1' \| '2' \| '3' \| '4' \| '5' \| ElevationState` | Add shadow effect.                                      |             |
| color         | `string`                                                   | Foreground color override (`--kit-avatar-fg`).          |             |
| background    | `string`                                                   | Background color override (`--kit-avatar-bg`).          |             |

Associate `kit:avatar` with user [Cards](/docs/components/card) or [Chips](/docs/components/chip) to display roles or status.
