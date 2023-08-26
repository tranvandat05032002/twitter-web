import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GhostButton, PrimaryButton } from "@/components/common";
import { TwitterIcon } from "@/components/SingleUseComponents";
import { useAuth } from "@/store";
import {
  getEmailCookies,
  removeEmailCookies,
  removeOTPToken,
  saveOTP,
} from "@/utils/auth/cookies";
import { normalizeEmail } from "@/utils/handlers";
import { useForm } from "react-hook-form";
import { Radio } from "@mui/material";
import { Routers } from "@/utils/router/routers";
const ForgotPasswordPage = () => {
  const router = useRouter();
  const [emailCookies, setEmailCookies] = React.useState<string>("");
  const { forgotPasswordToken } = useAuth((state) => state);
  const handleCancelForgot = () => {
    removeEmailCookies();
    router.push(Routers.signInPage);
  };
  React.useEffect(() => {
    const { email_cookies } = getEmailCookies();
    setEmailCookies(email_cookies);
  }, [emailCookies]);
  const handleSendToken = async () => {
    const response = await forgotPasswordToken(emailCookies as string);
    if (response?.status === 200) {
      saveOTP({
        otp_token: response.data?.jwtToken,
      });
      router.push(Routers.sendOTPPage);
    }
  };
  const email_normal = normalizeEmail(emailCookies);
  return (
    <React.Fragment>
      <div className="flex items-center justify-center">
        <TwitterIcon size="small"></TwitterIcon>
      </div>
      <div>
        <div className="text-[15px] w-[420px]">
          <h1 className="text-3xl font-semibold mb-2">
            Chúng tôi nên gửi mã xác nhận ở đâu?
          </h1>
          <p className="text-base text-textGray font-light mb-4">
            Trước khi bạn có thể thay đổi mật khẩu của mình, chúng tôi cần đảm
            bảo rằng đó thực sự là bạn.
          </p>
          <p className="text-base text-textGray font-light mb-4">
            Bắt đầu bằng cách chọn nơi gửi mã xác nhận.
          </p>

          <div className="flex justify-between items-center mb-4">
            <p>Send an email to {email_normal}</p>
            <Radio name="accept-send" checked={true} size="small" />
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
            Hủy
          </GhostButton>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ForgotPasswordPage;
