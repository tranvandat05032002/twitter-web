import { CommentIcon, HeartIcon, RetWeetIcon, StatsIcon } from '@/components/SingleUseComponents/Icon';
import { useToggleLike } from '@/hooks/users/useMutation';
import { Tweet } from '@/types/tweetTypes';
import React from 'react';
import { LuShare } from 'react-icons/lu';
import { FaHeart } from "react-icons/fa";

const TweetAction = ({ tweet }: { tweet: Tweet }) => {
    let { likes, comment_count, bookmarks, _id, liked } = tweet
    if (comment_count === undefined) {
        comment_count = 0
    }
    if (bookmarks === undefined) {
        bookmarks = 0
    }

    const { mutate: toggleLike, data, isLoading } = useToggleLike()
    const handleToggleLike = (id: string) => {
        if (!isLoading) {
            toggleLike({
                tweet_id: _id,
                liked,
                like_id: data?.like_id
            })
        }
    }
    return (
        <div className="w-full flex items-center space-x-[80px] text-textGray text-base">
            <div className="flex gap-x-[2px] items-center group cursor-pointer">
                <button type="button" className={`cursor-pointer rounded-full p-2 group-hover:bg-textPinkPrimary/10 transition ${liked && "text-textPinkPrimary"} duration-200 hover:text-textPinkPrimary group ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`} onClick={() => handleToggleLike(_id)}>
                    {liked ? <FaHeart className="group-hover:text-textPinkPrimary text-textPinkPrimary" /> : <HeartIcon className="group-hover:text-textPinkPrimary" />}
                </button>
                <span className={`group-hover:text-textPinkPrimary ${liked && "text-textPinkPrimary"}`}>
                    {likes < 1000 ? likes : likes.toString + "K"}
                </span>
            </div>
            <div className="flex gap-x-[2px] items-center group cursor-pointer">
                <div className="rounded-full p-2 group-hover:bg-textBlue/10 transition duration-200 hover:text-textBlue group">
                    <CommentIcon className="group-hover:text-textBlue" />
                </div>
                <span className="group-hover:text-textBlue">{comment_count >= 0 && comment_count < 1000 ? comment_count : comment_count.toString + "K"}</span>
            </div>
            <div className="flex gap-x-[2px] items-center group cursor-pointer">
                <div className="rounded-full p-2 group-hover:bg-textGreen/10 transition duration-200 hover:text-textGreen group">
                    <RetWeetIcon className="group-hover:text-textGreen" />
                </div>
                <span className="group-hover:text-textGreen">{bookmarks >= 0 && bookmarks < 1000 ? bookmarks : bookmarks.toString + "K"}</span>
            </div>
            <div className="flex gap-x-[2px] items-center group cursor-pointer">
                <div className="cursor-pointer rounded-full p-2 hover:bg-textBlue/10 hover:text-textBlue transition duration-200 group">
                    <LuShare className="group-hover:text-textBlue" />
                </div>
            </div>
        </div>
    );
};

export default TweetAction;