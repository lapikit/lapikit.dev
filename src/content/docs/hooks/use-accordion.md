---
title: "useAccordion"
description: "Discover the UseAccordion hook from Lapikit: manage expandable sections in Svelte easily, keep state synchronized, and avoid prop drilling or manual event handling."
---

<script>
	import LazyRepl from '$components/lazy-repl.svelte';

	import Multiple from '$examples/components/accordion/multiple.svelte';
</script>

# Learn how to create an accordion

`useAccordion` is a state hook from `lapikit/actions` that manages the open/close state of a [`kit:accordion`](/docs/components/accordion). It returns a reactive `values` array and a `toggle` function to wire up to your accordion items.

```js
import { useAccordion } from 'lapikit/actions';

const accordion = useAccordion();
```

## Guide and overview

`kit:accordion` is a controlled component - it has no internal state. `useAccordion` is the companion hook that handles it. It exposes:

- `values` - a reactive array of currently open indices (`string | number`)
- `toggle(id)` - opens the item if closed, closes it if already open

Pass `accordion.values.includes(index)` to each item's `open` prop, and `accordion.toggle` to its `toggle` prop.

> You can use any reactive state instead of `useAccordion`, it's just a convenience. What matters is passing `open` and `toggle` to each `kit:accordion-item`.

## Configure useAccordion options

| option   | type      | description                                     | default |
| -------- | --------- | ----------------------------------------------- | ------- |
| multiple | `boolean` | Allows more than one item to be open at a time. | `false` |
| readOnly | `boolean` | Disables all toggling.                          | `false` |

## Returned values and methods

| value  | type                             | description                          |
| ------ | -------------------------------- | ------------------------------------ |
| values | `(string \| number)[]`           | Array of currently open item indices |
| toggle | `(id: string \| number) => void` | Opens or closes an item by its index |

## Usage example: multiple accordion mode

<LazyRepl title="accordion.svelte" lang="svelte" content={() => import('$examples/components/accordion/multiple.svelte?raw')}>
<Multiple/>
</LazyRepl>

## When to use useAccordion?

`useAccordion` is designed to manage the shared state of accordions across multiple components in Svelte applications.

It centralizes the logic used to:

- Open and close accordion elements
- Synchronize active states
- Handle one or more expanded sections
- And ensure predictable interactions between components

This hook is particularly useful when creating:

- Collapsible navigation menus
- FAQ sections
- Expandable layouts
- Settings panels
- Or reusable interfaces based on accordions.

By moving state management out of individual components, useAccordion simplifies and streamlines the maintenance of interactions in Svelte and SvelteKit projects.

It works with Lapikit Accordion components and follows the same reactive patterns as the rest of the library.

For the full list of props, snippets, and usage examples, see the [`kit:accordion` component page](/docs/components/accordion) component page.
