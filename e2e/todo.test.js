const { test, expect } = require('@playwright/test')

test.use({
  headless: false
})

test.describe('todo page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('.')
    // page.on('console', msg => console.log(msg.text()))
  })

  test('render initial', async ({ page }) => {
    await expect(page.locator('body')).toBeVisible()
  })

  test('should focus input onload', async ({ page }) => {
    await expect(page.locator('input')).toBeFocused()
  })

  test.only('action', async ({ page }) => {
    await test.step('add one todo', async () => {
      await expect(page.locator('input')).toBeFocused()
      await page.type('input:focus', 'drink some water')
      await page.press('body', 'Enter')
      await expect(page.locator('ul.todo-list > li')).toHaveCount(1)
    })

    await test.step('done a todo', async () => {
      const todo = page.locator('.todo-list > li').first()

      await expect(todo).not.toHaveClass('completed')
      await todo.locator('input.toggle').click()
      await expect(todo).toHaveClass('completed')
    })
  })
})
