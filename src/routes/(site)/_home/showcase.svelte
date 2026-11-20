<script lang="ts">
	import type {
		DropdownTriggerModel,
		DropdownTriggerProps,
		TooltipTriggerProps
	} from 'lapikit/components';
	import { resolve } from '$app/paths';
	import { useAccordion } from 'lapikit/hooks';
	import { links, urlLapikitLibraryRepo } from '$lib/constants';

	import {
		ArrowRight,
		Bold,
		Boxes,
		ChevronDown,
		Italic,
		LogOut,
		Settings,
		Trash2,
		Underline,
		User
	} from 'lucide-svelte';

	import SheetSection from '$lib/components/sheet/sheet-section.svelte';
	import SheetGrid from '$lib/components/sheet/sheet-grid.svelte';
	import SheetHeading from '$lib/components/sheet/sheet-heading.svelte';
	import Components from './components.svelte';
	import BentoCell from './bento-cell.svelte';

	const accordion = useAccordion();

	const faq = [
		{
			question: 'Does it work with SvelteKit?',
			answer:
				'Yes. Add the Lili preprocessor to svelte.config.js and every route can use Lapikit tags.'
		},
		{
			question: 'Can I override the styles?',
			answer: 'Every component reads CSS variables, so a theme or a single class is enough.'
		},
		{
			question: 'Is it accessible?',
			answer: 'Components ship with keyboard support, focus states and the right ARIA attributes.'
		}
	];

	const formatting = [
		{ label: 'Bold', icon: Bold },
		{ label: 'Italic', icon: Italic },
		{ label: 'Underline', icon: Underline }
	];

	const filters = ['Svelte', 'TypeScript', 'Themes', 'Accessible'];

	const profile_tags = ['Svelte 5', 'TypeScript', 'CSS variables'];

	let email = $state('');
	const emailError = $derived(email.length > 0 && !email.includes('@'));

	let alertOpen = $state(true);
	let dialogOpen = $state(false);
	let activeFilters = $state(['Svelte', 'Themes']);

	function toggleFilter(filter: string) {
		activeFilters = activeFilters.includes(filter)
			? activeFilters.filter((item) => item !== filter)
			: [...activeFilters, filter];
	}
</script>

