---
title: 'useTheme: Manage theme state in Svelte'
category: 'Stores and Hooks'
head:
  title: 'useTheme action'
  description: 'The useTheme hook from Lapikit simplifies theme management in Svelte: switch between dark and light modes and keep every component in sync.'
layout: 'doc_page'
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	import UseThemeToggle from '$examples/hooks/useTheme-toggle.svelte';

	import useThemeToggleCode from '$examples/hooks/useTheme-toggle.svelte?raw';
</script>

## Discover the useTheme action in Lapikit

The `useTheme` function changes the theme of your application: it sets the `data-kit-theme` attribute on the `<html>` element and keeps the choice in `localStorage`. Every Lapikit component follows it.

Call `useTheme` with the name of the theme: `useTheme('dark')`, `useTheme('light')`, or `useTheme('system')` to follow the setting of the operating system (`prefers-color-scheme`).

<LazyRepl title="useThemeToggle.svelte" lang="svelte" content={useThemeToggleCode}>
<UseThemeToggle/>
</LazyRepl>

See the [themes](/docs/customize) documentation to learn about all the available options for customizing Lapikit for your application.

## API References

| parameter | type     | description                                        | default |
| --------- | -------- | -------------------------------------------------- | ------- |
| name      | `string` | The theme name: `'light'`, `'dark'`, `'system'`... |         |

## Choose where Lapikit stores the theme

Lapikit keeps the selected theme between page reloads and browser sessions, under the `@lapikit/theme` key of `localStorage`. To change the key, pass it once to `createGlobalTheme`:

```svelte
<script>
	import { createGlobalTheme } from 'lapikit/actions';

	createGlobalTheme({ key: 'my-app/theme', name: 'system' });
</script>
```

`name` is the theme used when nothing is stored yet. A custom key is useful when:

- Managing multiple applications ;
- Isolating environments ;
- Testing different theme configurations ;
- Or integrating Lapikit into an existing storage architecture.

When `localStorage` is not available (private browsing, blocked storage), the theme still applies, without being kept.

## Avoid the flash of the wrong theme

With SSR, the page is painted before Svelte runs: the default theme shows for a moment, then the stored one. `themeScript()` returns an inline script that applies the stored theme before the first paint. Add it to the `<head>` of your root layout, with the same options as `createGlobalTheme`:

```svelte
<script>
	import { themeScript } from 'lapikit/actions';
</script>

<svelte:head>
	{@html themeScript({ key: 'my-app/theme', name: 'system' })}
</svelte:head>
```

> If your site sets a Content Security Policy that blocks inline scripts, allow this script with a nonce or a hash.

Because the theme is centralized, all Lapikit components automatically stay synchronized with the active theme across your Svelte or SvelteKit application.
