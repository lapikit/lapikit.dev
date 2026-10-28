<script lang="ts"></script>

<footer>
	<div class="footer-stretch">
		<p class="block">logo Lapikit</p>
	</div>
	<div class="footer-stretch">
		<div class="block copyright">Copyright</div>
		<div class="block social">Social links</div>
	</div>
</footer>

<style lang="scss">
	footer {
		max-width: var(--lapikit-container-size);
		margin: 0 auto;
		display: grid;

		.footer-stretch {
			padding-left: 24px;
			padding-right: 24px;

			&:last-child {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				width: 100%;
			}
		}

		.block {
			padding: var(--lapikit-spacing-block);
		}
	}
</style>
