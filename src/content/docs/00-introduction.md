---
title: 'introduction'
keywords:
  - 'why lapikit'
  - 'acknowledgements'
  - 'discover'
  - 'lapikit'
---

<script>
	import LazyDemo from '$lib/components/lazy-demo.svelte';
</script>

## What is Lapikit?

Lapikit is a blend of the French word for rabbit (_lapin_), lapis lazuli — a precious blue stone — and the word _kit_, referring to a development toolkit. It's a Svelte component library focused on developer experience, ease of integration, and full customization of every component. Use it to build accessible, high-performance user interfaces without compromising on flexibility or performance.

Here is a minimal example:

```svelte
<kit:btn onclick={() => counter++}>Count is: {counter}</kit:btn>
```

**Result**

<LazyDemo loader={() => import('../../content/examples/introduction-demo.svelte')} />

This example showcases one of Lapikit's core features.

### Prerequisites

The rest of this documentation assumes you have a basic understanding of HTML, CSS, and JavaScript. A basic knowledge of Svelte is also recommended — while we aim to make the documentation as accessible as possible, going through it without any Svelte experience may make some concepts harder to follow.

## Natural and Intuitive Library

Lapikit is designed to let you focus on the complex features of your project rather than fighting your component library. Every component has been built with this in mind:

- Built with Svelte and TypeScript
- Stable, simple, and varied APIs
- Sensible defaults that work out of the box
- Full support for Svelte features (actions, transitions, snippets, etc.)

Each component ships with a default style and can be fully customized. A theme manager and utility functions round out Lapikit, making it easy to apply your design system across all components.

### HTML-like Styling Props

Svelte natively offers `class:name={condition}` and `style:property={value}` directives on HTML elements — but not on components. Lapikit bridges that gap by pre-integrating two equivalent props on every component:

- **`s-class`** — conditionally apply classes, just like `class:name={condition}`:

```svelte
<!-- Native Svelte on HTML elements -->
<div class:active={isActive} class:hidden={!visible}>...</div>

<!-- Lapikit equivalent on components -->
<kit:btn s-class={{ active: isActive, hidden: !visible }}>...</kit:btn>
```

- **`s-style`** — conditionally apply inline styles, just like `style:property={value}`:

```svelte
<!-- Native Svelte on HTML elements -->
<div style:color={brandColor} style:font-size="1rem">...</div>

<!-- Lapikit equivalent on components -->
<kit:btn s-style={{ color: brandColor, 'font-size': '1rem' }}>...</kit:btn>
```

Both props also accept a plain `string` or `string[]` when no conditions are needed.

### Minimal Dependencies

Lapikit is built to be lightweight and fast, with as few dependencies as possible. We deliberately avoid external dependencies for core functionality — this keeps Lapikit quick to install, easy to integrate into any Svelte project, and free from third-party compatibility issues.

Staying lean also means we move fast. We control the styles, components, and plugins, which ensures long-term stability and lets us ship improvements without being blocked by upstream changes.

## Community

Lapikit is developed and maintained by Nycolaide, inspired by Material Design v3. Documentation is written by Nycolaide and Simone De Sousa Fernandes. Contributions, issues, and feedback are always welcome and play an important role in the project's growth.

Got a problem? Open an [issue on GitHub](https://github.com/lapikit/lapikit/issues). Got a feature idea? [Propose it and we'll work it out together](https://github.com/lapikit/lapikit/discussions).

## Acknowledgements

Lapikit wouldn't exist without:

- [Rich Harris](https://github.com/rich-harris) and the [Svelte](https://svelte.dev/) community.
- [Evan You](https://github.com/yyx990803) for the existence of [Vite.js](https://vite.dev/).

Once you've skimmed the introduction, dive into setting up Lapikit via the [Getting Started](/docs/getting-started) page.
