---
title: "useAccordion"
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Multiple from '../../../../content/examples/components/accordion/multiple.svelte';
</script>

# useAccordion

`useAccordion` is a state hook from `lapikit/actions` that manages the open/close state of a [`kit:accordion`](/docs/components/accordion). It returns a reactive `values` array and a `toggle` function to wire up to your accordion items.

```js
import { useAccordion } from 'lapikit/actions';

const accordion = useAccordion();
```

## Guide

`kit:accordion` is a controlled component - it has no internal state. `useAccordion` is the companion hook that handles it. It exposes:

- `values` - a reactive array of currently open indices (`string | number`)
- `toggle(id)` - opens the item if closed, closes it if already open

Pass `accordion.values.includes(index)` to each item's `open` prop, and `accordion.toggle` to its `toggle` prop.

> You can use any reactive state instead of `useAccordion`, it's just a convenience. What matters is passing `open` and `toggle` to each `kit:accordion-item`.

## Options

| option   | type      | description                                     | default |
| -------- | --------- | ----------------------------------------------- | ------- |
| multiple | `boolean` | Allows more than one item to be open at a time. | `false` |
| readOnly | `boolean` | Disables all toggling.                          | `false` |

## Return

| value  | type                             | description                          |
| ------ | -------------------------------- | ------------------------------------ |
| values | `(string \| number)[]`           | Array of currently open item indices |
| toggle | `(id: string \| number) => void` | Opens or closes an item by its index |

## Example

### Multiple mode

<LazyRepl title="accordion.svelte" lang="svelte" content={() => import('../../../../content/examples/components/accordion/multiple.svelte?raw')}>
<Multiple/>
</LazyRepl>

For the full list of props, snippets, and usage examples, see the [`kit:accordion` component page](/docs/components/accordion).
