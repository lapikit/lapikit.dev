import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { appendFileSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';

// Accessibility report (WCAG 2.1 AA): never fails, it only describes the current state.
// Run it with `bun run test:a11y`: each run writes reports/a11y-<date>_<time>.md
// and compares its numbers with the previous report to show the evolution.

const manifest: { path: { pathname: string } }[] = JSON.parse(
	readFileSync('src/manifest.json', 'utf8')
);

type Issue = { impact: string; help: string; url: string; pages: string[]; elements: string[] };

const IMPACT_ORDER = ['critical', 'serious', 'moderate', 'minor'];
const REPORTS_DIR = 'reports';

// e.g. 2026-09-23_18-42, sortable so the latest report is the last one
function timestamp(date = new Date()) {
	const pad = (value: number) => String(value).padStart(2, '0');
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}_${pad(date.getHours())}-${pad(date.getMinutes())}`;
}

// reads the elements count per rule from the table of the latest report
function readPreviousReport(): { file: string; elements: Map<string, number> } | null {
	const reports = readdirSync(REPORTS_DIR)
		.filter((file) => /^a11y-.+\.md$/.test(file))
		.sort();
	const file = reports.at(-1);
	if (!file) return null;

	const elements = new Map<string, number>();
	for (const line of readFileSync(`${REPORTS_DIR}/${file}`, 'utf8').split('\n')) {
		const row = line.match(/^\| \w+ \| \[([\w-]+)\]\(.*?\) \| \d+ \| (\d+) \|/);
		if (row) elements.set(row[1], Number(row[2]));
	}
	return { file, elements };
}

function formatChange(current: number, previous: number | undefined) {
	if (previous === undefined) return 'new';
	if (current === previous) return '=';
	return current < previous ? `✅ ${current - previous}` : `❌ +${current - previous}`;
}

test('accessibility report @a11y', async ({ page }) => {
	test.setTimeout(manifest.length * 15_000);

	// no animations so the audited page is always the same
	await page.emulateMedia({ reducedMotion: 'reduce' });

	const issues = new Map<string, Issue>();

	for (const { path } of manifest) {
		await page.goto(path.pathname, { waitUntil: 'networkidle' });

		const { violations } = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
			.analyze();

		for (const violation of violations) {
			const issue = issues.get(violation.id) ?? {
				impact: violation.impact ?? 'minor',
				help: violation.help,
				url: violation.helpUrl,
				pages: [],
				elements: []
			};
			issue.pages.push(path.pathname);
			issue.elements.push(...violation.nodes.map((node) => node.target.join(' ')));
			issues.set(violation.id, issue);
		}
	}

	const sorted = [...issues.entries()].sort(
		([, a], [, b]) =>
			IMPACT_ORDER.indexOf(a.impact) - IMPACT_ORDER.indexOf(b.impact) ||
			b.elements.length - a.elements.length
	);

	mkdirSync(REPORTS_DIR, { recursive: true });
	const previous = readPreviousReport();
	const fixedRules = [...(previous?.elements.keys() ?? [])].filter((rule) => !issues.has(rule));

	const lines = [
		`# Accessibility report — ${timestamp()
			.replace('_', ' ')
			.replace(/-(\d\d)$/, ':$1')}`,
		'',
		`${sorted.length} rules violated on ${manifest.length} pages (WCAG 2.1 AA).`,
		previous ? `Evolution compared with \`${previous.file}\`.` : 'First report: no evolution yet.',
		'',
		'| Impact | Rule | Pages | Elements | Evolution | Problem |',
		'| --- | --- | --- | --- | --- | --- |',
		...sorted.map(
			([id, issue]) =>
				`| ${issue.impact} | [${id}](${issue.url}) | ${issue.pages.length} | ${issue.elements.length} | ${previous ? formatChange(issue.elements.length, previous.elements.get(id)) : '-'} | ${issue.help} |`
		),
		...(fixedRules.length > 0
			? [
					'',
					`Fixed since the previous report: ${fixedRules.map((rule) => `✅ \`${rule}\``).join(', ')}`
				]
			: []),
		'',
		'## Examples',
		...sorted.flatMap(([id, issue]) => [
			'',
			`### ${id}`,
			'',
			`Pages: ${issue.pages.slice(0, 5).join(', ')}${issue.pages.length > 5 ? ` and ${issue.pages.length - 5} more` : ''}`,
			'',
			// the same element (e.g. the navbar) is repeated on every page, show it once
			...[...new Set(issue.elements)].slice(0, 5).map((element) => `- \`${element}\``)
		]),
		''
	];
	const report = lines.join('\n');

	const file = `${REPORTS_DIR}/a11y-${timestamp()}.md`;
	writeFileSync(file, report);

	// on GitHub Actions, the report is shown on the run summary page
	if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, report);

	console.log(`Accessibility: ${sorted.length} rules violated, report in ${file}`);
});
