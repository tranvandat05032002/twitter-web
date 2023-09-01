import React from 'react';

const StickyNav = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="p-4 backdrop-blur bg-black/10 sticky top-0 z-[100]">
            {children}
        </div>
    );
};

export default StickyNav;