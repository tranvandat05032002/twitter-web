import { useCreateComment } from '@/hooks/users/useMutation';
import { CommentForm, CommentWithReplies } from '@/types/commentTypes';
import { HiMiniPaperAirplane } from "react-icons/hi2";
import BoxIcon from '@/components/SingleUseComponents/BoxIcon';
import { IUser } from '@/types/userTypes';
import socket from '@/utils/socket';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
interface CommentInputFormProps {
    tweetId: string;
    parentId: string | null;
    currentUser: IUser | null;
    setComments: React.Dispatch<React.SetStateAction<CommentWithReplies[]>>;
    commentRef: React.MutableRefObject<HTMLInputElement | null>;
    className?: string;
    isChild: boolean;
}

export const CommentParentInputForm: React.FC<CommentInputFormProps> = ({
    tweetId,
    parentId,
    currentUser,
    setComments,
    commentRef,
    className,
    isChild
}) => {
    const {
        control,
        handleSubmit,
        reset,
        watch,
        getValues,
        formState: { isValid },
    } = useForm<CommentForm>({
        mode: "onSubmit",
        defaultValues: {
            parent_id: parentId,
            tweet_id: tweetId,
            content: ""
        },
    });

    const { mutate } = useCreateComment()

    const handleCreateCommentEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const values = getValues();
            handleCreateComment(values)
        }
    }

    const handleCommentChange = (fieldOnChange: (...event: any[]) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.startsWith(" ")) return;
        fieldOnChange(value.replace(/^\s+/, ""));
    };

    const handleCreateComment = async (values: CommentForm) => {
        if (!values.content.trim() || !currentUser) return;
        mutate(values, {
            onSuccess: (data) => {
                const newComment = {
                    ...data,
                    user: currentUser
                }

                if (isChild) {
                    setComments(prev => {
                        return prev.map(comment => {
                            if (comment._id === parentId) {
                                return {
                                    ...comment,
                                    replies: [...(comment.replies || []), newComment]
                                };
                            }
                            return comment;
                        });
                    });
                    socket.emit('send_comment', {
                        ...newComment,
                        parent_id: parentId
                    });
                } else {
                    setComments(prev => [...prev, newComment]);
                    socket.emit('send_comment', newComment);
                }
                reset();
            }
        })
    }

    return (
        <form onSubmit={handleSubmit(handleCreateComment)} autoComplete='off' className='flex-1'>
            <div className={`flex-1 bg-[#242526] text-textGray rounded-full relative ${className}`}>
                <Controller
                    control={control}
                    name="content"
                    render={({ field }) => (
                        <input
                            {...field}
                            className={`${isChild ? 'w-full bg-[#242526] text-white rounded-full px-4 py-1 outline-none placeholder:text-sm' : 'w-full bg-transparent text-white pl-4 pr-16 py-2 outline-none'}`}
                            placeholder="Viết bình luận..."
                            ref={commentRef}
                            onChange={handleCommentChange(field.onChange)}
                            onKeyDown={handleCreateCommentEnter}
                        />
                    )}
                />
                <button className={`absolute right-3 top-[50%] -translate-y-1/2 cursor-not-allowed ${watch("content")?.trim() && "cursor-pointer"}`} type='submit'>
                    {!watch("content")?.trim() ?
                        <div className="p-2">
                            <HiMiniPaperAirplane className={`${isChild ? "w-[19px] h-[19px]" : "w-[23px] h-[23px]"}`} />
                        </div>
                        :
                        <BoxIcon className={"text-textBlue hover:bg-[#323334]"}>
                            <HiMiniPaperAirplane className={`${isChild ? "w-[19px] h-[19px]" : "w-[23px] h-[23px]"}`} />
                        </BoxIcon>
                    }
                </button>
            </div>
        </form>
    )
}