type Code = {
	content: string;
	lapikit?: boolean;
	indent: number;
};

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
