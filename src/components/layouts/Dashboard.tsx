"use client";
import React from "react";
import {
  TwitterIconVerySmall,
  HomeIcon,
  ListIcon,
  MessageIcon,
  SearchIcon,
  VerifiedIcon,
  ProfileIcon,
  MoreIcon,
  NotificationIcon,
  CommunityIcon,
  DotsIcon,
} from "../SingleUseComponents/Icon";
import Link from "next/link";
import { PrimaryButton } from "../common";

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-[1fr,2.5fr,1.5fr]">
      <div className="border-r border-borderGrayPrimary px-1 py-2">
        <div className="px-1">
          <div className="mb-1 px-2">
            <TwitterIconVerySmall></TwitterIconVerySmall>
          </div>
          <Link
            href={"/home"}
            className="hover:no-underline text-white flex items-center text-xl py-3 px-2 hover:bg-[rgba(29,155,240,0.1)] rounded-full"
          >
            <HomeIcon></HomeIcon>
            <p>Home</p>
          </Link>
          <Link
            href={"/explore"}
            className="hover:no-underline text-white flex items-center text-xl py-3 px-2 hover:bg-[rgba(29,155,240,0.1)] rounded-full"
          >
            <SearchIcon></SearchIcon>
            <p>Explore</p>
          </Link>
          <Link
            href={"/notifications"}
            className="hover:no-underline text-white flex items-center text-xl py-3 px-2 hover:bg-[rgba(29,155,240,0.1)] rounded-full"
          >
            <NotificationIcon></NotificationIcon>
            <p>Notifications</p>
          </Link>
          <Link
            href={"/messages"}
            className="hover:no-underline text-white flex items-center text-xl py-3 px-2 hover:bg-[rgba(29,155,240,0.1)] rounded-full"
          >
            <MessageIcon></MessageIcon>
            <p>Messages</p>
          </Link>
          <Link
            href={"/datdev0503/lists"}
            className="hover:no-underline text-white flex items-center text-xl py-3 px-2 hover:bg-[rgba(29,155,240,0.1)] rounded-full"
          >
            <ListIcon></ListIcon>
            <p>Lists</p>
          </Link>
          <Link
            href={"/datdev0503/communities"}
            className="hover:no-underline text-white flex items-center text-xl py-3 px-2 hover:bg-[rgba(29,155,240,0.1)] rounded-full"
          >
            <CommunityIcon></CommunityIcon>
            <p>Communities</p>
          </Link>
          <Link
            href={"/verified-choose"}
            className="hover:no-underline text-white flex items-center text-xl py-3 px-2 hover:bg-[rgba(29,155,240,0.1)] rounded-full"
          >
            <VerifiedIcon></VerifiedIcon>
            <p>Verified</p>
          </Link>
          <Link
            href={"/datdev0503"}
            className="hover:no-underline text-white flex items-center text-xl py-3 px-2 hover:bg-[rgba(29,155,240,0.1)] rounded-full"
          >
            <ProfileIcon></ProfileIcon>
            <p>Profile</p>
          </Link>
          <div className="hover:no-underline text-white flex items-center text-xl py-3 px-2 hover:bg-[rgba(29,155,240,0.1)] rounded-full">
            <MoreIcon></MoreIcon>
            <p>More</p>
          </div>
          <div className="mt-1 mb-6">
            <PrimaryButton className="px-2 w-full py-3">Post</PrimaryButton>
          </div>
          <div className="flex items-center justify-between text-sm py-3 px-2 hover:bg-[rgba(29,155,240,0.1)] rounded-full">
            <div className="flex items-center gap-x-2">
              <div className="w-10 h-10 overflow-hidden rounded-full">
                <img
                  src="/image/avatar.jpg"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="">
                <p>Trần Văn Đạt</p>
                <p className="text-textGray">@datdev0503</p>
              </div>
            </div>
            <div>
              <DotsIcon></DotsIcon>
            </div>
          </div>
        </div>
      </div>

      {/*change*/}
      <div className="">Post</div>
      <div className="border border-red-500">Search</div>
    </div>
  );
};

export default DashboardPage;
