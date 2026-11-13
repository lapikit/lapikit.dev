<script lang="ts">
	import { useAccordion } from 'lapikit/actions';

	const accordion = useAccordion();
</script>

<kit:accordion spacer>
	<kit:accordion-item
		index={0}
		text="What is Lapikit?"
		open={accordion.values.includes(0)}
		toggle={accordion.toggle}
	>
		Lapikit is a Svelte component library designed to help you build modern, accessible, and
		customizable user interfaces with minimal effort.
	</kit:accordion-item>

	<kit:accordion-item
		index={1}
		text="How do I install Lapikit?"
		open={accordion.values.includes(1)}
		toggle={accordion.toggle}
	>
		Install the package via npm: <code>npm install lapikit</code>, then import the components you
		need directly into your Svelte files.
	</kit:accordion-item>

	<kit:accordion-item
		index={2}
		text="Are the components accessible?"
		open={accordion.values.includes(2)}
		toggle={accordion.toggle}
	>
		Yes, all components comply with ARIA standards. In particular, the AccordionItem uses <code
			>aria-expanded</code
		>
		and <code>aria-disabled</code> to ensure proper keyboard navigation.
	</kit:accordion-item>

	<kit:accordion-item
		index={3}
		text="This item is disabled"
		open={accordion.values.includes(3)}
		toggle={accordion.toggle}
		disabled
	>
		This content is not available because the item is disabled.
	</kit:accordion-item>
</kit:accordion>
