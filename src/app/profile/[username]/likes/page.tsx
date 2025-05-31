"use client";
import DashboardPage from "@/components/layouts/Dashboard";
import React from "react";
import dynamic from "next/dynamic";
import LoadingPage from "@/components/common/Loading/LoadingPage";
import { useInfiniteLikedTweets } from "@/hooks/useInfiniteQuery";
import { useInView } from "react-intersection-observer";
import { ModalType, useEvent } from "@/store/useEven";
import { Tweet } from "@/types/tweetTypes";
import { parseISO } from "date-fns";
import { formatTweetTime } from "@/utils/handlers";
import TweetComponent from "@/components/common/Tweet/TweetComponent";
import { LoadingSniper } from "@/components/common/Loading/LoadingSniper";
import HomeDetailTweet from "@/components/layouts/home/HomeDetailTweet";
const DynamicLikes = dynamic(
  () => import("@/components/layouts/ProfileLayout"),
  {
    loading: () => <LoadingPage></LoadingPage>,
  }
);

const Likes = ({ params }: { params: { username: string } }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    status,
  } = useInfiniteLikedTweets();
  const { ref: loader, inView } = useInView({ threshold: 1 });
  const { activeModal, setActiveModal, closeModal } = useEvent();
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const [selectedTweet, setSelectedTweet] = React.useState<Tweet | null>(null);
  const [selectedTweetTime, setSelectedTweetTime] = React.useState<string>("");

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleOpenDetailTweet = React.useCallback((tweet: Tweet, time: string) => {
    setActiveModal(ModalType.DETAIL_TWEET);
    setSelectedTweet(tweet);
    setSelectedTweetTime(time);
  }, [setActiveModal]);

  const tweets = data?.pages.flatMap((page) => page?.tweet.tweets ?? []);

  console.log("Tweets ---> ", tweets)
  return (
    <DashboardPage>
      <DynamicLikes params={params}>
        <div>
          {data?.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page?.tweet?.tweets.map((tweet: any) => {
                const date = parseISO(tweet.created_at);
                const time = formatTweetTime(date);
                return <TweetComponent key={tweet._id} tweet={tweet} time={time} onOpenDetail={() => handleOpenDetailTweet(tweet, time)} />;
              })}
            </React.Fragment>
          ))}
          {hasNextPage && tweets?.length !== 0 ? (
            <div ref={loader} className="text-center p-4">
              {isFetchingNextPage && <LoadingSniper className="border-blue-300 mx-auto h-6 w-6" />}
            </div>
          ) : <p className="text-center text-textGray my-4">Không còn bài viết nào để hiển thị.</p>}
          {!isLoading && tweets?.length === 0 && <p className="text-center text-textGray my-4">Chưa có bài viết nào.</p>}
          {activeModal === ModalType.DETAIL_TWEET && selectedTweet && (
            <HomeDetailTweet
              onClose={closeModal}
              tweet={selectedTweet}
              time={selectedTweetTime}
            />
          )}
        </div>
      </DynamicLikes>
    </DashboardPage>
  );
};

export default Likes;
