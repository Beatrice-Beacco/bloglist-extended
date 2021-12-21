import React from 'react' 
import {Link} from "react-router-dom"

const UserTable = ({usersInfo}) => {
    return(
        <div>
        <table>
        <tr>
            <th>Name</th>
            <th>Blogs created</th>
        </tr>

        {usersInfo.map((user, index) => {
            return (
                <tr key={index}>
                    <td><Link to={`/users/${user.id}`} >{user.username}</Link></td>
                    <td>{user.blogs.length}</td>
                </tr>
            )
        })
        }
        </table>
        </div>
    )
}

export default UserTable