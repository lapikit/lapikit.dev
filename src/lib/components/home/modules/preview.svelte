<script lang="ts">
	import { ArrowRight, House } from 'lucide-svelte';
	import PreviewSelect from './preview-select.svelte';
	import PreviewToggle from './preview-toggle.svelte';
	import { capitalize } from '$lib/utils';

	// states
	let variant = $state('filled');
	let density = $state('default');
	let size = $state('md');
	let icon = $state(false);
	let rounded = $state('sm');
	let loading = $state(false);
	let active = $state(false);
	let block = $state(false);
	let wide = $state(false);
	let elevation = $state(0);
	let disabled = $state(false);
	let color = $state('text');
	let background = $state('surface-2');

	let displayIcon = $state('prepend');

	const sizeList = ['xs', 'sm', 'md', 'lg', 'xl'];
	const variantList = ['filled', 'outline', 'text'];
	const densityList = ['none', 'compact', 'default', 'comfortable'];
	const roundedList = ['0', 'xs', 'sm', 'md', 'lg', 'xl', 'full'];
	const elevationList = ['0', '1', '2', '3', '4', '5'];
	const backgroundList = ['surface-2', 'accent', 'info', 'success', 'warning', 'error'];
	const colorList = [
		'text',
		'on-accent',
		'on-info',
		'on-success',
		'on-warning',
		'on-error',
		...backgroundList
	];
</script>

<kit:card id="hero-component-preview">
	<kit:card-actions>
		<p class="component-name">kit:btn</p>
		<kit:spacer />
		<kit:btn
			variant="text"
			size="xs"
			onclick={() => (displayIcon = 'prepend')}
			active={displayIcon === 'prepend'}
			disabled={icon}>prepend</kit:btn
		>
		<kit:btn
			variant="text"
			size="xs"
			onclick={() => (displayIcon = 'append')}
			active={displayIcon === 'append'}
			disabled={icon}>append</kit:btn
		>
		<kit:separator orientation="vertical" />
		<kit:btn size="xs" variant="text" color="accent" href="/docs/components/button">
			<span>See this component</span>
			{#snippet append()}
				<kit:icon><ArrowRight /></kit:icon>
			{/snippet}
		</kit:btn>
	</kit:card-actions>
	<kit:separator />

	<kit:card-container>
		<kit:card-content>
			<kit:btn
				{size}
				{variant}
				{density}
				{icon}
				{rounded}
				{loading}
				{active}
				{block}
				{wide}
				{elevation}
				{disabled}
				{color}
				{background}
			>
				{#snippet prepend()}
					{#if !icon && displayIcon === 'prepend'}
						<kit:icon><House /></kit:icon>
					{/if}
				{/snippet}

				{#if icon}
					<kit:icon><House /></kit:icon>
				{:else}
					Button
				{/if}

				{#snippet append()}
					{#if !icon && displayIcon === 'append'}
						<kit:icon><House /></kit:icon>
					{/if}
				{/snippet}
			</kit:btn>
		</kit:card-content>
		<kit:card-content>
			<p>&lt;<span class="html-sv-lapikit">kit:btn</span></p>
			<p class="ind-1">size=<PreviewSelect bind:property={size} list={sizeList} /></p>
			<p class="ind-1">variant=<PreviewSelect bind:property={variant} list={variantList} /></p>
			<p class="ind-1">density=<PreviewSelect bind:property={density} list={densityList} /></p>
			<p class="ind-1">icon=<PreviewToggle bind:property={icon} /></p>
			<p class="ind-1">rounded=<PreviewSelect bind:property={rounded} list={roundedList} /></p>
			<p class="ind-1">loading=<PreviewToggle bind:property={loading} /></p>
			<p class="ind-1">active=<PreviewToggle bind:property={active} /></p>
			<p class="ind-1">block=<PreviewToggle bind:property={block} /></p>
			<p class="ind-1">wide=<PreviewToggle bind:property={wide} /></p>
			<p class="ind-1">
				elevation=<PreviewSelect bind:property={elevation} list={elevationList} />
			</p>
			<p class="ind-1">disabled=<PreviewToggle bind:property={disabled} /></p>
			<p class="ind-1">color=<PreviewSelect bind:property={color} list={colorList} hasColor /></p>
			<p class="ind-1">
				background=<PreviewSelect bind:property={background} list={backgroundList} hasColor />
			</p>
			<p>&gt;</p>

			{#if icon}
				<p class="ind-1">
					&lt;<span class="html-sv-lapikit">kit:icon</span>&gt; &lt;<span class="html-sv-lucide"
						>House</span
					>
					/&gt; &lt;/<span class="html-sv-lapikit">kit:icon</span>&gt;
				</p>
			{:else}
				{#if displayIcon === 'prepend'}
					<p class="ind-1">
						&#123;#<span class="html-sv">snippet</span>
						<span class="html-sv-snippet">prepend</span>()&#125;
					</p>
					<p class="ind-2">
						&lt;<span class="html-sv-lapikit">kit:icon</span>&gt; &lt;<span class="html-sv-lucide"
							>House</span
						>
						/&gt; &lt;/<span class="html-sv-lapikit">kit:icon</span>&gt;
					</p>
					<p class="ind-1">&#123;/<span class="html-sv">snippet</span>&#125;</p>
				{/if}

				<p class="ind-1">Button</p>

				{#if displayIcon === 'append'}
					<p class="ind-1">
						&#123;#<span class="html-sv">snippet</span>
						<span class="html-sv-snippet">append</span>()&#125;
					</p>
					<p class="ind-2">
						&lt;<span class="html-sv-lapikit">kit:icon</span>&gt; &lt;<span class="html-sv-lucide"
							>House</span
						>
						/&gt; &lt;/<span class="html-sv-lapikit">kit:icon</span>&gt;
					</p>
					<p class="ind-1">&#123;/<span class="html-sv">snippet</span>&#125;</p>
				{/if}
			{/if}

			<p>&lt;<span class="html-sv-lapikit">/kit:btn</span>&gt;</p>
		</kit:card-content>
	</kit:card-container>
	<kit:card-actions>
		<kit:spacer />
		<span class="mention">{capitalize('click values to edit')}</span>
	</kit:card-actions>
</kit:card>

<style lang="scss">
	:global(#hero-component-preview) {
		$spacing-indent: 20px;
		background-color: color-mix(in srgb, var(--kit-color-surface-2) 5%, transparent) !important;
		backdrop-filter: blur(30px);
		border: 1px solid var(--kit-color-border);

		:global(.kit-card-container) {
			:global(> .kit-card-content:first-child) {
				padding: 20px 40px;

				display: flex;
				justify-content: center;
			}

			:global(> .kit-card-content:last-child) {
				font-size: 14px;
				height: 436px;
				padding: 20px 10px;
			}
		}
		.ind-1 {
			margin-left: $spacing-indent;
		}
		.ind-2 {
			margin-left: $spacing-indent * 2;
		}

		.html-sv-lapikit {
			color: red;
		}

		.html-sv-lucide {
			color: green;
		}

		.html-sv {
			color: orange;
		}

		.html-sv-snippet {
			color: orangered;
		}

		.mention {
			color: var(--kit-color-text-subtle);
			font-size: var(--kit-font-sm);
		}

		.component-name {
			text-transform: uppercase;
			color: var(--kit-color-text-subtle);
			font-size: var(--kit-font-sm);
			min-width: 85px;
		}
	}
</style>
