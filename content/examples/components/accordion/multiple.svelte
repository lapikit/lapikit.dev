<script>
	import { useAccordion } from 'lapikit/actions';

	const accordion = useAccordion({ multiple: true });

	const items = [
		{
			index: '1',
			title: 'Design tokens',
			content:
				'Lapikit uses CSS custom properties for colors, spacing, and radius - making theming straightforward.'
		},
		{
			index: '2',
			title: 'Component preprocess',
			content:
				'The preprocessor transforms kit:* syntax into native Svelte components at build time, with zero runtime overhead.'
		},
		{
			index: '3',
			title: 'SvelteKit integration',
			content:
				'Lapikit is designed to work with SvelteKit layouts. Place kit:app in your root +layout.svelte to cover the whole app.'
		}
	];
</script>

<kit:accordion spacer>
	{#each items as item (item)}
		<kit:accordion-item
			index={item.index}
			open={accordion.values.includes(item.index)}
			toggle={accordion.toggle}
			text={item.title}
		>
			{item.content}
		</kit:accordion-item>
	{/each}
</kit:accordion>
