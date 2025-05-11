import { HeartIcon } from '@/components/SingleUseComponents/Icon';
import { Avatar } from '@mui/material';
import React from 'react';
import { FaHeart } from 'react-icons/fa';

function CommentItem({ comment, isReply = false }: { comment: any; isReply?: boolean }) {
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
                    {comment.time && <span>{comment.time}</span>}
                    <button className="hover:underline">Thích</button>
                    <button className="hover:underline">Phản hồi</button>

                    <span className="flex items-center space-x-1">
                        <span>{comment.likes}</span>
                        <HeartIcon />
                    </span>
                </div>
                {/* Render replies */}
                {comment.replies && comment.replies.length > 0 && (
                    <div className="relative mt-1 w-full">
                        <button className="text-xs text-blue-400 hover:underline">Xem {comment.replies.length} phản hồi</button>
                        {comment.replies.map((reply: any) => (
                            <React.Fragment>
                                <CommentItem key={reply.id} comment={reply} isReply />
                                <div className="flex w-full   items-center pt-2 pl-10">
                                    <div className='w-8 h-8 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center mr-2'>
                                        <Avatar
                                            src={comment.user.avatar}
                                            alt="avatar"
                                            className="w-full h-full object-cover" />
                                    </div>
                                    <input
                                        className="w-full bg-[#242526] text-white rounded-full px-4 py-1 outline-none placeholder:text-sm"
                                        placeholder="Viết bình luận..."
                                    />
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommentItem;