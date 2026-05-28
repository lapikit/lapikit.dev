---
title: "introduction"
description: "Learn why Lapikit was created: a component library designed by front-end developers for projects built with Svelte."
keywords:
  - "why lapikit"
  - "acknowledgements"
  - "discover"
  - "lapikit"
---

<script>
	import LazyRepl from '$components/lazy-repl.svelte';

  // examples
  import IntroductionLapikit from '$examples/started/introduction-lapikit.svelte';
</script>

# More about Lapikit Svelte Library

## What is Lapikit?

Lapikit is a mix of the French word lapin (rabbit), lapis lazuli - a deep blue stone - and the word kit, referring to a development toolkit.

It is a Svelte component library focused on developer experience, simple integration, and full component customization.

The goal is straightforward: help developers build accessible and performant interfaces without sacrificing flexibility.

The Lapinausore was conceived as a cross between a rabbit and a dragon.

Wondering why? Because it combines two concepts: the calmness, rapid growth, and ingenuity of a rabbit, and the strength, endurance, and power often associated with dragons.

All of this combined makes our Lapinausore an excellent tool for work that is simple in appearance but powerful in reality.

Want to learn more? Here's a quick example of how to use Lapikit

<LazyRepl title="lapikit.svelte" lang="svelte" content={() => import('$examples/started/introduction-lapikit.svelte?raw')}>
</LazyRepl>

**Result**

<LazyRepl title="lapikit.svelte" lang="svelte">
<IntroductionLapikit/>
</LazyRepl>

This example shows how to configure the Lapikit preprocessor, which allows you to use the component library without having to import them manually. Imports are performed automatically and optimally during the compilation process.

### Prerequisites before getting started with Lapikit

If you're already familiar with Svelte and want to develop projects faster or simply avoid constantly rewriting the same code, you've come to the right place.

Lapikit is designed for developers who already have a solid grasp of the basics of HTML, CSS, and JavaScript and are looking for an easier way to build user interfaces with Svelte and SvelteKit.

Whether you’re just starting out with Svelte or are already comfortable with the language, the goal remains the same: to ensure a clear, accessible workflow that’s easy to integrate into your projects.

The documentation is designed to be simple and practical to use, but if certain points seem unclear or are holding you back, that’s perfectly normal. Lapikit is still evolving, and your feedback is always welcome.

Start slowly, experiment, break things, and rebuild them. And once you feel comfortable, explore the rest of the Svelte ecosystem alongside Lapikit.

## A more natural and intuitive way to build interfaces with Svelte

Lapikit is designed to let you focus on the complex features of your project. This library allows you to concentrate on what matters most and eliminates the constraints of maintaining your own component library.

Each component has been developed with Svelte and TypeScript with this in mind:

- To provide stable, simple, and diverse APIs.
- Carefully selected [default settings](/docs/customize) that work right out of the box.
- Full support for Svelte features, from actions to transitions to snippets, and much more.
- All customizable: Lapikit is built with a default style that you can customize to your liking.

A theme manager and utility functions round out Lapikit, making it easy to apply your design system to all components.

### Simplify your workflow with HTML-style props

Lapikit keeps the styling experience close to native Svelte and HTML behavior. You can manage conditional classes and inline styles directly on components without adding extra wrappers or custom logic.

Svelte natively supports directives like `class_{property}={condition}` and `style_{property}={value}` on HTML elements, not directly on custom components.

This often results in repetitive code or extra styling work during development.

Lapikit solves this problem by providing built-in styling properties for each component, designed to work similar to Svelte native directives.

- **`s-class`** - conditionally apply classes, just like `class:{property}={condition}`:

<LazyRepl title="lapikit.svelte" lang="svelte" content={() => import('$examples/started/s-class-preprocessor.svelte?raw')}>
</LazyRepl>

- **`s-style`** - conditionally apply inline styles, just like `style:{property}={value}`:

<LazyRepl title="lapikit.svelte" lang="svelte" content={() => import('$examples/started/s-style-preprocessor.svelte?raw')}>
</LazyRepl>

Both props also accept a plain `string` or `string[]` when no conditions are needed.

### Minimal dependencies and lightweight architecture

Lapikit is designed to remain lightweight and fast.

Styles, components, stores, and hooks are managed within the project to ensure the consistency of the ecosystem and to make it easier to evolve, for both you and me.

This approach allows us to:

- Reduce setup overhead
- Improve stability
- Simplify integration into existing projects
- Avoid unnecessary layers
- Limit package size

Keeping the code lean also means faster iterations.

Since Lapikit controls its own components, styles, and tools, updates can be deployed without waiting for third-party libraries to update or introduce incompatible changes.

## Follow the Lapikit community

Lapikit is an open-source component library for Svelte and SvelteKit, developed and maintained by [Nycolaide](https://nycolaide.dev).

Inspired by Material Design v3, the project focuses on the developer experience, accessibility, a lightweight design, and flexible customization for front-end applications.
The documentation is written and updated by Nycolaide and [Simone](https://www.linkedin.com/in/simone-de-sousa-fernandes/), with the goal of making it simple, practical, and accessible to both novice and experienced Svelte developers.

Lapikit continues to evolve thanks to community feedback, its use in real-world projects, and ongoing improvements to components, hooks, stores, themes, and future development tools.

Contributions, tickets, and feedback play an important role in the project’s growth.

Whether you want to report a bug, improve the documentation, suggest a feature, or contribute to the code, every contribution helps improve the environment around Lapikit.
Have you got a problem? Open a ticket on [GitHub](https://github.com/lapikit/lapikit/issues).
Do you have an idea for a feature? [Propose it and we'll work it out together](https://github.com/lapikit/lapikit/discussions).

## Acknowledgements

Lapikit wouldn't exist without the work of Svelte and the people who develop tools around it.

- Thank you to [Rich Harris](https://github.com/rich-harris) and the [Svelte](https://svelte.dev/) community for advancing frontend development and making it even more accessible than before.
- Thank you to [Evan You](https://github.com/yyx990803) and the [Vite.js](https://vite.dev/) environment for making frontend tools faster and simpler.

Lapikit draws on the ideas, tools, and discussions I’ve had with frontend developers

Once you’ve gone through the introduction, you can move on to the [quick start guide](/docs/getting-started) to **install and configure Lapikit** in your Svelte or SvelteKit project.
