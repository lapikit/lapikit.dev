<script lang="ts">
	import { Anvil, BadgeMinus, BadgePlus, ChessRook } from 'lucide-svelte';
	import { useAccordion } from 'lapikit/actions';
	import type { ModelAccordionItemProps } from 'lapikit/labs/components';

	const accordion = useAccordion();
</script>

<kit:accordion>
	<kit:accordion-item
		index={0}
		text="What is Lapikit?"
		open={accordion.values.includes(0)}
		toggle={accordion.toggle}
	>
		{#snippet indicator({ open }: ModelAccordionItemProps)}
			<kit:icon>
				{#if open}
					<BadgeMinus />
				{:else}
					<BadgePlus />
				{/if}
			</kit:icon>
		{/snippet}
		Lapikit is a Svelte component library designed to help you build modern, accessible, and customizable
		user interfaces with minimal effort.
	</kit:accordion-item>

	<kit:accordion-item
		index={1}
		text="How do I install Lapikit?"
		open={accordion.values.includes(1)}
		toggle={accordion.toggle}
	>
		{#snippet indicator({ open }: ModelAccordionItemProps)}
			<kit:icon>
				{#if open}
					<Anvil />
				{:else}
					<ChessRook />
				{/if}
			</kit:icon>
		{/snippet}
		Install the package via npm: <code>npm install lapikit</code>, then import the components you
		need directly into your Svelte files.
	</kit:accordion-item>
</kit:accordion>
