<script lang="ts">
	import { Check, Minus, X } from 'lucide-svelte';
	import { capitalize } from '$lib/utils';
	import { tableHome, tableHomeList } from '../../../content/app/libs';

	import SheetSection from '$lib/components/sheet/sheet-section.svelte';
	import SheetGrid from '$lib/components/sheet/sheet-grid.svelte';
	import SheetHeading from '$lib/components/sheet/sheet-heading.svelte';

	type Value = string | number;
	type Edge = { value: string; label: string; text: string };

	const [lapikit, ...others] = tableHomeList;

	function valueOf(library: (typeof tableHomeList)[number], subject: string): Value | undefined {
		for (const [groupIndex, group] of tableHome.entries()) {
			const subjectIndex = group.subject.indexOf(subject);
			if (subjectIndex !== -1) return library.values[groupIndex][subjectIndex];
		}
	}

	function buildDependencies(library: (typeof tableHomeList)[number]) {
		return Number(valueOf(library, 'Build dependencies'));
	}

	const isLapikitOnly = (groupIndex: number, subjectIndex: number) =>
		lapikit.values[groupIndex][subjectIndex] === 'yes' &&
		others.every((library) => library.values[groupIndex][subjectIndex] !== 'yes');

	const edges: Edge[] = [
		{
			value: '0 imports',
			label: 'Lili preprocessor',
			text: 'Write kit tags straight in your markup and Lili compiles them. No other Svelte library does this.'
		},
		{
			value: String(buildDependencies(lapikit)),
			label: 'Build dependencies',
			text: `A lean install that stays out of your bundle. Others need up to ${Math.max(...others.map(buildDependencies))}.`
		},
		{
			value: 'Any CSS',
			label: 'No Tailwind required',
			text: 'Plain CSS by default, with Tailwind and UnoCSS when you want them. Only Lapikit runs without Tailwind.'
		}
	];

	const statuses = {
		yes: { label: 'Supported', icon: Check },
		partial: { label: 'Partially supported', icon: Minus },
		no: { label: 'Not supported', icon: X }
	} as const;

	const statusOf = (value: Value) =>
		typeof value === 'string' && value in statuses ? (value as keyof typeof statuses) : undefined;

	let compared = $state(1);
</script>

