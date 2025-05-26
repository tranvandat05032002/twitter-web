import React from 'react';

type BoxIconProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    className?: string;
};

const BoxIcon = ({ children, className = '', ...rest }: BoxIconProps) => {
    return (
        <div
            {...rest}
            className={`p-2 rounded-full cursor-pointer hover:bg-iconBackgroundGray ${className}`}
        >
            {children}
        </div>
    );
};

export default BoxIcon;
