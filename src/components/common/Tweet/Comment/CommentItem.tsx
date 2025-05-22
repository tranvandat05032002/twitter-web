import { DotsIcon, HeartIcon } from '@/components/SingleUseComponents/Icon';
import { Comment, CommentWithReplies } from '@/types/commentTypes';
import { Avatar } from '@mui/material';
import React from 'react';
import { useMe } from '@/context/UserContext';
import { formatTweetTime } from '@/utils/handlers';
import { parseISO } from 'date-fns';
import { CommentParentInputForm } from './CommentForm';
import { FaPen } from 'react-icons/fa';
import BoxIcon from '@/components/SingleUseComponents/BoxIcon';
import Tippy from "@tippyjs/react/headless";
import { useDeleteComment } from '@/hooks/users/useMutation';

function CommentItem({ tweetUserId, comment, isReply = false, replyingCommentId, setReplyingCommentId, setComments, id }: {
    tweetUserId: string;
    comment: CommentWithReplies | Comment; isReply?: boolean; replyingCommentId: string | null;
    setReplyingCommentId: (id: string | null) => void; setComments: React.Dispatch<React.SetStateAction<CommentWithReplies[]>>;
    id?: string
}) {
    const { mutate: deleteComment } = useDeleteComment(comment.tweet_id)
    const { user: currentUser } = useMe();
    const [showReplies, setShowReplies] = React.useState(false)
    const childCommentRef = React.useRef<HTMLInputElement | null>(null)

    const shouldShowReplyForm =
        !isReply && (
            replyingCommentId === comment._id ||
            ((comment as CommentWithReplies).replies && (comment as CommentWithReplies).replies.some(r => r._id === replyingCommentId))
        );

    const date = parseISO(comment.created_at);
    const time = formatTweetTime(date);

    const handleShowAllReplies = async () => {
        setShowReplies(true);
    };

    const handleOpenReply = () => {
        if (!comment.parent_id) {
            setReplyingCommentId(comment._id)
        } else {
            setReplyingCommentId(comment.parent_id)
        }
    }

    const handleDeleteComment = (commentId: string) => {
        deleteComment(commentId)
    }


    const isAuthor = comment.user_id === tweetUserId

    return (
        <div id={id} className={`flex w-full items-start space-x-2 ${isReply ? "pl-10" : ""} mt-2`}>
            <div>
                <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center">
                    {comment.user.avatar ? (
                        <Avatar
                            src={comment?.user.avatar}
                            alt="avatar"
                            className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-800 rounded-full">
                            <svg width="24" height="24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>
                        </div>
                    )}
                </div>
            </div>
            <div className='w-full'>
                <div className='w-full flex items-center space-x-1 group'>
                    <div className="bg-[#242526] w-max px-[10px] py-[6px] rounded-xl text-sm text-white">
                        {isAuthor ?
                            <div className='flex space-x-2 items-center'>
                                <span className="font-semibold">{comment?.user.name}</span>
                                <div className='flex space-x-1 items-center text-xs text-textBlue p-1 rounded-lg bg-textBlue/10'>
                                    <FaPen className='w-[10px] h-[10px]' />
                                    <span>Tác giả</span>
                                </div>
                            </div>
                            :
                            <span className="font-semibold">{comment?.user.name}</span>
                        }
                        <div className='max-w-[300px] break-words whitespace-normal'>{comment.content}</div>
                    </div>
                    {isAuthor && (
                        <Tippy
                            interactive
                            placement='bottom'
                            trigger="click"
                            offset={[20, 12]}
                            render={(attrs) => (
                                <div
                                    className="bg-black text-white p-2 rounded-lg shadow-xl border-[0.5px] border-borderGraySecond"
                                    tabIndex={-1}
                                    {...attrs}
                                >
                                    <button
                                        type="button"
                                        className="w-full text-left px-4 py-2 text-sm cursor-pointer hover:bg-iconBackgroundGray"
                                    >
                                        Chỉnh sửa
                                    </button>

                                    <button
                                        type="button"
                                        className="w-full text-left px-4 py-2 text-sm cursor-pointer hover:bg-iconBackgroundGray"
                                        onClick={() => handleDeleteComment(comment._id)}
                                    >
                                        Xóa
                                    </button>
                                </div>
                            )}
                        >
                            <div
                                className="cursor-pointer"
                            >
                                <BoxIcon className="hidden group-hover:block">
                                    <DotsIcon className="h-[15px] w-[15px]" />
                                </BoxIcon>
                            </div>
                        </Tippy>
                    )}
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-400 mt-1">
                    {comment.created_at && <span>{time}</span>}
                    <button className="hover:underline">Thích</button>
                    <button onClick={handleOpenReply} className="hover:underline">Phản hồi</button>

                    <span className="flex items-center space-x-1">
                        {/* <span>{comment.likes}</span> */}
                        <HeartIcon />
                    </span>
                </div>
                {/* Render replies */}
                <div className="relative mt-1 w-full">
                    {
                        (comment as CommentWithReplies).replies && (comment as CommentWithReplies)?.replies.length > 2 && !showReplies &&
                        <button className="text-xs text-blue-400 hover:underline" onClick={handleShowAllReplies}>Xem {(comment as CommentWithReplies).replies.length - 2} phản hồi trước</button>
                    }

                    {(comment as CommentWithReplies).replies &&
                        (comment as CommentWithReplies).replies.length > 0 && (
                            <>
                                {(showReplies
                                    ? (comment as CommentWithReplies).replies
                                    : (comment as CommentWithReplies).replies.slice(-2)
                                ).map((reply: Comment) => (
                                    <CommentItem
                                        key={reply._id}
                                        tweetUserId={tweetUserId}
                                        comment={reply}
                                        isReply
                                        setComments={setComments}
                                        replyingCommentId={replyingCommentId}
                                        setReplyingCommentId={setReplyingCommentId}
                                    />
                                ))}
                            </>
                        )}

                    {shouldShowReplyForm && (
                        <div className="flex w-full items-center pt-2">
                            <div className='w-8 h-8 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center mr-2 cursor-pointer' title={currentUser?.name}>
                                <Avatar
                                    src={currentUser?.avatar}
                                    alt={currentUser?.name}
                                    className="w-full h-full object-cover" />
                            </div>
                            <CommentParentInputForm
                                tweetId={comment.tweet_id}
                                isChild={true}
                                parentId={replyingCommentId}
                                currentUser={currentUser}
                                setComments={setComments}
                                commentRef={childCommentRef}
                            />
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default CommentItem;