'use client'
import { UserProvider } from '@/context/UserContext';
import { useFetchMe } from '@/hooks/users/useQuery';
import { IUser } from '@/types/userTypes';
import { saveProfileMe } from '@/utils/auth/cookies';
import React from 'react';
import LoadingPage from './common/Loading/LoadingPage';

const UserProviderLayout = ({ children }: { children: React.ReactNode }) => {
    const { data: user, isLoading, isError, isSuccess } = useFetchMe()
    if (isLoading) {
        return <LoadingPage></LoadingPage>;
    }
    if (isSuccess) {
        saveProfileMe(user as IUser);
    }
    return (
        <UserProvider user={user as IUser}>
            <div>
                {children}
            </div>
        </UserProvider>
    );
};

export default UserProviderLayout;