<kit:card class="discover_component_card">
	<kit:card-title>
		<kit:avatar label="LK"></kit:avatar>
		<div class="title">
			<p>Lapikit</p>
			<span>@lapikit</span>
		</div>
	</kit:card-title>
	<kit:card-content>
		Building the future of UI for web & mobile. <br />
		Nycolaide
	</kit:card-content>
	<kit:card-actions>
		<span>4</span>
		Following
		<span>12</span>
		Followers
	</kit:card-actions>
</kit:card>

<style lang="scss">
	:global(.discover_component_card) {
		.title {
			margin-left: 8px;
			line-height: 1;
			span {
				color: var(--kit-color-text-muted);
				font-size: var(--kit-font-sm);
			}
		}

		:global(.kit-card-actions) {
			color: var(--kit-color-text-muted);
			font-size: var(--kit-font-sm);

			span {
				font-weight: 600;
				color: var(--kit-color-text);
			}
		}
	}
</style>
