---
title: 'upperFirst: Capitalize the first letter of a string'
category: 'Helpers'
head:
  title: 'upperFirst'
  description: 'Capitalize the first character of a string in Svelte with upperFirst. Preserve the remaining characters and handle Unicode, null and undefined values.'
keywords:
  - 'capitalize'
  - 'uppercase'
  - 'string'
  - 'helper'
navigation:
  label: 'upperFirst'
  description: 'Uppercases the first character of a string and keeps the rest as is.'
  symbol: 'Aa'
  preview:
    from: 'hello'
    to: 'Hello'
---

`upperFirst` is a helper from `lapikit/helpers` that converts the first character of a string to uppercase while leaving the rest unchanged.

It's designed to format labels, titles, status values and other text displayed in on content without changing how the original value is stored.

```js
import { upperFirst } from 'lapikit/helpers';

upperFirst('hello world'); // 'Hello world'
```

## How upperFirst works

### Capitalize only the first character

Only the first character is converted to uppercase. The remaining characters are left unchanged, regardless of their original casing.

```svelte
<script>
	import { upperFirst } from 'lapikit/helpers';

	let { status = 'pending' } = $props();
</script>

<kit:chip>{upperFirst(status)}</kit:chip>
```

Use `upperFirst` to display a value as a label or a title without changing how it is stored: a status, a category name, a value typed by the user.

```svelte
<script>
	import { upperFirst } from 'lapikit/helpers';

	let { status = 'pending' } = $props();
</script>

<kit:chip>{upperFirst(status)}</kit:chip>
```

The helper does not convert the remaining characters to lowercase or capitalize each word.

### Unicode character support

The first character is read as a full Unicode code point.

This allows `upperFirst` to handle accented letters and characters outside the Basic Multilingual Plane without splitting them into separate UTF-16 code units.

```js
upperFirst('éléphant'); // 'Éléphant'
```

Emojis are also preserved without being split during the transformation.

### Leading spaces, digits and symbols

`upperFirst` operates on the first character of the string, not the first letter it encounters.

If a string starts with a space, a digit or a symbol without an uppercase equivalent, it is returned unchanged.

```js
upperFirst(' hello'); // ' hello'

upperFirst('123abc'); // '123abc'
```

The helper does not remove leading spaces or search for the next alphabetical character.

### Empty strings and optional values

When working with component props or values returned by an API, a string may be empty or unavailable.

`upperFirst` preserves empty strings and returns `undefined` when the input is `null` or `undefined`.

```js
upperFirst(''); // ''

upperFirst(null); // undefined

upperFirst(undefined); // undefined
``

This allows optional values to be passed directly to the helper without adding a separate guard.

## Input and output examples

| input        | output       |
| ------------ | ------------ |
| `'hello'`    | `'Hello'`    |
| `'hELLO'`    | `'HELLO'`    |
| `'éléphant'` | `'Éléphant'` |
| `' hello'`   | `' hello'`   |
| `'123abc'`   | `'123abc'`   |
| `''`         | `''`         |
| `null`       | `undefined`  |
| `undefined`  | `undefined`  |

The first character is read as a full Unicode code point, so characters outside the basic plane and emojis are never split in two. A string that starts with a space, a digit or a symbol is returned as is.

## API References

The parameters required by the reference API

| parameter | type                          | description             | default |
| --------- | ----------------------------- | ----------------------- | ------- |
| value     | `string \| null \| undefined` | The string to transform |         |

Returns the string with its first character converted to uppercase, or `undefined` when the input is `null` or `undefined`.
```
