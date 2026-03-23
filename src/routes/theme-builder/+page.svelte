<script lang="ts">
	import { ColorPicker } from '$lib/components';
	import { themeLight as newThemeLight } from '$lib/assets';

	type ThemeLightToken = keyof typeof newThemeLight;

	let valueColorPicker = $state<{ key: ThemeLightToken; value: string } | undefined>(undefined);
	let themeLightList = $state({ ...newThemeLight });

	const newThemeLightEntries = $derived(Object.entries(themeLightList));

	const handleColor = (key: ThemeLightToken | undefined, color: string) => {
		if (!key) return;

		themeLightList = {
			...themeLightList,
			[key]: color
		};

		valueColorPicker = {
			key,
			value: color
		};
	};
</script>

<svelte:head>
	<title>LapiKit — Theme Builder</title>
</svelte:head>

<div>
	{#each newThemeLightEntries as [keyColor, valueColor] (keyColor)}
		<button
			style:background={valueColor}
			onclick={() => (valueColorPicker = { key: keyColor as ThemeLightToken, value: valueColor })}
		>
			{keyColor}: {valueColor}
		</button>
	{/each}

	<ColorPicker
		bind:color={valueColorPicker}
		handleClick={handleColor}
		list={newThemeLightEntries}
	/>
</div>
