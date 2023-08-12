import React from "react";

interface IErrorProps {
  children: React.ReactNode;
}
const ErrorMessage: React.FC<IErrorProps> = ({ children }) => {
  return <p className="mt-[2px] text-xs text-red-500">{children}</p>;
};

export { ErrorMessage };
