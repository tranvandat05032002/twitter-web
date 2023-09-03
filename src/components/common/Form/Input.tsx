import React from "react";
import { Control, useController } from "react-hook-form";

interface IInput
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  type: string;
  placeholder?: string;
  control: Control<any>;
  name: string;
  value?: string;
}
const Input = ({ type, placeholder, control, name, value }: IInput) => {
  const { field } = useController({ control, name });
  return (
    <div className="relative">
      <input
        placeholder={placeholder}
        {...field}
        type={type}
        name={name}
        value={value}
        id={name}
        // className="w-full rounded-lg border py-[13px] border-borderGrayPrimary bg-transparent p-[10px] outline-none placeholder:text-sm placeholder:font-light focus:border focus:border-borderBlue focus:outline-none"
        className="w-full px-[10px] py-[13px] bg-transparent border border-borderGrayPrimary outline-none focus:outline-none rounded-lg placeholder:text-sm focus:border-borderBlue focus:pb-[7px] focus:placeholder:text-transparent focus:pt-[19px] transition-colors duration-200 peer"
      />
      <label
        htmlFor={name}
        className="absolute left-[10px] top-[12px] text-transparent cursor-text peer-focus:text-xs peer-focus:text-borderBlue peer-focus:top-0 peer-focus:mt-1 transition-all duration-200"
      >
        {(placeholder?.charAt(0).toUpperCase() as string) +
          (placeholder?.slice(1) as string)}
      </label>
    </div>
  );
};

export default Input;
