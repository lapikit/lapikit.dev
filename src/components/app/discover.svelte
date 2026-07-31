<script lang="ts">
	import { ChevronRight, Pen, SquarePlus } from 'lucide-svelte';
	import List from './modules/list.svelte';
	import Card from './modules/card.svelte';
	import Actions from './modules/actions.svelte';
	import Btn from './modules/btn.svelte';
	import Avatar from './modules/avatar.svelte';
	import Alert from './modules/alert.svelte';
	import Input from './modules/input.svelte';
	import Dropdown from './modules/dropdown.svelte';
	import Toolbar from './modules/toolbar.svelte';

	let view = $state('components');
</script>

<section>
	<div>
		<kit:toolbar>
			<kit:chip onclick={() => (view = 'components')} active={view === 'components'}
				>Components</kit:chip
			>
			<kit:chip onclick={() => (view = 'dashboard')} active={view === 'dashboard'}
				>Dashboard</kit:chip
			>
		</kit:toolbar>

		<kit:card>
			{#if view === 'components'}
				<kit:card-content class="grid_discover_components">
					<div>
						<Input />
						<Dropdown />
						<List />
					</div>
					<div>
						<Avatar />
						<Actions />
						<Card />
						<Alert />
					</div>
					<div>
						<Toolbar />
					</div>
				</kit:card-content>
			{/if}
		</kit:card>
	</div>
</section>

<style lang="scss">
	section {
		padding-top: 8.75rem;
		padding-bottom: 8.75rem;

		div {
			display: grid;
			max-width: 1538px;
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

		:global(.grid_discover_components) {
			display: grid;
			grid-template-columns: auto auto auto;
		}
	}
</style>
