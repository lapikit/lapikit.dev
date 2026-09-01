<script lang="ts">
	import { ChevronRight, Pen, SquarePlus, ThumbsUp } from 'lucide-svelte';
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
	<h2>See them in action</h2>

	<div class="grid_discover_components">
		<kit:card id="card-span-7" background="surface-2">
			<kit:card-container>
				<Btn />
			</kit:card-container>
			<Actions title="btn" path="/" />
		</kit:card>
		<kit:card id="card-span-5" background="surface-2">
			<kit:card-container>
				<Dropdown />
			</kit:card-container>
			<Actions title="dropdown" path="/" />
		</kit:card>
		<kit:card id="card-span-8" background="surface-2">
			<kit:card-container>
				<List />
			</kit:card-container>
			<Actions title="list" path="/" />
		</kit:card>
		<kit:card id="card-span-4" background="surface-2">
			<kit:card-container>
				<Toolbar />
			</kit:card-container>
			<Actions title="toolbar" path="/" />
		</kit:card>
	</div>
</section>

<style lang="scss">
	section {
		max-width: 1538px;
		margin: 40px auto 0;
		padding-left: 24px;
		padding-right: 24px;
	}

	h2 {
		font-size: 24px;
		line-height: 1;
		width: fit-content;
		margin-bottom: 42px;
	}

	@media (min-width: 640px) {
		h2 {
			font-size: 48px;
			line-height: 1;
		}
	}

	.grid_discover_components {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		gap: 16px;

		:global(.kit-card-container) {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
		}

		:global(#card-span-7),
		:global(#card-span-5),
		:global(#card-span-8),
		:global(#card-span-4) {
			grid-column: span 12;
			height: 180px;
		}

		@media (min-width: 467px) {
			:global(#card-span-7),
			:global(#card-span-5),
			:global(#card-span-8),
			:global(#card-span-4) {
				grid-column: span 6 !important;
				height: 240px;
			}
		}

		@media (min-width: 767px) {
			:global(#card-span-7) {
				grid-column: span 7 !important;
				height: 340px !important;
			}

			:global(#card-span-5) {
				grid-column: span 5 !important;
				height: 340px !important;
			}

			:global(#card-span-8) {
				grid-column: span 8 !important;
			}

			:global(#card-span-4) {
				grid-column: span 4 !important;
			}
		}
	}
</style>
