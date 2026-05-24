---
title: 'useTheme action'
description: 'Learn how the UseTheme hook from Lapikit simplifies theme management in Svelte: switch dark/light modes, sync global state, and keep components in sync effortlessly.'
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import UseThemeToggle from '../../../content/examples/hooks/useTheme-toggle.svelte';
</script>

# Discover the useTheme action in Lapikit

The `useTheme` function allows you to dynamically change your application's theme by modifying the CSS class applied to the root HTML element. This makes it easy to implement dark or light themes, thereby improving the user experience.

You can use this action by calling `useTheme` with the desired theme name. For example, `useTheme('dark')` will apply the dark theme by adding the corresponding class to the HTML element.

<LazyRepl title="useThemeToggle.svelte" lang="svelte" content={() => import('../../../content/examples/hooks/useTheme-toggle.svelte?raw')}>
<UseThemeToggle/>
</LazyRepl>

You can also customize the storage key in localStorage by passing a second argument to the `useTheme` function. By default, this key is set to `@lapikit/theme`.

You can customize the available themes and their associated styles via the configuration file `plugins/lapikit.(js|ts)`. Check the documentation on [themes](/docs/customize) to discover all the options available to tailor Lapikit to your application.

## API References

| parameter | type     | description         | default          |
| --------- | -------- | ------------------- | ---------------- |
| name      | `string` | set the theme name  |                  |
| key       | `string` | set the storage key | `@lapikit/theme` |
