"use client";
import { LayoutAuth } from "@/components/common";
import LoadingPage from "@/components/common/Loading/LoadingPage";
import dynamic from "next/dynamic";
import React from "react";
const DynamicSignIn = dynamic(() => import("@/components/layouts/SignIn"), {
  loading: () => <LoadingPage></LoadingPage>,
});
const SignIn: React.FC = () => {
  return (
    <LayoutAuth>
      <DynamicSignIn></DynamicSignIn>
    </LayoutAuth>
  );
};

export default SignIn;
