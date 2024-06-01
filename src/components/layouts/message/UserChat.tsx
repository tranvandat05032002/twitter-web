import { DotsIcon } from '@/components/SingleUseComponents/Icon';
import { useGetProfileUserId } from '@/hooks/users/useQuery';
import { ICreateMember } from '@/types/chatTypes';
import { Avatar } from '@mui/material';
import classnames from "classnames"
import React from 'react';
const UserChat = ({ data, currentUserId, isActive }: { data: ICreateMember, currentUserId: string, isActive: boolean | false }) => {
    const userId = data.members.find((id: string) => id !== currentUserId)
    const { data: userInfo } = useGetProfileUserId(userId as string)
    return (
        <div className="px-2 w-full group transition-all">
            <div className={classnames("flex items-center relative cursor-pointer select-none justify-between text-sm py-[10px] my-[2px] px-2 hover:bg-iconBackgroundGray rounded-[5px]", {
                "bg-bgActiveBlue hover:bg-bgActiveBlue": isActive
            })}>
                <div className="flex items-center gap-x-2">
                    <div className='relative w-10 h-10'>
                        <div className="absolute w-2 h-2 rounded-full bg-[#31a24c] bottom-0 right-1 z-[1000]" />
                        <div className="overflow-hidden rounded-full z-[-1]">
                            <Avatar src={userInfo?.avatar} />
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold text-base">{userInfo?.name}</p>
                        <div className="text-textGray flex items-center gap-x-[10px]">
                            <p className="max-w-[180px] whitespace-nowrap text-ellipsis overflow-hidden font-normal text-sm">{userInfo?.name as string} </p>
                            <p className='font-sm'>8 giờ</p>
                        </div>
                    </div>
                </div>
                <div className="hidden absolute group-hover:block top-1/2 right-[20px] translate-y-[-50%] p-2 rounded-full bg-iconBackgroundGray hover:bg-iconHoverBackgroundGray">
                    <DotsIcon></DotsIcon>
                </div>
            </div>
        </div>
    );
};

export default React.memo(UserChat);