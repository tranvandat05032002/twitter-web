import { getGoogleAuthUrl } from "@/utils/handlers";
import ButtonType from './ButtonType';
import { ButtonProp, ButtonProps } from '@/types/buttonTypes';

const GoogleButton = ({ children }: ButtonProp) => {
    const propsGoogle: ButtonProps = {
        type: "button",
        link: true,
        href: getGoogleAuthUrl() as string,
        children,
    };
    return (
        <ButtonType props={propsGoogle} typeButton="OAuth"></ButtonType>
    );
};
export default GoogleButton