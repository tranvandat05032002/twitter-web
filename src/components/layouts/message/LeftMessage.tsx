"use client"
import { DotsIcon, MagnifyingGlassIcon, PenToSquareIcon } from '@/components/SingleUseComponents/Icon';
import React from 'react';
import UserChat from './UserChat';
import { v4 as uuidV4 } from "uuid"
import { useGetChats } from '@/hooks/users/useQuery';
import { useChat } from '@/store/useChat';
import { IUser } from '@/types/userTypes';
import { ICreateMember } from '@/types/chatTypes';
import SimpleBar from 'simplebar-react';
const LeftMessage = ({ user }: { user: IUser }) => {
    // Get the chat in chat section
    const { data: chats } = useGetChats(user?._id as string)
    const { setCurrentChat, currentChat } = useChat((state) => state)
    const { onlineUsers } = useChat((state) => state)
    const checkOnlineStatus = (chat: ICreateMember): boolean => {
        const chatMember = chat.members.find((member) => member !== user._id)
        const online = onlineUsers.find((user) => user.userId === chatMember)
        const isOnline: boolean = online ? true : false
        return isOnline
    }
    return (
        <div className="border-r-[0.5px] border-borderGrayPrimary h-full">
            <div className="w-[321px] max-w-[321px] relative h-screen text-white">
                <div className="flex flex-col w-full absolute inset-0">
                    {/* fix sticky nav here */}
                    <div className="backdrop-blur bg-black/40 sticky top-0 z-[100] w-[321px] h-max p-2">
                        <div className="flex justify-between items-center pb-2">
                            <h2 className="text-xl font-bold">Messages</h2>
                            <div className="flex items-center gap-x-[10px]">
                                <div className="p-2 w-max h-max rounded-full cursor-pointer bg-iconBackgroundGray hover:bg-iconHoverBackgroundGray">
                                    <DotsIcon className=""></DotsIcon>
                                </div>
                                <div className="p-2 w-max h-max rounded-full cursor-pointer bg-iconBackgroundGray hover:bg-iconHoverBackgroundGray">
                                    <PenToSquareIcon />
                                </div>
                            </div>
                        </div>
                        <div className="relative flex w-full pt-[12px]">
                            <MagnifyingGlassIcon className="absolute left-[10px] top-[50%] translate-y-[-25%] text-textGray ml-[3px] font-light" />
                            <input type="text" placeholder='Search Direct Messages' className="pl-[40px] pr-[10px]  py-[5px] h-[36px] focus:outline-none border focus:border focus:border-borderBlue border-borderGrayPrimary placeholder:text-textGray placeholder:font-light placeholder:text-sm bg-black rounded-[30px] w-full text-sm font-light" />
                        </div>
                    </div>
                    <SimpleBar className="mt-1 max-h-screen">
                        {
                            chats && chats.map((chat) => {
                                const isActive = currentChat._id === chat._id
                                return (
                                    <div key={uuidV4()} onClick={() => setCurrentChat(chat)}>
                                        <UserChat data={chat} online={checkOnlineStatus(chat)} currentUserId={user?._id as string} isActive={isActive} />
                                    </div>
                                )
                            }
                            )}
                    </SimpleBar>
                </div>
            </div>
        </div>
    );
};

export default LeftMessage;