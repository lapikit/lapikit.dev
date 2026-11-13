<div class="elevation-grid">
	<div class="elevation-item">
		<kit:sheet class="elevation-card" rounded="lg" elevation="2">"classic"</kit:sheet>
		<span class="text-xs">`2`</span>
	</div>
	<div class="elevation-item">
		<kit:sheet class="elevation-card" rounded="lg" elevation={{ base: '1', hover: '3' }}
			>"with hover"</kit:sheet
		>
		<span class="text-xs">`base: '1', hover: '3'`</span>
	</div>
	<div class="elevation-item">
		<kit:sheet class="elevation-card" rounded="lg" active elevation={{ base: '1', active: '4' }}
			>"with active"</kit:sheet
		>
		<span class="text-xs">`base: '1', active: '4' `</span>
	</div>
	<div class="elevation-item">
		<kit:sheet
			class="elevation-card"
			rounded="lg"
			elevation={{ base: '1', hover: '5', active: '2' }}>"all"</kit:sheet
		>
		<span class="text-xs">`base: '1', hover: '5', active: '2' `</span>
	</div>
</div>

<style lang="scss">
	.elevation-grid {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1.5rem;
		margin-top: 30px;
		margin-bottom: 30px;
	}

	.elevation-item {
		width: 8rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.elevation-item :global(.elevation-card) {
		width: 70%;
		aspect-ratio: 1;
		justify-content: center;
		align-items: center;
	}
</style>
