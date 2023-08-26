"use client";

import { LayoutAuth } from "@/components/common";
import SendOTPPage from "@/components/layouts/SendOTP";

const FindEmail = () => {
 
  return (
    <>
      <LayoutAuth className="px-8 border border-[#536473]">
        <SendOTPPage></SendOTPPage>
      </LayoutAuth>
    </>
  );
};

export default FindEmail;
