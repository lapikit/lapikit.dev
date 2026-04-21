---
title: 'Application'
---

<script>
	import LazyDemo from '$lib/components/lazy-demo.svelte';
	import LazyRepl from '$lib/components/lazy-repl.svelte';
</script>

# Application component

Application

The `kit:app` component is an root layout for all component Lapikit. It acts as a global provider, initializing and centralizing everything Lapikit needs to function properly.

**Role of the App component**

- Provides and configures global blinds (design system, density, etc.)
- Manages the overlays stack (modals, menus, toasts…)
- Applies global CSS (theme, reset, normalize, etc.)
- Ensures proper contextual operation of Lapikit components

## Guide

In Lapikit, the `kit:app` component serves as the entry point for all Lapikit child components. It operates on the principle of inheritance and ensures a simple and, above all, comprehensive layout across all components. Effects (overlays, multi-modal, etc.) are managed exclusively by `kit:app` to ensure the correct positioning of each element in your window and to avoid potential conflicts during the creation of your application.

> The `kit:app` component cannot itself be a child of another `kit:app`

If you're using SvelteKit, you can rely on the layout system. Each main layout can have its own `kit:app` configuration. Lapikit supports multiple configurations as long as you clearly define a separate configuration with variables and styles specific to each one. In principle, incrementing `kit:app` won’t crash your project, but it can cause duplications and conflicts in styles and assets (overlays, multi-modals). If you’re comfortable with the risk, it’s up to you.

IMG (GOOD / GOOD MUTLI / NOT USE !)

## Usage

To get started or continue your project with Lapikit, define the entry point where Lapikit components will be used. The most common approach is to initialize them directly in your project's root `+layout.svelte` file.

DEMO INTEGRATION (only code);

<!-- <LazyRepl content={() => import('../../../content/examples/components/application/root.svelte?raw')} /> -->

### Whitout preprocess Lapikit

If you aren't using the Lapikit preprocessor in `svelte.config.js`, you can import it the usual way with:

DEMO CODE `import { App } from 'lapikit/components';`

<!-- <LazyRepl content="import { App } from 'lapikit/components';" /> -->

To use it in your project `<App>`

## API References

**Root**

| props    | type    | description                                 | default | type_extend |
| -------- | ------- | ------------------------------------------- | ------- | ----------- |
| children | Snippet | Child content to be displayed in `kit:app`. |         |             |

# Big component

Page component application markdown

<!-- <MyComponent/> -->

<LazyDemo loader={() => import('../../../content/examples/sandbox/my-component.svelte')} />

## My component is your component

Lorem is Lorem

<LazyRepl content="console.log('hello')" />

### Sub title 1

sjkhfkjsdhfkjh djkfhsjkdhf jdhskj hdsjf hksdh fjkdshfkj hdsjk hfjdsh jkfhdsjk hkjdsh jkfds f

sdfkdsklfhkjshfjhsd jfhsdj hfkjsdhf jkdshj dfhsjk hdsjh jkdshjhdsjkhfds

### Sub title 2

ksjqkds qshdgsiuekzrtezprlzalkaze,;ead,n sdnqkjscn zanekazjezajklejkazj kzajekjaz
azekazkejkazjeklazjlkeaz
azeaze

azeazeaeakljdsqjhfkjsdf ksdf khskfhjkdsj fdsjkhfuhrkjtkezlmkrezrpoiqcokwlx wjkj

## Gnome

kljdkqjhdkskjq djhqjkdh jkshqjk hjqkh jkh
