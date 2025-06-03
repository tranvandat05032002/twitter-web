'use client'
import React from 'react';
import SimpleBar from 'simplebar-react';

const MainScroll = ({ children }: { children: React.ReactNode }) => {
    return (
        <SimpleBar className='max-h-screen'>
            {children}
        </SimpleBar>
    );
};

export default MainScroll;