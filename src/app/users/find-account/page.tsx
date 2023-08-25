"use client";
import { useRouter } from "next/navigation";
import {
  ConditionalButton,
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
import { useEmail } from "@/store/useEmail";
export interface ForgotForm {
  email: string;
}
const FindEmail = () => {
  const [canSubmit, setCanSubmit] = React.useState<boolean>(true);
  const router = useRouter();
  const { findEmail } = useAuth((state) => state);
  const { setEmailWithoutAt, setSaveEmail, emailSave } = useEmail(
    (state) => state
  );
  const schemaValidator = yup.object().shape({
    email: yup
      .string()
      .required(ERROR_FORM_MESSAGES.emailRequired)
      .email(ERROR_FORM_MESSAGES.isEmail),
  });
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
  React.useEffect(() => {
    if (isObjectEmpty(getValues())) {
      setCanSubmit(true);
    }
    setCanSubmit(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canSubmit]);
  const handleCancel = () => {
    router.push("/sign-in");
  };
  const handleFindEmail = async (values: ForgotForm) => {
    if (isObjectEmpty(values)) return;
    setSaveEmail(values.email);
    const response = await findEmail(values);
    if (response?.status === 200) {
      const email_normalized = normalizeEmail(values.email);
      setEmailWithoutAt(email_normalized);
      router.push("/users/forgot-password");
    }
  };
  return (
    <>
      <LayoutAuth>
        <div className="flex items-center justify-center">
          <TwitterIcon size="small"></TwitterIcon>
        </div>

        <form onSubmit={handleSubmit(handleFindEmail)} autoComplete="off">
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
            className={`w-full py-[12px] text-base rounded-full  mt-6 mb-4 px-8 ${
              canSubmit ? "hover:bg-none" : ""
            }`}
            type="submit"
            isLoading={isSubmitting}
            disabledForm={canSubmit}
          >
            Tiếp theo
          </PrimaryButton>
        </form>
        <GhostButton
          className={`w-full py-[12px] text-base rounded-full  mb-6 mt-4 px-8`}
          onClick={handleCancel}
        >
          Hủy
        </GhostButton>
      </LayoutAuth>
    </>
  );
};

export default FindEmail;
