import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch, Route, useRouteMatch
} from "react-router-dom"

//Import reducers
import {initializeBlogs, clearBlogs} from './reducers/blogsReducer'
import {initializeUsers} from './reducers/allUsersReducer'
import {setUser} from './reducers/userReducer'

//Import views
import Home from './views/Home'
import Blogs from './views/Blogs'
import Users from './views/Users'
import UserView from './views/UserView'

//Import components
import Navbar from './components/Navbar'

//Import services
import blogService from './services/blogs'


const App = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const allUsers = useSelector(state => state.allUsers)

    const match = useRouteMatch('/users/:id')
    const matchedUser = match
    ? allUsers.find(entry => entry.id === match.params.id)
    : null 

   useEffect(() => {
    if (user !== null) {
      blogService.setToken(user.token)
      dispatch(initializeBlogs())
    } else {
      dispatch(clearBlogs())
    }
  }, [dispatch, user])

  //If there is a local storage for user then it is set as the user state
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
    }
  }, [dispatch])

  //Get all users
    useEffect(()=>{
      dispatch(initializeUsers())
    },[dispatch])


  return (
    <div>
          <Navbar/>
 
            <Switch>
                <Route path="/blogs">
                    <Blogs/>
                </Route>
                <Route path="/users/:id">
                  <UserView user={matchedUser}/> 
                </Route>
                <Route path="/users">
                    <Users users={allUsers}/>
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
    </div>
  )
}

export default App