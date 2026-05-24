---
title: 'Textfield'
description: 'Explore the Textfield component of Lapikit: customizable input fields for Svelte with full styling, validation and theming support to build forms faster.'
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Preview from '../../../content/examples/components/textfield/preview.svelte';
	import Variants from '../../../content/examples/components/textfield/variants.svelte';
	import Message from '../../../content/examples/components/textfield/message.svelte';
	import PrependAppend from '../../../content/examples/components/textfield/prepend-append.svelte';
	import Clearable from '../../../content/examples/components/textfield/clearable.svelte';
</script>

# Textfield component

The `kit:textfield` component provides a versatile input solution for capturing user data. It supports various input types, validation states, and enhanced features like character counting and clearable functionality. Designed for i increase accessibility and user experience in mind in your interphase.

Instead of reinventing textfield logic, Lapikit Textfield enables you to focus on behavior and data flow.

<LazyRepl title="textfield.svelte" presentation lang="svelte" content={() => import('../../../content/examples/components/textfield/preview.svelte?raw')}>
<Preview/>
</LazyRepl>

`kit:textfield` wraps a native `<input>` inside a styled container. It uses a grid layout to slot `prepend`/`append` (outside the field) and `prependInner`/`appendInner` (inside the field border). The `value` prop is bindable.

## Examples of textfield

### Variants

Shows visual variants of the textfield: **outlined**, **filled**, or **text** to match different design systems and UI contexts.

- **filled** (default): solid background.
- **outline**: visible border.
- **text** : transparent background.

- **variant**: `'filled' | 'outline' | 'text'` = `'filled'`

<LazyRepl title="textfield.svelte" lang="svelte" content={() => import('../../../content/examples/components/textfield/variants.svelte?raw')}>
<Variants/>
</LazyRepl>

### message and error

Show helper text or validation errors below the field. The message is visible on focus unless `persistentMessage` is set.

- **message**: `string` => Helper text shown below the field.
- **errorMessage**: `string` => Message shown when `error` is `true`.
- **error**: `boolean` => Activates the error state (red border + message).
- **persistentMessage**: `boolean` => Always shows the message (not only on focus).
- **counter**: `string` => Shows character count. Use with `max` for limit.
- **max**: `string` => Maximum character count.

<LazyRepl title="textfield.svelte" lang="svelte" content={() => import('../../../content/examples/components/textfield/message.svelte?raw')}>
<Message/>
</LazyRepl>

### prependInner and appendInner

Place icons or buttons inside the field border using the `prependInner` and `appendInner` snippets.

- **prependInner**: `Snippet | undefined` = `undefined` => Content inside the field, before the input.
- **appendInner**: `Snippet | undefined` = `undefined` => Content inside the field, after the input.
- **prepend**: `Snippet | undefined` = `undefined` => Content outside the field, before it.
- **append**: `Snippet | undefined` = `undefined` => Content outside the field, after it.

<LazyRepl title="textfield.svelte" lang="svelte" content={() => import('../../../content/examples/components/textfield/prepend-append.svelte?raw')}>
<PrependAppend/>
</LazyRepl>

### clearable

Adds a clear button that appears when the field has a value.

- **clearable**: `boolean` = `false`
- **persistentClear**: `boolean` = `false`

<LazyRepl title="textfield.svelte" lang="svelte" content={() => import('../../../content/examples/components/textfield/clearable.svelte?raw')}>
<Clearable/>
</LazyRepl>

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the components directly:

<LazyRepl lang="js" content={"import { Textfield } from 'lapikit/labs/components';"} />

## API Reference

**`kit:textfield`**

| props             | type                                          | description                                        | default     |
| ----------------- | --------------------------------------------- | -------------------------------------------------- | ----------- |
| value             | `string \| number`                            | Input value. Bindable.                             |             |
| type              | `'text' \| 'email' \| 'password' \| 'number'` | Input type.                                        | `'text'`    |
| placeholder       | `string`                                      | Placeholder text.                                  |             |
| variant           | `'filled' \| 'outline' \| 'text'`             | Visual style.                                      | `'filled'`  |
| size              | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`        | Field size.                                        | `'md'`      |
| density           | `'compact' \| 'default' \| 'comfortable'`     | Padding density.                                   | `'default'` |
| rounded           | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`   | Border radius.                                     | `'md'`      |
| error             | `boolean`                                     | Activates error state.                             | `false`     |
| errorMessage      | `string`                                      | Message shown when `error` is `true`.              |             |
| message           | `string`                                      | Helper text below the field.                       |             |
| messagePrefix     | `string`                                      | Leading text in the message row.                   |             |
| messageSuffix     | `string`                                      | Trailing text in the message row.                  |             |
| persistentMessage | `boolean`                                     | Always shows the message, not only on focus.       | `false`     |
| counter           | `boolean`                                     | Shows character counter.                           | `false`     |
| min               | `number`                                      | Minimum character count.                           |             |
| max               | `number`                                      | Maximum character count.                           |             |
| clearable         | `boolean`                                     | Shows a clear button when the field has a value.   | `false`     |
| persistentClear   | `boolean`                                     | Always shows the clear button.                     | `false`     |
| disabled          | `boolean`                                     | Disables the input.                                | `false`     |
| readonly          | `boolean`                                     | Makes the input read-only.                         | `false`     |
| hideSpinButtons   | `boolean`                                     | Hides the spin buttons on `type="number"` inputs.  | `false`     |
| prefix            | `string`                                      | Static text before the input value.                |             |
| suffix            | `string`                                      | Static text after the input value.                 |             |
| name              | `string`                                      | Input `name` attribute.                            |             |
| id                | `string`                                      | Input `id` attribute.                              |             |
| autocomplete      | `string`                                      | Input `autocomplete` attribute.                    |             |
| inputmode         | `string`                                      | Input `inputmode` attribute.                       |             |
| color             | `string`                                      | Foreground color override (`--kit-textfield-fg`).  |             |
| background        | `string`                                      | Background color override (`--kit-textfield-bg`).  |             |
| prepend           | `Snippet`                                     | Content outside the field, before it.              |             |
| append            | `Snippet`                                     | Content outside the field, after it.               |             |
| prependInner      | `Snippet`                                     | Content inside the field border, before the input. |             |
| appendInner       | `Snippet`                                     | Content inside the field border, after the input.  |             |

`kit:textfield` works great with Form validation and can be enhanced with [Icons](/docs/components/icon) and [Buttons](/docs/components/button) using snippets.
