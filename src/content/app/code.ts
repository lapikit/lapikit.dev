type Code = {
	content: string;
	lapikit?: boolean;
	indent: number;
};

export type VsToken = string | { text: string; class: string };
export type VsLine = { type: 'blank' } | { type: 'line'; indent?: number; tokens: VsToken[] };

const span = (text: string, className: string): VsToken => ({ text, class: className });
const line = (indent: number, ...tokens: VsToken[]): VsLine => ({ type: 'line', indent, tokens });
const blank: VsLine = { type: 'blank' };

// SAMPLE TO USE DIRECTIVE LAPIKIT
export const replDirectiveSvelte: Code[] = [
	{ content: '<kit:btn s-class_padding="8px">', lapikit: true, indent: 0 },
	{
		content: 'Button s-class',
		indent: 1
	},
	{
		content: '</kit:btn>',
		lapikit: true,
		indent: 0
	},
	{ content: '<kit:btn s-style_background="purple">', lapikit: true, indent: 0 },
	{
		content: 'Button s-style',
		indent: 1
	},
	{
		content: '</kit:btn>',
		lapikit: true,
		indent: 0
	}
];

export const replDirectivePreCompil: Code[] = [
	{ content: '<button class="kit-btn padding-8px">', lapikit: true, indent: 0 },
	{
		content: 'Button s-class',
		indent: 1
	},
	{
		content: '</button>',
		lapikit: true,
		indent: 0
	},
	{ content: '<button', lapikit: true, indent: 0 },
	{ content: 'class="kit-btn"', indent: 1 },
	{ content: 'style="background: purple;"', indent: 1 },
	{ content: '>', lapikit: true, indent: 0 },
	{
		content: 'Button s-style',
		indent: 1
	},
	{
		content: '</button>',
		lapikit: true,
		indent: 0
	}
];

// SAMPLE TO USE COMPONENT LAPIKTI
export const replComponentSvelte: Code[] = [
	{ content: "<script lang='ts'>", indent: 0 },
	{ content: '...', indent: 1 },
	{
		content: '<' + '/script>',
		indent: 0
	},
	{
		content: '',
		indent: 0
	},
	{
		content: '<kit:list density="compact">',
		lapikit: true,
		indent: 0
	},
	{
		content: '{#each data as item (item)}',
		indent: 1
	},
	{
		content: '<kit:list-item>',
		lapikit: true,
		indent: 2
	},
	{
		content: '{item}',
		indent: 3
	},
	{
		content: '</kit:list-item>',
		lapikit: true,
		indent: 2
	},
	{
		content: '{/each}',
		indent: 1
	},
	{
		content: '</kit:list>',
		lapikit: true,
		indent: 0
	}
];

export const replComponentPreCompil: Code[] = [
	{ content: "<script lang='ts'>", indent: 0 },
	{ content: 'import {', indent: 1, lapikit: true },
	{ content: 'KitList,', indent: 2, lapikit: true },
	{ content: 'KitListItem', indent: 2, lapikit: true },
	{ content: "} from 'lapikit/components';", indent: 1, lapikit: true },
	{
		content: '',
		indent: 0
	},
	{ content: '...', indent: 1 },
	{
		content: '<' + '/script>',
		indent: 0
	},
	{
		content: '',
		indent: 0
	},
	{
		content: '<KitList density="compact">',
		lapikit: true,
		indent: 0
	},
	{
		content: '{#each data as item (item)}',
		indent: 1
	},
	{ content: '<KitListItem>', lapikit: true, indent: 2 },
	{ content: '{item}', indent: 3 },
	{ content: '</KitListItem>', lapikit: true, indent: 2 },
	{
		content: '{/each}',
		indent: 1
	},
	{
		content: '</KitList>',
		lapikit: true,
		indent: 0
	}
];

// VSCODE IDE PREVIEW - FAKE FILE CONTENTS

