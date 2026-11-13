<script lang="ts">
	import type { ModelAccordionItemProps } from 'lapikit/components';
	import { useAccordion } from 'lapikit/actions';
	import { capitalize, isExternal } from '$lib/utils';
	import { faqContact, faqHome } from './faq-home';

	import { ArrowUpRight, Minus, Plus } from 'lucide-svelte';

	import SheetSection from '$lib/components/sheet/sheet-section.svelte';
	import SheetGrid from '$lib/components/sheet/sheet-grid.svelte';
	import SheetHeading from '$lib/components/sheet/sheet-heading.svelte';

	const accordion = useAccordion();
	accordion.toggle(0);
</script>

<SheetSection labelledby="faq-title">
	<SheetGrid columns={{ lg: 2 }}>
		<div class="faq-intro">
			<SheetHeading id="faq-title" eyebrow="// 05 — FAQ">
				Common <span class="accent-text">questions.</span>
				{#snippet description()}
					Can't find your answer here? Reach out, the team is happy to help.
				{/snippet}
			</SheetHeading>

			<kit:list class="faq-contacts" variant="text" density="comfortable" rounded="md">
				{#each faqContact as contact (contact.label)}
					<kit:list-item
						href={contact.url}
						target={isExternal(contact.url) ? '_blank' : undefined}
						rel={isExternal(contact.url) ? 'noopener noreferrer' : undefined}
					>
						{#snippet prepend()}
							<kit:avatar size="sm" color={contact.background}>
								<kit:icon color={contact.color}>
									{#if typeof contact.icon === 'string'}
										{@html contact.icon}
									{:else}
										{@const Icon = contact.icon}
										<Icon />
									{/if}
								</kit:icon>
							</kit:avatar>
						{/snippet}
						<span class="faq-contact">
							<span class="faq-contact-label">{contact.label}</span>
							<span class="faq-contact-description">{capitalize(contact.description)}</span>
						</span>
						{#snippet append()}
							<kit:icon size="sm"><ArrowUpRight /></kit:icon>
						{/snippet}
					</kit:list-item>
				{/each}
			</kit:list>
		</div>

		<div class="faq-questions">
			<kit:accordion variant="text" rounded="0">
				{#each faqHome as { question, message }, index (question)}
					<kit:accordion-item
						{index}
						text={question}
						open={accordion.values.includes(index)}
						toggle={accordion.toggle}
					>
						{#snippet indicator({ open }: ModelAccordionItemProps)}
							<kit:icon>
								{#if open}
									<Minus />
								{:else}
									<Plus />
								{/if}
							</kit:icon>
						{/snippet}
						{#each message as paragraph, paragraphIndex (paragraphIndex)}
							<p>{paragraph}</p>
						{/each}
					</kit:accordion-item>
				{/each}
			</kit:accordion>
		</div>
	</SheetGrid>
</SheetSection>

<style lang="scss">
	.faq-intro {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		align-content: start;
		gap: 40px;
		padding: var(--sheet-cell-padding-lg) var(--sheet-cell-padding);
	}

	.faq-intro :global(.faq-contacts) {
		gap: 8px;
		margin-inline: -12px;
	}

	.faq-contact {
		display: grid;
		gap: 2px;
		min-width: 0;
		white-space: normal;
	}

	.faq-contact-label {
		font-weight: 600;
	}

	.faq-contact-description {
		font-size: var(--text-sm);
		color: var(--kit-color-text-muted);
	}

	.faq-questions {
		padding: var(--sheet-cell-padding) 0;

		:global(.kit-accordion-item) {
			border-bottom: var(--lapikit-border);
		}

		:global(.kit-accordion-item:last-child) {
			border-bottom: 0;
		}

		:global(.kit-accordion-item__trigger) {
			padding-inline: var(--sheet-cell-padding);
			font-size: var(--text-lg);
			font-weight: 600;
			text-align: start;
		}

		:global(.kit-accordion-item__content-inner) {
			display: grid;
			gap: 12px;
			padding-inline: var(--sheet-cell-padding);
			color: var(--kit-color-text-muted);
			line-height: 1.6;
		}
	}
</style>
