export function normalizePath(pathname: string) {
	return pathname.replace(/\/$/, '') || '/';
}

export function isCurrentPath(current: string, path?: string) {
	return !!path && normalizePath(current) === normalizePath(path);
}

export function isActivePath(current: string, path?: string) {
	if (!path) return false;

	const currentPath = normalizePath(current);
	const targetPath = normalizePath(path);

	if (targetPath === '/') return currentPath === '/';
	return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
}
