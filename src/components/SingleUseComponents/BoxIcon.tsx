import React from 'react';

const BoxIcon = ({children, className}: {children: React.ReactNode, className?: String}) => {
    return (
        <div className={`${className} p-2 rounded-full cursor-pointer hover:bg-iconBackgroundGray`}>
            {children}
        </div>
    );
};

export default BoxIcon;