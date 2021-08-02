import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import UserDetail from '../components/UserDetail';

interface RouteInfo {
    id: string;
}

function UserDetailContainer({ match }: RouteComponentProps<RouteInfo>) {
    const { id } = match.params;
    
    return (
        <UserDetail userId={+id} sidebarCounter={1} />
    );
}

export default UserDetailContainer;