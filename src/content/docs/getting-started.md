---
title: "quick start"
description: "Get started with Lapikit: installation, CI/CD or manual configuration. Everything you need to get your Svelte projects up and running fast."
---

<script>
	import LazyRepl from '$components/lazy-repl.svelte';
</script>

# Getting Started with Lapikit library for Svelte Projects

## Install Lapikit in your Svelte project

**Prerequisites**

Before installing Lapikit, make sure you have:

- basic familiarity with the command line
- an existing Svelte project (SvelteKit, Vite, or another Svelte setup)

SvelteKit is recommended for the best experience, but Lapikit works with any Svelte project.

Lapikit is written in TypeScript and fully supports TypeScript projects. It is also compatible with JavaScript - you can simply ignore type annotations and type errors. That said, using TypeScript is recommended for a better developer experience, as some advanced features may be harder to use without types.

## Install and configure Lapikit

### Install Lapikit in your project directory

To install Lapikit, run the following command in your project directory:

<LazyRepl lang="sh" content={"npm install -save-dev lapikit"} />

Once installed, use the setup CLI to automatically add the required preprocessor to your project:

<LazyRepl lang="sh" content={"npx lapikit"} />

**Note: If you are using SvelteKit, the CLI will automatically detect it and configure the preprocessor. For other setups, follow the manual configuration steps below.**

### Manual installation and configuration

Configure the preprocessor manually in 3 steps:

1. Install Lapikit:

<LazyRepl lang="sh" content={"npm install -save-dev lapikit"} />

2. Update your `svelte.config.js` to include the Lapikit preprocessor:

<LazyRepl lang="js" title="svelte.config.js" content={() => import('../../content/examples/started/svelte-config-js.js?raw')} />

3. Restart your development server to apply the changes.

You can now start using Lapikit components in your Svelte project. For example:

<LazyRepl lang="svelte" title="+layout.svelte" content={() => import('../../content/examples/started/start-your-project-with-lapikit.svelte?raw')} />

## Explore the Lapikit documentation

Once Lapikit is installed, you can start exploring the documentation to understand how components, stores, hooks, and themes work together.

Each component includes examples, usage guides, and API references to help you integrate it quickly into your Svelte or SvelteKit project.

### Integrate Lapikit into your design system

Lapikit is built to adapt to your existing design system rather than replace it.

You can customize components with styling props, CSS variables, or themes to keep a consistent visual language across your application.

The customization guides explain how to configure themes, styles, dropdown, and global components.

### Using Lapikit components

Lapikit includes a growing collection of components for common interface patterns such as buttons, dialogs, dropdowns, tooltips, and forms.

Components are designed to stay close to native HTML behavior while providing additional styling and reactive features.

A helpful starting point is the documentation for the `kit:app` component, which describes the main wrapper component used to initialize the app's styles, themes, and overall behavior.

Refer to the [`kit:app`](components/application) component documentation to learn more about how to use it and the features
