import { ICreateMember, IUserSocket, MessageArray } from '@/types/chatTypes'
import { create } from 'zustand'

interface IConversation {
    messages: MessageArray,
    setMessages: (message: MessageArray) => void
    currentChat: ICreateMember,
    setCurrentChat: (chat: ICreateMember) => void,
    currentUserId: string,
    setCurrentUserId: (userId: string) => void,
    // sendMessage: IMessageReceiver,
    // setSendMessage: (message: IMessageReceiver) => void,
    // receiverMessage: IMessageReceiver,
    // setReceiverMessage: (message: IMessageReceiver) => void,
    onlineUsers: IUserSocket[],
    setOnlineUsers: (userList: IUserSocket[]) => void,
    onlineStatus: boolean,
    setOnlineStatus: (newStatus: boolean) => void
}
const initialMessage = {
    _id: "",
    created_at: "",
    updated_at: "",
    chat_id: "",
    sender_id: "",
    text: "",
    receiver_id: "",
}
export const useChat = create<IConversation>((set) => ({
    messages: [],
    setMessages: (message: MessageArray) => set({
        messages: message
    }),
    currentChat: {
        _id: "",
        members: [],
        created_at: "",
        updated_at: "",
        member_details: []
    },
    setCurrentChat: (chat: ICreateMember) => set({
        currentChat: chat
    }),
    currentUserId: "",
    setCurrentUserId: (userId: string) => set({
        currentUserId: userId
    }),
    sendMessage: initialMessage,
    // setSendMessage: (message: IMessageReceiver) => set({
    //     sendMessage: message
    // }),
    // receiverMessage: initialMessage,
    // setReceiverMessage: (message: IMessageReceiver) => set({
    //     receiverMessage: message
    // })
    onlineUsers: [],
    setOnlineUsers: (userList: IUserSocket[]) => set({
        onlineUsers: userList
    }),
    onlineStatus: false,
    setOnlineStatus: (newStatus: boolean) => set({
        onlineStatus: newStatus
    })
}))