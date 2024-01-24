"use client";
import React from "react";
import Portal from "./Portal";
import dynamic from "next/dynamic";
import LoadingPage from "../Loading/LoadingPage";
import OverlayModal from "../Modal/OverlayModal";
const DynamicEditProfile = dynamic(
  () => import("@/components/layouts/EditProfile"),
  {
    loading: () => <LoadingPage></LoadingPage>,
    ssr: false,
  }
);

const ModalEditProfile = () => {
  return (
    <div>
      <OverlayModal>
        <DynamicEditProfile></DynamicEditProfile>
      </OverlayModal>
    </div>
  );
};

export default ModalEditProfile;
