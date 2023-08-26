"use client";
import { LayoutAuth } from "@/components/common";
import SignUpPage from "@/components/layouts/SignUp";
import React from "react";

const SignUp: React.FC = () => {
  return (
    <LayoutAuth>
      <SignUpPage></SignUpPage>
    </LayoutAuth>
  );
};
export default SignUp;
