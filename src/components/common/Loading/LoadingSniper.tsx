import React from "react";

const LoadingSniper = ({ className }: { className?: string }) => {
  return (
    <div
      className={`inline-block h-4 w-4 animate-spin rounded-full border-[2px] border-white border-y-transparent ${className}`}
    />
      // <div className="loader">
      //   <div className="inner one"></div>
      //   <div className="inner two"></div>
      //   <div className="inner three"></div>
      // </div>
  );
};

export { LoadingSniper };
