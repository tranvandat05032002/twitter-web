import { LoadingSniper } from "../Loading/LoadingSniper";

export type Type = "submit" | "reset" | "button";
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: Type;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  disabledForm?: boolean;
}
function getButtonClass(typeButton: string): string {
  switch (typeButton) {
    case "primary":
      return `rounded-full bg-[#1d9bf0] hover:bg-opacity-80 transition text-center duration-200  hover:no-underline no-underline hover:no-underline transition-all flex items-center justify-center text-white`;
    case "ghost":
      return "bg-transparent border font-semibold transition-all hover:no-underline hover:bg-[rgba(29,155,240,0.1)] flex items-center justify-center border-[#536472] text-[#1d9bf0]";
    case "OAuth":
      return "w-full rounded-lg bg-transparent border flex items-center hover:bg-[#161616] border border-[#333639] hover:scale-105 transition-all font-medium gap-x-[10px] justify-center px-5 py-3 text-[#71767b] shadow";
    case "logout":
      return "w-max rounded-lg bg-yellow-500 px-5 py-3 border border-[#333639] text-white";
    default:
      return "";
  }
}
const createButton = (props: ButtonProps, typeButton: string): JSX.Element => {
  const { children, type, className, disabledForm, onClick } = props;
  const buttonClass = getButtonClass(typeButton);
  const child = props.isLoading ? <LoadingSniper /> : children;
  return (
    <button
      disabled={disabledForm}
      type={type}
      onClick={onClick}
      className={`${className || ""} ${buttonClass} ${
        disabledForm ? "opacity-60" : ""
      }`}
    >
      {child}
    </button>
  );
};
export { createButton };
