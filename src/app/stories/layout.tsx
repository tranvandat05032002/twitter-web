'use client'
import StorySidebar from '@/components/layouts/story/StorySidebar';
import { UserProvider } from '@/context/UserContext';
import { useFetchMe } from '@/hooks/users/useQuery';
import React from 'react';

const DashboardStory = ({ children }: { children: React.ReactNode }) => {
    const { data: user } = useFetchMe()
    return (
        <UserProvider user={user || null}>
            <div className='flex h-screen'>
                <StorySidebar />
                <main className='flex-1 bg-black flex items-center justify-center'>
                    {children}
                </main>
            </div>
        </UserProvider>
    );
};

export default DashboardStory;