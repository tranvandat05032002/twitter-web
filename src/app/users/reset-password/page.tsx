"use client";

import { LayoutAuth } from "@/components/common";
import ResetPasswordPage from "@/components/layouts/ResetPassword";

export interface ResetPasswordForm {
  password: string;
  confirm_password: string;
}
const FindEmail = () => {
  return (
    <>
      <LayoutAuth>
        <ResetPasswordPage></ResetPasswordPage>
      </LayoutAuth>
    </>
  );
};

export default FindEmail;
