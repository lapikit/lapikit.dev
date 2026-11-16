<script lang="ts">
	import { KitBtn, KitDropdown, KitList, KitListItem } from 'lapikit/components';
</script>

<KitDropdown closeOnClick>
	{#snippet trigger(props, { open })}
		<KitBtn {...props}>
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
