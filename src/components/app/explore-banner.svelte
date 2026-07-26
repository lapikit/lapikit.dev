<script lang="ts">
</script>

<section>
	<div>
		<h2>Explore the futur library components on your apps</h2>

		<p class="paragraphe-ws">
			Simple setup, intuitive and natural use, Svelte-focused optimization with Runes—so, shall we
			get started?
		</p>

		<div>
			<kit:btn href="/docs/getting-started">Get started with Lapikit</kit:btn>
		</div>
	</div>
</section>

<style lang="scss">
	section {
		padding-top: 8.75rem;
		padding-bottom: 8.75rem;

		> div {
			display: grid;
			max-width: 640px;
			gap: 20px;
			text-align: center;
			margin: 0 auto;
			padding-left: 24px;
			padding-right: 24px;
		}

		h2 {
			font-size: 24px;
			line-height: 1;
		}

		p.paragraphe-ws {
			max-width: 80%;
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
	}
</style>
