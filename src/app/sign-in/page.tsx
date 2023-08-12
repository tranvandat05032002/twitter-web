import {
  AuthButtonFacebook,
  AuthButtonGithub,
  AuthButtonGoogle,
} from "@/components/common";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsTwitter } from "react-icons/bs";
const SignIn = () => {
  return (
    <div
      id="register-model"
      className="absolute top-0 bottom-0 left-0 right-0 bg-[rgba(71,74,77,0.3)] flex items-center justify-center"
    >
      <div className="max-w-[600px] bg-black rounded-xl px-20">
        <div className="flex items-center justify-center">
          <BsTwitter
            style={{
              width: "70px",
              height: "90px",
              color: "#1d9bf0",
            }}
          />
        </div>
        <form action="">
          <div className="">
            <div>
              <h1 className="text-3xl font-bold pb-5 text-center">
                Đăng nhập vào Twitter
              </h1>
            </div>
            <div className="py-[13px]">
              <input
                placeholder="Email"
                type="email"
                className="w-full rounded-lg placeholder:font-normal placeholder:text-base border py-[13px] border-[#333639] bg-transparent p-[10px] outline-none placeholder:text-sm placeholder:font-light focus:border focus:border-[#66b3ff] focus:outline-none"
              />
            </div>
            <div className="py-[13px]">
              <input
                placeholder="Mật khẩu"
                type="text"
                className="w-full rounded-lg placeholder:font-normal placeholder:text-base border py-[13px] border-[#333639] bg-transparent p-[10px] outline-none placeholder:text-sm placeholder:font-light focus:border focus:border-[#66b3ff] focus:outline-none"
              />
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
                <FcGoogle style={{ height: "25px", width: "25px" }} />
                <p>Google</p>
              </AuthButtonGoogle>
              <AuthButtonGithub>
                {" "}
                <FaGithub
                  style={{ height: "25px", width: "25px", color: "white" }}
                />
                <p>Github</p>
              </AuthButtonGithub>
              <AuthButtonFacebook>
                {" "}
                <FaFacebookF
                  style={{ height: "25px", width: "25px", color: "#1774eb" }}
                />
                <p>Facebook</p>
              </AuthButtonFacebook>
            </div>
          </div>
          <div className="">
            <button className="w-[440px] h-[52px] rounded-full bg-[#1d9bf0] hover:bg-[#1486d2] transition-all text-white my-6 px-8 text-base">
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
