import React from 'react'

const UserView = ({user}) => {
    if (!user) {
    return null
  }
  
    return(
        <div>
        <h1>{user.username}</h1>

        <h2>Added blogs</h2>
      {
        user.blogs.map((blog, index) => <li key={index}>{blog.title}</li>
          )
      }
        </div>
    )
}

export default UserView