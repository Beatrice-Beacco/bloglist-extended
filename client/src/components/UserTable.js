import React from 'react' 
import {Link} from "react-router-dom"

import Table from 'react-bootstrap/Table'

const UserTable = ({usersInfo}) => {
    return(
        <div>
        <Table striped bordered hover>
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
        </Table>
        </div>
    )
}

export default UserTable