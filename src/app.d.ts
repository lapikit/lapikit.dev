// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { DocCounts, NavSection } from '$lib/@types';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			navigation: NavSection[];
			counts: DocCounts;
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
