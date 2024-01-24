import ButtonType from './ButtonType';
import { ButtonProp, ButtonProps } from '@/types/buttonTypes';
import React from "react";
const SecondaryButton = ({
    children,
    className,
    type,
    onClick,
}: ButtonProp) => {
    const propSecondary: ButtonProps = {
        children,
        className,
        onClick,
        type,
    };
    return (
        <ButtonType props={propSecondary} typeButton="secondary"></ButtonType>
    );
};
export default React.memo(SecondaryButton)