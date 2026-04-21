<script>
	import { useAccordion } from 'lapikit/actions';

	const accordion = useAccordion();
</script>

<kit:accordion>
	<kit:accordion-item
		index={0}
		text="Always visible (readOnly)"
		open={true}
		toggle={accordion.toggle}
		readOnly
	>
		This item is open by default and cannot be collapsed. Use <code>readOnly</code> to lock an item
		in its current state without applying disabled styling.
	</kit:accordion-item>

	<kit:accordion-item
		index={1}
		text="Normal item"
		open={accordion.values.includes(1)}
		toggle={accordion.toggle}
	>
		This item can be toggled normally.
	</kit:accordion-item>

	<kit:accordion-item
		index={2}
		text="Disabled item"
		open={accordion.values.includes(2)}
		toggle={accordion.toggle}
		disabled
	>
		This content is unreachable because the item is disabled.
	</kit:accordion-item>
</kit:accordion>
