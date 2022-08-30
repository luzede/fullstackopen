import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('Blog component renders the blog\'s title and author, but does not render its url or number of likes by default', () => {
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
})