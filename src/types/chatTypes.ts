// Chat type
export interface IMemberDetail {
    _id: string;
    name: string;
    avatar: string;
    last_online: string; // hoặc có thể là Date nếu bạn dùng định dạng ngày kiểu JS
}

export interface ICreateMember {
    _id: string;
    members: string[];
    created_at: string;
    updated_at: string;
    member_details: IMemberDetail[];
}

export type GetChatResponseType = {
    result: ICreateMember[]
};
export interface IUserSocket {
    userId: string,
    socketId: string,
    lastOnline?: string
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
    isLike?: boolean | false
}
export type MessageArray = IMessage[]
export type GetMessagesResponseType = {
    result: MessageArray
}
export type NewMessageRequestType = Omit<IMessage, "_id">
export type AddNewMessageResponseType = {
    result: IMessage
}

export interface CreateChatForm {
    sender_id: string;
    receiver_id: string;
}

// export interface IMessageReceiver extends NewMessageRequestType {
//     receiverId: string
// }
