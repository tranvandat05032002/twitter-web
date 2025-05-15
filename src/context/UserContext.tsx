import { IUser } from '@/types/userTypes';
import React, { createContext, useContext } from 'react';

interface UserContextType {
    user: IUser | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode; user: IUser | null }> = ({ children, user }) => {
    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
};

export const useMe = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useMe must be used within a UserProvider');
    }
    return context;
}; 