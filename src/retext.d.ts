declare module 'retext' {
	type RetextProcessor = {
		use(plugin: unknown, options?: Record<string, unknown>): RetextProcessor;
		processSync(text: string): { toString(): string };
	};

	export default function retext(): RetextProcessor;
}

declare module 'retext-smartypants' {
	const smartypants: unknown;
	export default smartypants;
}
