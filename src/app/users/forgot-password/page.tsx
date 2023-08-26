"use client";
import { LayoutAuth } from "@/components/common";
import ForgotPasswordPage from "@/components/layouts/ForgotPassword";

export interface ForgotForm {
  email: string;
}
const Page = () => {
  return (
    <LayoutAuth>
      <ForgotPasswordPage></ForgotPasswordPage>
    </LayoutAuth>
  );
};

export default Page;
