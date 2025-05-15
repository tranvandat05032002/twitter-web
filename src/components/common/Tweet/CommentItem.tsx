import { HeartIcon } from '@/components/SingleUseComponents/Icon';
import { useFetchMe } from '@/hooks/users/useQuery';
import { useProfileStore } from '@/store/useProfile';
import { Comment, CommentWithReplies } from '@/types/commentTypes';
import { IUser } from '@/types/userTypes';
import { Avatar } from '@mui/material';
import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { useMe } from '@/context/UserContext';

function CommentItem({ comment, isReply = false }: { comment: CommentWithReplies | Comment; isReply?: boolean }) {
    const { user: currentUser } = useMe();
    const [openReply, setOpenReply] = React.useState(false)
    const [showReplies, setShowReplies] = React.useState(false)
    const handleOpenReply = () => {
        setOpenReply(true)
    }
    const handleShowAllReplies = () => {
        setShowReplies(true)
    }
    return (
        <div className={`flex w-full items-start space-x-2 ${isReply ? "pl-10" : ""} mt-2`}>
            <div>
                <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center">
                    {comment.user.avatar ? (
                        <Avatar
                            src={comment.user.avatar}
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
                <div className="bg-[#242526] w-max px-[10px] py-[6px] rounded-xl text-sm text-white">
                    <span className="font-semibold">{comment.user.name}</span>
                    <div>{comment.content}</div>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-400 mt-1">
                    {/* {comment.time && <span>{comment.time}</span>} */}
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
                        (comment as CommentWithReplies).replies && (comment as CommentWithReplies)?.replies.length > 0 && !showReplies &&
                        <button className="text-xs text-blue-400 hover:underline" onClick={handleShowAllReplies}>Xem tất cả {(comment as CommentWithReplies).replies.length} phản hồi</button>
                    }

                    {(comment as CommentWithReplies).replies && (comment as CommentWithReplies)?.replies.length > 0 && showReplies && (
                        (comment as CommentWithReplies).replies.map((reply: Comment) => (
                            <CommentItem key={reply._id} comment={reply} isReply />
                        ))

                    )}

                    {
                        (openReply || showReplies) &&
                        <div className="flex w-full items-center pt-2 pl-10">
                            <div className='w-8 h-8 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center mr-2 cursor-pointer' title={currentUser?.name}>
                                <Avatar
                                    src={currentUser?.avatar}
                                    alt={currentUser?.name}
                                    className="w-full h-full object-cover" />
                            </div>
                            <input
                                className="flex-1 bg-[#242526] text-white rounded-full px-4 py-1 outline-none placeholder:text-sm"
                                placeholder="Viết bình luận..."
                            />
                        </div>
                    }

                </div>
            </div>
        </div>
    );
}

export default CommentItem;