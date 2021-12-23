import React from 'react'

//Import Bootstrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

const LoggedForm = ({ handleSubmit}) => {
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h2>Create new</h2>
        <Col sm={4}>
        <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
         <Form.Control type="text" name="title" />
        </Form.Group>
        </Col>

        <Col sm={4}>
        <Form.Group className="mb-3" controlId="author">
        <Form.Label>Author</Form.Label>
         <Form.Control type="text" name="author" />
        </Form.Group>
        </Col>

        <Col sm={4} className="mb-3">
        <Form.Group className="mb-3" controlId="url">
        <Form.Label>URL</Form.Label>
         <Form.Control type="text" name="url" />
        </Form.Group>
        </Col>

        <Button variant="success" size="sm" className="mb-1" type="submit">Submit</Button>
      </Form>
    </div>
  )
}

export default LoggedForm