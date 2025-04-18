"use client"
import { useEvent } from "@/store/useEven";
import React from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }: React.PropsWithChildren) => {
  const refElement = React.useRef<Element | null>();
  const { showModal, showCreatePost } = useEvent((state) => state);

  React.useEffect(() => {
    const bodyElement = document.querySelector<HTMLElement>("body");
    refElement.current = bodyElement;
  }, []);
  return (showModal || showCreatePost) && refElement.current
    ? createPortal(<div>{children}</div>, refElement.current)
    : null;
};

export default Portal;
