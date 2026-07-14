---
title: 'Accordion'
description: 'Display expandable content in a seamless interface. The Lapikit accordion component is lightweight, accessible, and customizable.'
---

<script>
	import LazyRepl from '$components/lazy-repl.svelte';

	import Preview from '$examples/components/accordion/preview.svelte';
	import Spacer from '$examples/components/accordion/spacer.svelte';
	import Basic from '$examples/components/accordion/basic.svelte';
	import Multiple from '$examples/components/accordion/multiple.svelte';
	import ReadOnly from '$examples/components/accordion/read-only.svelte';
	import HideIcon from '$examples/components/accordion/hide-icon.svelte';
	import Activator from '$examples/components/accordion/activator.svelte';
    import Indicator from '$examples/components/accordion/indicator.svelte';
</script>

# Accordion component

An `kit:accordion` lets you group content into collapsible sections. It improves legibility and saves space in an interface, while offering precise control over the display of information. It is composed of two parts: `kit:accordion` as the container and `kit:accordion-item` for each collapsible entry.

**Role of the Accordion component**

- Manages the layout and shared visual configuration of all items
- Delegates open/close state to an external `useAccordion` hook
- Renders accessible trigger buttons with `aria-expanded`
- Supports single or multiple open items depending on the hook configuration

<LazyRepl title="accordion.svelte" presentation lang="svelte" content={() => import('$examples/components/accordion/preview.svelte?raw')}>
<Preview/>
</LazyRepl>

