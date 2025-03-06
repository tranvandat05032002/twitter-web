import React from "react";
import { StickyNav } from "../common";
import {
  CommentIcon,
  DotIcon,
  DotsIcon,
  HeartIcon,
  RetWeetIcon,
  StatsIcon,
} from "../SingleUseComponents/Icon";
import Image from 'next/image'
import { LuShare } from "react-icons/lu";
import { PrimaryButton } from "../common/Button";

const HomeLayout = () => {
  return (
    <div className="flex w-[600px] flex-col h-full min-h-screen border-r-[0.5px] border-borderGrayPrimary">
      <StickyNav>
        <div className="p-4">
          <h1 className="text-xl font-bold">Home</h1>
        </div>
      </StickyNav>
      <div className="relative border-t-[0.5px] border-b-[0.5px] p-4 flex items-stretch space-x-2 border-borderGrayPrimary h-[120px]">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-none">
          {/* <img src="/image/avatar.jpg" className="w-full h-full object-cover" /> */}
          <Image
            src="/image/avatar.jpg"
            // width={500}
            // height={500}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt="Picture of the author"
          />
        </div>
        <div className="flex flex-col w-full h-full">
          <input
            type="text"
            className="w-full h-full bg-transparent border-[0.5px] border-borderGrayPrimary pt-3 px-4 text-xl outline-none border-none placeholder:text-xl placeholder:text-textGray "
            placeholder="What is happening?!"
          />

          <div className="w-full justify-between items-center flex">
            <div></div>
            <div className="w-full max-w-[72px]">
              <PrimaryButton className="w-full px-4 py-1 text-lg">
                Post
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="p-4 pb-2 border-b-[0.25px] border-borderGrayPrimary flex space-x-4"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden flex-none">
              <img
                src="/image/avatar.jpg"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="pb-2">
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center w-full text-base justify-between text-textGray">
                      <div className="flex items-center space-x-1">
                        <h2 className="text-base font-bold text-white">
                          Trần Văn Đạt
                        </h2>
                        <p>@tranvandat0503</p>
                        <div>
                          <DotIcon style={{ color: "#71767b" }}></DotIcon>
                        </div>
                        <div>22h</div>
                      </div>
                      <div className="cursor-pointer hover:bg-bgHoverBlue group rounded-full">
                        <DotsIcon className="text-textGray group-hover:text-textBlue "></DotsIcon>
                      </div>
                    </div>
                  </div>
                  <div className="text-white text-base">
                    Atletico Madrid really beat Rayo Vallecano 7-0 with less
                    possession. Only Diego Simeone
                  </div>
                </div>
                <div className="w-full h-[510px] aspect-square rounded-lg overflow-hidden">
                  <img
                    src="/image/avatar.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-full flex items-center justify-between text-textGray text-base">
                <div className="flex gap-x-[2px] items-center group cursor-pointer">
                  <div className="rounded-full p-2 group-hover:bg-textBlue/10 transition duration-200 hover:text-textBlue group">
                    <CommentIcon className="group-hover:text-textBlue" />
                  </div>
                  <span className="group-hover:text-textBlue">1457</span>
                </div>
                <div className="flex gap-x-[2px] items-center group cursor-pointer">
                  <div className="rounded-full p-2 group-hover:bg-textGreen/10 transition duration-200 hover:text-textGreen group">
                    <RetWeetIcon className="group-hover:text-textGreen" />
                  </div>
                  <span className="group-hover:text-textGreen">14,91</span>
                </div>
                <div className="flex gap-x-[2px] items-center group cursor-pointer">
                  <div className="cursor-pointer rounded-full p-2 group-hover:bg-textPinkPrimary/10 transition duration-200 hover:text-textPinkPrimary group">
                    <HeartIcon className="group-hover:text-textPinkPrimary" />
                  </div>
                  <span className="group-hover:text-textPinkPrimary">
                    168.5K
                  </span>
                </div>
                <div className="flex gap-x-[2px] items-center group cursor-pointer">
                  <div className="rounded-full p-2 group-hover:bg-textBlue/10 transition duration-200 hover:text-textBlue group">
                    <StatsIcon className="group-hover:text-textBlue" />
                  </div>
                  <span className="group-hover:text-textBlue">3.2M</span>
                </div>
                <div className="flex gap-x-[2px] items-center group cursor-pointer">
                  <div className="cursor-pointer rounded-full p-2 hover:bg-textBlue/10 hover:text-textBlue transition duration-200 group">
                    <LuShare className="group-hover:text-textBlue" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeLayout;
