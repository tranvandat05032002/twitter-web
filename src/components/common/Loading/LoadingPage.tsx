import React from "react";

const LoadingPage = () => {
  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center">
        <div className="animate-spin w-[68px] h-[68px] border-t-[3px] border-b-[3px] border-[#1d9bf0] border-solid rounded-full"></div>
      </div>
    </div>
  );
};

export default LoadingPage;
