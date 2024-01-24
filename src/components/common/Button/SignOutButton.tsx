import ButtonType from './ButtonType';
import { ButtonProp, ButtonProps } from '@/types/buttonTypes';
import React from "react";
const SignOutButton = ({ children }: ButtonProp) => {
    const handleLogoutAuth = () => {
        console.log("buttonAuth");
    };
    const propsLogout: ButtonProps = {
        type: "button",
        onClick: handleLogoutAuth,
        children,
    };
    return (
        <ButtonType props={propsLogout} typeButton="logout"></ButtonType>
    );
};
export default React.memo(SignOutButton)