---
title: 'upperFirst: Capitalize the first letter of a string'
category: 'Helpers'
head:
  title: 'upperFirst'
  description: 'The upperFirst helper from Lapikit uppercases the first character of a string and leaves the rest unchanged, accents and emojis included.'
keywords:
  - 'capitalize'
  - 'uppercase'
  - 'string'
  - 'helper'
navigation:
  label: 'upperFirst'
  description: 'Uppercases the first character of a string and keeps the rest as is.'
  symbol: 'Aa'
---

`upperFirst` is a helper from `lapikit/helpers` that uppercases the first character of a string. The rest of the string is left unchanged.

```js
import { upperFirst } from 'lapikit/helpers';

upperFirst('hello world'); // 'Hello world'
```

> Available in the insiders release: `npm install -D lapikit@insiders`.

## Guide and overview

Use `upperFirst` to display a value as a label or a title without changing how it is stored: a status, a category name, a value typed by the user.

```svelte
<script>
	import { upperFirst } from 'lapikit/helpers';

	let { status = 'pending' } = $props();
</script>

<kit:chip>{upperFirst(status)}</kit:chip>
```

Only the first character changes, unlike the CSS `text-transform: capitalize` which uppercases the first letter of every word:

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

| parameter | type                          | description             | default |
| --------- | ----------------------------- | ----------------------- | ------- |
| value     | `string \| null \| undefined` | The string to transform |         |

Returns a `string`, or `undefined` when `value` is `null` or `undefined`.
