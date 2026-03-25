<script lang="ts">
	import { resolve } from '$app/paths';

	let { children } = $props();
</script>

<article>
	<nav aria-label="Documentation navigation">
		<ul>
			<li><a href={resolve('/docs')}>Documentation home</a></li>
			<li><a href={resolve('/docs/components')}>Components</a></li>
			<li><a href={resolve('/docs/hooks')}>Hooks</a></li>
			<li><a href={resolve('/theme-builder')}>Theme builder</a></li>
		</ul>
	</nav>

	{@render children?.()}
</article>
