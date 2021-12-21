import React from 'react'

const LoggedForm = ({ handleSubmit}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Create new</h2>
          Title: <input type="text" name="title" /> <br />
          Author: <input type="text" name="author" /> <br />
          Url: <input type="text" name="url" /> <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default LoggedForm