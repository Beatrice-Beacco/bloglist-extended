import React from 'react'  

//Import components
import UserTable from '../components/UserTable'

//Import Bootstrap
import Container from 'react-bootstrap/Container'

const Users = ({users}) => {

    return(
        <div>
        <Container className="mt-3">
        <h1>Users</h1>
            <UserTable usersInfo={users} />
        </Container>
        </div>
    )
}

export default Users