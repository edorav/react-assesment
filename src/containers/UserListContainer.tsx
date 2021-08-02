import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserList from '../components/UserList';
import { User } from '../models/User';
import userService from '../services/users.service';

function UserListContainer() {
    const [users, setUsers] = useState<User[]>([]);
    const history = useHistory();

    useEffect(() => {
        setUsers(userService.getUsers());
    }, []);

    return (
        <UserList users={users} onAddUser={() => history.push('/user')}/>
    );
}

export default UserListContainer;