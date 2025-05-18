"use client"
import BoxIcon from '@/components/SingleUseComponents/BoxIcon';
import { BackIcon, CirclePlusIcon, DotsIcon, EmojiSmileFillIcon, ExclamationIcon, GifIcon, ImagesIcon, LikeIcon, PaperAirplaneIcon, PhoneIcon, StickerSlimeIcon, VideoCameraIcon } from '@/components/SingleUseComponents/Icon';
import { StickyNav } from '@/components/common';
import { useFetchMe, useGetMessage, useGetProfileUserId } from '@/hooks/users/useQuery';
import { useChat } from '@/store/useChat';
import { Avatar } from '@mui/material';
import { v4 as uuidV4 } from "uuid"
import React from 'react';
import Picker from '@emoji-mart/react'
import Message from './Message';
import { useAddMessage } from '@/hooks/users/useMutation';
import { IMessage, MessageArray, NewMessageRequestType } from '@/types/chatTypes';
import { IUser } from '@/types/userTypes';

const Conversation = ({ user, receiverMessage, setSendMessage }: { user: IUser, receiverMessage: IMessage, setSendMessage: React.Dispatch<React.SetStateAction<IMessage>> }) => {
  const senderId = user?._id as string
  const { currentChat } = useChat((state) => state)
  const [messages, setMessages] = React.useState<MessageArray>([])
  const { data: getMessages } = useGetMessage(currentChat._id as string)
  const userId = currentChat.members.find((id) => id !== senderId)
  const { data: userInfo } = useGetProfileUserId(userId as string)
  const [newMessage, setNewMessage] = React.useState<string>("")
  const [showSend, setShowSend] = React.useState<boolean>(false)
  const { mutate: addNewMessage } = useAddMessage()
  React.useEffect(() => {
    if (receiverMessage !== null && receiverMessage.chat_id === currentChat._id) {
      setMessages([...messages, receiverMessage]);
    }
  }, [receiverMessage])
  React.useEffect(() => {
    setMessages(getMessages as MessageArray)
  }, [getMessages, setMessages])
  const handleChangeNewMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value === '') {
      setShowSend(false);
    }
    else {
      setShowSend(true)
    }
    setNewMessage(e.target.value);
  }
  const handleSend = () => {
    if (newMessage === "") return;
    const dateSend = new Date();
    const newMessageObj: NewMessageRequestType = {
      chat_id: currentChat._id,
      sender_id: senderId,
      text: newMessage,
      created_at: dateSend,
      updated_at: dateSend
    }

    addNewMessage(newMessageObj)
    // set data sendMessage has receiver_id --> send to server socket
    const receiverId = currentChat.members.find((id) => id !== senderId);
    setSendMessage({ ...newMessageObj, receiver_id: receiverId as string })
    setNewMessage("")
  }
  const handleSendEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }
  const scroll = React.useRef<HTMLDivElement | null>(null)
  React.useEffect(() => {
    scroll?.current?.scrollIntoView({
      behavior: "smooth"
    })
  }, [messages])
  return (
    <React.Fragment>
      {currentChat._id ? <div className="w-[670px] max-w-[670px] h-screen max-h-screen">
        <StickyNav className={"w-full"}>
          <div className="flex items-center border-b-[0.5px] border-borderGrayPrimary">
            <div className="px-2 w-full">
              <div className="flex items-center cursor-pointer select-none justify-between text-sm py-[10px] my-[2px]">
                <div className="flex items-center gap-x-2">
                  <div className="w-10 h-10 overflow-hidden rounded-full">
                    <Avatar src={userInfo?.avatar} />
                  </div>
                  <div>
                    <p className="font-semibold text-lg leading-[22px]">{userInfo?.name}</p>
                    <div className="text-textGray flex items-center gap-x-[10px]">
                      <p className="text-sm leading-[14px]">Đang hoạt động </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-[8px] text-textBlue">
                  <BoxIcon>
                    <PhoneIcon></PhoneIcon>
                  </BoxIcon>
                  <BoxIcon>
                    <VideoCameraIcon></VideoCameraIcon>
                  </BoxIcon>
                  <BoxIcon>
                    <ExclamationIcon></ExclamationIcon>
                  </BoxIcon>
                </div>
              </div>
            </div>
          </div>
        </StickyNav>
        <div className="max-h-[588px] h-[588px] overflow-auto px-[6px]">
          {messages && messages?.map((message, index) => <Message key={index} message={message} scroll={scroll as React.LegacyRef<HTMLDivElement>} currentUserId={senderId} />)}
        </div>
        <div className="py-[10px] px-2 flex items-center gap-x-[5px]">
          <div className="flex items-center gap-x-[5px] text-textBlue">
            <BoxIcon className={"p-[3px]"}>
              <CirclePlusIcon className='h-[21px] w-[21px]'></CirclePlusIcon>
            </BoxIcon>
            <BoxIcon className={"p-[3px]"}>
              <ImagesIcon className='h-[21px] w-[21px]'></ImagesIcon>
            </BoxIcon>
            <BoxIcon className={"p-[3px]"}>
              <StickerSlimeIcon className='h-[21px] w-[21px]'></StickerSlimeIcon>
            </BoxIcon>
            <BoxIcon className={"p-[3px]"}>
              <GifIcon className='h-[21px] w-[21px]'></GifIcon>
            </BoxIcon>
          </div>
          <div className="relative flex-1 inline-block">
            <input type="text"
              onChange={handleChangeNewMessage}
              onKeyDown={handleSendEnter}
              value={newMessage}
              placeholder='Search Direct Messages'
              className="pl-[10px] pr-[40px]  py-[5px] h-[36px] focus:outline-none border focus:border focus:border-borderBlue border-borderGrayPrimary placeholder:text-textGray placeholder:font-light placeholder:text-sm bg-black rounded-[30px] text-sm font-light w-full"
            />
            <BoxIcon className={"p-[2px] absolute right-1 top-1/2 -translate-y-1/2 text-textBlue"}>
              <EmojiSmileFillIcon className='h-[21px] w-[21px]'></EmojiSmileFillIcon>
            </BoxIcon>
            {/* <div className="absolute bottom-full mb-2 z-10 right-0 border border-red-500"><Picker onEmojiSelect={console.log} /></div> */}
          </div>
          {showSend ? <BoxIcon className={"p-2 text-textBlue"}>
            <PaperAirplaneIcon onClick={handleSend} className='h-[21px] w-[21px]' />
          </BoxIcon> : <BoxIcon className={"p-2 text-textBlue"}>
            <LikeIcon className='h-[21px] w-[21px]'></LikeIcon>
          </BoxIcon>}
        </div>
      </div> : <div><span>Welcome to my chat</span></div>}
    </React.Fragment>
  );
};

export default Conversation;