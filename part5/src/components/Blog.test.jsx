import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Testing React Components is easy',
    author: 'FullStack Developer',
    url: 'https://fullstackopen.com',
    likes: 42,
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  }

  const mockUpdateLikes = vi.fn()
  const mockRemoveBlog = vi.fn()

  test('renders title and author, but does not render url or likes by default', () => {
    render(<Blog blog={blog} updateLikes={mockUpdateLikes} removeBlog={mockRemoveBlog} />)

    expect(screen.getByText(/Testing React Components is easy/)).toBeInTheDocument()
    expect(screen.getByText(/FullStack Developer/)).toBeInTheDocument()

    expect(screen.queryByText('https://fullstackopen.com')).not.toBeInTheDocument()
    expect(screen.queryByText('likes 42')).not.toBeInTheDocument()
  })

  test('blog url and number of likes are shown when the view button is clicked', async () => {
    render(<Blog blog={blog} updateLikes={mockUpdateLikes} removeBlog={mockRemoveBlog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.getByText('https://fullstackopen.com')).toBeInTheDocument()
    expect(screen.getByText(/likes 42/)).toBeInTheDocument()
  })

  test('if the like button is clicked twice, the event handler is called twice', async () => {
    render(<Blog blog={blog} updateLikes={mockUpdateLikes} removeBlog={mockRemoveBlog} />)

    const user = userEvent.setup()
    
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockUpdateLikes.mock.calls).toHaveLength(2)
  })
})