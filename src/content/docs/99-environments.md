---
title: "environments"
---

# Editor Setup

Lapikit uses a custom `<kit:*>` syntax that is transformed into standard Svelte components at build time via its preprocessor. This page explains how to configure your editor and linting tools to work properly with lapikit.

## ESLint

Lapikit provides an official ESLint config package to avoid false positives caused by its preprocessor.

Install it:

```bash
npm install -D eslint-config-lapikit
```

Then add it to your `eslint.config.js`:

```js
import lapikitConfig from 'eslint-config-lapikit';

export default [
	...lapikitConfig
	// rest of your config
];
```

This config handles the `@typescript-eslint/no-unused-vars` rule for lapikit-specific snippets such as `activator`, `indicator`, `append`, `prepend`, `close`, `load`, and `tooltip`.

> **Note:** `eslint-config-lapikit` configures the `@typescript-eslint/no-unused-vars` rule. If you already have a custom configuration for this rule, place the lapikit config first so your own rules take precedence:
>
> ```js
> export default [
> 	...lapikitConfig, // first
> 	{
> 		rules: {
> 			'@typescript-eslint/no-unused-vars': [
> 				'error',
> 				{
> 					// your custom options here
> 				}
> 			]
> 		}
> 	}
> ];
> ```

## Known False Positives

### `ts(6133)` - snippet declared but never read

When using lapikit snippets like `activator`, your IDE may display the following warning:

```
'activator' is declared but its value is never read. ts(6133)
```

This is a **known false positive**. Lapikit's `<kit:*>` syntax is transformed into standard Svelte components by its preprocessor at build time, but IDE language servers analyze your source files directly without running the preprocessor. As a result, they cannot determine that snippets like `activator` are consumed by the transformed component.

Your code is correct and will work as expected - this warning can be safely ignored.

To suppress it, set `noUnusedLocals` to `false` in your `tsconfig.json`:

```json
{
	"compilerOptions": {
		"noUnusedLocals": false
	}
}
```

> **Note:** This is a limitation of the current Svelte language server. A fix would require native support for custom preprocessors in IDE language servers. This issue has been reported upstream.

### No autocompletion for `<kit:*>` tags

For the same reason, IDE autocompletion is not available for `<kit:*>` tags. Full IDE support would require a dedicated editor extension, which is on the lapikit roadmap.

## Using Lapikit Without the Preprocessor

If the false positives are a blocker for your workflow, you can use lapikit components directly without the preprocessor. Import them manually from `lapikit/labs/components` and use them like any standard Svelte component:

```svelte
<script lang="ts">
	import { Dropdown } from 'lapikit/labs/components';
	import type { ModelDropdownProps } from 'lapikit/labs/types';
</script>

<Dropdown closeOnClick>
	{#snippet activator({ toggle, open }: ModelDropdownProps)}
		<button onclick={(e) => toggle(e.currentTarget)}>
			{String(open)}
		</button>
	{/snippet}
</Dropdown>
```

Your IDE will fully understand this syntax and the `ts(6133)` warning will no longer appear.

> **Keep in mind:** By skipping the preprocessor, you lose the main benefits of the `<kit:*>` syntax - automatic imports, shorter and more readable markup, and the full integration optimizations that lapikit is designed around. We recommend sticking with the preprocessor and suppressing the warning via `noUnusedLocals: false`.
