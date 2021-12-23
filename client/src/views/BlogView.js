import React from 'react'
import {voteEntry} from '../reducers/blogsReducer'
import { useDispatch } from 'react-redux'

import CommentForm from '../components/CommentForm'

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
      <ul>
      {blog.comments.map((comment, index)=>
       <li key={index}>{comment}</li>
        )}
      </ul>
    )
  
    return(
        <div>
        <h1>{blog.title}</h1>

        <p><a href={blog.url}>{blog.url}</a></p>
        <p>{blog.likes} likes <button onClick={() => likeBlog()}>Like</button></p>
        <p>Added by {blog.author}</p>

        <h2>Comments</h2>
        <CommentForm id={blog.id}/>
        {
         blog.comments.length > 0 ? 
         commentList()
         : null
        }
        </div>
    )
} 

export default BlogView