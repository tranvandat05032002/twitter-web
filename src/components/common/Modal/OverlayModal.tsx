import React from 'react';
import Portal from '../portal/Portal';

const OverlayModal = ({ children, style, ...props }: { children: React.ReactNode, style?: React.CSSProperties }) => {
    const defaultStyle: React.CSSProperties = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    };

    React.useEffect(() => {
        // Khi mở modal → ẩn scroll
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            // Khi unmount modal → khôi phục scroll
            document.body.style.overflow = originalOverflow;
        };
    }, []);
    return (
        <Portal>
            <div className={`absolute top-0 left-0 bottom-0 right-0 z-[1000] flex justify-center items-center bg-[rgba(91,112,131,0.4)]`}
                {...props}
                style={{ ...defaultStyle, ...style }}
            >
                {children}
            </div>
        </Portal>
    );
};

export default OverlayModal;