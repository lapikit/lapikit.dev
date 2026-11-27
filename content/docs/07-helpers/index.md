---
title: 'The Helpers Lapikit for Svelte'
category: 'Helpers'
head:
  title: 'Helpers'
  description: 'Small, typed utility functions from Lapikit to format strings and numbers in your Svelte apps, with safe handling of null and undefined values.'
keywords:
  - 'helpers'
  - 'utilities'
  - 'format'
  - 'functions'
navigation:
  label: 'All helpers'
---

Lapikit helpers are small, reusable JavaScript functions designed to simplify everyday development tasks, from formatting strings to displaying numbers in a compact notation.

They are pure, dependency-free functions that work both on the server and in the browser, without relying on Svelte or its component lifecycle.

```js
import { upperFirst, compactNumber } from 'lapikit/helpers';
```

Import what you need, wherever you need it.

## Find all available Helpers

```component
summary-section key="Helpers"
```

## The idea behind Lapikit Helpers

Not everything you build for an interface needs to be a component.

When developing interfaces, some tasks keep coming back. Formatting a string, shortening a number, or handling an optional value before displaying it.

These operations are simple enough to write yourself, but they often end up scattered across different components, utility files, and projects.

That's the idea behind the Lapikit team approach to helpers: bring these recurring functions together and make them available beyond the components they were originally designed to support.

Rather than building an extensive utility library, the goal is to provide focused functions that solve specific, everyday development problems.

## Why use Lapikit Helpers?

Helpers follow the same logic as Lapikit components: reusable building blocks designed to solve specific development needs.

- **Reusable formatting**: keep formatting logic separate from your Svelte components.
- **Pure functions**: format values without modifying the original data or introducing side effects.
- **Zero dependencies**: use helpers without additional runtime dependencies.
- **Server and client**: reuse the same functions in both environments.
- **Optional values**: pass `null` or `undefined` and get `undefined` back without adding a separate guard.

Helpers are not tied to a specific Lapikit component. You can use them throughout your Svelte or SvelteKit project, wherever their formatting behavior fits your needs.

If you already use a version of Lapikit that includes helpers, there is no additional package to install.

## Getting started with Lapikit Helpers

Import the functions directly from `lapikit/helpers`:

```js
import { upperFirst, compactNumber } from 'lapikit/helpers';
```

There is no additional configuration or component to initialize.

Explore the individual helper documentation for usage examples, formatting rules, and references

## The idea behind Lapikit Helpers

Not everything you need to build a Svelte interface needs to be a component.

Components take care of how information is displayed, but there is also the question of how that information is formatted.

A status displayed inside a chip might need a capital letter. A download counter might need a shorter notation. A value coming from an API might be missing.
These are small operations that often come up when building different components.

The idea behind the approach to helpers is to bring these recurring operations together in a collection of focused, reusable functions.

Rather than including formatting logic directly inside each component, helpers make it available wherever it is needed.

Each helper has a specific purpose and remains independent of the Svelte component lifecycle.
