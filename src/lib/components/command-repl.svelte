<script lang="ts">
	import { command, pkg_manager } from '$lib/constants';
	import { application, type PkgManager } from '$lib/stores/app.svelte';

	// modules
	import LazyRepl from '$lib/components/lazy-repl.svelte';

	let {
		commandkey
	}: {
		commandkey: keyof (typeof command)[PkgManager];
	} = $props();

	const managers = Object.keys(pkg_manager) as PkgManager[];

	const content = $derived(
		Object.fromEntries(
			managers.map((pkg) => [pkg, { code: command[pkg][commandkey], lang: 'shell' }])
		)
	);

	let wrapper = $state<HTMLElement | null>(null);

	function selectTab(pkg: PkgManager) {
		const tab = wrapper?.querySelector<HTMLButtonElement>(
			`[role="tab"][aria-label="Select ${pkg}"]`
		);
		if (tab && tab.getAttribute('aria-selected') !== 'true') tab.click();
	}

	$effect(() => {
		const pkg = application.pkg_selected;
		if (!wrapper) return;

		selectTab(pkg);
		const observer = new MutationObserver(() => selectTab(pkg));
		observer.observe(wrapper, { childList: true, subtree: true });
		return () => observer.disconnect();
	});

	// REPL -> store
	$effect(() => {
		const el = wrapper;
		if (!el) return;

		const onclick = (event: MouseEvent) => {
			const name = (event.target as HTMLElement)
				.closest('[role="tab"]')
				?.querySelector('span')
				?.textContent?.trim();
			if (name && managers.includes(name as PkgManager)) {
				application.pkg_selected = name as PkgManager;
			}
		};

		el.addEventListener('click', onclick);
		return () => el.removeEventListener('click', onclick);
	});
</script>

<div bind:this={wrapper}>
	<LazyRepl {content} />
</div>
