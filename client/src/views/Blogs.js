import React from 'react' 
import { useSelector} from 'react-redux'  

//Import components
import Blog from '../components/Blog'
import Notification from '../components/Notification'


const Blogs = () => {

    const blogs = useSelector(state => state.blogs)
    const message = useSelector(state => state.error)
    const user = useSelector(state => state.user)

    return(
    <div>
     <h1>Blogs</h1>
      <Notification message={message} />

      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} />)
      }
    </div>
    )
}

export default Blogs