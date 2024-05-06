"use client"
import { useRouter } from "next/navigation"
import { MyContextType, SearchContext } from '@/context/SearchProvider';
import { IUser, UserSearchType } from '@/types/userTypes';
import { Avatar } from '@mui/material';
import React from 'react';
import { routers } from "@/utils/router/routers";
import ButtonFollow from "@/components/common/Button/ButtonFollow";
interface IItemUser {
    miniItem?: boolean | false;
    isFollow?: boolean;
    data: UserSearchType;
    userInfo?: IUser;
    isMe?: boolean;
}
const ItemUser = ({ miniItem, isFollow, data, userInfo, isMe }: IItemUser) => {
    const [isHover, setIsHover] = React.useState<boolean>(false);
    const router = useRouter()
    const handleChange = () => {
        setIsHover((prev) => !prev);
    }
    const handleRedirectProfile = () => {
        if (userInfo && (data.username === userInfo.username)) {
            router.push(`${routers.profile}/${data.username}`)
        }
        else {
            router.push(`/profile/v1?profile_username=${data.username}`)
        }
    }
    return (
        <div onClick={handleRedirectProfile} className="flex items-center cursor-pointer select-none text-sm py-[10px] px-[15px] hover:bg-bgHoverGray">
            {
                miniItem ?
                    <div className="w-full flex items-start justify-between gap-x-2">
                        <div className="relative w-10 h-10 mt-[6px] overflow-hidden rounded-full group">
                            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 rounded-full transition-opacity"></div>
                            <Avatar
                                src={data?.avatar}
                                sx={{ width: "100%", height: "100%" }}
                            />
                        </div>
                        <div className="w-[90%] flex items-center justify-between">
                            <div>
                                <div className="font-semibold w-[150px] whitespace-nowrap text-ellipsis overflow-hidden text-base hover:underline">{data?.name}</div>
                                <p className="max-w-[150px] whitespace-nowrap text-ellipsis overflow-hidden font-normal text-[15px] text-textGray">{data?.username}</p>
                            </div>
                            {/* <button className="rounded-full bg-white text-textBlack transition-all hover:bg-bgHoverWhite/80 font-bold px-4 py-1 text-[15px]">
                                Follow
                            </button> */}
                            {!isMe && <div>
                                {isFollow ? <button onMouseEnter={handleChange} onMouseLeave={handleChange} className={`rounded-full ${!isHover ? "bg-transparent border-[0.5px] border-[#333639] text-white" : "bg-bgPinkGhost/20 border-[0.5px] border-bgPinkGhost/40 text-bgPinkGhost"} font-bold px-4 py-1 text-[15px]`}>
                                    {isHover ? "Unfollow" : "Following"}
                                </button> : <button className="rounded-full bg-white text-textBlack transition-all hover:bg-bgHoverWhite/80 font-bold px-4 py-1 text-[15px]">
                                    Follow
                                </button>}
                            </div>}
                        </div>
                    </div>
                    :
                    <div className=" w-full flex items-start justify-between gap-x-2">
                        <div className="w-10 h-10 mt-[6px] overflow-hidden rounded-full group relative">
                            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 rounded-full transition-opacity"></div>
                            {/* <img
                                    src={data?.avatar}
                                    className="w-full h-full object-cover"
                                /> */}
                            <Avatar src={data?.avatar} sx={{ width: "100%", height: "100%" }} />
                        </div>
                        <div className="w-full h-full">
                            <div className="w-full h-full flex items-center justify-between">
                                <div className="w-[70%] max-w-[70%]">
                                    <p className="font-semibold whitespace-nowrap text-ellipsis overflow-hidden text-base hover:underline">{data?.name}</p>
                                    <p className="max-w-[180px] whitespace-nowrap text-ellipsis overflow-hidden font-normal text-[15px] text-textGray">{data?.username}</p>
                                </div>
                                {!isMe && <div>
                                    {isFollow ? <button onMouseEnter={handleChange} onMouseLeave={handleChange} className={`rounded-full ${!isHover ? "bg-transparent border-[0.5px] border-[#333639] text-white" : "bg-bgPinkGhost/20 border-[0.5px] border-bgPinkGhost/40 text-bgPinkGhost"} font-bold px-4 py-1 text-[15px]`}>
                                        {isHover ? "Unfollow" : "Following"}
                                    </button> : <ButtonFollow>follow</ButtonFollow>}
                                </div>}
                            </div>
                            <p className="font-normal text-[15px]">{data.bio ? data.bio : "empty"}</p>
                        </div>
                    </div>
            }
        </div>
    );
};

export default React.memo(ItemUser);