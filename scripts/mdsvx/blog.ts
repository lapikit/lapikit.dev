import type { ManifestEntry } from './types.ts';

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const WORDS_PER_MINUTE = 220;
const FRONTMATTER_BLOCK = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/;

// blog posts carry their own dates: "updated" (or "date") replaces the git date in the sitemap,
// and the SEO head is built from title/description so authors only write them once
export function normalizeBlogPost(entry: ManifestEntry, content: string): ManifestEntry {
	const where = entry.path.sourcePath;

	if (entry.path.slugSegments.length !== 1) {
		throw new Error(`Blog posts must sit directly in src/content/blog: ${where}`);
	}

	if (entry.layout !== 'blog_post') {
		throw new Error(`Missing "layout: 'blog_post'" in frontmatter: ${where}`);
	}

	const description = requireString(entry, 'description');
	const author = requireString(entry, 'author');
	const date = requireDate(entry, 'date');
	const updated = entry.updated == null ? undefined : requireDate(entry, 'updated');

	if (updated && updated < date) {
		throw new Error(`"updated" (${updated}) is before "date" (${date}): ${where}`);
	}

	return {
		...entry,
		category: 'Blog',
		description,
		author,
		date,
		...(updated && { updated }),
		head: { title: entry.title, description },
		lastModified: updated ?? date,
		readingTime: getReadingTime(content)
	};
}

function requireString(entry: ManifestEntry, key: string) {
	const value = entry[key];

	if (typeof value !== 'string' || !value.trim()) {
		throw new Error(`Missing "${key}" in frontmatter: ${entry.path.sourcePath}`);
	}

	return value.trim();
}

function requireDate(entry: ManifestEntry, key: string) {
	const value = requireString(entry, key);

	if (!ISO_DATE.test(value) || Number.isNaN(Date.parse(value))) {
		throw new Error(
			`"${key}" must be a quoted YYYY-MM-DD date (got "${value}"): ${entry.path.sourcePath}`
		);
	}

	return value;
}

// minutes, rounded up: code blocks and markup count as words, close enough for an estimate
function getReadingTime(content: string) {
	const words = content.replace(FRONTMATTER_BLOCK, '').split(/\s+/).filter(Boolean).length;

	return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
