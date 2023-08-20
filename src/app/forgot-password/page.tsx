"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ERROR_FORM_MESSAGES,
  ErrorMessage,
  GhostButton,
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

export interface ForgotForm {
  email: string;
}
const Page = () => {
  const router = useRouter();
  const schemaValidator = yup.object().shape({
    email: yup
      .string()
      .required(ERROR_FORM_MESSAGES.emailRequired)
      .email(ERROR_FORM_MESSAGES.isEmail),
  });
  const [canSubmit, setCanSubmit] = React.useState<boolean>(true);
  const [showSpecifyEmail, setShowSpecifyEmail] =
    React.useState<boolean>(false);
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ForgotForm>({
    resolver: yupResolver(schemaValidator),
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
    context: { canSubmit },
  });
  const { verifyForgotPasswordToken } = useAuth((state) => state);
  const [emailWithoutAt, setEmailWithoutAt] = React.useState<string>("");
  React.useEffect(() => {
    if (isObjectEmpty(getValues())) {
      setCanSubmit(true);
    }
    setCanSubmit(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canSubmit]);
  const handleResetPassword = async (values: ForgotForm) => {
    if (isObjectEmpty(values)) return;
    const response = await verifyForgotPasswordToken(values);
    console.log(values);
    if (response?.status === 200) {
      const email_normalized = normalizeEmail(values.email);
      setEmailWithoutAt(email_normalized);
      setShowSpecifyEmail(true);
    }
  };
  const handleCancelForgot = () => {
    console.log("called")
    setValue("email", "");
    router.push("/");
  };
  return (
    <LayoutAuth>
      <div className="flex items-center justify-center">
        <TwitterIcon size="small"></TwitterIcon>
      </div>
      {!showSpecifyEmail ? (
        <form onSubmit={handleSubmit(handleResetPassword)} autoComplete="off">
          <div>
            <div>
              <h1 className="text-3xl font-bold pb-2 text-center">
                Tìm tài khoản Twitter của bạn
              </h1>
              <p className="text-base text-[#71767B] font-light">
                Nhập email được liên kết với tài khoản của bạn để thực hiện thay
                đổi mật khẩu
              </p>
            </div>
            <div className="py-[13px]">
              <Input
                control={control}
                placeholder="Email"
                type="email"
                name="email"
              ></Input>
              {errors && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
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
            Tiếp theo
          </PrimaryButton>
        </form>
      ) : (
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
              className={`w-[440px] h-[52px] text-base  my-6 px-8 ${
                canSubmit ? "hover:bg-none" : ""
              }`}
              type="submit"
              isLoading={isSubmitting}
              disabledForm={canSubmit}
            >
              Tiếp theo
            </PrimaryButton>

            <GhostButton
              className={`w-[440px] h-[52px] text-base  my-6 px-8 rounded-full ${
                canSubmit ? "hover:bg-none" : ""
              }`}
              type="submit"
              onClick={handleCancelForgot}
            >
              Cancel
            </GhostButton>
          </div>
        </div>
      )}
    </LayoutAuth>
  );
};

export default Page;
