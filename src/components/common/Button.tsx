import { LoadingSniper } from "./LoadingSniper";

type ButtonType = "credentials" | "OAuth" | "logout";
type Type = "submit" | "reset" | "button";
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: Type;
  // onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  // isLoading?: boolean;
}
function getButtonClass(typeButton: ButtonType): string {
  switch (typeButton) {
    case "credentials":
      return "w-full rounded-lg bg-[#007bff] px-5 py-3 text-white border border-[#333639]";
    case "OAuth":
      return "w-full rounded-lg bg-transparent border flex items-center hover:bg-[#161616] border border-[#333639] hover:scale-105 transition-all font-medium gap-x-[10px] justify-center px-5 py-3 text-[#71767b] shadow";
    case "logout":
      return "w-max rounded-lg bg-yellow-500 px-5 py-3 border border-[#333639] text-white";
    default:
      return "";
  }
}
const createButton = (
  props: ButtonProps,
  typeButton: ButtonType
): JSX.Element => {
  const { children, type, className } = props;
  const buttonClass = getButtonClass(typeButton);
  // const child = props.isLoading ? <LoadingSniper /> : children;
  return (
    <button
      // onClick={onClick}
      // disabled={isLoading}
      // eslint-disable-next-line react/button-has-type
      type={type}
      // className={className}
      className={`${className || ""} ${buttonClass} ${
        false ? "opacity-60" : ""
      }`}
    >
      {children}
    </button>
  );
};
export { createButton };
