<script>
	// assets
	import { BugPlay, Search, Files, GitGraph, PackageCheck, Settings } from 'lucide-svelte';
</script>

<div id="vs-code-aside">
	<div>
		<div class="fake-btn-icon is-active">
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
		<kit:avatar size="xs" s-style_margin="0 auto">N</kit:avatar>

		<div class="fake-btn-icon">
			<kit:icon>
				<Settings />
			</kit:icon>
		</div>
	</div>
</div>

<style lang="scss">
	#vs-code-aside {
		padding: 8px 6px;
		border-right: 1px solid var(--kit-color-vs-fill);
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		> div {
			display: grid;
			justify-content: center;
		}

		.fake-btn-icon {
			--kit-icon-current-size: 22px;
			width: 40px;
			height: 40px;
			color: var(--kit-color-font-vs-secondary);
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 8px;
			cursor: pointer;

			&:hover {
				background-color: var(--kit-color-vs-hover);
			}

			&.is-active {
				background-color: var(--kit-color-vs-active);
				color: var(--kit-color-font-vs-tertiary);
			}
		}
	}
</style>
