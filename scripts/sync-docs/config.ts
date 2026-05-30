import { join } from 'node:path';

export const projectRoot = process.cwd();
export const docsContentDir = join(projectRoot, 'src/content/docs');
export const generatedDir = join(projectRoot, 'src/');
export const docsMetadataFile = join(generatedDir, 'pages.docs.json');
export const generatedFrontmatterKeys = new Set(['slug', 'path', 'section', 'order']);
