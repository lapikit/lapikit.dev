export * from './colors';
export * from './mdsvex';
export * from './breadcrumb';

export type SitemapEntry = {
	url: string;
	lastmod?: string;
	changefreq?: 'daily' | 'weekly' | 'monthly' | 'yearly';
	priority?: number;
};
