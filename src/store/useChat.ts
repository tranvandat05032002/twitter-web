import { ICreateMember, MessageArray } from '@/types/chatTypes'
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
}
const initialMessage = {
    _id: "",
    created_at: "",
    updated_at: "",
    chatId: "",
    senderId: "",
    text: "",
    receiverId: "",
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
        updated_at: ""
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
}))