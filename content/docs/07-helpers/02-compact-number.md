---
title: 'compactNumber: Format numbers in a short notation'
category: 'Helpers'
head:
  title: 'compactNumber'
  description: 'The compactNumber helper from Lapikit formats a number in compact notation with a unit suffix: 1234 becomes 1.2k and 2500000 becomes 2.5M.'
keywords:
  - 'number format'
  - 'compact notation'
  - 'abbreviate'
  - 'helper'
navigation:
  label: 'compactNumber'
  description: 'Formats a number in compact notation with a k, M, B or T suffix'
---

`compactNumber` is a helper from `lapikit/helpers` that formats a number in compact notation with a unit suffix, to keep counters short in tight spaces.

```js
import { compactNumber } from 'lapikit/helpers';

compactNumber(1234); // '1.2k'
compactNumber(2500000); // '2.5M'
```

> Available in the insiders release: `npm install -D lapikit@insiders`.

## Guide and overview

Use `compactNumber` for stars, downloads, followers or views: anywhere the order of magnitude matters more than the exact value.

```svelte
<script>
	import { compactNumber } from 'lapikit/helpers';

	let { downloads } = $props();
</script>

<kit:chip>{compactNumber(downloads)} downloads</kit:chip>
```

The output follows these rules:

- Numbers below 1000 are kept as they are: `999` → `'999'`.
- The suffixes are `k` (lowercase), `M`, `B` and `T`. Above one trillion, the value stays in `T`: `1e15` → `'1000T'`.
- One decimal at most, trailing zeros dropped: `1500` → `'1.5k'`, `1000` → `'1k'`.
- Rounding moves to the next unit, so you never get `'1000k'`: `999999` → `'1M'`.
- Negative numbers keep their sign, and `-0` is shown as `'0'`.

| input        | output      |
| ------------ | ----------- |
| `54`         | `'54'`      |
| `12.34`      | `'12.3'`    |
| `1049`       | `'1k'`      |
| `23456`      | `'23.5k'`   |
| `149999`     | `'150k'`    |
| `1234567`    | `'1.2M'`    |
| `2500000000` | `'2.5B'`    |
| `-23456`     | `'-23.5k'`  |
| `Infinity`   | `'∞'`       |
| `null`       | `undefined` |

The format is always English (`1.5k`, not `1,5 k`), whatever the language of the browser, so the server and the client render the same string.

## API References

| parameter | type                          | description          | default |
| --------- | ----------------------------- | -------------------- | ------- |
| value     | `number \| null \| undefined` | The number to format |         |

Returns a `string`, or `undefined` when `value` is `null` or `undefined`.
