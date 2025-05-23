import { IUser } from "./userTypes";

export type Comment = {
    _id: string;
    tweet_id: string;
    user_id: string;
    user: IUser;
    content: string;
    parent_id: string | null;
    created_by: string;
    created_at: string;
    updated_at?: string;
}

export type CommentWithReplies = Comment & {
    replies: Comment[]
}

export type CommentForm = {
    content: string;
    tweet_id: string;
    parent_id: string | null;
};

export interface EditCommentPayload extends CommentForm {
    comment_id: string;
}


export interface ResultComment {
    result: {
        comments: CommentWithReplies[]
    };
    total: number;
    limit: number;
    page: number;
    total_page: number;
}