"use client";
import {
  AuthButtonFacebook,
  AuthButtonGithub,
  AuthButtonGoogle,
  ERROR_FORM_MESSAGES,
  ErrorMessage,
  Input,
  LayoutAuth,
  PrimaryButton,
} from "@/components/common";
import Link from "next/link";
import React from "react";
import {
  FacebookIcon,
  GithubIcon,
  GoogleIconSignIn,
  TwitterIcon,
} from "@/components/SingleUseComponents";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoginForm } from "@/types/userTypes";
const SignIn: React.FC = () => {
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
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginForm>({
    resolver: yupResolver(schemaValidator),
    mode: "onSubmit",
  });
  const handleRegister = (values: LoginForm) => {
    if (!isValid) return;
    console.log(values);
  };
  return (
    <LayoutAuth>
      <div className="flex items-center justify-center">
        <TwitterIcon size="small"></TwitterIcon>
      </div>
      <form onSubmit={handleSubmit(handleRegister)} autoComplete="off">
        <div className="">
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
              type="text"
              name="password"
            ></Input>
            {errors && <ErrorMessage>{errors.password?.message}</ErrorMessage>}
          </div>
          <div className="text-xs">
            <span>Bạn chưa có tài khoản? </span>
            <Link href="/sign-up" className="text-[#1d9bf0]">
              Đăng ký ngay
            </Link>
          </div>
        </div>
        <div className="py-[13px]">
          <div className="flex items-center w-full justify-center">
            <div className="flex-1 border-t border-[#2f3336]"></div>
            <div className="mx-2 font-light text-[#71767b]">hoặc</div>
            <div className="flex-1 border-t border-[#2f3336]"></div>
          </div>
        </div>
        <div className="pb-[13px]">
          <div className="grid grid-cols-1 gap-x-2 sm:grid-cols-3">
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
          className="w-[440px] h-[52px] text-base  my-6 px-8"
          type="submit"
        >
          Đăng nhập
        </PrimaryButton>
      </form>
    </LayoutAuth>
  );
};

export default SignIn;
