import React from 'react'
import {Link} from "react-router-dom"
import {useDispatch } from 'react-redux'
import {removeUser} from '../reducers/userReducer'

const Navbar = ({user}) => {

    const dispatch = useDispatch()

    const loggedUser = () => (
        <>
        {user.username} logged in
        <button onClick={(e) => handleLogout(e)}>Logout</button >
        </>
    )

    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.clear()
        dispatch(removeUser())
  }

    return(
    <div>
        <Link to="/">Home</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/users">Users</Link>
        {user ? 
            loggedUser() 
            : null
        }
    </div>
    )
}

export default Navbar


