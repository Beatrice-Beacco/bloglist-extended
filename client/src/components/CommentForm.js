import React from 'react'
import {useDispatch } from 'react-redux'
import {addNewComment} from '../reducers/blogsReducer'
//

const CommentForm = ({id}) => {

    const dispatch = useDispatch()

    const submitComment = (event) => {
        event.preventDefault();
        const comment = event.target.comment.value
        dispatch(addNewComment(comment, id))
    }

    return(
        <>
        <form onSubmit={submitComment}>
        <input type="text" name="comment"/><button type="submit">Add comment</button>
        </form>
        </>
    )
}

export default CommentForm