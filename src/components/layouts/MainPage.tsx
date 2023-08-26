import React from "react";
import { BsChevronDown, BsApple, BsTwitter } from "react-icons/bs";
import Link from "next/link";
import { GhostButton, PrimaryButton } from "@/components/common";
import {
  AppleIcon,
  GoogleIcon,
  TermsAndPrivacyNotice,
  TwitterIcon,
} from "@/components/SingleUseComponents";
import { Routers } from "@/utils/router/routers";
const MainPage = () => {
  return (
    <div className="relative text-white">
      <div className="grid grid-cols-[1fr,2fr]">
        <div className="flex items-center justify-center">
          <div className="p-8">
            <TwitterIcon size="big"></TwitterIcon>
          </div>
        </div>

        <div className="p-9">
          <div className=" mb-12">
            <h1 className=" text-[64px] inline font-bold text-textBlue">
              Đang diễn ra ngay bây giờ
            </h1>
          </div>
          <p className="text-3xl font-bold mb-7 text-textBlue">Join today.</p>
          <div className="flex flex-col gap-y-3 max-w-[320px] mb-7">
            <button className="w-80 h-11 rounded-full bg-white text-textBlack transition-all hover:bg-bgHoverWhite py-[2px] px-[10px] relative">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full overflow-hidden ml-[-4px] mr-2">
                  <img
                    src="/image/avatar.jpg"
                    alt="avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="text-xs text-start">
                  <span className="text-textBlackBtn font-medium">
                    Đăng nhập với tên trần văn đạt
                  </span>
                  <div className="flex items-center">
                    <span className="text-textGrayBtn opacity-75">
                      tranvandatevondev0503@gmail.com
                    </span>
                    <BsChevronDown style={{ margin: "0px 0px 0px 8px" }} />
                  </div>
                </div>
                <GoogleIcon></GoogleIcon>
              </div>
            </button>

            <button className="w-80 h-11 rounded-full bg-white text-textBlack transition-all hover:bg-bgHoverWhite                                                                                                                               ] py-[2px] px-[10px]">
              <div className="flex items-center justify-center">
                <AppleIcon></AppleIcon>
                <span className="text-textBlackBtn text-base font-bold">
                  Đăng ký bằng Apple
                </span>
              </div>
            </button>

            <div className="flex items-center">
              <div>
                <div className="w-[133px] h-[1px] bg-textGrayLine"></div>
              </div>
              <div className="mx-2 text-gray-300">hoặc</div>
              <div>
                <div className="w-[133px] h-[1px] bg-textGrayLine"></div>
              </div>
            </div>

            <Link href={Routers.signUpPage} className="hover:no-underline">
              <PrimaryButton className="w-80 h-11 text-base py-[2px] px-[10px]">
                Tạo tài khoản
              </PrimaryButton>
            </Link>

            <TermsAndPrivacyNotice></TermsAndPrivacyNotice>
          </div>

          <div className="flex flex-col gap-y-3 max-w-[320px]">
            <p className="text-textBlue text-lg font-bold">Đã có tài khoản?</p>
            <Link href={Routers.signInPage} className="hover:no-underline">
              <GhostButton className="w-80 h-11 rounded-full  py-[2px] px-[10px] text-base">
                Đăng nhập
              </GhostButton>
            </Link>
          </div>
        </div>
      </div>
      <footer className="px-4 py-3 text-textGray text-sm text-center">
        <span>&copy; 2023 Twitter. </span>
        <span>Contact: tranvandatevondev0503@gmail.com</span>
      </footer>
    </div>
  );
};

export default MainPage;
