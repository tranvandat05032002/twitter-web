"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GhostButton, LayoutAuth, PrimaryButton } from "@/components/common";
import React from "react";
import { TwitterIcon } from "@/components/SingleUseComponents";
import { useAuth } from "@/store";
import { useEmail } from "@/store/useEmail";
import { saveOTP } from "@/utils/auth/cookies";

export interface ForgotForm {
  email: string;
}
const Page = () => {
  const router = useRouter();
  const { emailWithoutAt, setEmailWithoutAt, emailSave } = useEmail(
    (state) => state
  );
  const { forgotPasswordToken } = useAuth((state) => state);
  const handleCancelForgot = () => {
    setEmailWithoutAt("");
    router.push("/");
  };
  const handleSendToken = async () => {
    const response = await forgotPasswordToken(emailSave);
    if (response?.status === 200) {
      saveOTP({
        otp_token: response.data?.jwtToken,
      });
      router.push("/forgot-password/send-otp?token=");
    }
  };
  return (
    <LayoutAuth>
      <div className="flex items-center justify-center">
        <TwitterIcon size="small"></TwitterIcon>
      </div>
      <div>
        <div className="text-[15px]">
          <h1 className="text-3xl font-semibold mb-2">
            Chúng tôi nên gửi mã xác nhận ở đâu?
          </h1>
          <p className="text-base text-[#71767B] font-light mb-4">
            Trước khi bạn có thể thay đổi mật khẩu của mình, chúng tôi cần đảm
            bảo rằng đó thực sự là bạn.
          </p>
          <p className="text-base text-[#71767B] font-light mb-4">
            Bắt đầu bằng cách chọn nơi gửi mã xác nhận.
          </p>

          <div className="flex justify-between items-center mb-4">
            <p>Send an email to {emailWithoutAt}</p>
            <input type="radio" />
          </div>

          <p>
            Contact{" "}
            <Link
              href={
                "https://help.twitter.com/en/forms/account-access/regain-access"
              }
            >
              Twitter Support
            </Link>{" "}
            if you don’t have access.
          </p>
        </div>
        <div className="mt-10">
          <PrimaryButton
            className={`w-[440px] h-[52px] text-base  my-6 px-8`}
            type="submit"
            onClick={handleSendToken}
          >
            Tiếp theo
          </PrimaryButton>

          <GhostButton
            className={`w-[440px] h-[52px] text-base  my-6 px-8 rounded-full`}
            type="submit"
            onClick={handleCancelForgot}
          >
            Cancel
          </GhostButton>
        </div>
      </div>
    </LayoutAuth>
  );
};

export default Page;
