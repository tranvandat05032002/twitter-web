"use client";
import DashboardPage from "@/components/layouts/Dashboard";
import { BsArrowLeft } from "react-icons/bs";
import React from "react";
import { GhostButton } from "@/components/common";
import { CalendarIcon } from "@/components/SingleUseComponents/Icon";

const Profile = ({ params }: { params: { username: string } }) => {
  console.log(params);
  return (
    <DashboardPage>
      <div className="flex items-center bg-[rgba(0,0,0,0.8)] pt-1 border-b border-borderGrayPrimary z-10 w-[640px] fixed">
        <div className="text-white">
          <BsArrowLeft
            style={{
              width: "19px",
              height: "19px",
              color: "#ffff",
              marginRight: "36px",
              marginLeft: "15px",
            }}
          />
        </div>
        <div>
          <h2 className="text-xl font-bold">tranvandat</h2>
          <p className="text-textGray text-sm font-light">0 posts</p>
        </div>
      </div>
      <div className="flex flex-col pt-[53px] h-screen overflow-auto">
        <div className="relative w-full h-[200px] z-0">
          <div className="absolute w-full h-full top-0 left-0">
            <img
              src="/image/avatar.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-[134px] h-[134px] absolute bottom-0 left-4 translate-y-1/2">
            <img
              src="/image/avatar.jpg"
              alt="avatar"
              className="w-full h-full rounded-full object-cover border-4 border-black"
            />
          </div>
        </div>
        <div className="w-full pt-3 px-4 mb-4 border border-blue-500">
          <div className="pb-[10px] flex flex-col w-full border items-end">
            <GhostButton className="px-4 py-2 text-white rounded-full w-max">
              Edit profile
            </GhostButton>
          </div>
          <div className="flex flex-col items-start text-base">
              <div>
                <h2 className="text-lg font-bold">Trần Văn Đạt</h2>
                <span className="text-textGray">@Twittername13b916</span>
              </div>
              <p className="font-light">datdev0503</p>
              <div className="flex">
              <CalendarIcon/>
              <span>Joined August 2023</span>
              </div>
              <div className="flex">
                <div className="mr-4">
                  <p>100</p>
                  <span className="text-textGray">Following</span>
                </div>
                <div>
                  <p>112</p>
                  <span className="text-textGray">Followers</span>
                </div>
              </div>
          </div>
        </div>
      </div>
    </DashboardPage>
  );
};

export default Profile;
