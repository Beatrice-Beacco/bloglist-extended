import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

//Import reducers
import {addNew, initializeBlogs, clearBlogs} from './reducers/blogsReducer'
import {setMessage, removeMessage} from './reducers/errorReducer'
import {setUser, removeUser} from './reducers/userReducer'

//Import components
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LoggedForm from './components/LoggedForm'
import Toggable from './components/Toggable'

//Import services
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {

  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const message = useSelector(state => state.error)
  const user = useSelector(state => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  //New blog states
  const [title, setTitle] = useState()
  const [author, setAuthor] = useState()
  const [url, setUrl] = useState()

   useEffect(() => {
    if (user !== null) {
      blogService.setToken(user.token)
      dispatch(initializeBlogs())
    } else {
      dispatch(clearBlogs())
    }
  }, [user])

  //If there is a local storage for user then it is set as the user state
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
    }
  }, [])

  //Logs in the user through the login service, sets it as the local storage
  //and sets it as the user state, then resets the login fields.
  //Else sets the error message
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loginUser = await loginService.login({ username, password})

      blogService.setToken(loginUser.token)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loginUser)
      )

      dispatch(setUser(loginUser))

      setUsername('')
      setPassword('')

      dispatch(setMessage(['Logged in succesfully', 'green']))
      setTimeout(() => dispatch(removeMessage()),
        5000)
    } catch (exception) {
      dispatch(setMessage(['Wrong credentials', 'red']))
      setTimeout(() => dispatch(removeMessage()),
        5000)
    }
  }

  //Empities the local storage and the user state
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    dispatch(removeUser())
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    try {
      const newBlog = {
        title: title,
        author: author,
        url: url,
        likes: 0,
      }

      dispatch(addNew(newBlog))

      dispatch(setMessage(['You created a new blog ' + newBlog.title, 'green']))
      setTimeout(() => dispatch(removeMessage()), 5000)
    } catch (err) {
      dispatch(setMessage(['An error occurred creating the blog: ' + err.message, 'red']))
      setTimeout(() => dispatch(removeMessage()), 5000)
    }
  }

  ///////////Helper Functions

  const loginForm = () => {
    return (
      <LoginForm handleSubmit={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        username={username}
        password={password}
      />
    )
  }

  const loggedForm = () => {
    return (
      <div>
        Logged as {user.username} < button onClick={(e) => handleLogout(e)} > Logout</button >
        <br />
        <br />
        <Toggable buttonLabel="Create a new blog">
          <LoggedForm handleSubmit={handleSubmit}
            handleTitle={({ target }) => setTitle(target.value)}
            handleAuthor={({ target }) => setAuthor(target.value)}
            handleUrl={({ target }) => setUrl(target.value)}
            title={title}
            author={author}
            url={url}
          />
        </Toggable>
        <br />
      </div>
    )
  }

  

  //Contitionally renders the helper functions
  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} />

      {user === null ?
        loginForm() :
        loggedForm()
      }

      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} />
        )}
    </div>
  )
}

export default App