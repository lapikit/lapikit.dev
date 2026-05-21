---
title: "environments"
---

<script>
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	// examples
	import ComponentWithoutPreprocessor from '../../content/examples/addons/component-without-preprocessor.svelte';
</script>

# Editor Setup

Lapikit uses a custom `<kit:*>` syntax that is transformed into standard Svelte components at build time via its preprocessor. This page explains how to configure your editor and linting tools to work properly with lapikit.

## ESLint

Lapikit provides an official ESLint config package to avoid false positives caused by its preprocessor.

Install it:

<LazyRepl lang="sh" content={"npm install -D eslint-config-lapikit"} />

Then add it to your `eslint.config.js`:

<LazyRepl title="eslint.config.js" lang="js" content={() => import('../../content/examples/addons/eslint-config-lapikit.js?raw')} />

This config handles the `@typescript-eslint/no-unused-vars` rule for lapikit-specific snippets such as `activator`, `indicator`, `append`, `prepend`, `close`, `load`, and `tooltip`.

> **Note:** `eslint-config-lapikit` configures the `@typescript-eslint/no-unused-vars` rule. If you already have a custom configuration for this rule, place the lapikit config first so your own rules take precedence:

<LazyRepl title="eslint.config.js" lang="js" content={() => import('../../content/examples/addons/eslint-config-no-unused-vars.js?raw')} />

## Known False Positives

### `ts(6133)` - snippet declared but never read

When using lapikit snippets like `activator`, your IDE may display the following warning:

<LazyRepl lang="sh" content={"'activator' is declared but its value is never read. ts(6133)"} />

This is a **known false positive**. Lapikit's `<kit:*>` syntax is transformed into standard Svelte components by its preprocessor at build time, but IDE language servers analyze your source files directly without running the preprocessor. As a result, they cannot determine that snippets like `activator` are consumed by the transformed component.

Your code is correct and will work as expected - this warning can be safely ignored.

To suppress it, set `noUnusedLocals` to `false` in your `tsconfig.json`:

<LazyRepl title="tsconfig.json" lang="json" content={() => import('../../content/examples/addons/tsconfig-compiler-options.json?raw')} />

> **Note:** This is a limitation of the current Svelte language server. A fix would require native support for custom preprocessors in IDE language servers. This issue has been reported upstream.

### No autocompletion for `<kit:*>` tags

For the same reason, IDE autocompletion is not available for `<kit:*>` tags. Full IDE support would require a dedicated editor extension, which is on the lapikit roadmap.

## Using Lapikit Without the Preprocessor

If the false positives are a blocker for your workflow, you can use lapikit components directly without the preprocessor. Import them manually from `lapikit/labs/components` and use them like any standard Svelte component:

<LazyRepl lang="svelte" content={() => import('../../content/examples/addons/component-without-preprocessor.svelte?raw')}>
<ComponentWithoutPreprocessor/>
</LazyRepl>
Your IDE will fully understand this syntax and the `ts(6133)` warning will no longer appear.

> **Keep in mind:** By skipping the preprocessor, you lose the main benefits of the `<kit:*>` syntax - automatic imports, shorter and more readable markup, and the full integration optimizations that lapikit is designed around. We recommend sticking with the preprocessor and suppressing the warning via `noUnusedLocals: false`.
