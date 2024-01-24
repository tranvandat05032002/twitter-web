import ButtonType from './ButtonType';
import { ButtonProp, ButtonProps } from '@/types/buttonTypes';
import React from "react";
const PrimaryButton = ({
    children,
    className,
    type,
    isLoading,
    onClick,
    disabledForm,
}: ButtonProp) => {
    const propsPrimary: ButtonProps = {
        children,
        className,
        type,
        isLoading,
        onClick,
        disabledForm,
    };
    return (
        <ButtonType props={propsPrimary} typeButton="primary"></ButtonType>
    );
};

export default React.memo(PrimaryButton)