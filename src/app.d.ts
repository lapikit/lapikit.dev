// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type {
	BreadcrumbItem,
	DocCounts,
	DocSuggestion,
	DocSummary,
	GitCommit,
	NavSection
} from '$lib/types';

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
			commits?: GitCommit[];
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
