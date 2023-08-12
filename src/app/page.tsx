"use client";
import React from "react";
import { BsChevronDown, BsApple, BsTwitter } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
export default function Home() {
  return (
    <div className="relative text-white">
      <main>
        <div className="grid grid-cols-[1fr,2fr]">
          <div className="flex items-center justify-center">
            <div className="p-8">
              <BsTwitter
                style={{
                  width: "250px",
                  height: "270px",
                  color: "#1d9bf0",
                }}
              />
            </div>
          </div>

          <div className="p-9">
            <div className=" mb-12">
              <h1 className=" text-[64px] inline font-bold text-[#1d9bf0]">
                Đang diễn ra ngay bây giờ
              </h1>
            </div>
            <p className="text-3xl font-bold mb-7 text-[#1d9bf0]">
              Join today.
            </p>
            <div className="flex flex-col gap-y-3 max-w-[320px] mb-7">
              <button className="w-80 h-11 rounded-full bg-white text-[#202124] transition-all hover:bg-[#e0e0e0] py-[2px] px-[10px] relative">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full overflow-hidden ml-[-4px] mr-2">
                    <img
                      src="/image/avatar.jpg"
                      alt="avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="text-xs text-start">
                    <span className="text-[#3c4043] font-medium">
                      Đăng nhập với tên trần văn đạt
                    </span>
                    <div className="flex items-center">
                      <span className="text-[#5f6368] opacity-75">
                        tranvandatevondev0503@gmail.com
                      </span>
                      <BsChevronDown style={{ margin: "0px 0px 0px 8px" }} />
                    </div>
                  </div>
                  <FcGoogle
                    style={{
                      width: "24px",
                      height: "24px",
                      position: "absolute",
                      right: "4px",
                    }}
                  />
                </div>
              </button>

              <button className="w-80 h-11 rounded-full bg-white text-[#202124] transition-all hover:bg-[#e0e0e0                                                                                                                                  ] py-[2px] px-[10px]">
                <div className="flex items-center justify-center">
                  <BsApple
                    style={{
                      width: "24px",
                      height: "24px",
                      margin: "0px 4px 0px 0px",
                    }}
                  />
                  <span className="text-[#3c4043] text-base font-bold">
                    Đăng ký bằng Apple
                  </span>
                </div>
              </button>

              <div className="flex items-center">
                <div>
                  <div className="w-[133px] h-[1px] bg-[#2f3336]"></div>
                </div>
                <div className="mx-2 text-gray-300">hoặc</div>
                <div>
                  <div className="w-[133px] h-[1px] bg-[#2f3336]"></div>
                </div>
              </div>

              <Link
                href="/sign-up"
                className="w-80 h-11 rounded-full bg-[#1d9bf0] hover:bg-[#1486d2] no-underline hover:no-underline transition-all flex items-center justify-center text-white py-[2px] px-[10px] text-base"
              >
                Tạo tài khoản
              </Link>

              <div className="text-xs text-[#71767b] min-w-0 break-words">
                Khi đăng ký, bạn đã đồng ý với{" "}
                <a href="https://twitter.com/en/tos">Điều khoản Dịch vụ</a> và{" "}
                <a href="https://twitter.com/en/privacy">
                  Chính sách Quyền riêng tư
                </a>
                , gồm cả{" "}
                <a href="https://help.twitter.com/en/rules-and-policies/twitter-cookies">
                  Sử dụng Cookie
                </a>
                .
              </div>
            </div>

            <div className="flex flex-col gap-y-3 max-w-[320px]">
              <p className="text-[#1d9bf0] text-lg font-bold">
                Đã có tài khoản?
              </p>
              <Link
                href={"/sign-in"}
                className="w-80 h-11 rounded-full bg-transparent border font-semibold transition-all hover:no-underline hover:bg-[rgba(29,155,240,0.1)] flex items-center justify-center border-[#536472] text-[#1d9bf0] py-[2px] px-[10px] text-base"
              >
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
        <footer className="px-4 py-3 text-[#71767b] text-sm text-center">
          <span>&copy; 2023 Twitter. </span>
          <span>Contact: tranvandatevondev0503@gmail.com</span>
        </footer>
      </main>
    </div>
  );
}
