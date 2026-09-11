<script lang="ts">
	//assets
	import { ArrowLeft, ArrowRight, Minus, PictureInPicture2, X } from 'lucide-svelte';
</script>

<div id="vs-code-header">
	<div>
		<div class="fake-btn">File</div>
		<div class="fake-btn">Edit</div>
		<div class="fake-btn">Select</div>
		<div class="fake-btn">...</div>
	</div>

	<div>
		<div class="fake-btn-icon">
			<kit:icon>
				<ArrowLeft />
			</kit:icon>
		</div>
		<div class="fake-btn-icon">
			<kit:icon>
				<ArrowRight />
			</kit:icon>
		</div>
		<div class="fake-input">lapikit-svelte-project</div>
	</div>

	<div>
		<div class="fake-btn-icon">
			<kit:icon>
				<Minus />
			</kit:icon>
		</div>
		<div class="fake-btn-icon">
			<kit:icon>
				<PictureInPicture2 />
			</kit:icon>
		</div>
		<div class="fake-btn-icon">
			<kit:icon>
				<X />
			</kit:icon>
		</div>
	</div>
</div>

<style lang="scss">
	#vs-code-header {
		width: 100%;
		height: 32px;
		display: grid;
		grid-template-columns: min-content 1fr auto;
		align-items: center;
		color: var(--kit-color-font-vs-primary);
		background-color: var(--kit-color-vs-background);
		border-top-left-radius: var(--vs-shape);
		border-top-right-radius: var(--vs-shape);
		padding: 0 10px;

		> div {
			display: flex;
			justify-content: center;
			gap: 4px;

			&:nth-child(1) {
				font-size: 14px;
			}
		}

		.fake-input {
			font-size: 11px;
			display: flex;
			align-items: center;
			padding: 0px 10px;
			border: 1px solid var(--kit-color-vs-fill);
			border-radius: 6px;
			min-width: 40%;
			cursor: pointer;

			&:hover {
				background-color: var(--kit-color-vs-hover);
			}
		}

		.fake-btn {
			padding: 1px 5px;
			border-radius: 8px;
			cursor: pointer;

			&:hover {
				background-color: var(--kit-color-vs-hover);
			}
		}

		.fake-btn-icon {
			display: flex;
			align-items: center;
			height: 24px;
			width: 24px;
			border-radius: 9999px;
			justify-content: center;
			cursor: pointer;

			&:hover {
				background-color: var(--kit-color-vs-hover);
			}
		}
	}
</style>
