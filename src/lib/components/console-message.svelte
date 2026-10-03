<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_DEV } from '$env/static/public';
	import { links, urlJoinLapikitTeam } from '$lib/constants';

	let { force = false }: { force?: boolean } = $props();

	onMount(() => {
		if (PUBLIC_DEV === 'true' && !force) return;

		console.log(
			'%cLapikit',
			'font-size: 48px; font-weight: 800; color: #2a6df4; text-shadow: 2px 2px 0 rgba(42, 109, 244, 0.25);'
		);
		console.log(
			'%cStop!%c This is a browser feature intended for developers. If someone told you to copy and paste something here, it is likely a scam and could give them access to your data.',
			'font-size: 16px; font-weight: 700; color: #e5484d;',
			'font-size: 14px;'
		);
		console.log(
			`%cKnow what you're doing? Come help us build Lapikit!\n%c→ ${urlJoinLapikitTeam}\n→ ${links['discord'].url}`,
			'font-size: 14px; font-weight: 600; color: #2a6df4;',
			'font-size: 13px;'
		);
	});
</script>
