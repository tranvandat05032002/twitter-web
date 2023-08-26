"use client";
import { LayoutAuth } from "@/components/common";
import LoadingPage from "@/components/common/Loading/LoadingPage";
import dynamic from "next/dynamic";
const DynamicSendOTP = dynamic(() => import("@/components/layouts/SendOTP"), {
  loading: () => <LoadingPage></LoadingPage>,
});
export interface OTPForm {
  otp_auth: string;
}
const FindEmail = () => {
  return (
    <>
      <LayoutAuth className="px-8 border border-[#536473]">
        <DynamicSendOTP></DynamicSendOTP>
      </LayoutAuth>
    </>
  );
};

export default FindEmail;
