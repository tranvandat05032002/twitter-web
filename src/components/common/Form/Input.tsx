import React from "react";

interface IInput {
  type: string;
  placeholder: string;
}
const Input: React.FC<IInput> = (props) => {
  return (
    <div className="py-[13px]">
      <input
        placeholder={props.placeholder}
        type={props.type}
        className="w-full rounded-lg placeholder:font-normal placeholder:text-base border py-[13px] border-[#333639] bg-transparent p-[10px] outline-none placeholder:text-sm placeholder:font-light focus:border focus:border-[#66b3ff] focus:outline-none"
      />
    </div>
  );
};

export default Input;
