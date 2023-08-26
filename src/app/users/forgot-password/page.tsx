"use client";
import { LayoutAuth } from "@/components/common";
import LoadingPage from "@/components/common/Loading/LoadingPage";
import dynamic from "next/dynamic";
const DynamicForgotPassword = dynamic(() => import("@/components/layouts/ForgotPassword"), {
  loading: () => <LoadingPage></LoadingPage>,
});
export interface ForgotForm {
  email: string;
}
const Page = () => {
  return (
    <LayoutAuth>
      <DynamicForgotPassword></DynamicForgotPassword>
    </LayoutAuth>
  );
};

export default Page;
