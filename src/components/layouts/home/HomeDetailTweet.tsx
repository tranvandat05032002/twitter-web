import { Input, StickyNav } from '@/components/common';
import { CommentIcon, DotIcon, HeartIcon, RetWeetIcon } from '@/components/SingleUseComponents/Icon';
import { optionsArea } from '@/constant/tweet';
import { useEvent } from '@/store/useEven';
import { Tweet } from '@/types/tweetTypes';
import { GridImages } from '@/utils/handlers';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { LuShare } from 'react-icons/lu';
import { FaHeart } from "react-icons/fa";
import CommentList from '@/components/common/Tweet/CommentList';
import { HiMiniPaperAirplane } from "react-icons/hi2";
import { useFetchMe, useGetComments } from '@/hooks/users/useQuery';
import { CommentForm, CommentWithReplies } from '@/types/commentTypes';
import { Avatar } from '@mui/material';
import { useMe } from '@/context/UserContext';
import { Controller, useForm } from 'react-hook-form';
import BoxIcon from '@/components/SingleUseComponents/BoxIcon';
import { useCreateComment } from '@/hooks/users/useMutation';

const HomeDetailTweet = ({
    onClose,
    tweet,
    time
}: {
    onClose: () => void;
    tweet: Tweet;
    time: string;
}) => {
    const { user: userMe } = useMe()
    const { user, liked, likes, comment_count, bookmarks, comments: commentSize } = tweet;
    const { data } = useGetComments(tweet._id)
    const { mutate } = useCreateComment()
    const commentRef = React.useRef<HTMLInputElement | null>(null)

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        getValues,
        formState: { isValid },
    } = useForm<CommentForm>({
        mode: "onSubmit",
        defaultValues: {
            parent_id: null,
            tweet_id: tweet._id,
            content: ""
        },
    });

    const comments = data?.result.comments as CommentWithReplies[]

    const getNameSplit = user.name.split(' ');
    const getName = getNameSplit[getNameSplit.length - 1];

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        commentRef.current?.focus()
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    const handleCommentChange = (fieldOnChange: (...event: any[]) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.startsWith(" ")) return;
        fieldOnChange(value.replace(/^\s+/, ""));
    };
    const handleCreateCommentEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const values = getValues();
            handleCreateComment(values)
        }
    }
    const handleCreateComment = async (values: CommentForm) => {
        if (!isValid || values.content === "") return;

        mutate(values)
        reset();
    }

    return createPortal(
        <div className="fixed inset-0 z-[1000] flex justify-center items-center bg-[rgba(91,112,131,0.4)]">
            <div
                className="max-w-[620px] w-[600px] mt-0 h-full max-h-[600px] rounded-2xl overflow-hidden"
            >
                <div className="w-full h-full bg-black  flex flex-col">
                    <StickyNav>
                        <div className="w-full h-full px-4 py-2 flex text-white items-center justify-between border-b-[0.5px] border-borderGrayPrimary mb-4">
                            <div></div>
                            <div className="flex gap-x-8 items-center">
                                <h3 className="font-medium text-xl">Bài viết của {getName}</h3>
                            </div>
                            <button
                                className="rounded-full bg-black border-[0.5px] border-[#333639] text-white font-bold px-4 py-1 text-[15px] hover:bg-iconHoverBackgroundGray"
                                type="button"
                                onClick={onClose}
                            >
                                Hủy
                            </button>
                        </div>
                    </StickyNav>

                    <div className='flex-1 overflow-auto'>
                        <div className="h-[max-content]">
                            <div className="flex flex-col w-full h-full px-[3px]">
                                <div className="relative">
                                    <div className='px-2'>
                                        <div className="flex items-center mb-4 mt-2">
                                            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-none">
                                                <Image
                                                    src={user.avatar || '/image/avatar.jpg'}
                                                    alt="Avatar"
                                                    layout="fill"
                                                    objectFit="cover"
                                                    className="rounded-full"
                                                />
                                            </div>
                                            <div className="ml-[10px]">
                                                <p>{user.name}</p>
                                                <div className="flex items-center space-x-1">
                                                    <div className="text-textGray text-sm">{time}</div>
                                                    <div>
                                                        <DotIcon style={{ color: '#71767b' }} />
                                                    </div>
                                                    <div className="text-textGray">
                                                        {optionsArea.map((area) =>
                                                            area.id === tweet.audience ? (
                                                                <area.icon key={area.id} title={area.label} />
                                                            ) : null
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-white text-base mb-4">
                                            {tweet.content}
                                        </div>
                                    </div>

                                    {tweet.medias.length > 0 && (
                                        <div
                                            className={`relative w-full h-[510px] aspect-square rounded-lg overflow-hidden grid ${GridImages(
                                                tweet.medias.length
                                            )} gap-1 p-1`}
                                        >
                                            {tweet.medias.slice(0, 4).map((media, index) => (
                                                <div
                                                    key={index}
                                                    className="relative w-full h-full rounded overflow-hidden"
                                                >
                                                    <Image
                                                        src={media.url}
                                                        alt=""
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    {index === 3 && tweet.medias.length > 4 && (
                                                        <div className="absolute inset-0 bg-black/50 text-white flex items-center justify-center text-lg font-semibold">
                                                            +{tweet.medias.length - 3}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="w-full flex items-center text-textGray text-base">
                                        {/* Like */}
                                        <div className="flex-1 flex flex-col items-center group cursor-pointer">
                                            <span className={`${liked && "text-textPinkPrimary"} my-[6px]`}>
                                                {likes < 1000 ? likes : (likes / 1000).toFixed(1) + "K"} thích
                                            </span>
                                            <div className='w-full border-y-[0.5px] border-borderGrayPrimary py-1'>
                                                <button type="button" className={`w-full flex items-center justify-center space-x-2 py-2 group-hover:bg-textPinkPrimary/10 transition duration-200 hover:text-textPinkPrimary ${liked && "text-textPinkPrimary"}`}>
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
                                                <div className="w-full flex items-center justify-center space-x-2 p-2 group-hover:bg-textBlue/10 transition duration-200 hover:text-textBlue">
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
                                    </div>
                                    <div className='px-2'>
                                        <CommentList comments={comments ?? []} />
                                    </div>
                                    <div className="backdrop-blur bg-black/80 sticky bottom-0 z-[100] flex items-center pb-2 pt-2">
                                        {/* <div className="w-8 h-8 rounded-full bg-gray-700 mr-2" /> */}
                                        <div className='w-8 h-8 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center mr-2 cursor-pointer' title={userMe?.name}>
                                            <Avatar
                                                src={userMe?.avatar}
                                                alt={userMe?.name}
                                                className="w-full h-full object-cover" />
                                        </div>
                                        <form onSubmit={handleSubmit(handleCreateComment)} autoComplete='off' className='flex w-full'>
                                            <div className='flex-1 bg-[#242526] text-textGray rounded-full relative'>
                                                <Controller
                                                    control={control}
                                                    name="content"
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            className="flex-1 bg-transparent text-white px-4 py-2 outline-none"
                                                            placeholder="Viết bình luận..."
                                                            ref={commentRef}
                                                            onChange={handleCommentChange(field.onChange)}
                                                            onKeyDown={handleCreateCommentEnter}
                                                        />
                                                    )}
                                                />
                                                <button className={`absolute right-4 top-[50%] -translate-y-1/2 cursor-not-allowed ${watch("content")?.trim() && "cursor-pointer"}`} type='submit'>
                                                    {!watch("content")?.trim() ?
                                                        <div className="p-2">
                                                            <HiMiniPaperAirplane className={`w-[23px] h-[23px]`} />
                                                        </div>
                                                        :
                                                        <BoxIcon className={"text-textBlue hover:bg-[#323334]"}>
                                                            <HiMiniPaperAirplane className={`w-[23px] h-[23px]`} />
                                                        </BoxIcon>
                                                    }
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default HomeDetailTweet;
