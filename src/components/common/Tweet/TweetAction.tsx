import { CommentIcon, HeartIcon, RetWeetIcon, StatsIcon } from '@/components/SingleUseComponents/Icon';
import { useToggleLike } from '@/hooks/users/useMutation';
import { Tweet } from '@/types/tweetTypes';
import React from 'react';
import { LuShare } from 'react-icons/lu';
import { FaHeart } from "react-icons/fa";
import { ModalType, useEvent } from '@/store/useEven';

const TweetAction = ({ tweet, onOpenDetail, isDetaild }: { tweet: Tweet, onOpenDetail?: () => void, isDetaild: Boolean }) => {
    let { likes, comment_count, bookmarks, _id, liked, comments: commentSize } = tweet
    const { setActiveModal, activeModal } = useEvent((state) => state);
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
        <React.Fragment>
            {!isDetaild ?
                <div className="w-full flex items-center space-x-[80px] text-textGray text-base">
                    <div className="flex gap-x-[2px] items-center group cursor-pointer">
                        <button type="button" className={`cursor-pointer rounded-full p-2 group-hover:bg-textPinkPrimary/10 transition ${liked && "text-textPinkPrimary"} duration-200 hover:text-textPinkPrimary group ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`} onClick={() => handleToggleLike(_id)}>
                            {liked ? <FaHeart className="group-hover:text-textPinkPrimary text-textPinkPrimary" /> : <HeartIcon className="group-hover:text-textPinkPrimary" />}
                        </button>
                        <span className={`group-hover:text-textPinkPrimary ${liked && "text-textPinkPrimary"}`}>
                            {likes < 1000 ? likes : likes.toString + "K"}
                        </span>
                    </div>
                    <div className="flex gap-x-[2px] items-center group cursor-pointer" onClick={onOpenDetail}>
                        <div className="rounded-full p-2 group-hover:bg-textBlue/10 transition duration-200 hover:text-textBlue group">
                            <CommentIcon className="group-hover:text-textBlue" />
                        </div>
                        <span className="group-hover:text-textBlue">{tweet?.comments >= 0 && tweet?.comments < 1000 ? tweet.comments : tweet.comments.toString + "K"}</span>
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
                :
                <div className="w-full flex items-center text-textGray text-base">
                    {/* Like */}
                    <div className="flex-1 flex flex-col items-center group cursor-pointer">
                        <span className={`my-[6px]`}>
                            {likes < 1000 ? likes : (likes / 1000).toFixed(1) + "K"} thích
                        </span>
                        <div className='w-full border-y-[0.5px] border-borderGrayPrimary py-1'>
                            <button type="button" onClick={() => handleToggleLike(_id)} className={`w-full flex items-center justify-center space-x-2 py-2 group-hover:bg-textPinkPrimary/10 transition duration-200 hover:text-textPinkPrimary ${liked && "text-textPinkPrimary"} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}>
                                {liked ? <FaHeart className="text-textPinkPrimary" /> : <HeartIcon />}
                                <span>Thích</span>
                            </button>
                        </div>
                    </div>

                    {/* Comment */}
                    <div className="flex-1 flex flex-col items-center group cursor-pointer">
                        <span className='my-[6px]'>
                            {commentSize < 1000 ? commentSize : (commentSize / 1000).toFixed(1) + "K"} bình luận
                        </span>
                        <div className='w-full border-y-[0.5px] border-borderGrayPrimary py-1'>
                            <div className={`w-full flex items-center justify-center space-x-2 p-2 group-hover:bg-textBlue/10 transition duration-200 hover:text-textBlue ${activeModal === ModalType.DETAIL_TWEET ? "bg-textBlue/10 text-textBlue" : ""}`}>
                                <CommentIcon />
                                <span>Bình luận</span>
                            </div>
                        </div>
                    </div>


                    {/* Retweet */}
                    <div className="flex-1 flex flex-col items-center group cursor-pointer">
                        <span className='my-[6px]'>
                            {bookmarks < 1000 ? bookmarks : (bookmarks / 1000).toFixed(1) + "K"} đăng lại
                        </span>
                        <div className='w-full border-y-[0.5px] border-borderGrayPrimary py-1'>
                            <div className="w-full flex items-center justify-center space-x-2 p-2 group-hover:bg-textGreen/10 transition duration-200 hover:text-textGreen">
                                <RetWeetIcon />
                                <span>Đăng lại</span>
                            </div>
                        </div>
                    </div>

                    {/* Share */}
                    <div className="flex-1 flex flex-col items-center group cursor-pointer">
                        <span className='my-[6px]'>
                            {bookmarks < 1000 ? bookmarks : (bookmarks / 1000).toFixed(1) + "K"} chia sẻ
                        </span>
                        <div className='w-full border-y-[0.5px] border-borderGrayPrimary py-1'>
                            <div className="w-full flex items-center justify-center space-x-2 p-2 hover:bg-textBlue/10 hover:text-textBlue transition duration-200">
                                <LuShare />
                                <span>Chia sẻ</span>
                            </div>
                        </div>
                    </div>
                </div>}
        </React.Fragment>
    );
};

export default TweetAction;