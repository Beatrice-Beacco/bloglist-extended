import React from 'react'
import {Link} from "react-router-dom"

import Card from 'react-bootstrap/Card'

const Blog = ({ blog}) => {

  return (
    <div>
    <Card>
    <Card.Body>
      <Card.Link as={Link} to={`/blogs/${blog.id}`} >{blog.title}</Card.Link>
    </Card.Body>
    </Card>
    </div>
  )
}


export default Blog