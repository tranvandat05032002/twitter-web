import React from 'react';
import Portal from '../portal/Portal';

const OverlayModal = ({ children }: {children: React.ReactNode}) => {
    return (
        <Portal>
            <div className="absolute w-full h-screen left-0 top-0 bottom-0 right-0 z-[1000] flex justify-center items-center bg-[rgba(91,112,131,0.4)]">
                {children}
            </div>
        </Portal>
    );
};

export default OverlayModal;