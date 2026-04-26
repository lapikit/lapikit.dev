---
title: "quick start"
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';
</script>

## Install Lapikit in your project

**Prerequisites**

- Familiarity with the command line
- A Svelte project set up (e.g., using SvelteKit or Vite)

SvelteKit is recommended for the best experience, but Lapikit works with any Svelte project.

Lapikit is written in TypeScript and fully supports TypeScript projects. It is also compatible with JavaScript - you can simply ignore type annotations and type errors. That said, using TypeScript is recommended for a better developer experience, as some advanced features may be harder to use without types.

To install Lapikit, run the following command in your project directory:

<LazyRepl lang="sh" content={"npm install -save-dev lapikit"} />

Once installed, use the setup CLI to automatically add the required preprocessor to your project:

<LazyRepl lang="sh" content={"npx lapikit"} />

**Note: If you are using SvelteKit, the CLI will automatically detect it and configure the preprocessor. For other setups, follow the manual configuration steps below.**

### Manual Configuration

To configure the preprocessor manually:

1. Install Lapikit:

<LazyRepl lang="sh" content={"npm install -save-dev lapikit"} />

2. Update your `svelte.config.js` to include the Lapikit preprocessor:

<LazyRepl lang="js" title="svelte.config.js" content={() => import('../../content/examples/started/svelte-config-js.js?raw')} />

3. Restart your development server to apply the changes.

You can now start using Lapikit components in your Svelte project. For example:

<LazyRepl lang="svelte" title="+layout.svelte" content={() => import('../../content/examples/started/start-your-project-with-lapikit.svelte?raw')} />

## Explore the documentation

Once installation is complete, you can start exploring the documentation to discover everything Lapikit has to offer. Each component has its own dedicated section, along with guides and examples to help you get the most out of the library.

### Integrate Lapikit into your design system

Lapikit is designed to fit seamlessly into your existing design system. You can customize each component's appearance using built-in style props, or create a custom theme to apply consistent styles across all components.

Check out the customization section to learn more about styling Lapikit and integrating it into your design system.

### Using Lapikit components

Lapikit provides a wide range of ready-to-use components - from buttons and dropdowns to modals and tooltips. Each component is designed to be easy to use and customize, with simple and intuitive APIs.

The first component you should get familiar with is `kit:app`, which acts as the main wrapper for your application. It provides a base structure and default styles for your project, while allowing you to control the look and behavior of your app.

See the [`kit:app` component documentation](components/application) to learn more about its usage and features.
