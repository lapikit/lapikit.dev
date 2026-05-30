<script>
	import { Boxes, Tractor } from 'lucide-svelte';
	import { useAccordion } from 'lapikit/actions';

	const accordion = useAccordion();
</script>

<kit:accordion>
	<kit:accordion-item index={0} open={accordion.values.includes(0)} toggle={accordion.toggle}>
		{#snippet activator()}
			<span style="display: flex; align-items: center; gap: 0.5rem;">
				<kit:icon><Tractor /></kit:icon>
				<span>
					<strong>Design tokens</strong>
					<small style="display: block; opacity: 0.6;">Colors, spacing, radius</small>
				</span>
			</span>
		{/snippet}

		Lapikit uses CSS custom properties for colors, spacing, and radius - making theming
		straightforward without overriding component internals.
	</kit:accordion-item>

	<kit:accordion-item index={1} open={accordion.values.includes(1)} toggle={accordion.toggle}>
		{#snippet activator()}
			<span style="display: flex; align-items: center; gap: 0.5rem;">
				<kit:icon><Boxes /></kit:icon>
				<span>
					<strong>Preprocessor</strong>
					<small style="display: block; opacity: 0.6;">kit:* syntax at build time</small>
				</span>
			</span>
		{/snippet}

		The preprocessor transforms <code>kit:*</code> syntax into native Svelte components at build time,
		with zero runtime overhead.
	</kit:accordion-item>
</kit:accordion>
