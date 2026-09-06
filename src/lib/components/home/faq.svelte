<script lang="ts">
	import { useAccordion } from 'lapikit/actions';

	const accordion = useAccordion();

	// states
	let faqContext = [
		{ question: 'Lapikit is compatible with Svelte and Sveltekit ?', message: 'Lorem ipsum' },
		{ question: 'Support Typescript', message: 'Lorem ipsum' },
		{ question: 'How easy is Lapikit to use ?', message: 'Lorem ipsum' },
		{ question: 'How frequently Lapikit is updated ?', message: 'Lorem ipsum' },
		{ question: 'Can i use Tailwind or UnoCSS with Lapikit ?', message: 'Lorem ipsum' }
	];
</script>

<section>
	<div>
		<h2>FAQ</h2>
		<p class="paragraphe-ws">
			Explore our documentation and resources to get the most out of Lapikit:
		</p>

		<kit:accordion spacer>
			{#each faqContext as { question, message }, index (question)}
				<kit:accordion-item
					{index}
					text={question}
					open={accordion.values.includes(index)}
					toggle={accordion.toggle}
				>
					{message}
				</kit:accordion-item>
			{/each}
		</kit:accordion>
	</div>
</section>

<style lang="scss">
	section {
		padding-top: 8.75rem;
		padding-bottom: 8.75rem;

		div {
			display: grid;
			max-width: 960px;
			gap: 20px;
			margin: 0 auto;
			padding-left: 24px;
			padding-right: 24px;
		}

		h2 {
			font-size: 24px;
			line-height: 1;
			width: fit-content;
			margin: 0 auto;
		}

		p.paragraphe-ws {
			max-width: 80%;
			margin: 0 auto;
		}

		@media (min-width: 640px) {
			> div {
				gap: 40px;
			}

			h2 {
				font-size: 48px;
				line-height: 1;
			}
		}

		@media (min-width: 767px) {
			> div {
				padding-left: 40px;
				padding-right: 40px;
			}
		}
	}
</style>
