import { defineConfig, devices } from '@playwright/test';
require('dotenv').config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: [['html', { open: 'never' }]],
  use: {
    browserName: 'chromium',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    viewport: { width: 1440, height: 1080 },
    video: 'on',
    headless: process.env.CI ? true : false,
  },

  projects: [
    {
      name: 'funda',
      use: {
        ...devices['Desktop Chrome'],
        userAgent: process.env.USERAGENT,
        baseURL: "https://www.funda.nl/",
        navigationTimeout: 10000,
      },
    },
  ],
});
