import React from "react";
import {
  Control,
  FieldValue,
  UseControllerProps,
  useController,
} from "react-hook-form";

interface IInput {
  type: string;
  placeholder: string;
  // control: UseControllerProps<T extends TField>["control"];
  control: Control<any>;
  name: string;
}
const Input = ({ type, placeholder, control, name }: IInput) => {
  const { field } = useController({ control, name, defaultValue: "" });
  return (
    <div className="pb-[5px]">
      <input
        placeholder={placeholder}
        {...field}
        type={type}
        name={name}
        className="w-full rounded-lg placeholder:font-normal placeholder:text-base border py-[13px] border-[#333639] bg-transparent p-[10px] outline-none placeholder:text-sm placeholder:font-light focus:border focus:border-[#66b3ff] focus:outline-none"
      />
    </div>
  );
};

export default Input;
