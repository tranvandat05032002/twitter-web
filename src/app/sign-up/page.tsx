"use client";
import { LayoutAuth } from "@/components/common";
import React from "react";
import dynamic from "next/dynamic";
import LoadingPage from "@/components/common/Loading/LoadingPage";
const DynamicSignUp = dynamic(() => import("@/components/layouts/SignUp"), {
  loading: () => <LoadingPage></LoadingPage>,
});
const SignUp: React.FC = () => {
  return (
    <LayoutAuth>
      <DynamicSignUp></DynamicSignUp>
    </LayoutAuth>
  );
};
export default SignUp;
