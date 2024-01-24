import React from 'react';
import ButtonType from './ButtonType';
import { ButtonProp, ButtonProps } from '@/types/buttonTypes';
const GhostButton = ({ children, className, type, onClick }: ButtonProp) => {
    const propsGhost: ButtonProps = {
        children,
        className,
        onClick,
        type,
    };
    return (
        <ButtonType props={propsGhost} typeButton="ghost"></ButtonType>
    );
};

export default React.memo(GhostButton)