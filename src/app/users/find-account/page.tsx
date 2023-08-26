"use client";
import { LayoutAuth } from "@/components/common";
import LoadingPage from "@/components/common/Loading/LoadingPage";
import dynamic from "next/dynamic";
const DynamicFindAccount = dynamic(() => import("@/components/layouts/FindAccount"), {
  loading: () => <LoadingPage></LoadingPage>,
});
export interface ForgotForm {
  email: string;
}
const FindEmail = () => {
  return (
    <>
      <LayoutAuth>
        <DynamicFindAccount></DynamicFindAccount>
      </LayoutAuth>
    </>
  );
};

export default FindEmail;
