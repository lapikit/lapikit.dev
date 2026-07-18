export function slugify(value: string) {
	return value.toLowerCase().replaceAll(' ', '-');
}
