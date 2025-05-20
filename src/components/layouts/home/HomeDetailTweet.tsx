import { StickyNav } from '@/components/common';
import { Tweet } from '@/types/tweetTypes';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import CommentList from '@/components/common/Tweet/Comment/CommentList';
import { CommentForm, CommentWithReplies } from '@/types/commentTypes';
import { Avatar } from '@mui/material';
import { useMe } from '@/context/UserContext';
import TweetAction from '@/components/common/Tweet/TweetAction';
import TweetHeader from '@/components/common/Tweet/TweetHeader';
import socket from '@/utils/socket';
import { CommentParentInputForm } from '@/components/common/Tweet/Comment/CommentForm';
import { useInfiniteComments } from '@/hooks/useInfiniteQuery';
import { useInView } from 'react-intersection-observer';
import { LoadingSniper } from '@/components/common/Loading/LoadingSniper';

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
    const { user } = tweet;
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        status,
    } = useInfiniteComments(tweet._id);
    const { ref: loader, inView } = useInView({ threshold: 1 });
    const [comments, setComments] = React.useState<CommentWithReplies[]>([])
    const commentRef = React.useRef<HTMLInputElement | null>(null)

    const getName = user.name.trim().split(' ').at(-1) ?? user.name;

    React.useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        commentRef.current?.focus()
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    React.useEffect(() => {
        const commentsFlat = data?.pages.flatMap((page) => page?.result?.comments ?? []);
        if (!commentsFlat) return
        setComments(commentsFlat ?? [])
    }, [data])

    React.useEffect(() => {
        // Khi nhận được comment từ server
        const handler = (data: CommentWithReplies) => {
            if (!data.parent_id) {
                setComments(prev => {
                    const exists = prev.some(c => c._id === data._id);
                    if (exists) return prev;
                    return [...prev, data];
                });
            } else {
                setComments(prev => {
                    return prev.map(c => {
                        if (c._id === data.parent_id) {
                            const already = c.replies?.some(r => r._id === data._id);
                            if (already) return c;
                            return {
                                ...c,
                                replies: [...(c.replies || []), data],
                            };
                        }
                        return c;
                    });
                });
            }
        };

        socket.on('receiver_comment', handler)

        return () => {
            socket.off('receiver_comment', handler)
        }
    }, [])

    return createPortal(
        <div className="fixed inset-0 z-[1000] flex justify-center items-center bg-[rgba(91,112,131,0.4)]">
            <div
                className="max-w-[620px] w-[600px] mt-0 h-full max-h-[600px] rounded-2xl overflow-hidden"
            >
                <div className="w-full h-full bg-black flex flex-col">
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

                    <div className="flex-1 flex flex-col overflow-auto">
                        <div className="flex-1 flex flex-col px-[3px]">
                            <TweetHeader tweet={tweet} user={user} time={time} />
                            <TweetAction tweet={tweet} isDetaild={true} />
                            <div className="flex-1 min-h-0 overflow-y-auto px-2">
                                <CommentList comments={comments ?? []} setComments={setComments} />
                                {hasNextPage && (
                                    <div ref={loader} className="text-center p-4">
                                        {isFetchingNextPage && <LoadingSniper className="border-blue-300 mx-auto h-6 w-6" />}
                                    </div>
                                )}
                            </div>
                            <div className="sticky bottom-0 left-0 z-[100] backdrop-blur bg-black/80 flex items-center py-2">
                                <div className='w-8 h-8 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center mx-2 cursor-pointer' title={userMe?.name}>
                                    <Avatar
                                        src={userMe?.avatar}
                                        alt={userMe?.name}
                                        className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <CommentParentInputForm tweetId={tweet._id} isChild={false} currentUser={userMe} setComments={setComments} commentRef={commentRef} parentId={null} />
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
