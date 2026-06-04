<script lang="ts">
	// import type { ModelDropdownProps } from 'lapikit/labs/components';
	import { resolve } from '$app/paths';
	// import { appNavigation } from '$lib';

	// assets
	import Lapikit from '$lib/assets/images/lapikit.webp?enhanced';
	// import githubIcon from '$lib/assets/icons/github.svg?raw';
	// import discordIcon from '$lib/assets/icons/discord.svg?raw';
	// import { Bolt, ChevronDown, ChevronUp, Ellipsis, Search } from 'lucide-svelte';
	import Version from '$components/appbar/modules/version.svelte';
</script>

<kit:appbar>
	<a href={resolve('/')}>
		<enhanced:img src={Lapikit} alt="Lapikit logo" class="lapikit-logo" />
		<span class="lapikit-name">Lapikit</span>
	</a>

	<Version />
</kit:appbar>

<style>
	.lapikit-logo {
		position: absolute;
		top: -26px;
		width: 44px;
	}

	.lapikit-name {
		font-weight: 700;
		font-size: 1.325rem;
		margin-left: 54px;
	}
</style>
