<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useAccordion } from 'lapikit/actions';
	import { type ModelAccordionItemProps } from 'lapikit/components';
	import { capitalize } from '$lib/utils';

	// data
	import { faqContact, faqHome } from '../../../content/app/faq-home';

	// assets
	import { ArrowUpRight, Plus, X } from 'lucide-svelte';

	const accordion = useAccordion();

	let {
		children
	}: {
		children: Snippet;
	} = $props();

	accordion.toggle(0);
</script>

<div class="grid-faq">
	<div>
		<div style:display="block">
			{@render children()}
		</div>

		<kit:list id="custom-list-contact" density="comfortable">
			{#each faqContact as item, index (index)}
				<kit:list-item href={item.url}>
					{#snippet prepend()}
						<kit:avatar size="xs" background={item.background}>
							<kit:icon color={item.color}>
								{#if typeof item.icon === 'string'}
									{@html item.icon}
								{:else}
									{@const Icon = item.icon}
									<Icon />
								{/if}
							</kit:icon>
						</kit:avatar>
					{/snippet}
					<div>
						<p class="text-sm">{item.label}</p>
						<p class="muted-text text-xs">{capitalize(item.description)}</p>
					</div>
					{#snippet append()}
						<kit:icon>
							<ArrowUpRight />
						</kit:icon>
					{/snippet}
				</kit:list-item>
			{/each}
		</kit:list>
	</div>

	<kit:accordion spacer density="comfortable">
		{#each faqHome as { question, message }, index (question)}
			<kit:accordion-item
				{index}
				text={question}
				open={accordion.values.includes(index)}
				toggle={accordion.toggle}
				elevation="1"
			>
				{#snippet indicator({ open }: ModelAccordionItemProps)}
					<kit:icon>
						{#if open}
							<X />
						{:else}
							<Plus />
						{/if}
					</kit:icon>
				{/snippet}
				{message}
			</kit:accordion-item>
		{/each}
	</kit:accordion>
</div>

<style lang="scss">
	.grid-faq {
		display: grid;
		gap: 20px;
		grid-template-columns: 1fr;
		grid-template-areas:
			'title'
			'faq'
			'contact';

		div:nth-child(1) {
			display: contents;

			> div:nth-child(1) {
				grid-area: title;
			}

			:global(.kit-list) {
				grid-area: contact;
			}

			:global(.kit-list-item__content > div) {
				width: 100%;
				display: block;
			}

			:global(.kit-list-item__content p:last-child) {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}

		> :global(.kit-accordion) {
			grid-area: faq;
		}

		@media (min-width: 720px) {
			gap: 40px;
			grid-template-columns: 1fr 1fr;
			grid-template-areas: 'sticky-col faq';
			align-items: start;

			div:nth-child(1) {
				grid-area: sticky-col !important;
				display: flex;
				flex-direction: column;
				position: sticky;
				top: 100px;
			}
		}

		:global(.kit-accordion-item__title) {
			font-weight: 600 !important;
		}
	}
</style>
