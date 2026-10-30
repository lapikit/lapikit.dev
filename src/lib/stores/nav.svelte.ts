import { createContext } from 'svelte';

export class NavState {
	open = $state(false);

	toggle = () => {
		this.open = !this.open;
	};

	close = () => {
		this.open = false;
	};
}

export const [getNavContext, setNavContext] = createContext<NavState>();
