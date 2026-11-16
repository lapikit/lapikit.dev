import { docs } from '$lib/server/content';

export function load() {
	return { navigation: docs.navigation };
}
