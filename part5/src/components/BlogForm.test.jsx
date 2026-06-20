import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> calls createBlog with the right details when a new blog is created', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const titleInput = container.querySelector('input[name="Title"]')
  const authorInput = container.querySelector('input[name="Author"]')
  const urlInput = container.querySelector('input[name="Url"]')
  const submitButton = screen.getByText('create')

  await user.type(titleInput, 'Automated component test title')
  await user.type(authorInput, 'Vitest Expert')
  await user.type(urlInput, 'https://vitest.dev')
  
  await user.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Automated component test title')
  expect(createBlog.mock.calls[0][0].author).toBe('Vitest Expert')
  expect(createBlog.mock.calls[0][0].url).toBe('https://vitest.dev')
})