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