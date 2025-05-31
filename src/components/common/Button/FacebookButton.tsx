import { ButtonProp, ButtonProps } from "@/types/buttonTypes";
import ButtonType from "./ButtonType";

const FacebookButton = ({ children }: ButtonProp) => {
    const propsFacebook: ButtonProps = {
        type: "button",
        children,
    };
    return (
        <ButtonType props={propsFacebook} typeButton="OAuth"></ButtonType>
    )
};

export default FacebookButton