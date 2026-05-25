import { existsSync, readFileSync, writeFileSync } from 'fs';

const ROBOTS_PATH = 'static/robots.txt';
const ENV_PATH = '.env';

const ROBOTS_NOINDEX = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow: /
`;


function isProd(): boolean {
	if (!existsSync(ENV_PATH)) return false;
	const env = readFileSync(ENV_PATH, 'utf-8');
	return env.split('\n').some((line) => line.trim() === 'PUBLIC_DEV="false"');
}

if (!isProd()) {
	writeFileSync(ROBOTS_PATH, ROBOTS_NOINDEX, 'utf-8');
	console.log('robots.txt → noindex (PUBLIC_DEV is not "false")');
} else {
	console.log('robots.txt → unchanged (PUBLIC_DEV="false")');
}
