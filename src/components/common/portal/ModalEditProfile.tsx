"use client";
import React from "react";
import Portal from "./Portal";
import dynamic from "next/dynamic";
import LoadingPage from "../Loading/LoadingPage";
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
        <Portal>
          <DynamicEditProfile></DynamicEditProfile>
        </Portal>
    </div>
  );
};

export default ModalEditProfile;
