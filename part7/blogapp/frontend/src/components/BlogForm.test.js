import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('it calls the event handler received', async () => {
  const mockf = jest.fn()

  render(<BlogForm createBlog={mockf} />)

  const inputFields = screen.getAllByRole('textbox')
  const createButton = screen.getByText('create')
  const user = userEvent.setup()
  await user.type(inputFields[0], 'hehe')
  await user.type(inputFields[1], 'hihi')
  await user.type(inputFields[2], 'hoho.com')

  await user.click(createButton, {
    target:
      [{ value: 'hehe' },
        { value: 'hihi' },
        { value: 'hoho.com' },
      ],
  })

  expect(mockf.mock.calls).toHaveLength(1)
})
