---
title: 'Separator component'
category: 'Components'
head:
  title: 'Separator'
  description: 'Visually separate your UI blocks with customizable lines in size, color, orientation and opacity.'
navigation:
  label: 'Separator'
  name: 'kit:separator'
  description: 'Visual divider between sections or list items.'
---

The `kit:separator` component renders a thin horizontal or vertical dividing line.

```repl svelte
/// title: separator.svelte
/// presentation
/// example: components/separator/preview.svelte
```

`kit:separator` renders as `<hr>` by default, which is a separator natively; with `is="div"` it sets `role="separator"`. `aria-orientation` is set automatically. The color (`--kit-color-border`) and the thickness can be overridden per-instance with `color` and `thickness`, or globally with the `--kit-separator-color` and `--kit-separator-thickness` variables.

## Examples of separator

### orientation

- **orientation**: `'horizontal' | 'vertical'` = `'horizontal'`

Vertical separators are inline-flex and stretch to fill their container's height.

```repl svelte
/// title: separator.svelte
/// example: components/separator/orientation.svelte
```

### inset

Adds a leading margin to indent the separator from the left edge useful inside lists.

- **inset**: `boolean` = `false`

```repl svelte
/// title: separator.svelte
/// example: components/separator/inset.svelte
```

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the components directly:

```repl js
import { Separator } from 'lapikit/components';
```

## API Reference

**`kit:separator`**

| props         | type                         | description                                                                | default        |
| ------------- | ---------------------------- | -------------------------------------------------------------------------- | -------------- |
| ref $bindable | `HTMLElement`                | Bindable reference to the rendered DOM element.                            | `null`         |
| is            | `'div' \| 'hr'`              | HTML element to render.                                                    | `'hr'`         |
| class         | `string \| array \| object`  | Classes of the separator, with the rules of Svelte (clsx).                 |                |
| style         | `string`                     | Inline style of the separator.                                             |                |
| s-class       | `string \| array \| object`  | Classes of the separator, merged with `class`.                             |                |
| s-style       | `object`                     | Inline style as an object of property / value pairs.                       |                |
| orientation   | `'horizontal' \| 'vertical'` | Direction of the separator.                                                | `'horizontal'` |
| inset         | `boolean`                    | Adds a leading indent.                                                     | `false`        |
| thickness     | `string \| number`           | Border width: a number in px or a CSS width (`--kit-separator-thickness`). | `'thin'`       |
| color         | `string \| false`            | A color of the palette or any CSS color (`--kit-separator-color`).         |                |

To organize your data, combine Separators with [List](/docs/components/list) for greater legibility.
