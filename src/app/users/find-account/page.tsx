"use client";
import { LayoutAuth } from "@/components/common";
import FindAccountPage from "@/components/layouts/FindAccount";
export interface ForgotForm {
  email: string;
}
const FindEmail = () => {
  return (
    <>
      <LayoutAuth>
        <FindAccountPage></FindAccountPage>
      </LayoutAuth>
    </>
  );
};

export default FindEmail;
