import React from 'react';
interface IRightSidebar {
  children: React.ReactNode;
}
const RightSidebar: React.FC<IRightSidebar> = (props) => {
  const { children } = props;
  return (
    <div className="ml-[288px] flex w-full min-h-screen">{children}</div>
  );
};

export default RightSidebar;