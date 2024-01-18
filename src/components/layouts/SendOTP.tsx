import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ConditionalButton } from "@/components/common";
import { getEmailCookies, removeOTPToken } from "@/utils/auth/cookies";
import dynamic from "next/dynamic";
import { BsArrowRightIcon } from "@/components/SingleUseComponents/Icon";
import { routers } from "@/utils/router/routers";
import { useCheckOTP, useResendOTP } from "@/hooks/users/useMutation";
import { toast } from "react-toastify";
const DynamicOtpInput = dynamic(() => import("react-otp-input"), {
  ssr: false,
}); // render client
const SendOTPPage = () => {
  const [otp, setOtp] = React.useState<string>("");
  const [emailCookies, setEmailCookies] = React.useState<string>("");
  const { mutate: mutateCheckOTP, isSuccess, isError } = useCheckOTP();
  const { mutate: mutateResendOTP } = useResendOTP();
  const router = useRouter();
  const handleVerifyOTP = () => {
    mutateCheckOTP(otp);
  };
  const handleSetOTP = (value: string) => {
    setOtp(value);
  };
  React.useEffect(() => {
    if (isSuccess) {
      toast.success("Xác thực thành công. Vui lòng chờ trong gây lát", {
        pauseOnHover: false,
      });
      router.push(routers.resetPasswordPage);
    }
    if (isError) {
      toast.error("Xác thực không thành công. vui lòng nhập lại", {
        pauseOnHover: false,
      });
    }
  }, [isSuccess, isError]);
  const handleResendOTP = async () => {
    mutateResendOTP();
  };
  React.useEffect(() => {
    const { email_cookies } = getEmailCookies();
    setEmailCookies(email_cookies);
  }, []);
  return (
    <div className="py-8">
      <div>
        <div className="text-base font-medium">
          <p className="text-white">Chúng tôi đã gửi mã OTP tới </p>
          <p className="text-textBlue mb-4 font-light">{emailCookies}</p>

          <div className="flex items-center">
            <BsArrowRightIcon />
            <span className="text-textPink ml-2">Enter code*</span>
          </div>
        </div>
        <div className="py-4 w-full ">
          <DynamicOtpInput
            value={otp}
            onChange={(otp) => handleSetOTP(otp)}
            numInputs={6}
            inputStyle={
              "bg-transparent mx-[5px] flex-1 !w-[52px] otp-input h-[58px] border border-borderGraySecond focus:outline-none focus:border focus:border-borderBlue"
            }
            renderInput={(props) => <input {...props} />}
          />
        </div>
      </div>
      <ConditionalButton
        value={otp}
        handleRequest={handleVerifyOTP}
      ></ConditionalButton>
      <div className="text-xs text-textGray min-w-0 break-words">
        <span> Bạn không nhận được OTP? </span>
        <button
          onClick={handleResendOTP}
          className="text-textBlue hover:underline"
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
