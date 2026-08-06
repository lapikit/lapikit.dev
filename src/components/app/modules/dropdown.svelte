<script lang="ts">
	import { Settings, User, LogOut, ChevronDown, ChevronUp } from 'lucide-svelte';

	import type { ModelDropdownProps } from 'lapikit/components';

	let users = ['nycolaide', 'fersimone'];
	let select = $state('Select one');
</script>

<div>
	<p>State*</p>

	<kit:dropdown closeOnClick>
		{#snippet activator({ open, toggle }: ModelDropdownProps)}
			<kit:btn
				active={open}
				onclick={(e: MouseEvent) => toggle(e.currentTarget as HTMLElement)}
				block
			>
				{select}

				{#snippet append()}
					<kit:icon size="sm">
						{#if open}
							<ChevronUp />
						{:else}
							<ChevronDown />
						{/if}
					</kit:icon>
				{/snippet}
			</kit:btn>
		{/snippet}

		<kit:list>
			{#each users as user (user)}
				<kit:list-item onclick={() => (select = user)}>{user}</kit:list-item>
			{/each}
		</kit:list>
	</kit:dropdown>
</div>
