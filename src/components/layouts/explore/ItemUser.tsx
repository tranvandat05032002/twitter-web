"use client"
import { useRouter } from "next/navigation"
import { MyContextType, SearchContext } from '@/context/SearchProvider';
import { IUser, UserSearchType } from '@/types/userTypes';
import { Avatar } from '@mui/material';
import React from 'react';
import { routers } from "@/utils/router/routers";
import ButtonFollow from "@/components/common/Button/ButtonFollow";
import { useCreateChat, useFollow, useUnFollow } from "@/hooks/users/useMutation";
import Link from "next/link";
import { useSearchExplore } from "@/store/useSearchExplore";
import { useMe } from "@/context/UserContext";
interface IItemUser {
    miniItem?: boolean | false;
    isFollow?: boolean;
    data: UserSearchType;
    userInfo?: IUser;
    isMe?: boolean;
}
const ItemUser = ({ miniItem, isFollow, data, userInfo, isMe }: IItemUser) => {
    const isSubmittingRef = React.useRef(false);
    const [isHover, setIsHover] = React.useState<boolean>(false);
    const { user: currentUser } = useMe();
    const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
    const { searchValue } = useSearchExplore((state) => state)
    const { mutate: createChat } = useCreateChat(currentUser?._id as string);
    const { mutate: followUser, isLoading: isLoadingFollow } = useFollow({
        query: searchValue,
        sender_id: currentUser?._id,
        receiver_id: data._id,
        onSuccess: () => {
            setIsFollowed(true)
            // Craete room
            if (currentUser?._id && data._id) {
                createChat({
                    sender_id: currentUser._id,
                    receiver_id: data._id,
                });
            }
        }
    })
    const { mutate: unFollowUser, isLoading: isLoadingUnFollow } = useUnFollow({
        query: searchValue,
        onSuccess: () => setIsFollowed(false)
    })
    const [isFollowed, setIsFollowed] = React.useState<boolean>(isFollow || false);
    const router = useRouter()
    const handleChange = () => {
        setIsHover((prev) => !prev);
    }

    const handleFollowUnFollow = (follow_user_id: string) => {
        if (!follow_user_id || isSubmittingRef.current) return;


        setIsHover(false);
        setIsProcessing(true);
        isSubmittingRef.current = true;

        const onSettled = () => {
            setIsProcessing(false);
            isSubmittingRef.current = false;
        }

        if (isFollowed) {
            unFollowUser(
                { follow_user_id },
                { onSettled }
            )
        } else {
            followUser({
                follow_user_id
            }, {
                onSettled
            })
        }
    }
    return (
        <div className="flex items-center cursor-pointer select-none text-sm py-[10px] px-[15px] hover:bg-bgHoverGray">
            {
                miniItem ?
                    <div className="w-full flex items-center">
                        <Link
                            href={`/profile/v1?profile_username=${data.username}`}
                        >
                            <div className="w-full flex items-start justify-between gap-x-2">
                                <div className="relative w-10 h-10 mt-[6px] overflow-hidden rounded-full group">
                                    <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 rounded-full transition-opacity"></div>
                                    <Avatar
                                        src={data?.avatar}
                                        sx={{ width: "100%", height: "100%" }}
                                    />
                                </div>
                                <div className="flex flex-1 items-center justify-between">
                                    <div>
                                        <div className="font-semibold w-[150px] whitespace-nowrap text-ellipsis overflow-hidden text-base">{data?.name}</div>
                                        <p className="max-w-[150px] whitespace-nowrap text-ellipsis overflow-hidden font-light text-[15px] text-textGray">{data?.username}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        {!isMe &&
                            <div>
                                {isFollowed &&
                                    <button
                                        onMouseEnter={handleChange}
                                        onMouseLeave={handleChange}
                                        onClick={() => {
                                            handleFollowUnFollow(data._id as string)
                                        }}
                                        disabled={isProcessing || isLoadingFollow || isLoadingUnFollow}
                                        className={`rounded-full ${!isHover ? "bg-transparent border-[0.5px] border-[#333639] text-white" : "bg-bgPinkGhost/20 border-[0.5px] border-bgPinkGhost/40 text-bgPinkGhost"} font-bold px-4 py-1 text-[15px]`}
                                    >
                                        {isHover ? "Unfollow" : "Following"}
                                    </button>
                                }
                            </div>
                        }
                    </div>
                    :
                    <div className="w-full flex items-center">
                        <div className="w-full">
                            <Link
                                href={`/profile/v1?profile_username=${data.username}`}
                            >
                                <div className="w-full flex items-start justify-between space-x-2">
                                    <div className="w-10 h-10 mt-[6px] overflow-hidden rounded-full group relative">
                                        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 rounded-full transition-opacity"></div>
                                        <Avatar src={data?.avatar} sx={{ width: "100%", height: "100%" }} />
                                    </div>
                                    <div className="flex-1 h-full">
                                        <div className="w-full h-full flex items-center justify-between">
                                            <div className="w-[70%] max-w-[70%]">
                                                <p className="font-semibold whitespace-nowrap text-ellipsis overflow-hidden text-base">{data?.name}</p>
                                                <p className="max-w-[180px] whitespace-nowrap text-ellipsis overflow-hidden font-light text-[15px] text-textGray">{data?.username}</p>
                                            </div>
                                        </div>
                                        <p className="font-light text-textGray text-[15px]">bio: {data.bio ? data.bio : "Không có"}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        {!isMe &&
                            <div>
                                {isFollowed ?
                                    <button
                                        onMouseEnter={handleChange}
                                        onMouseLeave={handleChange}
                                        disabled={isProcessing || isLoadingFollow || isLoadingUnFollow}
                                        onClick={() => {
                                            handleFollowUnFollow(data._id as string)
                                        }}
                                        className={`rounded-full ${!isHover ? "bg-transparent border-[0.5px] border-[#333639] text-white" : "bg-bgPinkGhost/20 border-[0.5px] border-bgPinkGhost/40 text-bgPinkGhost"} font-bold px-4 py-1 text-[15px]`}>
                                        {isHover ? "Unfollow" : "Following"}
                                    </button> : <ButtonFollow
                                        disabled={isProcessing || isLoadingFollow || isLoadingUnFollow}
                                        onClick={() => {
                                            handleFollowUnFollow(data._id as string)
                                        }}>follow</ButtonFollow>}
                            </div>
                        }
                    </div >
            }
        </div >
    );
};

export default React.memo(ItemUser);