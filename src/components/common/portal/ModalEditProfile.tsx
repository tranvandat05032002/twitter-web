"use client";
import React from "react";
import Portal from "./Portal";
import dynamic from "next/dynamic";
import LoadingPage from "../Loading/LoadingPage";
import OverlayModal from "../Modal/OverlayModal";
import { ModalType, useEvent } from "@/store/useEven";
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
  return (
    <div>
      <OverlayModal>
        <DynamicEditProfile></DynamicEditProfile>
      </OverlayModal>
    </div>
  );
};

export default ModalEditProfile;
