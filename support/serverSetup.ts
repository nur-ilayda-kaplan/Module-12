import { BeforeAll, AfterAll } from '@cucumber/cucumber';
import { startMockServer, stopMockServer } from './mockServer';

// Only start mock server if using localhost
BeforeAll(async function () {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

  if (baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1')) {
    console.log('📦 Starting mock test server...');
    const port = new URL(baseUrl).port || '3000';
    await startMockServer(parseInt(port));
    // Give server a moment to start
    await new Promise((r) => setTimeout(r, 500));
  }
});

// Clean up mock server after all tests
AfterAll(async function () {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

  if (baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1')) {
    await stopMockServer();
  }
});
