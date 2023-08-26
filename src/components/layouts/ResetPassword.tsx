import React from 'react';
import { useRouter } from "next/navigation";
import {
  ERROR_FORM_MESSAGES,
  ErrorMessage,
  GhostButton,
  Input,
  PrimaryButton,
} from "@/components/common";
import { TwitterIcon } from "@/components/SingleUseComponents";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isObjectEmpty } from "@/utils/handlers";
import { useAuth } from "@/store";
import {
  getOTPToken,
  removeEmailCookies,
  removeOTPToken,
} from "@/utils/auth/cookies";
import { toast } from "react-toastify";
import { Routers } from "@/utils/router/routers";
import { ResetPasswordForm } from '@/app/users/reset-password/page';
const ResetPasswordPage = () => {
    const [canSubmit, setCanSubmit] = React.useState<boolean>(true);
    const router = useRouter();
    const { resetPassword } = useAuth((state) => state);
    const schemaValidator = yup.object().shape({
      password: yup
        .string()
        .required(ERROR_FORM_MESSAGES.passwordRequired)
        .min(6, ERROR_FORM_MESSAGES.minPasswordLength),
      confirm_password: yup
        .string()
        .required(ERROR_FORM_MESSAGES.passwordRequired)
        .min(6, ERROR_FORM_MESSAGES.minPasswordLength)
        .oneOf([yup.ref("password")], ERROR_FORM_MESSAGES.passwordMatch),
    });
    const {
      control,
      handleSubmit,
      getValues,
      formState: { errors, isSubmitting },
    } = useForm<ResetPasswordForm>({
      resolver: yupResolver(schemaValidator),
      mode: "onSubmit",
      defaultValues: {
        password: "",
        confirm_password: "",
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
      removeEmailCookies();
      removeOTPToken();
      router.push(Routers.signInPage);
    };
    const handleResetPassword = async (values: ResetPasswordForm) => {
      const { otp_token } = getOTPToken();
      if (isObjectEmpty(values)) return;
      const response = await resetPassword({
        resetForm: values,
        otpToken: otp_token as string,
      });
      if (response?.status === 200) {
        removeEmailCookies();
        removeOTPToken();
        toast.success("Đổi mật khẩu thành công!", {
          pauseOnHover: false,
        });
        router.push(Routers.signInPage);
      }
    };
    return (
        <React.Fragment>
               <div className="flex items-center justify-center">
          <TwitterIcon size="small"></TwitterIcon>
        </div>

        <form onSubmit={handleSubmit(handleResetPassword)} autoComplete="off">
          <div>
            <div>
              <h1 className="text-3xl font-bold pb-2 text-center">
                Đặt lại mật khẩu
              </h1>
              <p className="text-base text-[#71767B] font-light mt-4">
                Vui lòng đặt lại mật khẩu mới cho tài khoản của bạn.
              </p>
            </div>
            <div className="pt-[13px] pb-2">
              <Input
                control={control}
                placeholder="Mật khẩu mới"
                type="password"
                name="password"
              ></Input>
              {errors && (
                <ErrorMessage>{errors.password?.message}</ErrorMessage>
              )}
            </div>
            <div className="pb-[13px] pt-2">
              <Input
                control={control}
                placeholder="Nhập lại mật khẩu mới"
                type="password"
                name="confirm_password"
              ></Input>
              {errors && (
                <ErrorMessage>{errors.confirm_password?.message}</ErrorMessage>
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
            Tiếp theo
          </PrimaryButton>
        </form>
        <GhostButton
          className={`w-full py-[12px] text-base rounded-full  mb-6 mt-4 px-8`}
          onClick={handleCancel}
        >
          Hủy
        </GhostButton>
        </React.Fragment>
    );
};

export default ResetPasswordPage;