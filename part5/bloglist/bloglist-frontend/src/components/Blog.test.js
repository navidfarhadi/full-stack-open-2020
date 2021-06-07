import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testUrl',
    likes: 8,
    user: {
      name: 'Test McTester',
      username: 'McTester'
    }
  }

  const user = {
    name: 'Test McTester',
    username: 'McTester'
  }

  const mockHandleLikes = jest.fn()
  const mockHandleRemoves = jest.fn()

  const component = render (
    <Blog blog={blog} user={user} handleLike={mockHandleLikes} handleRemove={mockHandleRemoves}/>
  )

  test('Blog renders title and author by default, but not url or likes', () => {
    const titleAndAuthor = component.container.querySelector('blogTitleAndAuthor-MoreInfoHidden')
    expect(titleAndAuthor).toBeDefined()

    const url = component.container.querySelector('blogUrl')
    expect(url).toBeNull()

    const likes = component.container.querySelector('blogLikes')
    expect(likes).toBeNull()
  })
})