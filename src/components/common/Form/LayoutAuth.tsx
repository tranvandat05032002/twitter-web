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
      className={`w-full min-h-screen bg-[rgba(71,74,77,0.3)] py-[16px] flex items-center justify-center`}
    >
      <div
        className={`max-w-[600px] bg-black rounded-xl pt-[24px] px-20 ${className}`}
      >
        {children}
      </div>
    </div>
  );
};
export default LayoutAuth;
