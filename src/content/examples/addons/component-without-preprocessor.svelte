<script lang="ts">
	import { KitBtn, KitDropdown, KitList, KitListItem } from 'lapikit/labs/components';
	import type { ModelDropdownProps } from 'lapikit/labs/components';
</script>

<KitDropdown closeOnClick>
	{#snippet activator({ toggle, open }: ModelDropdownProps)}
		<KitBtn onclick={(e) => toggle(e.currentTarget)}>
			{#if open}
				Component Open
			{:else}
				Component Close
			{/if}
		</KitBtn>
	{/snippet}

	<KitList>
		<KitListItem>Lapikit</KitListItem>
		<KitListItem>Is</KitListItem>
		<KitListItem>Magic !</KitListItem>
	</KitList>
</KitDropdown>
