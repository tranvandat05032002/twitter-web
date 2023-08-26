import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ConditionalButton } from "@/components/common";
import { useAuth } from "@/store";
import { getEmailCookies, getOTPToken, saveOTP } from "@/utils/auth/cookies";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { BsArrowRightIcon } from "@/components/SingleUseComponents/Icon";
import { Routers } from "@/utils/router/routers";
const DynamicOtpInput = dynamic(() => import("react-otp-input"), {
  ssr: false,
}); // render client
export interface OTPForm {
  otp_auth: string;
}
const SendOTPPage = () => {
  const [otp, setOtp] = React.useState<string>("");
  const router = useRouter();
  const { checkOTP, resendOTP } = useAuth((state) => state);
  const { email_cookies } = getEmailCookies();
  const handleVerifyOTP = async () => {
    const { otp_token } = getOTPToken();
    const response = await checkOTP({
      otp,
      otpToken: otp_token as string,
    });
    if (response?.status === 200) {
      toast.success("Xác thực thành công. Vui lòng chờ trong gây lát", {
        pauseOnHover: false,
      });
      router.push(Routers.resetPasswordPage);
    }
  };
  const handleResendOTP = async () => {
    const { otp_token } = getOTPToken();
    const response = await resendOTP(otp_token as string);
    if (response?.status === 200) {
      toast.success("Chúng tôi đã gửi lại mã OTP mới đến bạn", {
        pauseOnHover: false,
      });
      saveOTP({
        otp_token: response.data.jwtToken,
      });
    } else {
      toast.error("Đã xảy ra lỗi", {
        pauseOnHover: false,
      });
    }
  };
  const handleSetOTP = (value: string) => {
    setOtp(value);
  };
  return (
    <div className="py-8">
      <div>
        <div className="text-base font-medium">
          <p className="text-white">Chúng tôi đã gửi mã OTP tới </p>
          <p className="text-[#1d9bf0] mb-4 font-light">{email_cookies}</p>

          <div className="flex items-center">
            <BsArrowRightIcon />
            <span className="text-[#ea4aaa] ml-2">Enter code*</span>
          </div>
        </div>
        <div className="py-4 w-full ">
          <DynamicOtpInput
            value={otp}
            onChange={(otp) => handleSetOTP(otp)}
            numInputs={6}
            inputStyle={
              "bg-transparent mx-[5px] flex-1 !w-[52px] otp-input h-[58px] border border-[#536473] focus:outline-none focus:border focus:border-[#66b3ff]"
            }
            renderInput={(props) => <input {...props} />}
          />
        </div>
      </div>
      <ConditionalButton
        value={otp}
        handleRequest={handleVerifyOTP}
      ></ConditionalButton>
      <div className="text-xs text-[#71767b] min-w-0 break-words">
        <span> Bạn không nhận được OTP? </span>
        <button
          onClick={handleResendOTP}
          className="text-[#1d9bf0] hover:underline"
        >
          Gửi lại mã
        </button>
        <span> hoặc </span>
        <Link href={"/users/find-account"}>cập nhật địa chỉ email.</Link>
      </div>
    </div>
  );
};

export default SendOTPPage;
