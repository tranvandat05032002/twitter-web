import { useGetChats } from '@/hooks/users/useQuery';
import { useChat } from '@/store/useChat';
import { ICreateMember } from '@/types/chatTypes';
import { IUser } from '@/types/userTypes';
import { formatOflineTime } from '@/utils/handlers';
import React from 'react';


const StatusOnline = ({ chat, user }: { chat: ICreateMember, user: IUser }) => {
    const { onlineUsers } = useChat((state) => state)

    const checkOnlineStatus = (chat: ICreateMember): boolean => {
        const chatMember = chat.members.find((member) => member !== user._id)
        const online = onlineUsers.find((user) => user.userId === chatMember)
        const isOnline: boolean = online ? true : false
        return isOnline
    }

    const isOnline = checkOnlineStatus(chat);
    const member = chat.member_details.find((mem) => mem._id !== user._id)

    return (
        <React.Fragment>
            {isOnline ?
                <div className="absolute w-2 h-2 rounded-full bg-[#31a24c] bottom-0 right-1 z-[1000]" />
                :
                <div className="absolute z-[1000] bottom-0 rounded-full right-0 left-0 h-max bg-black">
                    <div className="leading-3 border-[2px] border-black bg-[rgb(49,162,76,0.5)] rounded-full text-[#31a24c] px-[2px] text-center">
                        <span className="text-[10px] inline-block font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                            {formatOflineTime(member?.last_online as string) || '0 phút'}
                        </span>
                    </div>
                </div>}
        </React.Fragment>
    )
};

export default StatusOnline;