export type NavPage = {
	label: string;
	name?: string;
	url: string;
	description?: string;
	image?: string;
	icon?: string;
};

export type NavSection = {
	label: string;
	pages: NavPage[];
};

export type DocLink = {
	slug: string;
	title: string;
	path: string;
};

export type DocCounts = {
	components: number;
	hooks: number;
};

export type AppNavChild = {
	label: string;
	path: string;
};

export type AppNavItem = {
	label: string;
	path?: string;
	child?: AppNavChild[];
};
