import type { Pathname } from '$app/types';

export type MarkdownHeading = {
	depth: 1 | 2 | 3;
	slug: string;
	value: string;
};

export type DocPath = {
	sourcePath: string;
	slug: string;
	slugSegments: string[];
	pathname: string;
};

export type DocSummary = {
	title: string;
	state?: 'deprecated';
	category?: string;
	keywords?: string[];
	/** ISO date of the last commit on the source file, missing when git is unavailable */
	lastModified?: string;
	head?: {
		title?: string;
		description?: string;
	};
	path: DocPath;
} & Record<string, unknown>;

export type ReplFile = { code: string; lang: string };

export type DocBlock =
	| { type: 'html'; html: string }
	| { type: 'callout'; html: string }
	| {
			type: 'repl';
			content: string | Record<string, ReplFile>;
			lang?: string;
			title?: string;
			presentation: boolean;
			demo?: string;
	  }
	| { type: 'command'; key: string; selected: boolean }
	| { type: 'demo'; path: string }
	| { type: 'component'; name: string; props: Record<string, string> };

export type RenderedDoc = {
	blocks: DocBlock[];
	summary: MarkdownHeading[];
};

export type DocSuggestion = { title: string; path: Pathname };

export type SearchEntry = {
	pathname: string;
	title: string;
	label: string;
	description?: string;
	category?: string;
	keywords?: string[];
	deprecated?: boolean;
};

export type NavPage = {
	label: string;
	name?: string;
	url: string;
	description?: string;
	image?: string;
	icon?: string;
};

export type NavSection = {
	label: string;
	pages: NavPage[];
};

export type DocLink = {
	slug: string;
	title: string;
	path: string;
};

export type DocCounts = {
	components: number;
	hooks: number;
};

export type AppNavChild = {
	label: string;
	path: string;
};

export type AppNavItem = {
	label: string;
	path?: string;
	child?: AppNavChild[];
};

export type BreadcrumbItem = {
	label: string;
	href?: Pathname;
};

export type BreadcrumbListSchema = {
	'@context': 'https://schema.org';
	'@type': 'BreadcrumbList';
	itemListElement: Array<{
		'@type': 'ListItem';
		position: number;
		name: string;
		item?: string;
	}>;
};

export type NpmStats = {
	version: { latest: string; insiders: string };
	downloads: string;
};

export type GithubStats = {
	stars: string;
};
