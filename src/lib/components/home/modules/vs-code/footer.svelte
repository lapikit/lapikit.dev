<script lang="ts">
	import { Bell, CircleX, Code, GitBranch, GitFork, RefreshCw, TriangleAlert } from 'lucide-svelte';
</script>

<div id="vs-code-footer">
	<div>
		<kit:icon>
			<Code />
		</kit:icon>

		<div class="fake-btn">
			<kit:icon>
				<GitFork />
			</kit:icon>

			develop
		</div>

		<div class="fake-btn-icon">
			<kit:icon>
				<RefreshCw />
			</kit:icon>
		</div>

		<div class="fake-btn-icon">
			<kit:icon>
				<GitBranch />
			</kit:icon>
		</div>

		<div class="fake-btn">
			<kit:icon>
				<CircleX />
			</kit:icon>
			<span>0</span>
			<kit:icon>
				<TriangleAlert />
			</kit:icon>
			<span>0</span>
		</div>
	</div>
	<div>
		<div class="fake-btn-icon">
			<kit:icon>
				<Bell />
			</kit:icon>
		</div>
	</div>
</div>

<style lang="scss">
	#vs-code-footer {
		width: 100%;
		height: 34px;
		background-color: var(--kit-color-vs-background);
		color: var(--kit-color-font-vs-primary);
		border-bottom-left-radius: var(--vs-shape);
		border-bottom-right-radius: var(--vs-shape);
		display: flex;
		justify-content: space-between;
		padding: 0 10px;

		> div {
			display: flex;
			gap: 6px;
			align-items: center;

			.fake-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 8px;
				font-size: 12px;
				padding: 0 6px;
				height: 24px;

				span {
					margin: 0 4px;
				}

				&:hover {
					background-color: var(--kit-color-vs-hover);
				}
			}

			.fake-btn-icon {
				width: 24px;
				height: 24px;
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 8px;

				&:hover {
					background-color: var(--kit-color-vs-hover);
				}
			}
		}
	}
</style>
