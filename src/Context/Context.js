import React from 'react';

export const users = [
    {
        name: 'User1',
        sex: 'male'
    },
    {
        name: 'User2',
        sex: 'female'
    }
];

export const context = React.createContext({
    ...users[0],
    toggleUser: () => {}
});
