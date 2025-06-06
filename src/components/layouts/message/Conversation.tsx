"use client"
import BoxIcon from '@/components/SingleUseComponents/BoxIcon';
import { BackIcon, CirclePlusIcon, DotsIcon, EmojiSmileFillIcon, ExclamationIcon, GifIcon, ImagesIcon, LikeIcon, PaperAirplaneIcon, PhoneIcon, StickerSlimeIcon, VideoCameraIcon } from '@/components/SingleUseComponents/Icon';
import { StickyNav } from '@/components/common';
import { useFetchMe, useGetMessage, useGetProfileUserId } from '@/hooks/users/useQuery';
import { useChat } from '@/store/useChat';
import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import Message from './Message';
import { useAddMessage } from '@/hooks/users/useMutation';
import { IMessage, MessageArray, NewMessageRequestType } from '@/types/chatTypes';
import { IUser } from '@/types/userTypes';
import { FaMapMarkerAlt } from "react-icons/fa";
import Emoji from '@/components/common/Emoji/Emoji';
import VideoCallModal from './VideoCallModal';

const Conversation = ({ user, receiverMessage, setSendMessage }: { user: IUser, receiverMessage: IMessage, setSendMessage: React.Dispatch<React.SetStateAction<IMessage>> }) => {
  const senderId = user?._id as string
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const { currentChat } = useChat((state) => state)
  const [messages, setMessages] = React.useState<MessageArray>([])
  const { data: getMessages } = useGetMessage(currentChat._id as string)
  const userId = currentChat.members.find((id) => id !== senderId)
  const { data: userInfo } = useGetProfileUserId(userId as string)
  const [newMessage, setNewMessage] = React.useState<string>("")
  const [showSend, setShowSend] = React.useState<boolean>(false)
  const { mutate: addNewMessage } = useAddMessage()
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  React.useEffect(() => {
    if (receiverMessage !== null && receiverMessage.chat_id === currentChat._id) {
      setMessages([...(messages || []), receiverMessage]);
    }
  }, [receiverMessage])
  React.useEffect(() => {
    setMessages(getMessages as MessageArray)
  }, [getMessages, setMessages])
  const handleChangeNewMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // if (value === '') {
    //   setShowSend(false);
    // }
    // else {
    //   setShowSend(true)
    // }
    setNewMessage(value);
    setShowSend(value.trim() !== "");
  }
  const handleSend = () => {
    if (newMessage.trim() === "") return;
    const dateSend = new Date();
    const newMessageObj: NewMessageRequestType = {
      chat_id: currentChat._id,
      sender_id: senderId,
      text: newMessage,
      isLike: false,
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

  const handleAddEmoji = (emoji: string) => {
    if (!inputRef.current) return;

    const input = inputRef.current;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;

    const before = newMessage.slice(0, start);
    const after = newMessage.slice(end);
    const updatedText = before + emoji + after;

    setNewMessage(updatedText);

    setShowSend(updatedText.trim() !== "");

    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + emoji.length, start + emoji.length);
    }, 0);
  };

  const handleShareLocation = () => {
    if (!navigator.geolocation) {
      alert("Trình duyệt của bạn không hỗ trợ chia sẻ vị trí.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locationMessage = `https://www.google.com/maps?q=${latitude},${longitude}`;

        const dateSend = new Date();
        const newMessageObj: NewMessageRequestType = {
          chat_id: currentChat._id,
          sender_id: senderId,
          text: locationMessage,
          created_at: dateSend,
          updated_at: dateSend
        };

        addNewMessage(newMessageObj);
        const receiverId = currentChat.members.find((id) => id !== senderId);
        setSendMessage({ ...newMessageObj, receiver_id: receiverId as string });
      },
      (error) => {
        alert("Không thể lấy vị trí của bạn.");
        console.error(error);
      }
    );
  };

  const handleLikeIcon = () => {
    const dateSend = new Date();
    const newMessageObj: NewMessageRequestType = {
      chat_id: currentChat._id,
      sender_id: senderId,
      text: "",
      isLike: true,
      created_at: dateSend,
      updated_at: dateSend,
    };

    addNewMessage(newMessageObj);
    const receiverId = currentChat.members.find((id) => id !== senderId);
    setSendMessage({ ...newMessageObj, receiver_id: receiverId as string });
  }

  // Lấy id người cần tương tác
  const receiverId = currentChat.members.find(id => id !== senderId);

  return (
    <React.Fragment>
      {currentChat._id ?
        <div className="flex-1 h-screen max-h-screen flex flex-col">
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
                    <BoxIcon onClick={() => setIsVideoCallOpen(true)}>
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
          <div className="flex-1 px-[8px] pt-2 overflow-y-auto">
            {messages && messages?.map((message, index) =>
              <Message key={index} message={message} scroll={scroll as React.LegacyRef<HTMLDivElement>} currentUserId={senderId} />)}
          </div>
          {!messages || messages?.length === 0 &&
            <div className='h-full px-[8px] flex items-center justify-center'>
              <p className="text-center text-textGray my-4">Hãy bắt đầu cuộc trò chuyện bằng cách nhắn tin</p>
            </div>}
          <div className="py-[10px] px-2 flex items-center gap-x-[5px]">
            <div className="flex items-center gap-x-[5px] text-textBlue">
              <BoxIcon className={"p-[3px]"}>
                <CirclePlusIcon className='h-[21px] w-[21px]'></CirclePlusIcon>
              </BoxIcon>
              <BoxIcon className={"p-[3px]"}>
                <ImagesIcon className='h-[21px] w-[21px]'></ImagesIcon>
              </BoxIcon>
              <BoxIcon className={"p-[3px]"} onClick={handleShareLocation} title="Chia sẻ vị trí">
                <FaMapMarkerAlt className='h-[21px] w-[21px]'></FaMapMarkerAlt>
              </BoxIcon>
              <BoxIcon className={"p-[3px]"}>
                <GifIcon className='h-[21px] w-[21px]'></GifIcon>
              </BoxIcon>
            </div>
            <div className="relative flex-1 inline-block">
              <input
                ref={inputRef}
                type="text"
                onChange={handleChangeNewMessage}
                onKeyDown={handleSendEnter}
                value={newMessage}
                placeholder='Nhập tin nhắn...'
                className="pl-[10px] pr-[40px]  py-[5px] h-[36px] focus:outline-none border focus:border focus:border-borderBlue border-borderGrayPrimary placeholder:text-textGray placeholder:font-light placeholder:text-sm bg-black rounded-[30px] text-sm font-light w-full"
              />
              <BoxIcon className={"p-[2px] absolute right-1 top-1/2 -translate-y-1/2 text-textBlue"}>
                {/* <EmojiSmileFillIcon className='h-[21px] w-[21px]'></EmojiSmileFillIcon> */}
                <Emoji onSelectEmoji={handleAddEmoji}></Emoji>
              </BoxIcon>
              {/* <div className="absolute bottom-full mb-2 z-10 right-0 border border-red-500"><Picker onEmojiSelect={console.log} /></div> */}
            </div>
            {showSend ?
              <BoxIcon className={"p-2 text-textBlue"}>
                <PaperAirplaneIcon onClick={handleSend} className='h-[21px] w-[21px]' />
              </BoxIcon> : <BoxIcon className={"p-2 text-textBlue"} onClick={handleLikeIcon}>
                <LikeIcon className='h-[21px] w-[21px]'></LikeIcon>
              </BoxIcon>}
          </div>
          <VideoCallModal
            isOpen={isVideoCallOpen}
            onClose={() => setIsVideoCallOpen(false)}
            currentChatId={currentChat._id}
            senderId={senderId}
            receiverId={receiverId as string}
            userInfo={userInfo as IUser}
          />
        </div> :
        <div className='flex-1 h-screen flex justify-center items-center text-textGray'><span>Vui lòng chọn người chat</span></div>}
    </React.Fragment>
  );
};

export default Conversation;