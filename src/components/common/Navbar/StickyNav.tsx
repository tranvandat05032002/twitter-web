import React from "react";

const StickyNav = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="backdrop-blur bg-black/40 sticky top-0 z-[100]">
      {children}
    </div>
  );
};

export default StickyNav;
