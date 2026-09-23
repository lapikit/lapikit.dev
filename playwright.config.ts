import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	webServer: {
		command: 'node build',
		port: 3000,
		reuseExistingServer: !process.env.CI
	},
	use: {
		baseURL: 'http://localhost:3000'
	},
	projects: [
		{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
		{ name: 'firefox', use: { ...devices['Desktop Firefox'] } },
		// WebKit needs Ubuntu system libraries: CI only, it does not start on Fedora
		...(process.env.CI ? [{ name: 'webkit', use: { ...devices['Desktop Safari'] } }] : [])
	]
});
