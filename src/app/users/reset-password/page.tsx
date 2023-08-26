"use client";
import { LayoutAuth } from "@/components/common";
import LoadingPage from "@/components/common/Loading/LoadingPage";
import dynamic from "next/dynamic";
const DynamicResetPassword = dynamic(
  () => import("@/components/layouts/ResetPassword"),
  {
    loading: () => <LoadingPage></LoadingPage>,
  }
);
export interface ResetPasswordForm {
  password: string;
  confirm_password: string;
}
const FindEmail = () => {
  return (
    <>
      <LayoutAuth>
        <DynamicResetPassword></DynamicResetPassword>
      </LayoutAuth>
    </>
  );
};

export default FindEmail;
