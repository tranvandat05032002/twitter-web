"use client";
import {
  ERROR_FORM_MESSAGES,
  ErrorMessage,
  Input,
  LayoutAuth,
  PrimaryButton,
} from "@/components/common";
import { useRouter } from "next/navigation";
import React from "react";
import { TwitterIcon } from "@/components/SingleUseComponents";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isObjectEmpty } from "@/utils/handlers";
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
  const {
    control,
    handleSubmit,
    getValues,
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
  React.useEffect(() => {
    if (isObjectEmpty(getValues())) {
      setCanSubmit(true);
    }
    setCanSubmit(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canSubmit]);
  const handleResetPassword = async (values: ForgotForm) => {
    if (isObjectEmpty(values)) return;
  };
  return (
    <LayoutAuth>
      <div className="flex items-center justify-center">
        <TwitterIcon size="small"></TwitterIcon>
      </div>
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
    </LayoutAuth>
  );
};

export default Page;
