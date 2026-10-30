<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { resolve } from '$app/paths';

	import LogoLapikit from '$lib/assets/images/lapikit.webp?enhanced';

	let { class: className, ...rest }: Omit<HTMLAnchorAttributes, 'href'> = $props();
</script>

<a class={['brand', className]} href={resolve('/')} {...rest}>
	<enhanced:img src={LogoLapikit} alt="" sizes="32px" />
	<span>Lapikit</span>
</a>

<style lang="scss">
	.brand {
		display: flex;
		align-items: center;
		gap: 10px;
		color: var(--kit-color-text);
		font-size: var(--text-xl);
		font-weight: 700;
		letter-spacing: -0.02em;
		text-decoration: none;

		:global(picture),
		:global(img) {
			width: var(--brand-logo-width, 32px);
			height: var(--brand-logo-height, 32px);
		}

		:global(img) {
			object-fit: contain;
		}
	}
</style>
