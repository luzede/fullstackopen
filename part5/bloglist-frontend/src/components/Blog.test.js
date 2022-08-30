import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders the blog\'s title and author, but does not render its url or number of likes by default', async () => {
  const blog = {
    author: 'Elly',
    likes: 0,
    title: 'Love',
    url: 'elly.com',
    user: { name: 'Luka', id: 'does not matter' },
  }

  const blogs = { blog }

  const mockf = jest.fn()

  const userId = 'does not matter'

  render(<Blog blog={blog} setBlogs={mockf} blogs={blogs} userId={userId} />)

  screen.getByText('Love Elly')
  expect(mockf.mock.calls).toHaveLength(0)
})

test('shows hidden component when clicked the button view', async () => {
  const blog = {
    author: 'Elly',
    likes: 0,
    title: 'Love',
    url: 'elly.com',
    user: { name: 'Luka', id: 'does not matter' },
  }

  const blogs = { blog }

  const mockf = jest.fn()

  const userId = 'does not matter'

  const { container } = render(<Blog blog={blog} setBlogs={mockf} blogs={blogs} userId={userId} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  const hiddenElement = container.querySelector('#hiddenInfo')
  expect(hiddenElement).toHaveStyle('display: none')
  await user.click(button)
  expect(hiddenElement).not.toHaveStyle('display: none')

})