<SheetSection labelledby="showcase-title">
	<SheetGrid>
		<div class="showcase-intro">
			<SheetHeading id="showcase-title" eyebrow="// 02 — Components">
				Real components. <span class="accent-text">Try them right here.</span>
				{#snippet description()}
					Everything below is built with Lapikit, not a screenshot. Click, type and open them, then
					jump to the docs to see how each one is made.
				{/snippet}
			</SheetHeading>
		</div>
	</SheetGrid>

	<SheetGrid columns={{ md: 2, xl: 4 }}>
		<BentoCell tag="btn" name="Button" path="/docs/components/button" wide>
			<kit:btn color="accent">Filled</kit:btn>
			<kit:btn variant="tonal" color="accent">Tonal</kit:btn>
			<kit:btn variant="outline">Outline</kit:btn>
			<kit:btn variant="text">Text</kit:btn>
			<kit:btn loading color="accent" aria-label="Saving">Saving</kit:btn>
		</BentoCell>

		<BentoCell tag="textfield" name="Textfield" path="/docs/components/textfield">
			<div class="showcase-field">
				<kit:textfield
					bind:value={email}
					label="Email"
					type="email"
					placeholder="you@example.com"
					message="Type an address without @"
					persistentMessage
					error={emailError}
					errorMessage="Please enter a valid email address."
				/>
			</div>
		</BentoCell>

		<BentoCell tag="dropdown" name="Dropdown" path="/docs/components/dropdown">
			<kit:dropdown closeOnClick>
				{#snippet trigger(props: DropdownTriggerProps, { open }: DropdownTriggerModel)}
					<kit:btn variant="outline" active={open} {...props}>
						Account
						{#snippet append()}
							<kit:icon size="sm"><ChevronDown /></kit:icon>
						{/snippet}
					</kit:btn>
				{/snippet}

				<kit:list>
					<kit:list-item is="button">
						{#snippet prepend()}<kit:icon><User /></kit:icon>{/snippet}
						Profile
					</kit:list-item>
					<kit:list-item is="button">
						{#snippet prepend()}<kit:icon><Settings /></kit:icon>{/snippet}
						Settings
					</kit:list-item>
					<kit:list-item is="button">
						{#snippet prepend()}<kit:icon><LogOut /></kit:icon>{/snippet}
						Sign out
					</kit:list-item>
				</kit:list>
			</kit:dropdown>
		</BentoCell>

		<BentoCell tag="accordion" name="Accordion" path="/docs/components/accordion" wide>
			<div class="showcase-stretch">
				<kit:accordion variant="outline">
					{#each faq as { question, answer }, index (question)}
						<kit:accordion-item
							{index}
							text={question}
							open={accordion.values.includes(index)}
							toggle={accordion.toggle}
						>
							{answer}
						</kit:accordion-item>
					{/each}
				</kit:accordion>
			</div>
		</BentoCell>

		<BentoCell tag="alert" name="Alert" path="/docs/components/alert">
			<div class="showcase-stretch">
				{#if alertOpen}
					<kit:alert tone="success" closable bind:open={alertOpen}>
						Your theme has been saved.
					</kit:alert>
				{:else}
					<kit:btn variant="tonal" onclick={() => (alertOpen = true)}>Show the alert again</kit:btn>
				{/if}
			</div>
		</BentoCell>

		<BentoCell tag="tooltip" name="Tooltip" path="/docs/components/tooltip">
			<div class="showcase-toolbar" role="toolbar" aria-label="Text formatting">
				{#each formatting as { label, icon: Icon } (label)}
					<kit:tooltip {label}>
						{#snippet trigger(props: TooltipTriggerProps)}
							<kit:btn icon variant="text" aria-label={label} {...props}>
								<kit:icon><Icon /></kit:icon>
							</kit:btn>
						{/snippet}
					</kit:tooltip>
				{/each}
			</div>
		</BentoCell>

		<BentoCell tag="dialog" name="Dialog" path="/docs/components/dialog">
			<kit:btn variant="outline" color="error" onclick={() => (dialogOpen = true)}>
				{#snippet prepend()}
					<kit:icon><Trash2 /></kit:icon>
				{/snippet}
				Delete project
			</kit:btn>

			<kit:dialog bind:open={dialogOpen} aria-labelledby="showcase-dialog-title">
				<div class="showcase-dialog">
					<h3 id="showcase-dialog-title">Delete this project?</h3>
					<p>This is a demo, nothing will be deleted. Press Escape or pick an action.</p>
					<div class="showcase-dialog-actions">
						<kit:btn variant="text" onclick={() => (dialogOpen = false)}>Cancel</kit:btn>
						<kit:btn color="error" onclick={() => (dialogOpen = false)}>Delete</kit:btn>
					</div>
				</div>
			</kit:dialog>
		</BentoCell>

		<BentoCell tag="chip" name="Chip" path="/docs/components/chip">
			<div class="showcase-chips" role="group" aria-label="Filters">
				{#each filters as filter (filter)}
					{@const active = activeFilters.includes(filter)}
					<kit:chip
						is="button"
						rounded="full"
						variant={active ? 'tonal' : 'outline'}
						color={active ? 'accent' : undefined}
						{active}
						aria-pressed={active}
						onclick={() => toggleFilter(filter)}
					>
						{filter}
					</kit:chip>
				{/each}
			</div>
		</BentoCell>

		<BentoCell tag="card" name="Card" path="/docs/components/card" wide>
			<div class="showcase-cards-container">
				<div class="showcase-cards">
					<kit:card variant="outline" class="showcase-card">
						<kit:card-media class="showcase-cover">
							<kit:chip size="sm" rounded="full" class="showcase-cover-chip">Guide</kit:chip>
							<div class="showcase-cover-window" aria-hidden="true">
								<div class="showcase-cover-bar">
									<span></span><span></span><span></span>
									<span class="showcase-cover-cta"></span>
								</div>
								<div class="showcase-cover-body">
									<div class="showcase-cover-nav">
										<span></span><span class="active"></span><span></span><span></span>
									</div>
									<div class="showcase-cover-grid">
										<span></span><span></span><span class="filled"></span><span></span>
									</div>
								</div>
							</div>
						</kit:card-media>
						<kit:card-content class="showcase-card-body">
							<span class="showcase-eyebrow">Docs · 5 min read</span>
							<h3 class="showcase-card-title">Getting started</h3>
							<p class="showcase-meta">
								Install Lapikit, add the preprocessor and render your first component.
							</p>
						</kit:card-content>
						<kit:card-actions class="showcase-card-footer">
							<kit:avatar label="LK" size="xs" color="accent" />
							<span class="showcase-meta">Lapikit team</span>
							<kit:spacer />
							<kit:btn
								size="sm"
								variant="tonal"
								color="accent"
								href={resolve('/docs/getting-started')}
							>
								Read
								{#snippet append()}
									<kit:icon size="sm"><ArrowRight /></kit:icon>
								{/snippet}
							</kit:btn>
						</kit:card-actions>
					</kit:card>

					<kit:card variant="outline" class="showcase-card">
						<div class="showcase-banner" aria-hidden="true"></div>
						<kit:card-content class="showcase-profile">
							<div class="showcase-profile-head">
								<kit:avatar label="NY" size="xl" color="accent" class="showcase-profile-avatar" />
								<kit:chip size="sm" rounded="full" variant="outline">Maintainer</kit:chip>
							</div>
							<div>
								<h3 class="showcase-card-title">Nycolaide</h3>
								<p class="showcase-meta">Creator of Lapikit</p>
							</div>
							<p class="showcase-profile-bio">
								Building a Svelte UI kit that stays out of your way.
							</p>
							<div class="showcase-profile-tags">
								{#each profile_tags as tag (tag)}
									<kit:chip size="sm" rounded="full" variant="tonal">{tag}</kit:chip>
								{/each}
							</div>
						</kit:card-content>
						<kit:card-actions class="showcase-profile-actions">
							<kit:btn
								size="sm"
								color="accent"
								href={links['github'].url}
								target="_blank"
								rel="noopener noreferrer"
							>
								Follow
							</kit:btn>
							<kit:btn
								size="sm"
								variant="outline"
								href={urlLapikitLibraryRepo}
								target="_blank"
								rel="noopener noreferrer"
							>
								GitHub
							</kit:btn>
						</kit:card-actions>
					</kit:card>
				</div>
			</div>
		</BentoCell>
	</SheetGrid>

	<SheetGrid>
		<div class="showcase-marquee">
			<Components />
			<kit:btn href={resolve('/docs/components')} color="accent" size="lg" rounded="md">
				{#snippet prepend()}
					<kit:icon><Boxes /></kit:icon>
				{/snippet}
				Explore all components
			</kit:btn>
		</div>
	</SheetGrid>
</SheetSection>

<style lang="scss">
	.showcase-intro {
		padding: var(--sheet-cell-padding-lg) var(--sheet-cell-padding);
	}

	.showcase-field,
	.showcase-stretch {
		width: 100%;
	}

	.showcase-field {
		max-width: 320px;
	}

	.showcase-toolbar,
	.showcase-chips {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 8px;
	}

	.showcase-toolbar {
		padding: 4px;
		border: var(--lapikit-border);
	}

	.showcase-dialog {
		display: grid;
		gap: 12px;

		h3 {
			font-size: var(--text-xl);
			font-weight: 700;
		}

		p {
			color: var(--kit-color-text-muted);
		}
	}

	.showcase-dialog-actions {
		display: flex;
		justify-content: flex-end;
		gap: 8px;
	}

	.showcase-cards-container {
		container-type: inline-size;
		width: 100%;
	}

	.showcase-cards {
		display: grid;
		gap: 16px;

		@container (min-width: 520px) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		:global(.showcase-card) {
			box-shadow:
				0 1px 2px color-mix(in oklab, var(--kit-color-text), transparent 96%),
				0 8px 24px -16px color-mix(in oklab, var(--kit-color-text), transparent 82%);
		}
	}

	.showcase-cards :global(.showcase-cover) {
		position: relative;
		display: flex;
		align-items: flex-end;
		height: 196px;
		padding: 24px 20px 0;
		box-sizing: border-box;
		background-color: color-mix(in oklab, var(--kit-color-accent), transparent 90%);
	}

	.showcase-cards :global(.showcase-cover-chip) {
		position: absolute;
		top: 12px;
		left: 12px;
	}

	.showcase-cover-window {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 150px;
		border: var(--lapikit-border);
		border-bottom: 0;
		border-radius: 8px 8px 0 0;
		background-color: var(--kit-color-surface-1);
		overflow: hidden;
	}

	.showcase-cover-bar {
		display: flex;
		align-items: center;
		gap: 6px;
		height: 26px;
		padding-inline: 10px;
		border-bottom: var(--lapikit-border);

		span {
			width: 7px;
			height: 7px;
			border-radius: 50%;
			background-color: var(--kit-color-fill);
		}

		.showcase-cover-cta {
			width: 54px;
			height: 12px;
			margin-left: auto;
			border-radius: 4px;
			background-color: var(--kit-color-accent);
		}
	}

	.showcase-cover-body {
		display: flex;
		flex-grow: 1;
		gap: 10px;
		padding: 12px;
	}

	.showcase-cover-nav {
		display: flex;
		flex-direction: column;
		gap: 6px;
		width: 70px;

		span {
			height: 8px;
			border-radius: 3px;
			background-color: var(--kit-color-fill);
		}

		.active {
			background-color: color-mix(in oklab, var(--kit-color-accent), transparent 75%);
		}
	}

	.showcase-cover-grid {
		display: grid;
		flex-grow: 1;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 8px;

		span {
			border: var(--lapikit-border);
			border-radius: 6px;
		}

		.filled {
			background-color: var(--kit-color-fill);
		}
	}

	.showcase-cards :global(.showcase-card-body),
	.showcase-cards :global(.showcase-profile) {
		display: grid;
		gap: 6px;
	}

	.showcase-eyebrow {
		font-size: var(--text-xs);
		font-weight: 500;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--kit-color-text-muted);
	}

	.showcase-card-title {
		font-size: var(--text-lg);
		font-weight: 700;
	}

	.showcase-cards :global(.showcase-card-footer) {
		margin-top: auto;
	}

	.showcase-meta {
		font-size: var(--text-sm);
		color: var(--kit-color-text-muted);
	}

	.showcase-banner {
		height: 92px;
		border-radius: min(
			var(--kit-card-radius),
			max(calc(var(--kit-card-radius) - var(--kit-card-padding)), var(--kit-shape-xs))
		);
		background-color: color-mix(in oklab, var(--kit-color-accent), transparent 90%);
		background-image: radial-gradient(
			color-mix(in oklab, var(--kit-color-accent), transparent 70%) 1px,
			transparent 1px
		);
		background-size: 14px 14px;
	}

	.showcase-cards :global(.showcase-profile) {
		gap: 12px;
		margin-top: -44px;
		padding-inline: 8px;
	}

	.showcase-profile-bio {
		font-size: var(--text-sm);
	}

	.showcase-profile-head {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;

		:global(.showcase-profile-avatar) {
			box-shadow: 0 0 0 4px var(--kit-color-surface);
		}
	}

	.showcase-profile-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.showcase-cards :global(.showcase-profile-actions) {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		margin-top: auto;
	}

	.showcase-marquee {
		display: grid;
		justify-items: center;
		gap: 32px;
		padding: var(--sheet-cell-padding) 0;
		overflow: hidden;
	}
</style>
