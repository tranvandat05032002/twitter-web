import { useRouter } from "next/navigation";
import {
  ERROR_FORM_MESSAGES,
  ErrorMessage,
  GhostButton,
  Input,
  PrimaryButton,
} from "@/components/common";
import React from "react";
import { TwitterIcon } from "@/components/SingleUseComponents";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isObjectEmpty } from "@/utils/handlers";
import { saveEmailCookies } from "@/utils/auth/cookies";
import { routers } from "@/utils/router/routers";
import { ForgotForm } from "@/app/users/find-account/page";
import { useFindAccount } from "@/store/useFindAccount";
import { useFindAccountByEmail } from "@/hooks/users/useMutation";
const schemaValidator = yup.object().shape({
  email: yup
    .string()
    .required(ERROR_FORM_MESSAGES.emailRequired)
    .email(ERROR_FORM_MESSAGES.isEmail),
});
const FindAccountPage = () => {
  const [canSubmit, setCanSubmit] = React.useState<boolean>(true);
  const router = useRouter();
  const {
    mutate: mutateFindAccount,
    data: dataFindAccount,
    isSuccess,
    isLoading,
  } = useFindAccountByEmail();
  const { setAccountFind } = useFindAccount((state) => state);
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
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
    router.push(routers.signInPage);
  };
  const handleFindEmail = (values: ForgotForm) => {
    if (isObjectEmpty(values)) return;
    mutateFindAccount(values);
  }
  React.useEffect(() => {
    if (isSuccess) {
      if (!dataFindAccount) return;
      setAccountFind(dataFindAccount);
      saveEmailCookies(dataFindAccount?.email as string);
      router.push(routers.forgotPasswordPage);
    }
  }, [isSuccess, router]);
  return (
    <React.Fragment>
      <div className="flex items-center justify-center">
        <TwitterIcon size="small"></TwitterIcon>
      </div>

      <form onSubmit={handleSubmit(handleFindEmail)} autoComplete="off">
        <div>
          <div>
            <h1 className="text-3xl font-bold pb-2 text-center">
              Tìm tài khoản Twitter của bạn
            </h1>
            <p className="text-base text-textGray font-light">
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
          isLoading={isLoading}
          disabled={isLoading}
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

export default FindAccountPage;
