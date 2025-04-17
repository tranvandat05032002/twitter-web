import React from "react";

const StickyNav = ({ children, className }: { children: React.ReactNode, className?: String }) => {

  return (
    <div className={`${className ?? ""} backdrop-blur bg-black/40 sticky top-0 z-[100]`}>
      {children}
    </div>
  );
};

export default StickyNav;
