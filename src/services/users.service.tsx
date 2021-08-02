import { User } from '../models/User';
import { mockData } from './index';

const getUsers = () => {
    return mockData;
};

const getUserById = (id: number) => {
    return mockData.find(user => user.id === id);
};

const saveUser = (user: User) => {
    const userIndex = mockData.findIndex(u => u.id === user.id);
    if(userIndex > -1) {
        mockData[userIndex] = user;
    }
    return user;
};

const addUser = (user: User) => {
    user.id = Date.now();
    user.friends = [];
    if(mockData.find(u => u.username === user.username)) {
        throw new Error('Utente già esistente');
    } else {
        mockData.push(user);
        return user;
    }
};

const addUserAsFriend = (userRequestId: number, user: User) => {
    const userIndex = mockData.findIndex(u => u.id === userRequestId);
    if(userIndex > -1) {
        if(mockData[userIndex].friends.find(u => u.id === user.id)) {
            throw new Error('Errore: i 2 utenti sono già amici');
        } else {
            mockData[userIndex].friends.push(user);
        }
    }
    return mockData[userIndex];
};

const userService = {
    getUsers,
    getUserById,
    saveUser,
    addUser,
    addUserAsFriend
};

export default userService;