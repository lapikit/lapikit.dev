import { PUBLIC_BASE_URL } from '$env/static/public';
import { urlLapikitLibraryRepo, urlLapikitSiteRepo } from '$lib/constants';

export const siteUrl = PUBLIC_BASE_URL.replace(/\/$/, '');

export const docEditUrl = (sourcePath: string) => `${urlLapikitSiteRepo}/edit/main/${sourcePath}`;

export function docIssueUrl(topic: string, pathname: string) {
	const params = new URLSearchParams({
		title: `[${topic}] `,
		body: `Documentation page: ${siteUrl}${pathname}\n\n`
	});
	return `${urlLapikitLibraryRepo}/issues/new?${params}`;
}
