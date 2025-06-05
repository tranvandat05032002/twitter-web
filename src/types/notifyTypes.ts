export enum NotifyType {
    Like = 1,
    Follow,
    Comment,
    CommentReply
}

export interface NotifyRes {
    sender_id: string
    sender_name: string
    receiver_id: string
    type: NotifyType
    is_sent: boolean | false
    message: string
    tweet_id: string | null
    comment_id: string | null
}

export interface UserInfoNotify {
    _id: string
    name: string
    email: string
    avatar: string
}

export interface NotificationType {
    _id: string
    type: number
    message: string
    tweet_id: string | null
    comment_id: string | null
    is_read: boolean
    is_sent: boolean
    created_at: string // hoặc Date nếu bạn parse về Date object
    sender: UserInfoNotify
    receiver: UserInfoNotify
}


export interface ResultNotify {
    result: {
        notifications: NotificationType[]
    };
    total: number;
    limit: number;
    page: number;
    total_page: number;
}