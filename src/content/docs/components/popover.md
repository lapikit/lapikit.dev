---
title: 'Popover component'
category: 'Components'
head:
  title: 'Popover'
  description: 'Show contextual information on click or hover. Ideal for enhancing your buttons, links or interactive elements.'
layout: 'doc_page'
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import Preview from '$examples/components/popover/preview.svelte';
	import Position from '$examples/components/popover/position.svelte';

	import previewCode from '$examples/components/popover/preview.svelte?raw';
	import positionCode from '$examples/components/popover/position.svelte?raw';
</script>

The `kit:popover` component displays contextual content above an activator. It is useful for providing additional information, options or secondary actions without overloading the main interface.

Popovers open dynamically from an activator and can be positioned in several directions: _top_, bottom, left or right. It is bindable and customizable in terms of theme, density, color, etc.

<LazyRepl title="popover.svelte" presentation lang="svelte" content={previewCode}>
<Preview/>
</LazyRepl>

`kit:popover` renders the `activator` snippet inline and the panel in a fixed-position `<div>` when open. The panel position is computed from the activator's bounding rect and updates on scroll and resize. Scrolling the page while a popover is open closes it automatically.

The `activator` snippet receives one argument:

```ts
activator(model: ModelPopoverProps)
```

- **model.toggle**: `(element: HTMLElement) => void`

## Examples of popover

### position

- **position**: `'top' | 'bottom' | 'left' | 'right'` = `'bottom'`

<LazyRepl title="popover.svelte" lang="svelte" content={positionCode}>
<Position/>
</LazyRepl>

> The popover is displayed in the top layer of the page (Popover API): it is never cut by an `overflow: hidden` parent nor hidden behind a modal. It follows its activator when the page or a parent scrolls, flips to the opposite side when there is not enough space, and stays in the viewport.

### Without preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, import the components directly:

<LazyRepl lang="js" content={"import { Popover } from 'lapikit/components';"} />

## API Reference

**`kit:popover`**

| props          | type                                                               | description                                                               | default     |
| -------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------- | ----------- |
| ref $bindable  | `HTMLElement`                                                      | Bindable reference to the rendered DOM element.                           | `null`      |
| class          | `string \| array \| object`                                        | Classes of the popover, with the rules of Svelte (clsx).                  |             |
| style          | `string`                                                           | Inline style of the popover.                                              |             |
| s-class        | `string \| array \| object`                                        | Classes of the popover, merged with `class`.                              |             |
| s-style        | `object`                                                           | Inline style as an object of property / value pairs.                      |             |
| open $bindable | `boolean`                                                          | Controls visibility. Bindable.                                            | `false`     |
| position       | `'top' \| 'bottom' \| 'left' \| 'right'`                           | Preferred position relative to the activator.                             | `'bottom'`  |
| rounded        | `0 \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`              | Border radius.                                                            | `'md'`      |
| color          | `string \| false \| { base?, active? }`                            | Background color, the text follows its `on-` color or a contrasted color. |             |
| activator      | `Snippet<[model]>`                                                 | Trigger element. Receives model with `toggle`.                            |             |
| children       | `Snippet`                                                          | Floating panel content.                                                   |             |
| elevation      | `'0' \| '1' \| '2' \| '3' \| '4' \| '5' \| ElevationState`         | Add shadow effect.                                                        | `'2'`       |
| density        | `'dense' \| 'compact' \| 'default' \| 'comfortable' \| 'spacious'` | Padding, from `-4px` to `+4px`.                                           | `'default'` |

**ModelPopoverProps**

The `ModelPopoverProps` interface provides the properties passed to the activator slot. It allows you to access the Popover's current state (open), manipulate it dynamically (state) and retrieve the trigger element or linked event (element).

You can use it to create fully customized activators that finely control Popover opening/closing.

| props  | type                             | description                                                                                                                                                   |
| ------ | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| open   | `boolean`                        | Whether the popover is currently open.                                                                                                                        |
| toggle | `(element: HTMLElement) => void` | Function to toggle the popover visibility. Call it with the trigger element to open/close the popover. The element is used for positioning the popover panel. |

`kit:popover` are the ideal complement to [Dialogs](/docs/components/dialog) or [Buttons](/docs/components/button) in modern interfaces.
