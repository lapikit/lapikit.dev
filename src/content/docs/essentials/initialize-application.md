---
title: "Initialize Application"
description: "Initialize the Lapikit application context in Svelte and SvelteKit projects with the <kit:app> component, including global styles and shared application structure."
---

<script>
	import LazyRepl from '$components/lazy-repl.svelte';
</script>

## Initialize Lapikit Application Context

Lapikit provides a global application context that can be accessed by all components. To initialize this context, wrap your application in the `<kit:app>` component:

<LazyRepl lang="svelte" title="+layout.svelte" content={() => import('../../../content/examples/essentials/use-app-component.svelte?raw')} />

The `<kit:app>` component sets up the necessary context for Lapikit components to function properly. It also provides default styles and structure for your application, which you can customize as needed.

### Why use `<kit:app>`?

Using `<kit:app>` ensures that all Lapikit components have access to the necessary context and styles. It also provides a consistent structure for your application, making it easier to manage and maintain. Additionally, `<kit:app>` can be customized with props to control the look and behavior of your application, allowing you to create a unique user experience while still benefiting from Lapikit's features.

### Customizing `<kit:app>`

You can customize the `<kit:app>` component using various props to control its appearance and behavior. For example, you can use the `theme` prop to apply a custom theme to your application, visit the component documentation application section to learn more about the available props and how to use them effectively.
