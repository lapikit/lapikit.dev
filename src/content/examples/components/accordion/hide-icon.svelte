<script>
	import { useAccordion } from 'lapikit/actions';

	const accordion = useAccordion();
</script>

<kit:accordion hideIcon>
	<kit:accordion-item
		index={0}
		text="No indicator icon"
		open={accordion.values.includes(0)}
		toggle={accordion.toggle}
	>
		The chevron icon is hidden on all items when <code>hideIcon</code> is set on the parent
		<code>kit:accordion</code>.
	</kit:accordion-item>

	<kit:accordion-item
		index={1}
		text="Also no icon here"
		open={accordion.values.includes(1)}
		toggle={accordion.toggle}
	>
		<code>hideIcon</code> applies globally to every child item via a CSS rule on the container.
	</kit:accordion-item>
</kit:accordion>
