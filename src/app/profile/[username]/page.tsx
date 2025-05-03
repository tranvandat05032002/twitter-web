"use client";
import DashboardPage from "@/components/layouts/Dashboard";
import React from "react";
import dynamic from "next/dynamic"
import LoadingPage from "@/components/common/Loading/LoadingPage";
import { useGetTweets } from "@/hooks/users/useQuery";
import { parseISO } from "date-fns";
import { formatTweetTime } from "@/utils/handlers";
import TweetComponent from "@/components/common/Tweet/TweetComponent";
import { useInfiniteOwnerTweets } from "@/hooks/useInfiniteQuery";
import { useInView } from "react-intersection-observer";
import { LoadingSniper } from "@/components/common/Loading/LoadingSniper";
const DynamicProfile = dynamic(() => import("@/components/layouts/ProfileLayout"), {
  loading: () => <LoadingPage></LoadingPage>
})

const Profile = ({ params }: { params: { username: string } }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    status,
  } = useInfiniteOwnerTweets();
  const { ref: loader, inView } = useInView({ threshold: 1 });

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  const tweets = data?.pages.flatMap((page) => page?.tweet.tweets ?? []);
  return (
    <DashboardPage>
      <DynamicProfile params={params}>
        <div>
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
      </DynamicProfile>
    </DashboardPage>
  );
};

export default Profile;
