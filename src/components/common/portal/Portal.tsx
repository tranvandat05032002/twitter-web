import { ModalType, useEvent } from "@/store/useEven";
import React from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }: React.PropsWithChildren) => {
  const refElement = React.useRef<Element | null>(null); // Cần khởi tạo với null
  const { activeModal } = useEvent((state) => state); // Dùng activeModal để lấy trạng thái modal

  React.useEffect(() => {
    refElement.current = document.body;
  }, []);

  // Kiểm tra điều kiện để hiển thị modal
  const shouldRender =
    activeModal === ModalType.CREATE_POST ||
    activeModal === ModalType.EDIT;

  return shouldRender && refElement.current
    ? createPortal(<div>{children}</div>, refElement.current)
    : null;
};

export default Portal;
