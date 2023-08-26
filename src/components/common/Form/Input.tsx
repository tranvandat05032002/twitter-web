import React from "react";
import { Control, useController } from "react-hook-form";

interface IInput
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  type: string;
  placeholder: string;
  control: Control<any>;
  name: string;
}
const Input = ({ type, placeholder, control, name }: IInput) => {
  const { field } = useController({ control, name });
  return (
    <div className="pb-[5px]">
      <input
        placeholder={placeholder}
        {...field}
        type={type}
        name={name}
        className="w-full rounded-lg border py-[13px] border-borderGrayPrimary bg-transparent p-[10px] outline-none placeholder:text-sm placeholder:font-light focus:border focus:border-borderBlue focus:outline-none"
      />
    </div>
  );
};

export default Input;
