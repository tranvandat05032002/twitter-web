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
import Image from "next/image";
import { Avatar } from "@mui/material";
import { useGetTweets } from "@/hooks/users/useQuery";
import { parseISO } from "date-fns";
import { formatMessageTime, formatTweetTime } from "@/utils/handlers";

const HomeLayout = () => {
  const { showCreatePost, setShowCreatePost } = useEvent((state) => state);
  const { data: tweets } = useGetTweets()
  console.log("tweets ===> ", tweets)
  // const {tweets} = data?.tweet
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
              {/* <Image
                src="/image/avatar.jpg"
                alt="Avatar"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              /> */}
              <Avatar
                src="/image/avatar.jpg"
                className="object-fit-cover"
                sx={{ width: '100%', height: '100%' }}
              />
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

          {tweets?.tweet.tweets.length! > 0 && tweets?.tweet.tweets.map((tweet) => {
            const date = parseISO(tweet?.created_at as string);
            const time = formatTweetTime(date);
            return (
              <div
                key={tweet._id}
                className="p-4 pb-2 border-b-[0.25px] border-borderGrayPrimary flex space-x-4"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden flex-none">
                  <Avatar
                    src={tweet.user.avatar ? tweet.user.avatar : "/image/avatar.jpg"}
                    className="object-fit-cover"
                    sx={{ width: '100%', height: '100%' }}
                  />
                </div>
                <div className="flex flex-col w-full pr-[25px]">
                  <div className="pb-2">
                    <div className="mb-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center w-full text-base justify-between text-textGray">
                          <div className="flex items-center space-x-1">
                            <h2 className="text-base font-bold text-white">
                              {tweet.user.name}
                            </h2>
                            <p>{tweet.user.username}</p>
                            {/* <div>
                              <DotIcon style={{ color: "#71767b" }}></DotIcon>
                            </div> */}
                            {/* <div>{time}</div> */}
                          </div>
                          <div className="cursor-pointer hover:bg-bgHoverBlue group rounded-full">
                            <DotsIcon className="text-textGray group-hover:text-textBlue "></DotsIcon>
                          </div>
                        </div>
                      </div>
                      {/* <div className="text-white text-base">
                        {tweet.content}
                      </div> */}
                      <div className="flex items-center space-x-1">
                        <div className="text-textGray text-sm">{time}</div>
                        <div>
                          <DotIcon style={{ color: "#71767b" }}></DotIcon>
                        </div>
                      </div>
                    </div>
                    <div className="text-white text-base mb-4">
                      {tweet.content}
                    </div>

                    {/* {tweet.medias.length > 0 && <div className="relative w-full h-[510px] aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={tweet.medias[0].url}
                        alt=""
                        fill
                        objectFit="cover"
                      />
                    </div>} */}
                    {tweet.medias.length > 0 && (
                      <div className={`relative w-full h-[510px] aspect-square rounded-lg overflow-hidden grid ${GridImages(tweet.medias.length)} gap-1 p-1`}>
                        {tweet.medias.length === 1 && (
                          <div className="relative w-full h-full rounded overflow-hidden">
                            <Image
                              src={tweet.medias[0].url}
                              alt=""
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}

                        {tweet.medias.length === 2 && (
                          <>
                            {tweet.medias.map((media, index) => (
                              <div key={index} className="relative w-full h-full rounded overflow-hidden">
                                <Image
                                  src={media.url}
                                  alt=""
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ))}
                          </>
                        )}

                        {tweet.medias.length === 3 && (
                          <>
                            <div className="relative w-full h-full col-span-2 rounded overflow-hidden">
                              <Image
                                src={tweet.medias[0].url}
                                alt=""
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="relative w-full h-full rounded overflow-hidden">
                              <Image
                                src={tweet.medias[1].url}
                                alt=""
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="relative w-full h-full rounded overflow-hidden">
                              <Image
                                src={tweet.medias[2].url}
                                alt=""
                                fill
                                className="object-cover"
                              />
                            </div>
                          </>
                        )}

                        {tweet.medias.length >= 4 && (
                          <>
                            {tweet.medias.slice(0, 3).map((media, index) => (
                              <div key={index} className="relative w-full h-full rounded overflow-hidden">
                                <Image
                                  src={media.url}
                                  alt=""
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ))}
                            <div className="relative w-full h-full rounded overflow-hidden cursor-pointer">
                              <Image
                                src={tweet.medias[3].url}
                                alt=""
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-black/50 text-white flex items-center justify-center text-lg font-semibold">
                                +{tweet.medias.length - 3}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="w-full flex items-center justify-between text-textGray text-base">
                    <div className="flex gap-x-[2px] items-center group cursor-pointer">
                      <div className="cursor-pointer rounded-full p-2 group-hover:bg-textPinkPrimary/10 transition duration-200 hover:text-textPinkPrimary group">
                        <HeartIcon className="group-hover:text-textPinkPrimary" />
                      </div>
                      <span className="group-hover:text-textPinkPrimary">
                        {tweet.likes < 1000 ? tweet.likes : tweet.likes.toString + "K"}
                      </span>
                    </div>
                    <div className="flex gap-x-[2px] items-center group cursor-pointer">
                      <div className="rounded-full p-2 group-hover:bg-textBlue/10 transition duration-200 hover:text-textBlue group">
                        <CommentIcon className="group-hover:text-textBlue" />
                      </div>
                      <span className="group-hover:text-textBlue">{tweet.comment_count < 1000 ? tweet.comment_count : tweet.comment_count.toString + "K"}</span>
                    </div>
                    <div className="flex gap-x-[2px] items-center group cursor-pointer">
                      <div className="rounded-full p-2 group-hover:bg-textGreen/10 transition duration-200 hover:text-textGreen group">
                        <RetWeetIcon className="group-hover:text-textGreen" />
                      </div>
                      <span className="group-hover:text-textGreen">{tweet.bookmarks < 1000 ? tweet.bookmarks : tweet.bookmarks.toString + "K"}</span>
                    </div>
                    <div className="flex gap-x-[2px] items-center group cursor-pointer">
                      <div className="rounded-full p-2 group-hover:bg-textBlue/10 transition duration-200 hover:text-textBlue group">
                        <StatsIcon className="group-hover:text-textBlue" />
                      </div>
                      <span className="group-hover:text-textBlue">{tweet.views}M</span>
                    </div>
                    <div className="flex gap-x-[2px] items-center group cursor-pointer">
                      <div className="cursor-pointer rounded-full p-2 hover:bg-textBlue/10 hover:text-textBlue transition duration-200 group">
                        <LuShare className="group-hover:text-textBlue" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <HomeCreatePost></HomeCreatePost>
    </React.Fragment>
  );
};

function GridImages(imageCount: number): string {
  let gridClasses = 'grid ';
  if (imageCount === 1) {
    gridClasses += 'grid-cols-1 grid-rows-1';
  } else if (imageCount === 2) {
    gridClasses += 'grid-cols-1 grid-rows-2';
  } else if (imageCount >= 3) {
    gridClasses += 'grid-cols-2 grid-rows-2';
  }
  return gridClasses
}

export default HomeLayout;
