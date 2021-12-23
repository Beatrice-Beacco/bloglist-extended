import React from 'react'
import {Link} from "react-router-dom"
import {useDispatch } from 'react-redux'
import {removeUser} from '../reducers/userReducer'

import Navb from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'


const Navbar = ({user}) => {

    const dispatch = useDispatch()

    const loggedUser = () => (
        <>
        <u><b>{user.username}</b></u> logged in {' '}
        <Button variant="outline-secondary" size="sm" onClick={(e) => handleLogout(e)}>Logout</Button>
        </>
    )

    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.clear()
        dispatch(removeUser())
  }

    return(
    <div>
    <Container>
    <Navb bg="light" variant="light" className="px-5">
    <Nav>
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/blogs">Blogs</Nav.Link>
        <Nav.Link as={Link} to="/users">Users</Nav.Link>
    </Nav>
        <Navb.Collapse className="d-flex justify-content-end">
        <Navb.Text>
        {user ? 
            loggedUser() 
            : null
        }
        </Navb.Text>
        </Navb.Collapse>

    
    </Navb>
    </Container>
    </div>
    )
}

export default Navbar


