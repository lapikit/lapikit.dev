import { PUBLIC_BASE_URL } from '$env/static/public';
import { posts } from '$lib/blog';

export const prerender = true;

const FEED_TITLE = 'Lapikit Blog';
const FEED_DESCRIPTION = 'News, release notes, guides and behind the scenes of Lapikit.';

export async function GET() {
	const baseUrl = PUBLIC_BASE_URL.replace(/\/$/, '');
	const lastBuildDate = posts
		.map((post) => post.updated ?? post.date)
		.sort()
		.at(-1);

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${FEED_TITLE}</title>
    <link>${baseUrl}/blog</link>
    <description>${FEED_DESCRIPTION}</description>
    <language>en</language>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml" />${
			lastBuildDate
				? `
    <lastBuildDate>${toRfc822(lastBuildDate)}</lastBuildDate>`
				: ''
		}
${posts
	.map(
		(post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}${post.path.pathname}</link>
      <guid isPermaLink="true">${baseUrl}${post.path.pathname}</guid>
      <description>${escapeXml(post.description)}</description>
      <dc:creator>${escapeXml(post.author)}</dc:creator>
      <pubDate>${toRfc822(post.date)}</pubDate>
    </item>`
	)
	.join('\n')}
  </channel>
</rss>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8'
		}
	});
}

function toRfc822(date: string) {
	return new Date(date).toUTCString();
}

function escapeXml(value: string) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}
