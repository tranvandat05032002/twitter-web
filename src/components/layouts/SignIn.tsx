import React from "react";
import {
  FacebookIcon,
  GithubIcon,
  GoogleIconSignIn,
  TwitterIcon,
} from "../SingleUseComponents";
import {
  ErrorMessage,
  Input,
  ERROR_FORM_MESSAGES,
} from "../common";
import { GoogleButton, FacebookButton, PrimaryButton, GithubButton } from "../common/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoginForm } from "@/types/userTypes";
import { isObjectEmpty } from "@/utils/handlers";
import { routers } from "@/utils/router/routers";
import { useLogin } from "@/hooks/users/useMutation";
import { getToken } from "@/utils/auth/cookies";
const SignInPage = () => {
  const { mutate: mutateLogin, isLoading } = useLogin();
  const { access_token, refresh_token } = getToken();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schemaValidator),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleLogin = async (values: LoginForm) => {
    if (isObjectEmpty(values)) return;
    mutateLogin(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };
  React.useEffect(() => {
    if (access_token && refresh_token) {
      router.push(routers.homePage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access_token, refresh_token]);
  return (
    <React.Fragment>
      <div className="flex items-center justify-center">
        <TwitterIcon size="small"></TwitterIcon>
      </div>
      <form onSubmit={handleSubmit(handleLogin)} autoComplete="off">
        <div>
          <div>
            <h1 className="text-3xl font-bold pb-5 text-center">
              Đăng Nhập Vào Meteor
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
            {/* <AuthButtonGoogle>
              <GoogleIconSignIn></GoogleIconSignIn>
              <p>Google</p>
            </AuthButtonGoogle> */}
            <GoogleButton>
              <GoogleIconSignIn></GoogleIconSignIn>
              <p>Google</p>
            </GoogleButton>
            <GithubButton>
              {" "}
              <GithubIcon></GithubIcon>
              <p>Github</p>
            </GithubButton>
            <FacebookButton>
              {" "}
              <FacebookIcon></FacebookIcon>
              <p>Facebook</p>
            </FacebookButton>
          </div>
        </div>
        <PrimaryButton
          className={`w-[440px] h-[52px] text-base  my-6 px-8`}
          type="submit"
          isLoading={isLoading}
          disabledForm={isLoading}
        >
          Đăng nhập
        </PrimaryButton>
      </form>
    </React.Fragment>
  );
};

export default SignInPage;

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


