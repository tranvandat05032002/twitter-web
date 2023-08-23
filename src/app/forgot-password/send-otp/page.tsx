"use client";
import { useRouter } from "next/navigation";
import {
  ERROR_FORM_MESSAGES,
  ErrorMessage,
  Input,
  LayoutAuth,
  PrimaryButton,
} from "@/components/common";
import React from "react";
import { TwitterIcon } from "@/components/SingleUseComponents";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isObjectEmpty, normalizeEmail } from "@/utils/handlers";
import { useAuth } from "@/store";
import { useEmail } from "@/store/useEmail";
import { getOTPToken } from "@/utils/auth/cookies";
export interface OTPForm {
  otp_auth: string;
}
const FindEmail = () => {
  const [canSubmit, setCanSubmit] = React.useState<boolean>(true);
  const router = useRouter();
  const { checkOTP } = useAuth((state) => state);
  const { setEmailWithoutAt, saveEmail } = useEmail((state) => state);
  const schemaValidator = yup.object().shape({
    otp_auth: yup.string().required(ERROR_FORM_MESSAGES.otpRequired),
  });
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<OTPForm>({
    resolver: yupResolver(schemaValidator),
    mode: "onSubmit",
    defaultValues: {
      otp_auth: "",
    },
    context: { canSubmit },
  });
  React.useEffect(() => {
    if (isObjectEmpty(getValues())) {
      setCanSubmit(true);
    }
    setCanSubmit(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canSubmit]);
  const handleVerifyOTP = async (values: OTPForm) => {
    if (isObjectEmpty(values)) return;
    // const response
    const { otp_token } = getOTPToken();
    const response = await checkOTP({
      otpInfo: values,
      otpToken: otp_token as string,
    });
    if (response?.status === 200) {
      router.push("/reset-password");
    }
  };
  return (
    <>
      <LayoutAuth>
        <div className="flex items-center justify-center">
          <TwitterIcon size="small"></TwitterIcon>
        </div>

        <form onSubmit={handleSubmit(handleVerifyOTP)} autoComplete="off">
          <div>
            <div>
              <h1 className="text-3xl font-bold pb-2 text-center">
                Xác thực OTP
              </h1>
              <p className="text-base text-[#71767B] font-light">
                Nhập OTP chúng tôi đã gửi về tài khoản của bạn
              </p>
            </div>
            <div className="py-[13px]">
              <Input
                control={control}
                placeholder="OTP"
                type="text"
                name="otp_auth"
              ></Input>
              {errors && (
                <ErrorMessage>{errors.otp_auth?.message}</ErrorMessage>
              )}
            </div>
          </div>
          <PrimaryButton
            className={`w-[440px] h-[52px] text-base  my-6 px-8 ${
              canSubmit ? "hover:bg-none" : ""
            }`}
            type="submit"
            isLoading={isSubmitting}
            disabledForm={canSubmit}
          >
            Xác nhận
          </PrimaryButton>
        </form>
      </LayoutAuth>
    </>
  );
};

export default FindEmail;
