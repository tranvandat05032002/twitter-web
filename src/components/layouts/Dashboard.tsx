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
import { usePathname } from "next/navigation";
import { PrimaryButton } from "../common";
import { useAuth } from "@/store";
import { Routers } from "@/utils/router/routers";

interface IDashboard {
  children: React.ReactNode;
}

const DashboardPage: React.FC<IDashboard> = (props) => {
  const { children } = props;
  const pathname = usePathname();
  const { userInfo } = useAuth((state) => state);
  if (!userInfo) return;
  const isActive = (path: string) => {
    return pathname === path
      ? "bg-[rgba(29,155,240,0.2)] hover:bg-[rgba(29,155,240,0.2)] font-bold"
      : "";
  };
  return (
    <div className="grid grid-cols-[1fr,2.5fr,1.5fr]">
      <div className="border-r border-borderGrayPrimary px-1 py-2">
        <div className="px-1">
          <div className="mb-1 px-2">
            <TwitterIconVerySmall></TwitterIconVerySmall>
          </div>
          <Link
            href={"/home"}
            className={`hover:no-underline text-white flex items-center text-xl py-[10px] my-[2px] px-2 hover:bg-[rgba(29,155,240,0.1)] rounded-full transition-all ${isActive(
              "/home"
            )}`}
          >
            <HomeIcon></HomeIcon>
            <p>Home</p>
          </Link>
          <Link
            href={"/explore"}
            className={`hover:no-underline text-white flex items-center text-xl py-[10px] my-[2px] px-2 hover:bg-[rgba(29,155,240,0.1)] rounded-full transition-all ${isActive(
              "/explore"
            )}`}
          >
            <SearchIcon></SearchIcon>
            <p>Explore</p>
          </Link>
          <Link
            href={"/notifications"}
            className={`hover:no-underline text-white flex items-center text-xl py-[10px] my-[2px] px-2 hover:bg-[rgba(29,155,240,0.1)] rounded-full transition-all ${isActive(
              "/notifications"
            )}`}
          >
            <NotificationIcon></NotificationIcon>
            <p>Notifications</p>
          </Link>
          <Link
            href={"/messages"}
            className={`hover:no-underline text-white flex items-center text-xl py-[10px] my-[2px] px-2 hover:bg-[rgba(29,155,240,0.1)] rounded-full transition-all ${isActive(
              "/messages"
            )}`}
          >
            <MessageIcon></MessageIcon>
            <p>Messages</p>
          </Link>
          <Link
            href={"/datdev0503/lists"}
            className={`hover:no-underline text-white flex items-center text-xl py-[10px] my-[2px] px-2 hover:bg-[rgba(29,155,240,0.1)] rounded-full transition-all ${isActive(
              "/datdev0503/lists"
            )}`}
          >
            <ListIcon></ListIcon>
            <p>Lists</p>
          </Link>
          <Link
            href={"/datdev0503/communities"}
            className={`hover:no-underline text-white flex items-center text-xl py-[10px] my-[2px] px-2 hover:bg-[rgba(29,155,240,0.1)] rounded-full transition-all ${isActive(
              "/datdev0503/communities"
            )}`}
          >
            <CommunityIcon></CommunityIcon>
            <p>Communities</p>
          </Link>
          <Link
            href={"/verified-choose"}
            className={`hover:no-underline text-white flex items-center text-xl py-[10px] my-[2px] px-2 hover:bg-[rgba(29,155,240,0.1)] rounded-full transition-all ${isActive(
              "/verified-choose"
            )}`}
          >
            <VerifiedIcon></VerifiedIcon>
            <p>Verified</p>
          </Link>
          <Link
            href={`${Routers.profile}/${userInfo.username}`}
            className={`hover:no-underline text-white flex items-center text-xl py-[10px] my-[2px] px-2 hover:bg-[rgba(29,155,240,0.1)] rounded-full transition-all ${isActive(
              Routers.profile + "/" + userInfo.username
            )}`}
          >
            <ProfileIcon></ProfileIcon>
            <p>Profile</p>
          </Link>
          <div className="hover:no-underline text-white flex items-center text-xl py-[10px] my-[2px] px-2 hover:bg-[rgba(29,155,240,0.1)] rounded-full transition-all ">
            <MoreIcon></MoreIcon>
            <p>More</p>
          </div>
          <div className="mt-1 mb-6">
            <PrimaryButton className="px-2 w-full py-3">Post</PrimaryButton>
          </div>
          <div className="flex items-center justify-between text-sm py-[10px] my-[2px] px-2 hover:bg-[rgba(29,155,240,0.1)] rounded-full">
            <div className="flex items-center gap-x-2">
              <div className="w-10 h-10 overflow-hidden rounded-full">
                <img
                  src="/image/avatar.jpg"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p>{userInfo?.name}</p>
                <p className="text-textGray">{userInfo?.username}</p>
              </div>
            </div>
            <div>
              <DotsIcon></DotsIcon>
            </div>
          </div>
        </div>
      </div>

      {/*change*/}
      <div className="">{children}</div>
      <div className="border border-red-500">Search</div>
    </div>
  );
};

export default DashboardPage;
