// Chat type
export interface ICreateMember {
    _id: string,
    members: string[],
    created_at: string,
    updated_at: string
}
export type GetChatResponseType = {
    result: ICreateMember[]
};
export interface IUserSocket {
    userId: string,
    socketId: string
}
// Message type
export interface IMessage {
    _id?: string,
    chat_id: string,
    sender_id: string,
    receiver_id?: string,
    text: string
    created_at?: string | Date,
    updated_at?: string | Date,
}
export type MessageArray = IMessage[]
export type GetMessagesResponseType = {
    result: MessageArray
}
export type NewMessageRequestType = Omit<IMessage, "_id">
export type AddNewMessageResponseType = {
    result: IMessage
}


// export interface IMessageReceiver extends NewMessageRequestType {
//     receiverId: string
// }
