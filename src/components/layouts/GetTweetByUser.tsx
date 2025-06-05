'use client'
import { useInfiniteOwnerTweets, useInfiniteUserTweets } from '@/hooks/useInfiniteQuery';
import { ModalType, useEvent } from '@/store/useEven';
import { useProfileStore } from '@/store/useProfile';
import { Tweet } from '@/types/tweetTypes';
import { formatTweetTime } from '@/utils/handlers';
import { parseISO } from 'date-fns';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { LoadingSniper } from '../common/Loading/LoadingSniper';
import TweetComponent from '../common/Tweet/TweetComponent';
import HomeDetailTweet from './home/HomeDetailTweet';

const GetTweetByUser = () => {
    const { userProfile, updateProfile } = useProfileStore(
        (state) => state
    );
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        status,
    } = useInfiniteUserTweets(userProfile?._id as string);
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
    return (
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
            {activeModal === ModalType.DETAIL_TWEET && selectedTweet && (
                <HomeDetailTweet
                    onClose={closeModal}
                    tweet={selectedTweet}
                    time={selectedTweetTime}
                />
            )}
        </div>
    );
};

export default GetTweetByUser;