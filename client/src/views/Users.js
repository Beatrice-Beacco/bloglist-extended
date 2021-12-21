import React from 'react'  

//Import components
import UserTable from '../components/UserTable'

const Users = ({users}) => {

    return(
        <div>
        <h1>Users</h1>
            <UserTable usersInfo={users} />
        </div>
    )
}

export default Users