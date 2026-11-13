<script lang="ts">
	import { User, Mail, Phone, ChevronRight } from 'lucide-svelte';
</script>

<kit:list style="max-width: 280px;">
	<kit:list-item is="button">
		{#snippet prepend()}<kit:icon><User /></kit:icon>{/snippet}
		Profile
		{#snippet append()}<kit:icon size="sm"><ChevronRight /></kit:icon>{/snippet}
	</kit:list-item>
	<kit:list-item is="button">
		{#snippet prepend()}<kit:icon><Mail /></kit:icon>{/snippet}
		Email
		{#snippet append()}<kit:icon size="sm"><ChevronRight /></kit:icon>{/snippet}
	</kit:list-item>
	<kit:list-item is="button">
		{#snippet prepend()}<kit:icon><Phone /></kit:icon>{/snippet}
		Phone
		{#snippet append()}<kit:icon size="sm"><ChevronRight /></kit:icon>{/snippet}
	</kit:list-item>
</kit:list>
