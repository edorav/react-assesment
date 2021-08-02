import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';
import { User } from '../models/User';
import userService from '../services/users.service';

type UserDetailProps = {
    userId?: number,
    onAddFriend?: (user: User) => void,
    sidebarCounter: number
};

enum sidebarAction {
    NONE,
    NEW_USER,
    SELECT_FRIEND
}

function UserDetail({ userId, onAddFriend, sidebarCounter }: UserDetailProps) {
    const [user, setUser] = useState<User>();
    const [allUsers, setUsers] = useState<User[]>();
    const [currentSidebarAction, setcurrentSidebarAction] = useState<sidebarAction>(sidebarAction.NONE);

    useEffect(() => {
        if(userId) {
            const user = userService.getUserById(userId);
            if(user) {
                setUser(user);
            }
        }
    }, [userId]);

    useEffect(() => {
        if(currentSidebarAction === sidebarAction.SELECT_FRIEND) {
            setUsers(userService.getUsers());
        }
    }, [currentSidebarAction]);

    const removeUser = (userId: number) => {
        if(user){
            setUser({
                ...user, 
                ...{
                    friends: user.friends.filter(u => u.id !== userId)
                }
            });
        }
    }

    const savedUser = (savedUser: User) => {
        //if(user) {
        if(!user) {
            setUser(savedUser);
        }
        if(onAddFriend) {
            onAddFriend(savedUser);
        }
        //} 
    }

    const toggleSidebar = (sidebarAction: sidebarAction) => {
        setcurrentSidebarAction(sidebarAction);
    }

    const addFriend = (userToAdd: User) => {
        if(user) {
            try{
                const userUpdated = userService.addUserAsFriend(user.id, userToAdd);
                
               // console.log( userUpdated.friends, userUpdated.fullname)
                setUser({
                    ...user, 
                    ...{
                        friends: userUpdated.friends
                    }
                });
                setcurrentSidebarAction(sidebarAction.NONE);
            } catch(err) {
                alert(err);
            }
        }
    }
    
    return (
        <div className="my-3 p-3 bg-body rounded shadow-sm">
            <div className="w-75"> <UserForm user={user} onSave={savedUser}  /> </div>
            {user && <UserList users={user? user.friends: []} selectFriend={() => toggleSidebar(sidebarAction.SELECT_FRIEND)} removeButton={removeUser} onAddUser={() => toggleSidebar(sidebarAction.NEW_USER)} />}
            
            {currentSidebarAction !== sidebarAction.NONE &&
            <div className="sidebar">
                <div className="sidebar-overlay" onClick={() => toggleSidebar(sidebarAction.NONE)}></div>
                <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar-content" >
                    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
                    <span className="fs-4">Sidebar {sidebarCounter}</span>
                    </a>
                    <hr />
                    {currentSidebarAction === sidebarAction.NEW_USER && <UserDetail onAddFriend={(user) => addFriend(user)} sidebarCounter={sidebarCounter + 1} />}
                    {user && currentSidebarAction === sidebarAction.SELECT_FRIEND && 
                        <UserList users={allUsers? allUsers: []} onSelectUser={addFriend} removeButton={removeUser} />
                    }
                </div>
            </div>
            }
        </div>
    );
}

export default UserDetail;