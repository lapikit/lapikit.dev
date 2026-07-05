<script lang="ts">
	import type { ThemeAction } from 'lapikit';
	import { createTheme } from 'lapikit/actions';

	const areaA = createTheme();
	const areaB = createTheme();
	const areaC = createTheme();

	function toggle(area: ThemeAction) {
		area.set(area.active === 'dark' ? 'light' : 'dark');
	}
</script>

<div use:areaA.action={{ name: 'dark' }}>
	Area A : {areaA.active}
	<button onclick={() => toggle(areaA)}>Toggle</button>
</div>

<div use:areaB.action={{ name: 'light', key: '@custom/area-b' }}>
	Area B : {areaB.active}
	<button onclick={() => toggle(areaB)}>Toggle</button>
</div>

<div use:areaC.action>
	Area C : {areaC.active}
	<button onclick={() => toggle(areaC)}>Toggle</button>
</div>
