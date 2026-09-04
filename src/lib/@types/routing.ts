export type NavPage = {
	label: string;
	url: string;
	description?: string;
	image?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IconComponent = new (...args: any[]) => any;

export type NavSection = {
	label: string;
	icon: string | IconComponent;
	pages: NavPage[];
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
