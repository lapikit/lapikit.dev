---
title: "useTheme action"
description: "Learn how the UseTheme hook from Lapikit simplifies theme management in Svelte: switch dark/light modes, sync global state, and keep components in sync effortlessly."
---

<script>
	import LazyRepl from '$components/lazy-repl.svelte';

	import UseThemeToggle from '$examples/hooks/useTheme-toggle.svelte';
</script>

# useTheme: Manage theme state in Svelte

## Discover the useTheme action in Lapikit

The `useTheme` function allows you to dynamically change your application's theme by modifying the CSS class applied to the root HTML element. This makes it easy to implement dark or light themes, thereby improving the user experience.

You can use this action by calling `useTheme` with the desired theme name. For example, `useTheme('dark')` will apply the dark theme by adding the corresponding class to the HTML element.

<LazyRepl title="useThemeToggle.svelte" lang="svelte" content={() => import('$examples/hooks/useTheme-toggle.svelte?raw')}>
<UseThemeToggle/>
</LazyRepl>

You can also customize the storage key in localStorage by passing a second argument to the `useTheme` function. By default, this key is set to `@lapikit/theme`.

You can customize the available themes and their associated styles via the configuration file `plugins/lapikit.(js|ts)`. See the [themes](/docs/customize) documentation to learn about all the available options for customizing Lapikit for your application.

## API References

| parameter | type     | description         | default          |
| --------- | -------- | ------------------- | ---------------- |
| name      | `string` | set the theme name  |                  |
| key       | `string` | set the storage key | `@lapikit/theme` |

## Choose where Lapikit stores the theme

This allows Lapikit to preserve the selected theme between page reloads and browser sessions.

You can customize the storage key by passing a second argument to `useTheme`.

This is particularly useful when:

- Managing multiple applications ;
- Isolating environments ;
- Testing different theme configurations ;
- Or integrating Lapikit into an existing storage architecture.

Because the theme is centralized, all Lapikit components automatically stay synchronized with the active theme across your Svelte or SvelteKit application.
