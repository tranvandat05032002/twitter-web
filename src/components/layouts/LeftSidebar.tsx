import React from "react";
import {
  DotsIcon,
  MoreIcon,
  ProfileIcon,
  TwitterIconVerySmall,
} from "../SingleUseComponents/Icon";
import { NAVIGATION_ITEMS } from "@/constant/constants";
import Link from "next/link";
import { PrimaryButton } from "../common/Button";
import { routers } from "@/utils/router/routers";
import Tippy from "@tippyjs/react/headless";
import { IUser } from "@/types/userTypes";
import { usePathname, useRouter } from "next/navigation";
import { useLogoutUser } from "@/hooks/users/useMutation";
import Image from "next/image";
import { Avatar } from "@mui/material";

interface ILeftSidebar {
  userInfo: IUser | null;
}
const LeftSidebar: React.FC<ILeftSidebar> = (props) => {
  const { userInfo } = props;
  const router = useRouter();
  const pathname = usePathname();
  const { mutate: mutateLogout } = useLogoutUser();
  const isActive = (path: string) => {
    return pathname === path
      ? "bg-[rgba(29,155,240,0.2)] hover:bg-[rgba(29,155,240,0.2)] font-bold"
      : "";
  };
  const handleLogout = async () => {
    mutateLogout();
    router.push(routers.mainLayoutPage);
  };
  return (
    <section className="border-r-[0.5px] w-72 h-full fixed border-borderGrayPrimary px-2 py-2">
      <div className="px-1">
        <div className="mb-2 px-2">
          <TwitterIconVerySmall
            onClick={() => router.push(routers.signInPage)}
          ></TwitterIconVerySmall>
        </div>
        {NAVIGATION_ITEMS.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={`hover:no-underline text-white flex items-center text-xl py-[10px] my-[2px] px-2 hover:bg-bgHoverBlue rounded-full transition-all ${isActive(
              item.href
            )}`}
          >
            <item.icon />
            <p>{item.title}</p>
          </Link>
        ))}
        <Link
          href={`${routers.profile}/${userInfo?.username}`}
          className={`hover:no-underline text-white flex items-center text-xl py-[10px] my-[2px] px-2 hover:bg-bgHoverBlue rounded-full transition-all ${isActive(
            routers.profile + "/" + userInfo?.username
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
          <div className="px-2 absolute bottom-0 w-full left-0 ">
            <div className="flex items-center cursor-pointer select-none justify-between text-sm py-[10px] my-[2px] px-2 hover:bg-bgHoverBlue rounded-full">
              <div className="flex items-center gap-x-2">
                <div className="w-10 h-10 overflow-hidden rounded-full relative"> {/* Thêm relative khi dùng fill */}
                  <Avatar
                    src={userInfo?.avatar}
                    alt="Ảnh đại diện"
                    className="object-fit-cover"
                    sx={{ width: 40, height: 40 }}
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
        </Tippy>
      </div>
    </section>
  );
};

export default React.memo(LeftSidebar);
