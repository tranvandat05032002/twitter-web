"use client";

import { LayoutAuth } from "@/components/common";
import SignInPage from "@/components/layouts/SignIn";

const SignIn: React.FC = () => {
  return (
    <LayoutAuth>
      <SignInPage></SignInPage>
    </LayoutAuth>
  );
};

export default SignIn;
