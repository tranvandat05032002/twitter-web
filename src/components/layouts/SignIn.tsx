import React from "react";
import {
  FacebookIcon,
  GithubIcon,
  GoogleIconSignIn,
  TwitterIcon,
} from "../SingleUseComponents";
import {
  AuthButtonFacebook,
  AuthButtonGithub,
  AuthButtonGoogle,
  ErrorMessage,
  Input,
  PrimaryButton,
  ERROR_FORM_MESSAGES,
} from "../common";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoginForm } from "@/types/userTypes";
import { isObjectEmpty } from "@/utils/handlers";
import { Routers } from "@/utils/router/routers";
import { useLogin } from "@/hooks/users/useMutation";
import { useUserInfo } from "@/store/useUserInfo";
import { useFetchMe } from "@/hooks/users/useQuery";
import { saveToken } from "@/utils/auth/cookies";
const schemaValidator = yup.object().shape({
  email: yup
    .string()
    .required(ERROR_FORM_MESSAGES.emailRequired)
    .email(ERROR_FORM_MESSAGES.isEmail),
  password: yup
    .string()
    .required(ERROR_FORM_MESSAGES.passwordRequired)
    .min(6, ERROR_FORM_MESSAGES.minPasswordLength),
});
const SignInPage = () => {
  const [canSubmit, setCanSubmit] = React.useState<boolean>(true);
  const { mutate: mutateLogin, isLoading, isSuccess } = useLogin();
  const router = useRouter();
  const { data: user } = useFetchMe();
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schemaValidator),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
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
  const handleLogin = React.useCallback(async (values: LoginForm) => {
    if (isObjectEmpty(values)) return;
    mutateLogin(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { setUserInfo } = useUserInfo();
  React.useEffect(() => {
    if (isSuccess && user?.verify === 1) {
      setUserInfo(user);
      router.push(Routers.homePage);
    }
  }, [isSuccess, router]);
  return (
    <React.Fragment>
      <div className="flex items-center justify-center">
        <TwitterIcon size="small"></TwitterIcon>
      </div>
      <form onSubmit={handleSubmit(handleLogin)} autoComplete="off">
        <div>
          <div>
            <h1 className="text-3xl font-bold pb-5 text-center">
              Đăng nhập vào Twitter
            </h1>
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
          <div className="py-[13px]">
            <Input
              control={control}
              placeholder="Mật khẩu"
              type="password"
              name="password"
            ></Input>
            {errors && <ErrorMessage>{errors.password?.message}</ErrorMessage>}
          </div>
          <div className="text-xs flex justify-between items-center">
            <div>
              <span>Bạn chưa có tài khoản? </span>
              <Link href="/sign-up" className="text-textBlue">
                Đăng ký ngay
              </Link>
            </div>
            <Link href={"/users/find-account"} className="text-textBlue">
              Quên mật khẩu?
            </Link>
          </div>
        </div>
        <div className="py-[13px]">
          <div className="flex items-center w-full justify-center">
            <div className="flex-1 border-t border-textGrayLine"></div>
            <div className="mx-2 font-light text-textGray">hoặc</div>
            <div className="flex-1 border-t border-textGrayLine"></div>
          </div>
        </div>
        <div className="pb-[13px]">
          <div className="grid grid-cols-1 gap-x-2 gap-y-1 sm:grid-cols-3">
            <AuthButtonGoogle>
              <GoogleIconSignIn></GoogleIconSignIn>
              <p>Google</p>
            </AuthButtonGoogle>
            <AuthButtonGithub>
              {" "}
              <GithubIcon></GithubIcon>
              <p>Github</p>
            </AuthButtonGithub>
            <AuthButtonFacebook>
              {" "}
              <FacebookIcon></FacebookIcon>
              <p>Facebook</p>
            </AuthButtonFacebook>
          </div>
        </div>
        <PrimaryButton
          className={`w-[440px] h-[52px] text-base  my-6 px-8 ${
            canSubmit ? "hover:bg-none" : ""
          }`}
          type="submit"
          isLoading={isLoading}
          disabledForm={canSubmit || isLoading}
        >
          Đăng nhập
        </PrimaryButton>
      </form>
    </React.Fragment>
  );
};

export default SignInPage;
