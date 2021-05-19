import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import AddNewBlog from './components/AddNewBlog'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({ ...notification, message: `invalid username or password`, type: "error" })
        setTimeout(() => {
          setNotification({ ...notification, message: null, type: null })
        }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedInUser')
    blogService.setToken(null)

    setUser(null)
    setUsername('')
    setPassword('')
  }

  const addBlog = (event) => {
    event.preventDefault()

    if (newTitle === "") {
      setNotification({ ...notification, message: `Error: title field cannot be empty`, type: "error" })
      setTimeout(() => {
        setNotification({ ...notification, message: null, type: null })
      }, 5000)

      return
    }

    if (newUrl === "") {
      setNotification({ ...notification, message: `Error: url field cannot be empty`, type: "error" })
      setTimeout(() => {
        setNotification({ ...notification, message: null, type: null })
      }, 5000)

      return
    }

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')

        setNotification({ ...notification, message: `a new blog \"${returnedBlog.title}\" added`, type: "notification" })
        setTimeout(() => {
          setNotification({ ...notification, message: null, type: null })
        }, 5000)
      })
      .catch(error => {
        setNotification({ ...notification, message: error.response.data.error, type: "error" })
        setTimeout(() => {
          setNotification({ ...notification, message: null, type: null })
        }, 5000)
      })
  }

  const handleNewTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const handleNewAuthor = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleNewUrl = (event) => {
    setNewUrl(event.target.value)
  }

  const blogForm = () => (
    <>
      <h2>blogs</h2>
      <Notification message={notification.message} type={notification.type} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <h2>create new</h2>
      <AddNewBlog
        addBlog={addBlog}
        newTitle={newTitle}
        newAuthor={newAuthor}
        newUrl={newUrl}
        handleNewTitle={handleNewTitle}
        handleNewAuthor={handleNewAuthor}
        handleNewUrl={handleNewUrl}
      />

      <br></br>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )

  const loginForm = () => (
    <>
      <h2>log in to application</h2>
      <Notification message={notification.message} type={notification.type} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  return (
    <div>
      {user === null ?
        loginForm() :
        blogForm()
      }
    </div>
  )
}

export default App