import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../models/User';

type UserListProps = {
    users: User[],
    removeButton?: (userId: number) => void,
    onAddUser?: () => void,
    selectFriend?: () => void,
    onSelectUser?: (user: User) => void
};

function UserList({users, removeButton, onAddUser, onSelectUser, selectFriend}: UserListProps) {

    return (
        <div className="my-3 p-3 bg-body rounded shadow-sm">
            <div className="border-bottom pb-2 mb-0 d-flex justify-content-between">
                <h6 className="my-auto">Users</h6>
                <div className="d-flex">
                    {selectFriend && <button onClick={_ => selectFriend()} className="btn btn-primary btn-sm">Select friend</button>}
                    {onAddUser && <button onClick={_ => onAddUser()} className="btn btn-primary btn-sm ms-1">New user</button>}
                </div>
            </div>
            {users?.map(user => 
                <div key={user.id} className="d-flex text-muted pt-3 single-user">
                    <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
                    <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                        <div className="d-flex justify-content-between">
                            <Link to={'/user/'+ user.id}><strong className="text-gray-dark">{user.fullname}</strong></Link>
                            <div className="d-flex">
                                {onSelectUser && <a onClick={_ => onSelectUser(user)} className="ms-1 user-select">Select</a>}
                                {removeButton && <a onClick={_ => removeButton(user.id)} className="ms-1">Remove</a>}
                            </div>
                        </div>
                        <span className="d-block">@{user.username}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserList;