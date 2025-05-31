"use client";
import React from "react";
import Portal from "./Portal";
import dynamic from "next/dynamic";
import LoadingPage from "../Loading/LoadingPage";
import OverlayModal from "../Modal/OverlayModal";
import { ModalType, useEvent } from "@/store/useEven";
import { createPortal } from "react-dom";
const DynamicEditProfile = dynamic(
  () => import("@/components/layouts/EditProfile"),
  {
    loading: () => <LoadingPage></LoadingPage>,
    ssr: false,
  }
);

const ModalEditProfile = () => {
  const { activeModal } = useEvent((state) => state)
  if (activeModal !== ModalType.EDIT) return null;
  return createPortal(
    <div>
      <div className="fixed inset-0 z-[1000] flex justify-center items-center bg-[rgba(91,112,131,0.4)]">
        <DynamicEditProfile></DynamicEditProfile>
      </div>
    </div>,
    document.body
  );
};

export default ModalEditProfile;
