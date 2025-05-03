import React from "react";
import { StickyNav } from "../../common";
import HomeStory from "./HomeStory";
import { useInView } from "react-intersection-observer";
import HomeCreatePost from "./HomeCreatePost";
import { useEvent } from "@/store/useEven";
import { Avatar } from "@mui/material";
import { parseISO } from "date-fns";
import { formatTweetTime } from "@/utils/handlers";
import TweetComponent from "@/components/common/Tweet/TweetComponent";
import { useInfiniteTweets } from "@/hooks/useInfiniteQuery";
import { LoadingSniper } from "@/components/common/Loading/LoadingSniper";
import { useProfileStore } from "@/store/useProfile";

const HomeLayout = () => {
  const { showCreatePost, setShowCreatePost } = useEvent((state) => state);
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    status,
  } = useInfiniteTweets();
  const { ref: loader, inView } = useInView({ threshold: 1 });
  const { userProfile } = useProfileStore(
    (state) => state
  );

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleOpenModal = React.useCallback(() => {
    setShowCreatePost(true);
  }, [showCreatePost]);

  const tweets = data?.pages.flatMap((page) => page?.tweet.tweets ?? []);
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
            <div className="w-10 h-10 rounded-full overflow-hidden flex-none cursor-pointer">
              <Avatar
                src={userProfile.avatar}
                className="object-fit-cover hover:opacity-80"
                title={userProfile.name}
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
          {data?.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page?.tweet?.tweets.map((tweet: any) => {
                const date = parseISO(tweet.created_at);
                const time = formatTweetTime(date);
                return <TweetComponent key={tweet._id} tweet={tweet} time={time} />;
              })}
            </React.Fragment>
          ))}
          {hasNextPage && tweets?.length !== 0 ? (
            <div ref={loader} className="text-center p-4">
              {isFetchingNextPage && <LoadingSniper className="border-blue-300 mx-auto h-6 w-6" />}
            </div>
          ) : <p className="text-center text-textGray my-4">Không còn bài viết nào để hiển thị.</p>}
          {!isLoading && tweets?.length === 0 && <p className="text-center text-textGray my-4">Chưa có bài viết nào.</p>}
        </div>
      </div>
      <HomeCreatePost></HomeCreatePost>
    </React.Fragment>
  );
};


export default HomeLayout;
