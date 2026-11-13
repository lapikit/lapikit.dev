const examples = import.meta.glob<string>('/content/examples/**/*', {
	eager: true,
	query: '?raw',
	import: 'default'
});

const fence_kinds = ['repl', 'command', 'demo', 'component'] as const;

type FenceKind = (typeof fence_kinds)[number];

export type ReplFileSource = { name: string; lang: string; path: string };

export type DocFence =
	| {
			kind: 'repl';
			lang?: string;
			title?: string;
			presentation: boolean;
			source?: string;
			demo?: string;
			files: ReplFileSource[];
			code: string;
	  }
	| { kind: 'command'; key: string; selected: boolean }
	| { kind: 'demo'; path: string }
	| { kind: 'component'; name: string; props: Record<string, string> };

export function exampleCode(path: string) {
	const code = examples[`/content/examples/${path}`];
	if (code === undefined) throw new Error(`Missing example: content/examples/${path}`);
	return code;
}

const isFenceKind = (word: string): word is FenceKind =>
	(fence_kinds as readonly string[]).includes(word);

function splitOptions(text: string) {
	const lines = text.split('\n');
	const options: Array<[string, string]> = [];

	while (lines[0]?.startsWith('/// ')) {
		const [key, ...value] = lines.shift()!.slice(4).split(':');
		options.push([key.trim(), value.join(':').trim()]);
	}

	return { options, body: lines.join('\n') };
}

export function parseFence(info: string | undefined, text: string): DocFence | null {
	const words = (info ?? '').trim().split(/\s+/);
	const kind = words.find(isFenceKind);
	if (!kind) return null;

	const lang = words.find((word) => word !== kind);
	const { options, body } = splitOptions(text);
	const option = (key: string) => options.find(([name]) => name === key)?.[1];
	const hasOption = (key: string) => options.some(([name]) => name === key);

	switch (kind) {
		case 'repl': {
			const example = option('example');
			return {
				kind,
				lang,
				title: option('title'),
				presentation: hasOption('presentation'),
				source: example ?? option('source'),
				demo: example ?? option('demo'),
				files: options
					.filter(([name]) => name === 'file')
					.map(([, value]) => {
						const [fileName, fileLang, path] = value.split('|').map((part) => part.trim());
						return { name: fileName, lang: fileLang, path };
					}),
				code: body
			};
		}
		case 'command':
			return { kind, key: body.trim(), selected: hasOption('selected') };
		case 'demo':
			return { kind, path: body.trim() };
		case 'component': {
			const [name, ...rest] = body.trim().split(/\s+/);
			const props = Object.fromEntries(
				[...rest.join(' ').matchAll(/([\w-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value])
			);
			return { kind, name, props };
		}
	}
}
