const with_changelog = process.argv.includes('--changelog');

await import('./last-modified/index.ts');

if (with_changelog) {
	await import('./sync-changelog/index.ts');
}
