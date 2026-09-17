<script lang="ts">
	import { replVSCodeFiles } from '../../../../content/app/code';

	let { view }: { view: string } = $props();

	const lines = $derived(replVSCodeFiles[view] ?? []);
</script>

<div class="vs-ide text-code">
	{#each lines as line, index (index)}
		{#if line.type === 'blank'}
			<p class="return-line"></p>
		{:else}
			<p class={line.indent ? `vs-indent-${line.indent}` : undefined}>
				{#each line.tokens as token, tokenIndex (tokenIndex)}{#if typeof token === 'string'}{token}{:else}<span
							class={token.class}>{token.text}</span
						>{/if}{/each}
			</p>
		{/if}
	{/each}
</div>
