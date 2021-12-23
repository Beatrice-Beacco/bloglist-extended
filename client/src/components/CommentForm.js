import React from 'react'
import {useDispatch } from 'react-redux'
import {addNewComment} from '../reducers/blogsReducer'

//Import Bootstrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const CommentForm = ({id}) => {

    const dispatch = useDispatch()

    const submitComment = (event) => {
        event.preventDefault();
        const comment = event.target.comment.value
        dispatch(addNewComment(comment, id))
    }

    return(
        <div>
        <Form onSubmit={submitComment}>
        <Row className="g-2">
        <Col sm={3}>
        <Form.Group className="mb-3" controlId="title">
        <Form.Control type="text" name="comment"/> {' '}
        </Form.Group>
        </Col>
        <Col sm={3}>
        <Button type="submit">Add comment</Button>
        </Col>
        </Row>
        </Form>
        </div>
    )
}

export default CommentForm