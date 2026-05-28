import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	webServer: {
		command: 'node build',
		port: 3000,
		reuseExistingServer: !process.env.CI,
	},
	use: {
		baseURL: 'http://localhost:3000',
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
});
