import { ButtonProp, ButtonProps } from "@/types/buttonTypes";
import ButtonType from "./ButtonType";
import React from "react";

const ButtonFollow = ({ children, onClick }: ButtonProp) => {
    const propsButtonFollow: ButtonProps = {
        type: "button",
        children,
        onClick
    };
    return (
        <ButtonType props={propsButtonFollow} typeButton="follow"></ButtonType>
    )
};

export default React.memo(ButtonFollow)