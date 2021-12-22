import React from 'react' 
import {Link} from "react-router-dom"

const UserTable = ({usersInfo}) => {
    return(
        <div>
        <table>
        <thead>
        <tr>
            <th>Name</th>
            <th>Blogs created</th>
        </tr>
        </thead>

        <tbody>
        {usersInfo.map((user, index) => {
            return (
                <tr key={index}>
                    <td><Link to={`/users/${user.id}`} >{user.username}</Link></td>
                    <td>{user.blogs.length}</td>
                </tr>
            )
        })
        }
        </tbody>
        </table>
        </div>
    )
}

export default UserTable