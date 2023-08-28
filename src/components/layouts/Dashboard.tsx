"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Tippy from "@tippyjs/react/headless";
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
import { PrimaryButton } from "../common";
import { useAuth } from "@/store";
import { Routers } from "@/utils/router/routers";
import { getToken, logOutCookies } from "@/utils/auth/cookies";

interface IDashboard {
  children: React.ReactNode;
}

const DashboardPage: React.FC<IDashboard> = (props) => {
  const { children } = props;
  const pathname = usePathname();
  const router = useRouter();

  const { fetchMe, logout, updateUserAndToken, userInfo, getUserReload } =
    useAuth((state) => state);
  const { refresh_token } = getToken();
  React.useEffect(() => {
    const getUser = async () => {
      const user = await fetchMe();
      if (user && user._id) {
        updateUserAndToken({ userData: user });
      } else {
        if (refresh_token) {
          const response = await getUserReload(refresh_token);
          if (response?.status === 200) {
            const user = await fetchMe();
            updateUserAndToken({
              userData: user,
            });
          }
        } else {
          router.push(Routers.signInPage);
          logout();
        }
      }
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh_token]);
  const isActive = (path: string) => {
    return pathname === path
      ? "bg-[rgba(29,155,240,0.2)] hover:bg-[rgba(29,155,240,0.2)] font-bold"
      : "";
  };
  const handleLogout = () => {
    logOutCookies();
    router.push(Routers.mainLayoutPage);
  };
  return (
    <div className="grid grid-cols-[1fr,2.5fr,1.5fr]">
      <div className="border-r border-borderGrayPrimary px-1 py-2">
        <div className="px-1">
          <div className="mb-1 px-2">
            <TwitterIconVerySmall
              onClick={() => router.push(Routers.signInPage)}
            ></TwitterIconVerySmall>
          </div>
          <Link
            href={"/home"}
            className={`hover:no-underline text-white flex items-center text-xl py-[10px] my-[2px] px-2 hover:bg-bgHoverBlue rounded-full transition-all ${isActive(
              "/home"
            )}`}
          >
            <HomeIcon></HomeIcon>
            <p>Home</p>
          </Link>
          <Link
            href={"/explore"}
            className={`hover:no-underline text-white flex items-center text-xl py-[10px] my-[2px] px-2 hover:bg-bgHoverBlue rounded-full transition-all ${isActive(
              "/explore"
            )}`}
          >
            <SearchIcon></SearchIcon>
            <p>Explore</p>
          </Link>
          <Link
            href={"/notifications"}
            className={`hover:no-underline text-white flex items-center text-xl py-[10px] my-[2px] px-2 hover:bg-bgHoverBlue rounded-full transition-all ${isActive(
              "/notifications"
            )}`}
          >
            <NotificationIcon></NotificationIcon>
            <p>Notifications</p>
          </Link>
          <Link
            href={"/messages"}
            className={`hover:no-underline text-white flex items-center text-xl py-[10px] my-[2px] px-2 hover:bg-bgHoverBlue rounded-full transition-all ${isActive(
              "/messages"
            )}`}
          >
            <MessageIcon></MessageIcon>
            <p>Messages</p>
          </Link>
          <Link
            href={"/datdev0503/lists"}
            className={`hover:no-underline text-white flex items-center text-xl py-[10px] my-[2px] px-2 hover:bg-bgHoverBlue rounded-full transition-all ${isActive(
              "/datdev0503/lists"
            )}`}
          >
            <ListIcon></ListIcon>
            <p>Lists</p>
          </Link>
          <Link
            href={"/datdev0503/communities"}
            className={`hover:no-underline text-white flex items-center text-xl py-[10px] my-[2px] px-2 hover:bg-bgHoverBlue rounded-full transition-all ${isActive(
              "/datdev0503/communities"
            )}`}
          >
            <CommunityIcon></CommunityIcon>
            <p>Communities</p>
          </Link>
          <Link
            href={"/verified-choose"}
            className={`hover:no-underline text-white flex items-center text-xl py-[10px] my-[2px] px-2 hover:bg-bgHoverBlue rounded-full transition-all ${isActive(
              "/verified-choose"
            )}`}
          >
            <VerifiedIcon></VerifiedIcon>
            <p>Verified</p>
          </Link>
          <Link
            href={`${Routers.profile}/${userInfo?.username}`}
            className={`hover:no-underline text-white flex items-center text-xl py-[10px] my-[2px] px-2 hover:bg-bgHoverBlue rounded-full transition-all ${isActive(
              Routers.profile + "/" + userInfo?.username
            )}`}
          >
            <ProfileIcon></ProfileIcon>
            <p>Profile</p>
          </Link>
          <div className="hover:no-underline text-white flex items-center text-xl py-[10px] my-[2px] px-2 hover:bg-bgHoverBlue rounded-full transition-all ">
            <MoreIcon></MoreIcon>
            <p>More</p>
          </div>
          <div className="mt-1 mb-6">
            <PrimaryButton className="px-2 w-full py-3">Post</PrimaryButton>
          </div>
          <Tippy
            interactive
            // placement="top"
            trigger="click"
            offset={[20, 12]}
            render={(attrs) => (
              <div
                className="w-[280px] h-[112px] bg-[#1d1c1c] py-2 border-borderGraySecond rounded-2xl text-white flex flex-col items-start"
                tabIndex={-1}
                {...attrs}
              >
                <Link
                  href={"/sign-in"}
                  className="no-underline hover:no-underline text-white w-full py-3 px-4 hover:bg-bgHoverBlue"
                >
                  Add an existing account
                </Link>
                <button
                  className="py-3 hover:bg-bgHoverBlue w-full text-start px-4"
                  onClick={handleLogout}
                >
                  Log out {userInfo?.username}
                </button>
              </div>
            )}
          >
            <div className="flex items-center cursor-pointer select-none justify-between text-sm py-[10px] my-[2px] px-2 hover:bg-bgHoverBlue rounded-full">
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
          </Tippy>
        </div>
      </div>

      {/*change*/}
      <div className="h-[1780px] relative flex-1 border border-blue-500 w-[]">
        {children}
      </div>
      <div className="border border-red-500">Search</div>
    </div>
  );
};

export default DashboardPage;
