<script lang="ts">
	let isActive = $state(true);
</script>

<!-- Result: class="kit-card my-card active" -->
<kit:card class={['my-card', { active: isActive }]}>
	<kit:card-content>Card</kit:card-content>
</kit:card>