`kit:accordion` is a controlled component: it has no internal state. You manage open/close externally and pass two props to each item - `open` (boolean) and `toggle` (function called with the item's `index` on click).

The recommended way is the [`useAccordion`](/docs/hooks/use-accordion) hook from `lapikit/actions`, which handles the reactive state for you.

Each `kit:accordion-item` requires a unique `index` (string or number).

> `kit:accordion-item` does nothing without a `toggle` function - state is always external.

## Examples of accordion

### Spacer

The `spacer` prop adds a gap between items, useful when items have a `rounded` radius and need visual separation.

- **spacer**: `boolean` = `false`

<LazyRepl title="accordion.svelte" lang="svelte" content={() => import('$examples/components/accordion/spacer.svelte?raw')}>
<Spacer/>
</LazyRepl>

### Multiple items open

Pass `{ multiple: true }` to [`useAccordion`](/docs/hooks/use-accordion) to allow several items to be expanded at the same time.

- **multiple**: `boolean` = `false`

<LazyRepl title="accordion.svelte" lang="svelte" content={() => import('$examples/components/accordion/multiple.svelte?raw')}>
<Multiple/>
</LazyRepl>

### readOnly and disabled

`readOnly` locks an item in its current state without applying disabled styling. `disabled` prevents interaction and visually dims the item.

- **readOnly**: `boolean` = `false`
- **disabled**: `boolean` = `false`

<LazyRepl title="accordion.svelte" lang="svelte" content={() => import('$examples/components/accordion/read-only.svelte?raw')}>
<ReadOnly/>
</LazyRepl>

### hideIcon

The `hideIcon` prop on `kit:accordion` hides the chevron indicator on all child items via a CSS rule on the container.

- **hideIcon**: `boolean` = `false`

<LazyRepl title="accordion.svelte" lang="svelte" content={() => import('$examples/components/accordion/hide-icon.svelte?raw')}>
<HideIcon/>
</LazyRepl>

### activator snippet

Use the `activator` snippet to fully customize the trigger content - replaces the `text` prop. It receives no arguments.

- **activator**: `Snippet | undefined` = `undefined`

<LazyRepl title="accordion.svelte" lang="svelte" content={() => import('$examples/components/accordion/activator.svelte?raw')}>
<Activator/>
</LazyRepl>

### indicator snippet

Use the `indicator` snippet to replace the default chevron with a custom element. It receives `{ open: boolean }` so you can adapt the rendering to the item's state.

- **indicator**: `Snippet<[{ open: boolean }]> | undefined` = `undefined`

<LazyRepl title="accordion.svelte" lang="svelte" content={() => import('$examples/components/accordion/indicator.svelte?raw')}>
<Indicator/>
</LazyRepl>

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the components directly:

<LazyRepl lang="js" content={"import { Accordion, AccordionItem } from 'lapikit/components';\nimport { useAccordion } from 'lapikit/actions';"} />

## API References

**`kit:accordion`**

| props         | type                                                  | description                                            | default     |
| ------------- | ----------------------------------------------------- | ------------------------------------------------------ | ----------- |
| ref $bindable | `HTMLElement`                                         | Bindable reference to the rendered DOM element.        | `null`      |
| is            | `div`                                                 | Defines the HTML tag used as the root element.         | `'div'`     |
| s-class       | `'string' \| 'array' \| 'object'`                     | Sets className on accordion                            |             |
| s-style       | `'string' \| 'array' \| 'object'`                     | Sets styles on accordion                               |             |
| spacer        | `boolean`                                             | Adds a gap between items.                              |             |
| hideIcon      | `boolean`                                             | Hides the indicator icon on all child items.           |             |
| rounded       | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | Border radius applied to all items.                    | `'md'`      |
| text          | `string`                                              | Applies a text color CSS variable.                     |             |
| density       | `'none' \| 'compact' \| 'default' \| 'comfortable'`   | Spacing inside accordion.                              | `'default'` |
| size          | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                | Sizing height, font and gap for accordion items.       | `'md'`      |
| variant       | `'filled' \| 'outline' \| 'text'`                     | Visual style of the accordion items.                   | `'filled'`  |
| color         | `string`                                              | Foreground color override (`--kit-accordion-item-fg`). |             |
| background    | `string`                                              | Background color override (`--kit-accordion-item-bg`). |             |
| children      | `Snippet`                                             | Accordion items to render.                             |             |

**`kit:accordion-item`**

| props         | type                                                       | description                                                      | default |
| ------------- | ---------------------------------------------------------- | ---------------------------------------------------------------- | ------- |
| ref $bindable | `HTMLElement`                                              | Bindable reference to the rendered DOM element.                  | `null`  |
| is            | `div`                                                      | Defines the HTML tag used as the root element.                   | `'div'` |
| s-class       | `'string' \| 'array' \| 'object'`                          | Sets className on accordion item                                 |         |
| s-style       | `'string' \| 'array' \| 'object'`                          | Sets styles on accordion item                                    |         |
| index         | `string \| number`                                         | Unique identifier for this item. **Required.**                   |         |
| open          | `boolean`                                                  | Whether the item is expanded.                                    | `false` |
| toggle        | `(index: string \| number) => void`                        | Called when the trigger is clicked. Receives the item's `index`. |         |
| text          | `string`                                                   | Label displayed in the trigger button.                           |         |
| activator     | `Snippet`                                                  | Custom trigger content - replaces `text`.                        |         |
| indicator     | `Snippet<[{ open: boolean }]>`                             | Custom indicator - replaces the default chevron icon.            |         |
| disabled      | `boolean`                                                  | Prevents the item from being toggled.                            | `false` |
| readOnly      | `boolean`                                                  | Renders the item as non-interactive without disabled styling.    | `false` |
| color         | `string`                                                   | Foreground color override (`--kit-accordion-item-fg`).           |         |
| background    | `string`                                                   | Background color override (`--kit-accordion-item-bg`).           |         |
| children      | `Snippet`                                                  | Content revealed when the item is open.                          |         |
| elevation     | `'0' \| '1' \| '2' \| '3' \| '4' \| '5' \| ElevationState` | Add shadow effect                                                |         |

For the state hook API, see the dedicated [`useAccordion`](/docs/hooks/use-accordion) page and for complete your `kit:accordion` interface, consider the [Icon](/docs/components/icon) and [Chip](/docs/components/chip) components for dynamic content.
