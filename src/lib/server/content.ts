import type { DocCounts, DocLink, NavPage, NavSection } from '$lib/@types';
import { readFrontmatter } from './frontmatter';

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
	prev: DocLink | null;
	next: DocLink | null;
};

const sources = import.meta.glob<string>('/content/docs/**/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

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

		return {
			file: file.slice(1),
			slug,
			path: slug ? `/docs/${slug}` : '/docs',
			source: sources[file],
			metadata: readFrontmatter(sources[file]) as DocMetadata,
			prev: null,
			next: null
		};
	});
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

const pages = createPages();
const navigation = createNavigation(pages);
linkNavigation(pages, navigation);

export const docs = {
	pages: Object.fromEntries(pages.map((page) => [page.path, page])),
	navigation,
	counts: countPages(navigation)
};
