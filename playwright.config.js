/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: 'e2e',
  use: {
    baseURL: 'https://todomvc.com/examples/react/',
    trace: 'on',
    screenshot: 'on',
    video: 'on'
  }
}

module.exports = config
