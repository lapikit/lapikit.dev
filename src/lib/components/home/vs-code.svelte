<script lang="ts">
	import {
		ArrowLeft,
		ArrowRight,
		Files,
		GitGraph,
		Search,
		Minus,
		PictureInPicture2,
		X,
		BugPlay,
		PackageCheck,
		Settings
	} from 'lucide-svelte';
	import VsCodeTreemap from './vs-code-treemap.svelte';
	import VsCodeCode from './vs-code-code.svelte';
	import VsCodePreview from './vs-code-preview.svelte';
</script>

<div id="vs-code">
	<div>
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
			<div class="fake-btn-icon minimize">
				<kit:icon>
					<Minus />
				</kit:icon>
			</div>
			<div class="fake-btn-icon extend">
				<kit:icon>
					<PictureInPicture2 />
				</kit:icon>
			</div>
			<div class="fake-btn-icon close">
				<kit:icon>
					<X />
				</kit:icon>
			</div>
		</div>
	</div>
	<div>
		<div>
			<div>
				<div class="fake-btn-icon">
					<kit:icon>
						<Files />
					</kit:icon>
				</div>
				<div class="fake-btn-icon">
					<kit:icon>
						<Search />
					</kit:icon>
				</div>
				<div class="fake-btn-icon">
					<kit:icon>
						<GitGraph />
					</kit:icon>
				</div>
				<div class="fake-btn-icon">
					<kit:icon>
						<BugPlay />
					</kit:icon>
				</div>
				<div class="fake-btn-icon">
					<kit:icon>
						<PackageCheck />
					</kit:icon>
				</div>
			</div>

			<div>
				<kit:avatar size="sm" s-style_margin="0 auto">N</kit:avatar>

				<div class="fake-btn-icon">
					<kit:icon>
						<Settings />
					</kit:icon>
				</div>
			</div>
		</div>
		<div>
			<div>Explorer</div>
			<VsCodeTreemap />
		</div>
		<div><VsCodeCode /></div>
		<div><VsCodePreview /></div>
	</div>
	<div>footer</div>
</div>

<style lang="scss">
	div#vs-code {
		max-width: 1200px;
		background: orange;

		> div:nth-child(1) {
			width: 100%;
			height: 32px;
			display: grid;
			grid-template-columns: min-content 1fr auto;
			align-items: center;
			background-color: beige;

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
				padding: 4px;
				border: 1px solid red;
				border-radius: 6px;
				min-width: 40%;
			}

			.fake-btn {
				padding: 1px 5px;
				background: cyan;
				border-radius: 8px;
			}

			.fake-btn-icon {
				display: flex;
				align-items: center;
				height: 24px;
				width: 24px;
				border-radius: 9999px;
				background: pink;
				justify-content: center;
			}
		}
		> div:nth-child(2) {
			width: 100%;
			display: grid;
			grid-template-columns: 64px 200px 1fr 1fr;

			.fake-btn-icon {
				--kit-icon-current-size: 22px;
				width: 44px;
				height: 44px;
				background: brown;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 8px;
			}

			> div:nth-child(1) {
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				> div {
					display: grid;
					justify-content: center;
				}
			}
		}
		> div:nth-child(3) {
			width: 100%;
			height: 32px;
			background-color: burlywood;
		}
	}
</style>
