---
title: 'Avatar component'
category: 'Components'
head:
  title: 'Avatar'
  description: 'Display profile images, icons or initials in a variety of formats. Perfect for lists, headers or cards.'
navigation:
  label: 'Avatar'
  name: 'kit:avatar'
  description: 'User profile picture with fallback initials.'
---

The `kit:avatar` component is used to display images, icons or initials representing a person or object. It is often used in user interfaces to identify users, profiles or entities. Thanks to its many customization options, the `kit:avatar` component adapts easily to different styles and contexts.

```repl svelte
/// title: avatar.svelte
/// presentation
/// example: components/avatar/preview.svelte
```

`kit:avatar` has two rendering modes:

- **Label mode** - when `label` is set, the text is displayed uppercase and centered, its font size follows `size`.
- **Image mode** - when `children` is provided instead, the content fills the avatar: a direct child `<img>` covers it.

`size` and `density` set the diameter in both modes. `color` sets the background, the text follows its `on-` color or a contrasted color.

## Examples of avatar

### label

Pass a string to `label` to display initials or short text. The value is trimmed and uppercased automatically.

- **label**: `string | undefined` = `undefined`

```repl svelte
/// title: avatar.svelte
/// example: components/avatar/label.svelte
```

### Image

Without `label`, pass an `<img>` (or any element) as `children`. The image fills the circle via `object-fit: cover`.

```repl svelte
/// title: avatar.svelte
/// example: components/avatar/image.svelte
```

### size

Controls the diameter and font size in label mode.

- **size**: `'xs' | 'sm' | 'md' | 'lg' | 'xl'` = `'md'`

```repl svelte
/// title: avatar.svelte
/// example: components/avatar/size.svelte
```

### density

Adjusts the diameter on top of `size`, from `-4px` (`dense`) to `+4px` (`spacious`).

- **density**: `'dense' | 'compact' | 'default' | 'comfortable' | 'spacious'` = `'default'`

```repl svelte
/// title: avatar.svelte
/// example: components/avatar/density.svelte
```

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the component directly:

```repl js
import { Avatar } from 'lapikit/components';
```

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