{#snippet cellValue(value: Value)}
	{@const status = statusOf(value)}
	{#if status}
		{@const { label, icon: Icon } = statuses[status]}
		<span class="comparison-value is-{status}">
			<kit:icon size="sm"><Icon aria-hidden="true" /></kit:icon>
			<span class="sr-only">{label}</span>
		</span>
	{:else}
		<span class="comparison-text">{value}</span>
	{/if}
{/snippet}

<SheetSection labelledby="comparison-title">
	<SheetGrid>
		<div class="comparison-intro">
			<SheetHeading id="comparison-title" eyebrow="// 04 — Comparison" align="center">
				Why <span class="accent-text">Lapikit</span> over other Svelte libraries?
				{#snippet description()}
					Fewer dependencies, more tools, and no styling stack forced on you.
				{/snippet}
			</SheetHeading>
		</div>
	</SheetGrid>

	<SheetGrid columns={{ md: 3 }}>
		{#each edges as { value, label, text } (label)}
			<dl class="comparison-edge">
				<dt class="comparison-edge-label">{label}</dt>
				<dd class="comparison-edge-value">{value}</dd>
				<dd class="comparison-edge-text">{text}</dd>
			</dl>
		{/each}
	</SheetGrid>

	<SheetGrid>
		<div class="comparison-board">
			<div class="comparison-picker" role="group" aria-label="Library to compare with">
				<span class="comparison-picker-label" aria-hidden="true">Compare with</span>
				{#each tableHomeList as { title }, index (title)}
					{#if index !== 0}
						{@const active = compared === index}
						<kit:chip
							is="button"
							rounded="full"
							variant={active ? 'tonal' : 'outline'}
							color={active ? 'accent' : undefined}
							{active}
							aria-pressed={active}
							onclick={() => (compared = index)}
						>
							{capitalize(title)}
						</kit:chip>
					{/if}
				{/each}
			</div>

			<div class="comparison-scroll">
				<table class="comparison-table">
					<caption class="sr-only">Lapikit compared with other Svelte libraries</caption>
					<colgroup>
						<col class="comparison-col-subject" />
						{#each tableHomeList as { title }, index (title)}
							<col class:is-lapikit={index === 0} />
						{/each}
					</colgroup>

					<thead>
						<tr>
							<td></td>
							{#each tableHomeList as { title, logo }, index (title)}
								<th
									scope="col"
									class:is-lapikit={index === 0}
									class:is-collapsed={index !== 0 && index !== compared}
								>
									<span class="comparison-library">
										<img src={logo} alt="" width="40" height="40" loading="lazy" />
										{capitalize(title)}
									</span>
								</th>
							{/each}
						</tr>
					</thead>

					{#each tableHome as { text, subject }, groupIndex (text)}
						<tbody>
							<tr class="comparison-group">
								<th scope="colgroup" colspan={tableHomeList.length + 1}>{capitalize(text)}</th>
							</tr>
							{#each subject as row, subjectIndex (row)}
								<tr>
									<th scope="row" class="comparison-subject">
										{capitalize(row)}
										{#if isLapikitOnly(groupIndex, subjectIndex)}
											<span class="comparison-only">Only Lapikit</span>
										{/if}
									</th>
									{#each tableHomeList as library, index (library.title)}
										<td
											class:is-lapikit={index === 0}
											class:is-collapsed={index !== 0 && index !== compared}
										>
											{@render cellValue(library.values[groupIndex][subjectIndex])}
										</td>
									{/each}
								</tr>
							{/each}
						</tbody>
					{/each}
				</table>
			</div>

			<p class="comparison-note">Last updated: October 2026</p>
		</div>
	</SheetGrid>
</SheetSection>

<style lang="scss">
	@use '$lib/styles/breakpoints' as *;

	.comparison-intro {
		padding: var(--sheet-cell-padding-lg) var(--sheet-cell-padding);
	}

	.comparison-edge {
		display: grid;
		grid-template-rows: auto auto 1fr;
		gap: 12px;
		padding: var(--sheet-cell-padding);
	}

	.comparison-edge-label {
		order: 1;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--kit-color-accent);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.comparison-edge-value {
		order: 0;
		font-size: var(--text-6xl);
		font-weight: 700;
		line-height: 1;
		letter-spacing: -0.04em;
	}

	.comparison-edge-text {
		order: 2;
		max-width: 36ch;
		color: var(--kit-color-text-muted);
		line-height: 1.6;
	}

	.comparison-board {
		display: grid;
		gap: 24px;
		min-width: 0;
		padding: var(--sheet-cell-padding);
	}

	.comparison-picker {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px;

		@include up(md) {
			display: none;
		}
	}

	.comparison-picker-label {
		margin-inline-end: 4px;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--kit-color-text-muted);
	}

	.comparison-scroll {
		min-width: 0;
		overflow-x: auto;
	}

	.comparison-table {
		width: 100%;
		max-width: 1100px;
		margin-inline: auto;
		border-collapse: collapse;
		@include up(md) {
			table-layout: fixed;

			col {
				width: 120px;
			}

			.comparison-col-subject {
				width: auto;
			}
		}

		@include up(lg) {
			col {
				width: 150px;
			}
		}

		col.is-lapikit {
			background-color: color-mix(in oklab, var(--kit-color-accent), transparent 92%);
		}

		th,
		td {
			padding: 14px 12px;
			border-bottom: 1px solid var(--kit-color-border);
			text-align: center;
			vertical-align: middle;
		}

		.is-collapsed {
			display: none;

			@include up(md) {
				display: table-cell;
			}
		}

		thead th {
			padding-block: 20px;
			border-bottom: var(--lapikit-border);
			font-size: var(--text-sm);
			font-weight: 600;
			vertical-align: bottom;
		}

		thead th.is-lapikit {
			border-top: 2px solid var(--kit-color-accent);
			color: var(--kit-color-accent);
		}

		tbody th {
			text-align: start;
		}

		tbody tr:last-child > * {
			border-bottom: 0;
		}

		tbody + tbody .comparison-group th {
			border-top: var(--lapikit-border);
		}
	}

	.comparison-library {
		display: grid;
		justify-items: center;
		gap: 10px;

		img {
			width: 40px;
			height: 40px;
			border-radius: 10px;
			object-fit: contain;
		}
	}

	.comparison-group th {
		padding-top: 28px;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 500;
		color: var(--kit-color-text-muted);
		text-align: start;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.comparison-subject {
		font-weight: 500;
		hyphens: auto;
	}

	.comparison-only {
		display: inline-block;
		margin-inline-start: 8px;
		padding: 2px 8px;
		border-radius: 999px;
		background-color: color-mix(in oklab, var(--kit-color-accent), transparent 85%);
		color: var(--kit-color-accent);
		font-family: var(--font-mono);
		font-size: var(--text-2xs);
		font-weight: 500;
		white-space: nowrap;
		vertical-align: middle;
	}

	.comparison-note {
		font-size: var(--text-xs);
		color: var(--kit-color-text-muted);
		text-align: center;
	}

	.comparison-value {
		display: inline-grid;
		place-items: center;
		width: 28px;
		height: 28px;
		border-radius: 999px;
		vertical-align: middle;

		&.is-yes {
			background-color: color-mix(in oklab, var(--kit-color-success), transparent 82%);
			color: var(--kit-color-success);
		}

		&.is-partial {
			background-color: color-mix(in oklab, var(--kit-color-warning), transparent 82%);
			color: var(--kit-color-warning);
		}

		&.is-no {
			color: var(--kit-color-text-muted);
		}
	}

	.comparison-text {
		font-weight: 600;
		font-variant-numeric: tabular-nums;
	}
</style>