export const replVSCodeFiles: Record<string, VsLine[]> = {
	'layout.css': [
		line(0, span('#kit-app', 'css-class'), ' ', span(`  {`, 'accolade')),
		line(2, span('display', 'css-param'), ':', ' ', span(` grid`, 'css-value'), ';'),
		line(
			2,
			span('grid-template-rows', 'css-param'),
			':',
			' ',
			span(` min-content`, 'css-value'),
			' ',
			span(` 1fr`, 'css-value-num'),
			';'
		),
		line(2, span('position', 'css-param'), ':', ' ', span(` relative`, 'css-value'), ';'),
		line(2, span('height', 'css-param'), ':', ' ', span(` 100%`, 'css-value-num'), ';'),
		line(0, span('}', 'accolade'))
	],

	'+layout.svelte': [
		line(
			0,
			span('<', 'char'),
			span(`script`, 'dom'),
			' ',
			span('lang', 'param'),
			'=',
			span('"ts"', 'param'),
			span('>', 'char')
		),
		line(1, span(`import`, 'import'), ' ', span("'layout.css'", 'path'), ';'),
		blank,
		line(
			1,
			span(`let `, 'let'),
			' ',
			span('{', 'accolade'),
			span('children', 'function'),
			span('}', 'accolade'),
			' ',
			`=`,
			' ',
			span('$props', 'function'),
			' ',
			span('()', 'accolade'),
			';'
		),
		blank,
		line(0, span('</', 'char'), span('script', 'dom'), span('>', 'char')),
		blank,
		blank,
		line(0, span('<', 'char'), span('kit:app', 'dom'), span('>', 'char')),
		line(
			1,
			span('{', 'accolade'),
			'@',
			span(`render `, 'instruction'),
			' ',
			span('children', 'function'),
			span(`()`, 'function-par'),
			span('}', 'accolade')
		),
		line(0, span('</', 'char'), span('kit:app', 'dom'), span('>', 'char'))
	],

	'+page.svelte': [
		line(
			0,
			span('<', 'char'),
			span('script', 'dom'),
			' ',
			span('lang', 'param'),
			'=',
			span('"ts"', 'param'),
			span('>', 'char')
		),
		blank,
		line(
			1,
			span('import', 'import'),
			' ',
			span('{', 'accolade'),
			` ArrowRight `,
			span('}', 'accolade'),
			' ',
			span('from', 'import'),
			' ',
			span("'lucide-svelte'", 'path'),
			';'
		),
		line(0, span('</', 'char'), span('script', 'dom'), span('>', 'char')),
		blank,
		blank,
		line(1, span('<', 'char'), span('div', 'dom'), span('>', 'char')),
		line(2, span('<', 'char'), span('div', 'dom'), span('>', 'char')),
		blank,
		line(
			3,
			span('<', 'char'),
			span('kit:chip', 'dom'),
			' ',
			span('size', 'param'),
			'=',
			span('"sm"', 'param'),
			' ',
			span('rounded', 'param'),
			'=',
			span('"sm"', 'param'),
			' ',
			span('s-style_--kit-chip-p', 'param'),
			'=',
			span('"2px"', 'param'),
			span('>', 'char')
		),
		line(
			4,
			span('{', 'accolade'),

			'#',
			span('snipppet', 'function'),
			' ',
			span('prepend', 'snippet'),
			span(`()`, 'function'),
			span('}', 'accolade')
		),
		line(
			5,
			span('<', 'char'),
			span('kit:chip', 'dom'),
			' ',
			span('size', 'param'),
			'=',
			span('"xs"', 'param'),
			' ',
			span('rounded', 'param'),
			'=',
			span('"xs"', 'param'),
			' ',
			span('background', 'param'),
			'=',
			span('"accent"', 'param'),
			' ',
			span('color', 'param'),
			'=',
			span('"on-accent"', 'param'),
			span('/>', 'char')
		),
		line(6, 'Current'),
		line(5, span('</', 'char'), span('kit:chip', 'dom'), span('>', 'char')),
		line(4, span('{', 'accolade'), '/', span(`snipppet`, 'function'), span('}', 'accolade')),
		line(4, '1.0.0'),
		line(
			4,
			span('{', 'accolade'),
			'#',
			span('snipppet', 'function'),
			' ',
			span('append', 'snippet'),
			span(`()`, 'function'),
			span('}', 'accolade')
		),
		line(5, span('<', 'char'), span('kit:icon', 'dom'), span('>', 'char')),
		line(6, span('<', 'char'), span('ArrowRight', 'dom'), span('/>', 'char')),
		line(5, span('</', 'char'), span('kit:icon', 'dom'), span('>', 'char')),
		line(4, span('{', 'accolade'), '/', span('snipppet', 'function'), span('}', 'accolade')),
		line(3, span('<', 'char'), span('kit:chip', 'dom'), span('/>', 'char')),
		blank,
		line(
			3,
			span('<', 'char'),
			span('p', 'dom'),
			span('>', 'char'),
			' ',
			'Build your interface with low code',
			' ',
			span('</', 'char'),
			span('p', 'dom'),
			span('>', 'char')
		),
		blank,
		line(3, span('<', 'char'), span('div', 'dom'), span('>', 'char')),
		line(
			4,
			span('<', 'char'),
			span('kit:btn', 'dom'),
			' ',
			span('rounded', 'param'),
			'=',
			span('"lg"', 'param'),
			' ',
			span('background', 'param'),
			'=',
			span('"warning"', 'param'),
			' ',
			span('color', 'param'),
			'=',
			span('"on-warning"', 'param'),
			span('>', 'char')
		),
		line(5, 'Get started'),
		line(4, span('</', 'char'), span('kit:btn', 'dom'), span('>', 'char')),
		line(
			4,
			span('<', 'char'),
			span('kit:btn', 'dom'),
			' ',
			span('variant', 'param'),
			'=',
			span('"outline"', 'param'),
			' ',
			span('rounded', 'param'),
			'=',
			span('"lg"', 'param'),
			' ',
			span('color', 'param'),
			'=',
			span('"warning"', 'param'),
			span('>', 'char')
		),
		line(5, 'Learn more'),
		line(4, span('</', 'char'), span('kit:btn', 'dom'), span('>', 'char')),
		line(3, span('</', 'char'), span('div', 'dom'), span('>', 'char')),
		line(2, span('</', 'char'), span('div', 'dom'), span('>', 'char')),
		line(1, span('</', 'char'), span('div', 'dom'), span('>', 'char')),
		blank,
		line(0, span('</', 'char'), span('kit:app', 'dom'), span('>', 'char')),
		blank,
		blank,
		line(0, span('<', 'char'), span('style', 'dom'), span('>', 'char')),
		line(1, span('div:first-child', 'css-dom'), span(`()  {`, 'accolade')),
		line(2, span('display', 'css-param'), ':', span(` flex`, 'css-value'), ';'),
		line(2, span('align-items', 'css-param'), ':', span(` center`, 'css-value'), ';'),
		line(2, span('justify-content', 'css-param'), ':', span(` center`, 'css-value'), ';'),
		line(2, span('max-width', 'css-param'), ':', span(` 80%`, 'css-value-num'), ';'),
		line(2, span('margin', 'css-param'), ':', span(` 0 auto`, 'css-value-num'), ';'),
		line(1, span('}', 'accolade')),
		blank,
		line(
			1,
			span('div:first-child', 'css-dom'),
			' ',
			span('()', 'accolade'),
			' ',
			span(` >  div `, 'css-dom'),
			' ',
			span('{', 'accolade')
		),
		line(2, span('text-align', 'css-param'), ':', ' ', span(` center`, 'css-value'), ';'),
		line(1, span('}', 'accolade')),
		blank,
		line(1, span(`p `, 'css-dom'), ' ', span('{', 'accolade')),
		line(2, span('font-size', 'css-param'), ':', ' ', span(` 32px`, 'css-value-num'), ';'),
		line(2, span('margin', 'css-param'), ':', ' ', span(` 10px 0 20px`, 'css-value-num'), ';'),
		line(1, span('}', 'accolade')),
		line(0, span('</', 'char'), ' ', span('style', 'dom'), ' ', span('>', 'char'))
	],

	'Header.svelte': [
		line(
			0,
			span('<', 'char'),
			span('script', 'dom'),
			' ',
			span('lang', 'param'),
			'=',
			span('"ts"', 'param'),
			span('>', 'char')
		),
		line(
			1,
			span('import', 'import'),
			' ',
			span('{', 'accolade'),
			` createGlobalTheme, useTheme `,
			span('}', 'accolade'),
			' ',
			span('from', 'import'),
			' ',
			span("'lapikit/actions'", 'path'),
			';'
		),
		blank,
		line(
			1,
			span('import', 'import'),
			' ',
			` Logo `,
			' ',
			span('from', 'import'),
			' ',
			span("'$lib/assets/images/lapikit.webp'", 'path'),
			';'
		),
		line(
			1,
			span('import', 'import'),
			' ',
			span('{', 'accolade'),
			`Moon, Sun`,
			span('}', 'accolade'),
			' ',
			span('from', 'import'),
			' ',
			span("'lucide-svelte'", 'path'),
			';'
		),
		blank,
		line(
			1,
			span('const', 'const'),
			' ',
			span('app', 'var-name'),
			` = `,
			span('createGlobalTheme', 'function'),
			span('()', 'accolade'),
			';'
		),
		line(0, span('</', 'char'), span('script', 'dom'), span('>', 'char')),
		blank,
		blank,
		line(
			1,
			span('<', 'char'),
			span('kit:appbar', 'dom'),
			' ',
			span('density', 'param'),
			'=',
			span('"compact"', 'param'),
			' ',
			span('elevation', 'param'),
			'=',
			span('"2"', 'param'),
			span('>', 'char')
		),
		blank,
		line(
			2,
			span('<', 'char'),
			span('img', 'dom'),
			' ',
			span('src', 'param'),
			'=',
			span('{', 'accolade'),
			span('Logo', 'var-name'),
			span('}', 'accolade'),
			' ',
			span('alt', 'param'),
			'=',
			span('"alt logo lapikit"', 'param'),
			span('/>', 'char')
		),
		blank,
		line(2, span('<', 'char'), span('kit:spacer', 'dom'), span('/>', 'char')),
		blank,
		line(
			2,
			span('<', 'char'),
			span('kit:btn', 'dom'),
			' ',
			span('variant', 'param'),
			'=',
			span('"text"', 'param'),
			' ',
			span('size', 'param'),
			'=',
			span('"sm"', 'param'),
			span('>', 'low')
		),
		line(3, 'Features'),
		line(2, span('</', 'char'), span('kit:btn', 'dom'), span('>', 'char')),
		blank,
		line(
			2,
			span('<', 'char'),
			span('kit:btn', 'dom'),
			' ',
			span('variant', 'param'),
			'=',
			span('"text"', 'param'),
			' ',
			span('size', 'param'),
			'=',
			span('"sm"', 'param'),
			span('>', 'char')
		),
		line(3, 'About'),
		line(2, span('</', 'char'), span('kit:btn', 'dom'), span('>', 'char')),
		blank,
		line(
			2,
			span('<', 'char'),
			span('kit:btn', 'dom'),
			' ',
			span('size', 'param'),
			'=',
			span('"sm"', 'param'),
			span('>', 'char')
		),
		line(3, 'Discover'),
		line(2, span('</', 'char'), span('kit:btn', 'dom'), span('>', 'char')),
		blank,
		line(
			2,
			span('<', 'char'),
			span('kit:btn', 'dom'),
			' ',
			span('size', 'param'),
			'=',
			span('"sm"', 'param'),
			' ',
			span('icon', 'param'),
			' ',
			span('onclick', 'param'),
			'=',
			span('{', 'accolade'),
			span('()', 'function'),
			' ',
			span(`=>`, 'instruction'),
			' ',
			span('useTheme(', 'function'),
			span('app.active', 'var-name'),
			` ===  'dark'  ?  'light'  :  'dark'`,
			span(')', 'function'),
			span('}', 'accolade'),
			span('>', 'char')
		),
		line(3, span('<', 'char'), span('kit:icon', 'dom'), span('>', 'char')),
		line(
			4,
			span('{', 'accolade'),
			'#',
			span('if', 'function'),
			' ',
			span('app.active', 'var-name'),
			' ',
			`===`,
			' ',
			span(`'dark' `, 'param'),
			span('}', 'accolade')
		),
		line(5, span('<', 'char'), span('Sun', 'dom'), span('/>', 'char')),
		line(4, span('{', 'accolade'), ':', span(`else `, 'function'), span('}', 'accolade')),
		line(5, span('<', 'char'), span('Moon', 'dom'), span('/>', 'char')),
		line(4, span('{', 'accolade'), '/', span(`if `, 'function'), span('}', 'accolade')),
		line(3, span('</', 'char'), span('kit:icon', 'dom'), span('>', 'char')),
		line(2, span('</', 'char'), span('kit:btn', 'dom'), span('>', 'char')),
		blank,
		line(1, span('</', 'char'), span('kit:appbar', 'dom'), span('>', 'char')),
		blank,
		blank,
		line(0, span('<', 'char'), span('style', 'dom'), span('>', 'char')),
		line(1, span(`img `, 'css-dom'), span('{', 'accolade')),
		line(2, span('max-height', 'css-param'), ':', span(` 32px`, 'css-value-num'), ';'),
		line(1, span('}', 'accolade')),
		line(0, span('</', 'char'), span('style', 'dom'), span('>', 'char'))
	],

	'eslint.config.js': [
		line(
			0,
			span('import', 'import'),
			' ',
			` js `,
			' ',
			span('from', 'import'),
			' ',
			span("'@eslint/js'", 'path'),
			';'
		),
		line(
			0,
			span('import', 'import'),
			' ',
			` ts `,
			' ',
			span('from', 'import'),
			' ',
			span("'typescript-eslint'", 'path'),
			';'
		),
		line(
			0,
			span('import', 'import'),
			' ',
			` svelte `,
			' ',
			span('from', 'import'),
			' ',
			span("'eslint-plugin-svelte'", 'path'),
			';'
		),
		line(
			0,
			span('import', 'import'),
			' ',
			span('{', 'accolade'),
			' ',
			` defineConfig `,
			' ',
			span('}', 'accolade'),
			' ',
			span('from', 'import'),
			' ',
			span("'eslint/config'", 'path'),
			';'
		),
		line(
			0,
			span('import', 'import'),
			' ',
			`lapikitConfig`,
			' ',
			span('from', 'import'),
			' ',
			span("'eslint-config-lapikit'", 'path'),
			';'
		),
		blank,
		line(
			0,
			span('export default', 'import'),
			' ',
			span('defineConfig', 'function'),
			' ',
			span('(', 'accolade')
		),
		line(1, '...lapikitConfig', ' ', span(',', 'accolade')),
		line(
			1,
			span('js', 'var-name'),
			span('.', 'accolade'),
			span('configs', 'var-name'),
			span('.', 'accolade'),
			span('recommended', 'var-name'),
			span(',', 'accolade')
		),
		line(
			1,
			span('ts', 'var-name'),
			span('.', 'accolade'),
			span('configs', 'var-name'),
			span('.', 'accolade'),
			span('recommended', 'var-name'),
			span(',', 'accolade')
		),
		line(
			1,
			span('svelte', 'var-name'),
			span('.', 'accolade'),
			span('configs', 'var-name'),
			span('.', 'accolade'),
			span('recommended', 'var-name'),
			span(',', 'accolade')
		),
		line(0, span(')', 'accolade'))
	],

	'vite.config.ts': [
		line(
			0,
			span('import', 'import'),
			' ',
			span('{', 'accolade'),
			`sveltekit`,
			span('}', 'accolade'),
			' ',
			span('from', 'import'),
			' ',
			span("'@sveltejs/kit/vite'", 'path'),
			';'
		),
		line(
			0,
			span('import', 'import'),
			' ',
			span('{', 'accolade'),
			`defineConfig`,
			span('}', 'accolade'),
			' ',
			span('from', 'import'),
			' ',
			span("'vite'", 'path'),
			';'
		),
		line(
			0,
			span('import', 'import'),
			' ',
			span('{', 'accolade'),
			`lapikitPreprocess`,
			span('}', 'accolade'),
			' ',
			span('from', 'import'),
			' ',
			span("'lapikit/preprocess'", 'path'),
			';'
		),
		blank,
		line(
			0,
			span('export default', 'import'),
			' ',
			span('defineConfig', 'function'),
			span('(', 'accolade'),
			span('{', 'function-par')
		),
		line(1, 'plugin', span(':', 'param'), ' ', span('[', 'var-name')),
		line(2, span('sveltekit', 'function'), span('(', 'accolade'), span('{', 'function-par')),
		line(
			3,
			'preprocess',
			span(':', 'param'),
			' ',
			span('[', 'var-name'),
			span('lapikitPreprocess', 'function'),
			span('()', 'accolade'),
			span(']', 'var-name'),
			','
		),
		line(2, span('}', 'function-par'), span(')', 'accolade')),
		line(1, span(']', 'var-name')),
		line(0, span('}', 'function-par'), span(')', 'accolade'), ';')
	]
};
