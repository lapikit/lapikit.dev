<script lang="ts">
	let { users = [] } = $props();
</script>

<ul>
	{#each users as user, index (index)}
		<li style:--rotate="{user.rotate}deg" style:--lift="{user.lift}px" style:z-index={user.z}>
			<a href={user.href} target="_blank" rel="external noopener noreferrer">
				<img src={user.src} alt={user} loading="lazy" decoding="async" />
			</a>
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		--size: 94px;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		padding: var(--app-spacing-x-container) 0;
		margin: 0;

		li {
			width: var(--size);
			flex: 0 0 auto;
			transform: translateY(var(--lift)) rotate(var(--rotate));
			transition: transform 0.25s ease;
			cursor: pointer;

			&:not(:first-child) {
				margin-left: calc(var(--size) * -0.36);
			}
		}

		a {
			display: block;
			border-radius: 18px;
			overflow: hidden;
			border: 1px solid var(--kit-color-border);
		}

		img {
			display: block;
			width: 100%;
			aspect-ratio: 1;
			object-fit: cover;
		}
	}
</style>
