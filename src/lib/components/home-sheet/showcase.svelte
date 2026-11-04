<script lang="ts">
	import type {
		DropdownTriggerModel,
		DropdownTriggerProps,
		TooltipTriggerProps
	} from 'lapikit/components';
	import { resolve } from '$app/paths';
	import { useAccordion } from 'lapikit/actions';

	import {
		Bold,
		BookOpen,
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
	import Components from '$lib/components/home/components.svelte';
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
					<kit:card variant="outline">
						<kit:card-media>
							<kit:aspect-ratio ratio="16/9">
								<img
									src="https://picsum.photos/seed/lapikit-card/640/360"
									alt="Placeholder cover"
									title="To replace: a screenshot of a project built with Lapikit (16:9, about 640×360)"
									width="640"
									height="360"
									loading="lazy"
									decoding="async"
								/>
							</kit:aspect-ratio>
						</kit:card-media>
						<kit:card-title>Getting started</kit:card-title>
						<kit:card-actions>
							<span class="showcase-meta">5 min read</span>
							<kit:spacer />
							<kit:btn size="sm" variant="tonal" href={resolve('/docs/getting-started')}>
								{#snippet prepend()}
									<kit:icon size="sm"><BookOpen /></kit:icon>
								{/snippet}
								Read
							</kit:btn>
						</kit:card-actions>
					</kit:card>

					<kit:card variant="outline">
						<kit:card-content>
							<div class="showcase-profile">
								<kit:avatar label="NY" size="lg" color="accent" />
								<div>
									<p class="showcase-profile-name">Nycolaide</p>
									<p class="showcase-meta">Creator of Lapikit</p>
								</div>
							</div>
						</kit:card-content>
						<kit:card-content>
							Building a Svelte UI kit that stays out of your way.
						</kit:card-content>
						<kit:card-actions>
							<kit:spacer />
							<kit:btn size="sm" variant="outline">Follow</kit:btn>
						</kit:card-actions>
					</kit:card>
				</div>
			</div>
		</BentoCell>
	</SheetGrid>

	<SheetGrid>
		<div class="showcase-marquee">
			<Components />
			<kit:btn href={resolve('/docs/components')} variant="outline" color="accent" rounded="md">
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

		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.showcase-meta {
		font-size: var(--text-sm);
		color: var(--kit-color-text-muted);
	}

	.showcase-profile {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.showcase-profile-name {
		font-weight: 700;
	}

	.showcase-marquee {
		display: grid;
		justify-items: center;
		gap: 32px;
		padding: var(--sheet-cell-padding) 0;
		overflow: hidden;
	}
</style>
