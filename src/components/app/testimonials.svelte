<script lang="ts">
	// assets
	import githubIcon from '$lib/assets/icons/github.svg?raw';
	import buymyecoffeeIcon from '$lib/assets/icons/buymeacoffee.svg?raw';
</script>

<section>
	<div>
		<h2>Go further with Lapikit</h2>
		<p class="paragraphe-ws">
			Explore our documentation and resources to get the most out of Lapikit:
		</p>

		<div class="layout_grid_testimonials">
			<kit:card>
				<kit:card-container>
					<kit:card-title>Developer Docs</kit:card-title>
					<kit:card-content>
						Explore all possibilities to create your app with lapikit
					</kit:card-content>
				</kit:card-container>
				<kit:card-actions>
					<kit:btn>Enter in the DDev docs</kit:btn>
				</kit:card-actions>
			</kit:card>
			<kit:card>
				<kit:card-container>
					<kit:card-title>Community</kit:card-title>
					<kit:card-content>
						Join the Discord Lapikit server for announcements, events, and discussions with fellow
						devs.
					</kit:card-content>
				</kit:card-container>
				<kit:card-actions>
					<kit:btn>Join the server</kit:btn>
				</kit:card-actions>
			</kit:card>
			<kit:card>
				<kit:card-container>
					<kit:card-title>Contribute</kit:card-title>
					<kit:card-content>
						Participate to the evolution of Lapikit project with your idea and features
					</kit:card-content>
				</kit:card-container>
				<kit:card-actions>
					<kit:btn icon>
						<kit:icon>
							{@html githubIcon}
						</kit:icon>
					</kit:btn>
					<kit:btn icon>
						<kit:icon>
							{@html buymyecoffeeIcon}
						</kit:icon>
					</kit:btn>
				</kit:card-actions>
			</kit:card>
		</div>
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

		p.paragraphe-ws {
			max-width: 80%;
			margin: 0 auto;
		}

		.layout_grid_testimonials {
			display: grid;
			grid-template-columns: 1fr;

			:global(.kit-card) {
				--kit-card-density-offset: 40px;
				justify-content: space-between;
				gap: 20px;

				:global(.kit-card-title) {
					font-size: 24px;
					margin-bottom: 10px;
				}

				:global(.kit-card-title),
				:global(.kit-card-content),
				:global(.kit-card-actions) {
					text-align: center;
					justify-content: center;
				}
			}
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

			.layout_grid_testimonials {
				display: grid;
				grid-template-columns: 1fr 1fr 1fr;
			}
		}
	}
</style>
