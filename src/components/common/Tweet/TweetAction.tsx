import { CommentIcon, HeartIcon, RetWeetIcon, StatsIcon } from '@/components/SingleUseComponents/Icon';
import { Tweet } from '@/types/tweetTypes';
import React from 'react';
import { LuShare } from 'react-icons/lu';

const TweetAction = ({ tweet }: { tweet: Tweet }) => {
    const { likes, comment_count, bookmarks, views } = tweet
    return (
        <div className="w-full flex items-center justify-between text-textGray text-base">
            <div className="flex gap-x-[2px] items-center group cursor-pointer">
                <div className="cursor-pointer rounded-full p-2 group-hover:bg-textPinkPrimary/10 transition duration-200 hover:text-textPinkPrimary group">
                    <HeartIcon className="group-hover:text-textPinkPrimary" />
                </div>
                <span className="group-hover:text-textPinkPrimary">
                    {likes < 1000 ? likes : likes.toString + "K"}
                </span>
            </div>
            <div className="flex gap-x-[2px] items-center group cursor-pointer">
                <div className="rounded-full p-2 group-hover:bg-textBlue/10 transition duration-200 hover:text-textBlue group">
                    <CommentIcon className="group-hover:text-textBlue" />
                </div>
                <span className="group-hover:text-textBlue">{comment_count < 1000 ? comment_count : comment_count.toString + "K"}</span>
            </div>
            <div className="flex gap-x-[2px] items-center group cursor-pointer">
                <div className="rounded-full p-2 group-hover:bg-textGreen/10 transition duration-200 hover:text-textGreen group">
                    <RetWeetIcon className="group-hover:text-textGreen" />
                </div>
                <span className="group-hover:text-textGreen">{bookmarks < 1000 ? bookmarks : bookmarks.toString + "K"}</span>
            </div>
            <div className="flex gap-x-[2px] items-center group cursor-pointer">
                <div className="rounded-full p-2 group-hover:bg-textBlue/10 transition duration-200 hover:text-textBlue group">
                    <StatsIcon className="group-hover:text-textBlue" />
                </div>
                <span className="group-hover:text-textBlue">{views}M</span>
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