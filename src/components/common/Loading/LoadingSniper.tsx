import React from "react";

const LoadingSniper = ({ className }: { className?: string }) => {
  return (
    <div
      className={`inline-block h-4 w-4 animate-spin rounded-full border-[2px] border-white border-y-transparent ${className}`}
    />
  );
};

export { LoadingSniper };
