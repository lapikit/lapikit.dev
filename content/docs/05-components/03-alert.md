---
title: 'Alert component'
category: 'Components'
head:
  title: 'Alert'
  description: 'Display alert or status messages. Manage variants, densities and info types for effective user feedback.'
navigation:
  label: 'Alert'
  name: 'kit:alert'
  description: 'Contextual feedback messages for user actions.'
---

The `kit:alert` component displays a contextual message to the user. It supports multiple tones, visual variants, and optional snippets for custom prepend, append, and close content. It is ideal for providing feedback, warnings, or important information in a way that stands out from the rest of the interface.

```repl svelte
/// title: alert.svelte
/// presentation
/// example: components/alert/preview.svelte
```

`kit:alert` renders as a `<div>` by default. It has no internal logic beyond visibility: the `open` prop controls whether it is rendered, and `closable` adds a close button that sets `open` to `false`.

The role follows the tone: `role="alert"` for `warning` and `error` (the screen reader announces the message right away), `role="status"` for the other tones (announced politely). Pass `role` to override it.

## Examples of alert

### Tones

For greater expressiveness, an alert can be marked by a status: `info`, `success`, `warning`, `error`.
Each tone applies its color of the palette (`--kit-color-info`...) and the matching role, to convey the right signal to the user. Add an icon with the `prepend` snippet.

- **tone**: `'default' | 'info' | 'success' | 'warning' | 'error'` = `'default'`

```repl svelte
/// title: alert.svelte
/// example: components/alert/tones.svelte
```

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

```repl svelte
/// title: alert.svelte
/// example: components/alert/variants.svelte
```

### Density

Props `density` adjusts the padding and the minimal height of the alert, from `-4px` (`dense`) to `+4px` (`spacious`). Ideal for adapting alerts to different levels of hierarchy or UI density.

- **density**: `'dense' | 'compact' | 'default' | 'comfortable' | 'spacious'` = `'default'`

```repl svelte
/// title: alert.svelte
/// example: components/alert/density.svelte
```

### Colors and multiline

`color` accepts a color of the palette or any CSS color. Without `color`, the tone gives the color; with `color`, the color is overridden but the tone keeps its role.

`multiline` aligns the snippets on the first line instead of the center, for messages on several lines.

- **color**: `string | false | { base?: string | false; active?: string | false }` = `undefined`
- **multiline**: `boolean` = `false`

```repl svelte
/// title: alert.svelte
/// example: components/alert/color.svelte
```

### closable

Add `closable` to display a close button. The `open` prop is bindable so you can react to the dismissal externally.

- **open**: `boolean` = `true`
- **closable**: `boolean` = `false`

```repl svelte
/// title: alert.svelte
/// example: components/alert/closable.svelte
```

### prepend and append snippets

Use `prepend` to add an icon or element before the content, and `append` to add one after for example a link or action button.

- **prepend**: `Snippet | undefined` = `undefined`
- **append**: `Snippet | undefined` = `undefined`

```repl svelte
/// title: alert.svelte
/// example: components/alert/prepend-append.svelte
```

### close snippet

Use the `close` snippet to replace the default close icon with a custom element. The close button keeps its `aria-label="Close"`.

- **close**: `Snippet | undefined` = `undefined`

```repl svelte
/// title: alert.svelte
/// example: components/alert/close.svelte
```

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the component directly:

```repl js
import { Alert } from 'lapikit/components';
```

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
