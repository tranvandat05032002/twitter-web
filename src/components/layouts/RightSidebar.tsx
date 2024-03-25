import React from 'react';
interface IRightSidebar {
  children: React.ReactNode;
}
const RightSidebar: React.FC<IRightSidebar> = (props) => {
  const { children } = props;
  return (
    <div className="ml-[288px] flex">{children}</div>
  );
};

export default RightSidebar;