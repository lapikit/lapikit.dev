import type { MarkdownHeading } from './mdsvex';

export type DocBlock = { type: 'html'; html: string } | { type: 'callout'; html: string };

export type RenderedDoc = {
	blocks: DocBlock[];
	summary: MarkdownHeading[];
};
