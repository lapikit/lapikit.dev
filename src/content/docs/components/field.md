---
title: 'Field component'
category: 'Components'
head:
  title: 'Field'
  description: 'The base of the Lapikit form fields: wrap any control (select, date picker, custom input) with the style, messages and states of a textfield.'
layout: 'doc_page'
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Preview from '$examples/components/field/preview.svelte';
	import previewCode from '$examples/components/field/preview.svelte?raw';
</script>

The `kit:field` component is the base of the Lapikit form fields. It draws the box of the field (variant, color, size, density, rounded), the snippets around the control, the clear button and the message line, and it manages the states (`error`, `disabled`, `readonly`, focus).

It renders no control itself: you bring your own (a `select`, a date picker, a custom input...), and the field gives it the attributes to stay accessible. [Textfield](/docs/components/textfield) is a `kit:field` with an `<input>`.

<LazyRepl title="field.svelte" presentation lang="svelte" content={previewCode}>
<Preview/>
</LazyRepl>

## The control

The `children` snippet receives the attributes to spread on the control:

| attribute          | description                                    |
| ------------------ | ---------------------------------------------- |
| `id`               | The `id` prop, or a generated one.             |
| `aria-describedby` | The id of the message line, when there is one. |
| `aria-invalid`     | `true` when `error` is set.                    |
| `disabled`         | The `disabled` prop.                           |
| `readonly`         | The `readonly` prop.                           |

```svelte
<kit:field message="Help">
	{#snippet children(control)}
		<input {...control} bind:value />
	{/snippet}
</kit:field>
```

In TypeScript, type the parameter with `FieldControlProps`:

```svelte
<script lang="ts">
	import type { FieldControlProps } from 'lapikit/components';
</script>

<kit:field message="Help">
	{#snippet children(control: FieldControlProps)}
		<input {...control} bind:value />
	{/snippet}
</kit:field>
```

The field does not know the value of the control: pass `dirty` to show the clear button, `onclear` to empty the value, and `counter` for the text at the end of the message line.

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the component directly:

<LazyRepl lang="js" content={"import { Field } from 'lapikit/components';"} />

## API Reference

**`kit:field`**

| props             | type                                                               | description                                                 | default     |
| ----------------- | ------------------------------------------------------------------ | ----------------------------------------------------------- | ----------- |
| ref $bindable     | `HTMLElement`                                                      | Bindable reference to the rendered DOM element.             | `null`      |
| class             | `string \| array \| object`                                        | Classes of the field, with the rules of Svelte (clsx).      |             |
| style             | `string`                                                           | Inline style of the field.                                  |             |
| s-class           | `string \| array \| object`                                        | Classes of the field, merged with `class`.                  |             |
| s-style           | `object`                                                           | Inline style as an object of property / value pairs.        |             |
| id                | `string`                                                           | Id of the control, generated when empty.                    |             |
| variant           | `'filled' \| 'tonal' \| 'outline' \| 'surface' \| 'text'`          | Visual style of the box.                                    | `'filled'`  |
| size              | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                             | Height, padding, gap, font and icon size (in `rem`).        | `'md'`      |
| density           | `'dense' \| 'compact' \| 'default' \| 'comfortable' \| 'spacious'` | Height and padding, from `-4px` to `+4px`.                  | `'default'` |
| rounded           | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`              | Border radius of the box.                                   | `'md'`      |
| color             | `string \| false \| { base?, active? }`                            | Color of the box, its use depends on the variant.           |             |
| elevation         | `'0' \| '1' \| '2' \| '3' \| '4' \| '5' \| ElevationState`         | Add shadow effect on the box.                               |             |
| label             | `string`                                                           | Label above the field, linked to the control with `for`.    |             |
| error             | `boolean`                                                          | Error state: error color on the border and the message.     | `false`     |
| errorMessage      | `string`                                                           | Message shown when `error` is `true`.                       |             |
| message           | `string`                                                           | Helper text below the field.                                |             |
| messagePrefix     | `string`                                                           | Leading text in the message row.                            |             |
| messageSuffix     | `string`                                                           | Trailing text in the message row.                           |             |
| counter           | `string`                                                           | Trailing text in the message row, replaces `messageSuffix`. |             |
| persistentMessage | `boolean`                                                          | Always shows the message, not only on focus.                | `false`     |
| clearable         | `boolean`                                                          | Shows a clear button.                                       | `false`     |
| clearLabel        | `string`                                                           | Accessible name of the clear button.                        | `'Clear'`   |
| persistentClear   | `boolean`                                                          | Always shows the clear button.                              | `false`     |
| dirty             | `boolean`                                                          | The control holds a value: shows the clear button.          | `false`     |
| onclear           | `() => void`                                                       | Called by the clear button.                                 |             |
| disabled          | `boolean`                                                          | Dims the field, given to the control.                       | `false`     |
| readonly          | `boolean`                                                          | Given to the control.                                       | `false`     |
| prefix            | `string`                                                           | Static text before the control.                             |             |
| suffix            | `string`                                                           | Static text after the control.                              |             |
| prepend           | `Snippet`                                                          | Content outside the box, before it.                         |             |
| append            | `Snippet`                                                          | Content outside the box, after it.                          |             |
| prependInner      | `Snippet`                                                          | Content inside the box, before the control.                 |             |
| appendInner       | `Snippet`                                                          | Content inside the box, after the control.                  |             |
| children          | `Snippet<[FieldControlProps]>`                                     | The control, receives the attributes to spread on it.       |             |

Use `kit:field` to build your own form fields, or use the ready-made [Textfield](/docs/components/textfield).
