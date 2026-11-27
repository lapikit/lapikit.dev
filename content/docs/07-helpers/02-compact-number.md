---
title: 'compactNumber: Format large numbers'
category: 'Helpers'
head:
  title: 'compactNumber'
  description: 'Format numbers in Svelte with compactNumber using k, M, B and T suffixes. Keep counters short with consistent formatting on the server and client.'
keywords:
  - 'number format'
  - 'compact notation'
  - 'abbreviate'
  - 'helper'
navigation:
  label: 'compactNumber'
  description: 'Formats a number in compact notation with a k, M, B or T suffix.'
  symbol: '1k'
  preview:
    from: '1200'
    to: '1.2k'
---

`compactNumber` is a helper from `lapikit/helpers` that converts numeric values into compact notation using the suffixes **k**, **M**, **B**, and **T**.
It provides a shorter, more readable representation of numbers when the order of magnitude matters more than the exact value, particularly in interfaces with limited space.

```js
import { compactNumber } from 'lapikit/helpers';

compactNumber(1234); // '1.2k'
compactNumber(2500000); // '2.5M'
```

## Why compact number formatting?

Displaying numbers is easy. Finding enough space to display them is sometimes another story.
A download counter can start at 100, grow to 10,000, and eventually reach several million. The value changes, but the space available in the interface doesn't necessarily follow.

The idea behind `compactNumber` is to keep numeric values readable without letting their length dictate the layout.
Rather than repeating formatting logic across components, Lapikit provides a dedicated helper with consistent rounding rules, predictable suffixes, and a fixed output format.

The goal it's to provide a solution for the counters and metrics you encounter when building interfaces.

## How to use compactNumber?

Use `compactNumber` whenever the exact numeric value is less important than its order of magnitude.

Common use cases include:

- GitHub stars and repository statistics.
- NPM package download counters.
- Social media followers and interactions.
- Page views and analytics metrics.
- Dashboard indicators and compact UI components.

For example, you can display a download counter directly inside a Svelte component:

```svelte
<script>
	import { compactNumber } from 'lapikit/helpers';

	let { downloads } = $props();
</script>

<kit:chip>{compactNumber(downloads)} downloads</kit:chip>
```

The original numeric value remains unchanged. Only its displayed representation is formatted.

## Adapt formatting rules

`compactNumber` follows a consistent set of rules when converting numbers into short notation.

### Number suffixes

The helper uses four unit suffixes to represent large numbers.

| Unit     | Value             | Suffix | Example |
| -------- | ----------------- | ------ | ------- |
| Thousand | 1,00              | k      | 1k      |
| Million  | 1,000,000         | M      | 1M      |
| Billion  | 1,000,000,000     | B      | 1B      |
| Trillion | 1,000,000,000,000 | T      | 1T      |

Values below 1,000 are displayed without a suffix. Values above one trillion continue to use **T**.

```js
compactNumber(999); // '999'
compactNumber(1000); // '1k'
compactNumber(1e15); // '1000T'
```

### Decimal precision and rounding

Numbers are formatted with at most one decimal place. Trailing zeros are removed to keep the output short.

When rounding reaches the next unit, the suffix is updated accordingly.

```js
compactNumber(1500); // '1.5k'
compactNumber(1000); // '1k'
compactNumber(999999); // '1M'
```

This avoids representations such as **1.0k** or **1000k**.

### Negative numbers and special values

Negative numbers retain their sign, while negative zero is displayed as **0**.

The helper also handles infinity and optional values.

```js
compactNumber(-23456); // '-23.5k'
compactNumber(-0); // '0'
compactNumber(Infinity); // '∞'
compactNumber(null); // undefined
compactNumber(undefined); // undefined
```

## Input and output examples

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

## API References

| parameter | type                          | description          | default |
| --------- | ----------------------------- | -------------------- | ------- |
| value     | `number \| null \| undefined` | The number to format |         |

Returns the formatted number as a string, or `undefined` when the input is `null` or `undefined`.

## Anymore Lapikit helpers

`compactNumber` is part of the Lapikit helpers collection, a set of reusable utility functions designed to handle common formatting tasks when building Svelte interfaces.

Like other Lapikit helpers, it works on both the server and the client without depending on a component or its lifecycle.

Need to format a label or a title? Explore `upperFirst`, a helper that capitalizes the first character of a string without changing the rest.
