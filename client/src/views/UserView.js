import React from 'react'
import {Link} from "react-router-dom"


//Import Bootstrap
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'

const UserView = ({user}) => {
    if (!user) {
    return null
  }
  
    return(
        <div>
      <Container className="mt-3">
        <h1>{user.username}</h1>

        <h3>Added blogs</h3>
        <ListGroup variant="flush">
      {
        user.blogs.map((blog, index) => <ListGroup.Item key={index}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></ListGroup.Item>
          )
      }
      </ListGroup>
      </Container>
        </div>
    )
}

export default UserView