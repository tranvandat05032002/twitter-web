"use client"
import DashboardPage from '@/components/layouts/Dashboard';
import Conversation from '@/components/layouts/message/Conversation';
import LeftMessage from '@/components/layouts/message/LeftMessage';
import { useFetchMe } from '@/hooks/users/useQuery';
import { io } from "socket.io-client"
import React from 'react';
import socket from '@/utils/socket';
import { useChat } from '@/store/useChat';
// import { IMessageReceiver } from '@/types/chatTypes';
import { IUser } from '@/types/userTypes';
import { IMessage } from '@/types/chatTypes';
const initialReceiverMessage: IMessage = {
  _id: "",
  chatId: "",
  receiverId: "",
  senderId: "",
  created_at: "",
  updated_at: "",
  text: ""
}
const Messages = () => {
  const { data: user } = useFetchMe()
  const [onlineUsers, setOnlineUsers] = React.useState([])
  // const { sendMessage } = useChat((state) => state)
  const [sendMessage, setSendMessage] = React.useState<IMessage>(initialReceiverMessage)
  const [receiverMessage, setReceiverMessage] = React.useState<IMessage>(initialReceiverMessage);
  // send message to socket server
  React.useEffect(() => {
    if (sendMessage !== null) {
      console.log("data_sendMessage: ", sendMessage)
      socket.emit('send_message', sendMessage);
    }
  }, [sendMessage])
  React.useEffect(() => {
    socket.emit('new_user_add', user?._id)
    socket.on('get_users', (users) => {
      setOnlineUsers(users)
    })
  }, [user])
  // Get the message from socket server
  React.useEffect(() => {
    socket.on('receiver_message', (data: IMessage) => {
      console.log("data_receiver: ", data)
      setReceiverMessage(data)
    })
  }, [])
  if (!user) return;
  return (
    <DashboardPage>
      <LeftMessage user={user as IUser}></LeftMessage>
      <Conversation user={user as IUser} receiverMessage={receiverMessage} setSendMessage={setSendMessage}></Conversation>
    </DashboardPage>
  );
};

export default Messages;