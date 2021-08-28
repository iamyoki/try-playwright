const { test, expect } = require('@playwright/test')

test.use({
  // headless: false
})

test.describe('todo page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('.')
  })

  test('render initial', async ({ page }) => {
    await expect(page.locator('body')).toBeVisible()
  })

  test('should focus input onload', async ({ page }) => {
    await expect(page.locator('input')).toBeFocused()
  })

  test('add one todo', async ({ page }) => {
    await test.step('type todo text', async () => {
      await expect(page.locator('input')).toBeFocused()
      await page.type('input:focus', 'drink some water')
    })

    await test.step('add todo to the list', async () => {
      await page.press('body', 'Enter')
    })

    await expect(page.locator('ul.todo-list > li')).toHaveCount(1)
  })
})
