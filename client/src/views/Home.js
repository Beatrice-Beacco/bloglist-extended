import React from 'react' 
import { useSelector, useDispatch } from 'react-redux'

//Import components
import LoginForm from '../components/LoginForm'
import LoggedForm from '../components/LoggedForm'
import Toggable from '../components/Toggable'
import Notification from '../components/Notification'

//Import services
import loginService from '../services/login'
import blogService from '../services/blogs'

//Import reducers
import {addNew} from '../reducers/blogsReducer'
import {setMessage, removeMessage} from '../reducers/errorReducer'
import {setUser, removeUser} from '../reducers/userReducer'

//Import Bootstrap
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

const Home = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const message = useSelector(state => state.error)

  //Functions

  //Logs in the user through the login service, sets it as the local storage
  //and sets it as the user state, then resets the login fields.
  //Else sets the error message
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const username = event.target.username.value
      const password = event.target.password.value
 
      const loginUser = await loginService.login({ username, password})

      blogService.setToken(loginUser.token)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loginUser)
      )

      dispatch(setUser(loginUser))

      event.target.username.value = ''
      event.target.password.value = ''

      dispatch(setMessage(['Logged in succesfully', 'success']))
      setTimeout(() => dispatch(removeMessage()),
        5000)
    } catch (exception) {
      dispatch(setMessage(['Wrong credentials', 'danger']))
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
        title: event.target.title.value,
        author: event.target.author.value,
        url: event.target.url.value,
        likes: 0,
      }

      dispatch(addNew(newBlog))

      dispatch(setMessage(['You created a new blog ' + newBlog.title, 'success']))
      setTimeout(() => dispatch(removeMessage()), 5000)
    } catch (err) {
      dispatch(setMessage(['An error occurred creating the blog: ' + err.message, 'danger']))
      setTimeout(() => dispatch(removeMessage()), 5000)
    }
  }

        //Helper functions
    const loginForm = () => {
        return (
        <LoginForm handleSubmit={handleLogin}
        />
        )
    }

      const loggedForm = () => {
    return (
      <div>
        Logged as <b>{user.username}</b>{' '} <Button variant="outline-danger" size="sm" onClick={(e) => handleLogout(e)} > Logout</Button>
        <br />
        <br />
        <Toggable buttonLabel="Create a new blog">
          <LoggedForm handleSubmit={handleSubmit}/>
        </Toggable>
        <br />
      </div>
    )
  }


    return(      
    <div>
    <Container className="mt-3">
    <h1>Home</h1>

    <Notification message={message} />

      {user === null ?
        loginForm() :
        loggedForm()
      }
    </Container>
    </div>
    )
}

export default Home