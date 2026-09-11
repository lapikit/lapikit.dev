<script lang="ts">
	import { links, nbComponents, nbHooks } from '$lib/constants';
	import { useAccordion } from 'lapikit/actions';
	import { type ModelAccordionItemProps } from 'lapikit/components';
	import { ArrowUpRight, Mail, Plus, TrafficCone, X } from 'lucide-svelte';

	const accordion = useAccordion();

	accordion.toggle(0);

	// states
	let faqContext = [
		{
			question: 'What actually include in Lapikit?',
			message: `You'll start with ${nbComponents} lapikit components, ${nbHooks} utility functions, and a full-featured preprocessor that will allow you to harness the full power of Lapikit directly within your project. The goal is to offer you new components with each release to ensure support for new needs. All of this is open-source and free.`
		},
		{
			question: 'How easy is Lapikit to use?',
			message:
				'Lapikit is designed to be easy to install, configure, and use. It was built to comply with standards common to other component libraries. Once installed, you’ll feel right at home while taking full advantage of Lapikit’s unique features! Knowledge of JavaScript is required, and familiarity with Svelte is strongly recommended before using Lapikit.'
		},
		{
			question: 'Does Lapikit support Svelte 5 Runes?',
			message:
				'Since Lapikit version 0.4, the core has been based on Svelte 5 and natively supports Runes.'
		},
		{
			question: 'Can I use TypeScript with Lapikit?',
			message:
				'Yes, absolutely! You can build your project using TypeScript! Keep in mind that Lapikit itself is developed using TypeScript. Depending on the components you integrate, some of them natively offer TypeScript interfaces to make your development process easier.'
		},
		{
			question: 'Can I use TailwindCSS/UnoCSS/Bootstrap with Lapikit?',
			message:
				'Lapikit was designed not to depend on any external libraries to ensure there are no conflicts when used with other libraries. So yes, you can use any libraries with Lapikit. The only limit is your imagination.'
		},
		{
			question: 'Why does Lapikit have few dependencies for its development and use? ',
			message:
				'This is a broad topic, but the three main reasons are security, maintainability, and compatibility with other libraries.'
		},
		{
			question: 'Can I use Lapikit to create a product and sell it?',
			message:
				'Yes, Lapikit is licensed under the MIT License. However, we’d appreciate it if you could mention in your project that you’re using Lapikit and especially if you could share a link to your project with us! We’re always thrilled to see the creations you’ve made with Lapikit!'
		},
		{
			question: 'How often is Lapikit updated?',
			message:
				'Lapikit is maintained by a small team of two people in their spare time. We try to release a new version every two months and provide patch notes every two weeks.'
		}
	];
</script>

<div class="wrapper">
	<div>
		<h2><span class="accent-text">Common</span> questions</h2>
		<p class="subtitle">Not covered here? Reach out and we'll help</p>

		<kit:list density="comfortable">
			<kit:list-item href="mailto:contact@lapikit.dev">
				{#snippet prepend()}
					<kit:avatar size="xs">
						<kit:icon>
							<Mail />
						</kit:icon>
					</kit:avatar>
				{/snippet}
				<div>
					<p>contact@lapikit.dev</p>
					<p>Priority replies for Sponsor customers</p>
				</div>
				{#snippet append()}
					<kit:icon>
						<ArrowUpRight />
					</kit:icon>
				{/snippet}
			</kit:list-item>
			<kit:list-item href={links['discord'].url} target="_blank">
				{#snippet prepend()}
					<kit:avatar size="xs">
						<kit:icon>
							{@html links['discord'].icon}
						</kit:icon>
					</kit:avatar>
				{/snippet}
				<div>
					<p>@discord/lapikit</p>
					<p>Share, support and news with Lapikit Team's</p>
				</div>
				{#snippet append()}
					<kit:icon>
						<ArrowUpRight />
					</kit:icon>
				{/snippet}
			</kit:list-item>
			<kit:list-item href="/docs/roadmap">
				{#snippet prepend()}
					<kit:avatar size="xs">
						<kit:icon>
							<TrafficCone />
						</kit:icon>
					</kit:avatar>
				{/snippet}
				<div>
					<p>See the roadmap</p>
					<p>What the plan for 2026 ?</p>
				</div>
				{#snippet append()}
					<kit:icon>
						<ArrowUpRight />
					</kit:icon>
				{/snippet}
			</kit:list-item>
		</kit:list>
	</div>

	<div>
		<kit:accordion spacer density="comfortable">
			{#each faqContext as { question, message }, index (question)}
				<kit:accordion-item
					{index}
					text={question}
					open={accordion.values.includes(index)}
					toggle={accordion.toggle}
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
</div>

<style lang="scss">
	.wrapper {
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1fr;
		max-width: var(--app-container-size-compact);
		margin: 0 auto;
		padding-left: 24px;
		padding-right: 24px;
		gap: 40px;

		h2 {
			font-size: 2.5rem;
			letter-spacing: -0.01em;
			line-height: 1.15;
			font-weight: 900;
		}

		> div:first-child {
			position: sticky;
			top: 100px;
			max-width: 80%;
			height: fit-content;

			div {
				> p {
					margin: 0;
					line-height: 1.25;

					&:first-child {
						font-weight: 600;
					}

					&:last-child {
						font-weight: 300;
					}
				}
			}
		}

		:global(.kit-accordion-item__title) {
			font-weight: 600;
		}
	}
</style>
