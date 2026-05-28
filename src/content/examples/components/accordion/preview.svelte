<script lang="ts">
	import { useAccordion } from 'lapikit/actions';

	const accordion = useAccordion();
</script>

<kit:accordion>
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
</kit:accordion>
