import React, { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleRemove }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const isOwnedByUser = user.username === blog.user.username

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible}>
        <div className='blogTitleAndAuthor-MoreInfoHidden'>
          {blog.title} - {blog.author} {' '}
          <button onClick={toggleVisibility}>view</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        <div className='blogTitleAndAuthor-MoreInfoShown'>
          {blog.title} - {blog.author} {' '}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div className='blogUrl'>url: {blog.url}</div>
        <div className='blogLikes'>likes: {blog.likes} {' '} <button onClick={() => handleLike(blog)}>like</button></div>
        <div>added by: {blog.user.name}</div>
        {isOwnedByUser ? <div><button onClick={() => handleRemove(blog)}>remove</button></div> : null}
      </div>
    </div>
  )
}

export default Blog