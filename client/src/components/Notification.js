import React from 'react'

import Alert from 'react-bootstrap/Alert'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const text = message[0]
  const color = message[1]

  return (
    <Alert variant={color}>
      {text}
    </Alert>
  )
}

export default Notification