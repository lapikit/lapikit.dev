<script lang="ts">
	// modules
	import Explorer from './explorer.svelte';
	import TabFiles from './tab-files.svelte';
	import Ide from './ide.svelte';
	import Header from './header.svelte';
	import Footer from './footer.svelte';
	import Aside from './aside.svelte';
	import Render from './render.svelte';

	// states
	let view = $state('+page.svelte');
</script>

<div id="vs-code">
	<Header />
	<div>
		<div>
			<Aside />
			<div>
				<div class="title">Explorer</div>
				<Explorer bind:view />
			</div>
		</div>
		<div>
			<TabFiles {view} />
			<div>
				<Ide {view} />
			</div>
		</div>
		<div>
			<Render />
		</div>
	</div>
	<Footer />
</div>

<style lang="scss">
	#vs-code {
		--kit-color-font-vs-primary: #757575;
		--kit-color-font-vs-secondary: #8c8c8c;
		--kit-color-font-vs-tertiary: #dcdcdc;
		--kit-color-vs-hover: #313233;
		--kit-color-vs-active: #313233;
		--kit-color-vs-fill: #262728;
		--kit-color-vs-background: #191a1a;
		--kit-color-vs-ide: #121414;

		$height-header: 32px;
		$height-footer: 34px;
		$height-tabs: 52px;
		$height-content: 640px;

		max-width: 1200px;
		background-color: var(--kit-color-vs-background);
		border-radius: 8px;

		.title {
			font-weight: 500;
			color: var(--kit-color-font-vs-secondary);
		}

		> div {
			display: grid;
			grid-template-columns: auto calc(50% - (290px / 2)) calc(50% - (290px / 2));
			width: 100%;
			height: $height-content + $height-footer + $height-header;
			overflow: hidden;
			gap: 4px;
			padding: 2px 6px;
			font-size: 14px;
			font-weight: 300;

			> div:nth-child(1) {
				// aside
				display: grid;
				grid-template-columns: auto 220px;
				gap: 4px;
				border: 1px solid var(--kit-color-vs-fill);
				border-radius: 8px;

				> div {
					padding: 8px 6px;
				}
			}

			> div:nth-child(2) {
				// ide
				position: relative;
				background: var(--kit-color-vs-ide);
				border: 1px solid var(--kit-color-vs-fill);
				border-radius: 8px;

				> div {
					height: $height-content;
					overflow: auto;
					padding: 6px 10px;
					text-wrap: nowrap;
				}
			}

			> div:nth-child(3) {
				border: 1px solid var(--kit-color-vs-fill);
				border-radius: 8px;
				overflow: hidden;
			}
		}
	}
</style>
