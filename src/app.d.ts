// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { BreadcrumbItem, DocCounts, DocSuggestion, DocSummary, NavSection } from '$lib/types';

declare global {
	namespace App {
		interface Error {
			message: string;
			suggestions?: DocSuggestion[];
		}
		// interface Locals {}
		interface PageData {
			navigation: NavSection[];
			counts: DocCounts;
			seo: DocSummary;
			breadcrumbs: BreadcrumbItem[];
		}
		// interface PageState {}
		// interface Platform {}
	}

	interface Window {
		dataLayer: unknown[];
		gtag?: (...args: unknown[]) => void;
	}
}

export {};
