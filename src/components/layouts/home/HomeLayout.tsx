import React from "react";
import { StickyNav } from "../../common";
import {
  CommentIcon,
  DotIcon,
  DotsIcon,
  HeartIcon,
  RetWeetIcon,
  StatsIcon,
} from "../../SingleUseComponents/Icon";
import { LuShare } from "react-icons/lu";
import HomeStory from "./HomeStory";
import OverlayModal from "@/components/common/Modal/OverlayModal";
import HomeCreatePost from "./HomeCreatePost";
import ModalEditProfile from "@/components/common/portal/ModalEditProfile";
import { useEvent } from "@/store/useEven";

const HomeLayout = () => {
  const { showCreatePost, setShowCreatePost } = useEvent((state) => state);
  console.log("showCreatePost ===> ", showCreatePost)
  const handleOpenModal = React.useCallback(() => {
    setShowCreatePost(true);
  }, [showCreatePost]);

  return (
    <React.Fragment>
      <div className={`flex w-[662px] flex-col ${showCreatePost ? "h-screen overflow-hidden" : "h-full"} min-h-screen border-r-[0.5px] border-borderGrayPrimary`}>
        <StickyNav>
          <div className="p-4">
            <h1 className="text-xl font-bold">Meteeor</h1>
          </div>
        </StickyNav>
        <div className="border-t-[0.5px] border-b-[0.5px] p-4 border-borderGrayPrimary py-[20px] space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-none">
              <img src="/image/avatar.jpg" className="w-full h-full object-cover" />
            </div>
            <div className="w-full">
              <button
                className="bg-transparent text-left border hover:bg-[rgba(29,155,240,0.1)] border-borderGrayPrimary cursor-pointer font-[300] text-sm text-white px-4 py-[10px] rounded-full w-full outline-none"
                onClick={handleOpenModal}
              >
                Đạt ơi, bạn đang nghĩ gì thế?
              </button>
            </div>
          </div>
          <div className="w-full h-[1px] bg-borderGrayPrimary"></div>
          <HomeStory />
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
              <div className="flex flex-col pr-[25px]">
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
      <HomeCreatePost></HomeCreatePost>
    </React.Fragment>
  );
};

export default HomeLayout;
