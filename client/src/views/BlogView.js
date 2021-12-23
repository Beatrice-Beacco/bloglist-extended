import React from 'react'
import {voteEntry} from '../reducers/blogsReducer'
import { useDispatch } from 'react-redux'

import CommentForm from '../components/CommentForm'

//Import Bootstrap
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

const BlogView = ({blog}) => {

    const dispatch = useDispatch()

    if (!blog) {
    return null
  }

    //Like function
    const likeBlog = () => {
      const updated = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: (blog.likes + 1),
        user: blog.users
      }
      dispatch(voteEntry(updated, blog.id))
    }

    const commentList = () => (
      <ListGroup variant="flush">
      {blog.comments.map((comment, index)=>
       <ListGroup.Item key={index}>{comment}</ListGroup.Item>
        )}
      </ListGroup>
    )
  
    return(
        <div>
        <Container className="mt-3">
        <h1>{blog.title}</h1>

        <p><a href={blog.url}>{blog.url}</a></p>
        <p>{blog.likes} likes <Button variant="secondary" size="sm" onClick={() => likeBlog()}>Like</Button></p>
        <p>Added by <b>{blog.author}</b></p>

        <h2>Comments</h2>
        <CommentForm id={blog.id}/>
        {
         blog.comments.length > 0 ? 
         commentList()
         : null
        }
        </Container>
        </div>
    )
} 

export default BlogView