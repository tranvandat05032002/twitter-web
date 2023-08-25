import React from "react";
const LayoutAuth = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`absolute top-0 bottom-0 left-0 right-0 bg-[rgba(71,74,77,0.3)] flex items-center justify-center`}
    >
      <div className={`max-w-[600px] bg-black rounded-xl px-20 ${className}`}>
        {children}
      </div>
    </div>
  );
};
export default LayoutAuth;
