
import { useCreateComment } from '@/hooks/users/useMutation';
import { CommentForm, CommentWithReplies } from '@/types/commentTypes';
import { HiMiniPaperAirplane } from "react-icons/hi2";
import BoxIcon from '@/components/SingleUseComponents/BoxIcon';
import { IUser } from '@/types/userTypes';
import socket from '@/utils/socket';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
interface CommentInputFormProps {
    tweet_id: string;
    currentUser: IUser | null;
    setComments: React.Dispatch<React.SetStateAction<CommentWithReplies[]>>;
    commentRef: React.MutableRefObject<HTMLInputElement | null>
}

export const CommentParentInputForm: React.FC<CommentInputFormProps> = ({
    tweet_id,
    currentUser,
    setComments,
    commentRef
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
            parent_id: null,
            tweet_id,
            content: ""
        },
    });

    const { mutate, isSuccess } = useCreateComment()

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
                setComments(prev => [...prev, {
                    ...data,
                    user: currentUser
                }])
                // console.log("client ----> ", data)
                socket.emit('send_comment', {
                    ...data,
                    user: currentUser
                })
                reset();
            }
        })
    }

    return (
        <form onSubmit={handleSubmit(handleCreateComment)} autoComplete='off'>
            <div className='flex-1 bg-[#242526] text-textGray rounded-full relative'>
                <Controller
                    control={control}
                    name="content"
                    render={({ field }) => (
                        <input
                            {...field}
                            className="w-full bg-transparent text-white pl-4 pr-16 py-2 outline-none"
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
    )
}