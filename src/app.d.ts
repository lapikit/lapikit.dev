// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type {
	BreadcrumbItem,
	DocCounts,
	DocSuggestion,
	GitCommit,
	MarqueeComponent,
	NavSection,
	PageSeo
} from '$lib/types';

declare global {
	namespace App {
		interface Error {
			message: string;
			suggestions?: DocSuggestion[];
		}
		// interface Locals {}
		interface PageData {
			navigation?: NavSection[];
			counts: DocCounts;
			seo: PageSeo;
			breadcrumbs: BreadcrumbItem[];
			commits?: GitCommit[];
			components?: MarqueeComponent[];
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
