import ButtonType from './ButtonType';
import { ButtonProp, ButtonProps } from '@/types/buttonTypes';

const GithubButton = ({ children }: ButtonProp) => {
    const propsGithub: ButtonProps = {
        type: "button",
        // onClick: () => console.log("buttonAuth"),
        children,
    };
    return (
        <ButtonType props={propsGithub} typeButton="OAuth"></ButtonType>
    );
};

export default GithubButton;