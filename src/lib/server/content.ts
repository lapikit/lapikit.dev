import { building } from '$app/environment';
import type { DocCounts, DocLink, DocSummary, NavPage, NavSection } from '$lib/types';
import last_modified from '$lib/generated/last-modified.json';
import { readFrontmatter, type FrontmatterData } from './frontmatter';

type DocNavigation = {
	label: string;
	name?: string;
	description?: string;
	image?: string;
};

type DocMetadata = {
	title: string;
	category?: string;
	head?: { title?: string };
	navigation?: DocNavigation;
};

export type DocPage = {
	file: string;
	slug: string;
	path: string;
	source: string;
	metadata: DocMetadata;
	summary: DocSummary;
	prev: DocLink | null;
	next: DocLink | null;
};

export type SheetPage = {
	file: string;
	source: string;
	summary: DocSummary;
};

const sources = import.meta.glob<string>('/content/docs/**/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

const sheet_sources = import.meta.glob<string>('/content/pages/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

const home: DocSummary = {
	title: 'Lapikit',
	type: 'website',
	head: {
		title: 'Lapikit',
		description:
			'Lapikit is a fast Svelte component library with reusable components, hooks, theming tools and documentation built for speed and discoverability.'
	},
	path: { sourcePath: 'src/routes/(site)/+page.svelte', slug: '', slugSegments: [], pathname: '/' }
};

const dates: Record<string, string> = last_modified;

// Google shows roughly 120 to 160 characters: shorter wastes the snippet, longer gets cut.
// A warning only, so a missing description never blocks a deploy
const description_min = 70;
const description_max = 160;

const component_images = import.meta.glob<string>('/src/lib/assets/images/components/*.webp', {
	eager: true,
	query: '?no-inline',
	import: 'default'
});

const component_icons = import.meta.glob<string>('/src/lib/assets/images/components/*_icon.png', {
	eager: true,
	query: '?format=webp',
	import: 'default'
});

const order_prefix = /(^|\/)\d+-/g;
const components_dir = '/src/lib/assets/images/components';

const toSlug = (file: string) =>
	file
		.replace('/content/docs/', '')
		.replace(order_prefix, '$1')
		.replace(/(^|\/)index\.md$/, '')
		.replace(/\.md$/, '');

const orderKey = (file: string) => file.replace(/\/index\.md$/, '/00-index.md');

function createPages() {
	const files = Object.keys(sources).sort((a, b) => (orderKey(a) < orderKey(b) ? -1 : 1));

	return files.map((file): DocPage => {
		const slug = toSlug(file);
		const path = slug ? `/docs/${slug}` : '/docs';
		const frontmatter = readFrontmatter(sources[file]);

		return {
			file: file.slice(1),
			slug,
			path,
			source: sources[file],
			metadata: frontmatter as DocMetadata,
			summary: toSummary(file.slice(1), slug, path, frontmatter),
			prev: null,
			next: null
		};
	});
}

function createSheetPages() {
	return Object.entries(sheet_sources).map(([file, source]): [string, SheetPage] => {
		const slug = file.replace('/content/pages/', '').replace(/\.md$/, '');
		const summary = toSummary(file.slice(1), slug, `/${slug}`, readFrontmatter(source));

		return [summary.path.pathname, { file: file.slice(1), source, summary }];
	});
}

function toSummary(
	sourcePath: string,
	slug: string,
	pathname: string,
	frontmatter: FrontmatterData
): DocSummary {
	const data = { ...frontmatter };
	delete data.navigation;

	if (typeof data.title !== 'string' || !data.title.trim()) {
		throw new Error(`Missing "title" in frontmatter: ${sourcePath}`);
	}

	const lastModified = dates[sourcePath];

	return {
		...data,
		title: data.title.trim(),
		...(lastModified && { lastModified }),
		path: { sourcePath, slug, slugSegments: slug ? slug.split('/') : [], pathname }
	};
}

function toNavPage({ path, slug }: DocPage, navigation: DocNavigation): NavPage {
	const asset = `${components_dir}/${navigation.image ?? slug.split('/').at(-1)}`;

	return {
		label: navigation.label,
		url: path,
		...(navigation.name && {
			name: navigation.name,
			image: component_images[`${asset}.webp`],
			icon: component_icons[`${asset}_icon.png`]
		}),
		...(navigation.description && { description: navigation.description })
	};
}

function createNavigation(pages: DocPage[]) {
	const sections: NavSection[] = [];

	for (const page of pages) {
		const { category, navigation } = page.metadata;
		if (!category || !navigation) continue;

		let section = sections.find(({ label }) => label === category);
		if (!section) sections.push((section = { label: category, pages: [] }));

		section.pages.push(toNavPage(page, navigation));
	}

	return sections;
}

function linkNavigation(pages: DocPage[], navigation: NavSection[]) {
	const byPath = new Map(pages.map((page) => [page.path, page]));
	const ordered = navigation.flatMap((section) => section.pages.map(({ url }) => byPath.get(url)!));

	const toLink = ({ slug, path, metadata }: DocPage): DocLink => ({
		slug,
		title: metadata.head?.title || metadata.title,
		path
	});

	ordered.forEach((page, index) => {
		const prev = ordered[index - 1];
		const next = ordered[index + 1];
		page.prev = prev ? toLink(prev) : null;
		page.next = next ? toLink(next) : null;
	});
}

function countPages(navigation: NavSection[]): DocCounts {
	const sectionPages = (label: string) =>
		navigation.find((section) => section.label === label)?.pages ?? [];

	return {
		components: sectionPages('Components').filter((page) => page.name).length,
		hooks: sectionPages('Stores and Hooks').filter((page) => page.description).length
	};
}

function warnOnWeakDescriptions(entries: DocSummary[]) {
	for (const entry of entries) {
		if (entry.state === 'deprecated') continue;

		const description = entry.head?.description?.trim() ?? '';
		const where = `${entry.path.pathname} (${entry.path.sourcePath})`;

		if (!description) {
			console.warn(`[content] missing head.description: ${where}`);
		} else if (description.length < description_min || description.length > description_max) {
			console.warn(
				`[content] head.description is ${description.length} chars, aim for ${description_min}-${description_max}: ${where}`
			);
		}
	}
}

const pages = createPages();
const navigation = createNavigation(pages);
linkNavigation(pages, navigation);

const sheet_pages = createSheetPages();

const summaries = [
	home,
	...sheet_pages.map(([, page]) => page.summary),
	...pages.map((page) => page.summary)
].sort((left, right) => left.path.pathname.localeCompare(right.path.pathname));

if (building) warnOnWeakDescriptions(summaries);

export const docs = {
	pages: Object.fromEntries(pages.map((page) => [page.path, page])),
	navigation,
	counts: countPages(navigation)
};

export const sheets: Record<string, SheetPage> = Object.fromEntries(sheet_pages);

export const site = {
	pages: summaries,
	byPath: new Map(summaries.map((entry) => [entry.path.pathname, entry]))
};
