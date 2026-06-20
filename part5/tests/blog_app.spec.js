const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')

    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'testuser',
        name: 'Test User',
        password: 'secretpassword'
      }
    })

    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'otheruser',
        name: 'Other User',
        password: 'otherpassword'
      }
    })

    await page.goto('/')
  })

  test('Login form is displayed by default', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.locator('input[name="Username"]')).toBeVisible()
    await expect(page.locator('input[name="Password"]')).toBeVisible()
  })

  describe('Login workflows', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.locator('input[name="Username"]').fill('testuser')
      await page.locator('input[name="Password"]').fill('secretpassword')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with incorrect credentials', async ({ page }) => {
      await page.locator('input[name="Username"]').fill('testuser')
      await page.locator('input[name="Password"]').fill('wrongpassword')
      await page.getByRole('button', { name: 'login' }).click()

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)') 
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.locator('input[name="Username"]').fill('testuser')
      await page.locator('input[name="Password"]').fill('secretpassword')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()

      await page.locator('input[name="Title"]').fill('Playwright Integration Testing Cookbook')
      await page.locator('input[name="Author"]').fill('E2E Specialist')
      await page.locator('input[name="Url"]').fill('https://playwright.dev')
      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.locator('.success')).toContainText('a new blog Playwright Integration Testing Cookbook by E2E Specialist added')
      await expect(page.getByText('Playwright Integration Testing Cookbook E2E Specialist')).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'new blog' }).click()
        await page.locator('input[name="Title"]').fill('User Interaction Flows')
        await page.locator('input[name="Author"]').fill('UX Designer')
        await page.locator('input[name="Url"]').fill('https://uxdesign.org')
        await page.getByRole('button', { name: 'create' }).click()
      })

      test('it can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes 1')).toBeVisible()
      })

      test('the user who created the blog can delete it', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()

        page.on('dialog', async dialog => {
          expect(dialog.message()).toContain('Remove blog User Interaction Flows by UX Designer?')
          await dialog.accept()
        })

        await page.getByRole('button', { name: 'remove' }).click()

        await expect(page.getByText('User Interaction Flows UX Designer')).not.toBeVisible()
      })

      test('only the creator sees the delete button for a blog', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()

        await page.getByRole('button', { name: 'logout' }).click()

        await page.locator('input[name="Username"]').fill('otheruser')
        await page.locator('input[name="Password"]').fill('otherpassword')
        await page.getByRole('button', { name: 'login' }).click()

        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })
    })

    describe('Sorting operations', () => {
      test('blogs are arranged in descending order based on total likes metric', async ({ page }) => {
        await page.getByRole('button', { name: 'new blog' }).click()
        await page.locator('input[name="Title"]').fill('Lowest Rated Content')
        await page.locator('input[name="Author"]').fill('Novice Author')
        await page.locator('input[name="Url"]').fill('https://test.com/low')
        await page.getByRole('button', { name: 'create' }).click()

        await page.getByRole('button', { name: 'new blog' }).click()
        await page.locator('input[name="Title"]').fill('Highest Rated Content')
        await page.locator('input[name="Author"]').fill('Senior Architect')
        await page.locator('input[name="Url"]').fill('https://test.com/high')
        await page.getByRole('button', { name: 'create' }).click()

        const lowestBlogBlock = page.locator('.blog').filter({ hasText: 'Lowest Rated Content' })
        const highestBlogBlock = page.locator('.blog').filter({ hasText: 'Highest Rated Content' })

        await lowestBlogBlock.getByRole('button', { name: 'view' }).click()
        await highestBlogBlock.getByRole('button', { name: 'view' }).click()

        await highestBlogBlock.getByRole('button', { name: 'like' }).click()
        await page.waitForTimeout(500)
        await highestBlogBlock.getByRole('button', { name: 'like' }).click()
        await page.waitForTimeout(500)

        await lowestBlogBlock.getByRole('button', { name: 'like' }).click()
        await page.waitForTimeout(500)

        const blogDivs = page.locator('.blog')
        await expect(blogDivs.nth(0)).toContainText('Highest Rated Content')
        await expect(blogDivs.nth(1)).toContainText('Lowest Rated Content')
      })
    })
  })
})
