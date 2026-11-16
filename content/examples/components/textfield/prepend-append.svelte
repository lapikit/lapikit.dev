<script lang="ts">
	import { Search, Eye, EyeOff } from 'lucide-svelte';
	let showPassword = $state(false);
</script>

<div style="max-width: 360px; display: flex; flex-direction: column; gap: 1rem;">
	<kit:textfield placeholder="Search...">
		{#snippet prependInner()}
			<kit:icon><Search /></kit:icon>
		{/snippet}
	</kit:textfield>

	<kit:textfield placeholder="Password" type={showPassword ? 'text' : 'password'}>
		{#snippet appendInner()}
			<button
				type="button"
				onclick={() => (showPassword = !showPassword)}
				style="display:inline-flex; background:none; border:none; cursor:pointer; color:inherit; padding:0;"
			>
				<kit:icon>
					{#if showPassword}<Eye />{:else}<EyeOff />{/if}
				</kit:icon>
			</button>
		{/snippet}
	</kit:textfield>
</div>
