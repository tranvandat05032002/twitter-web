import { IUser } from "./userTypes";

export interface IImage {
    url: string,
    type: number
}
export type Mediatype = {
    url: string,
    type: number
}
export type HashtagType = {
    _id: string;
    name: string;
}
export type TweetForm = {
    content: string;
    parent_id: string | null;
    medias: IImage[];
    hashtags: string[],
    mentions: string[],
    type: number,
    audience: number
};

export type Tweet = {
    _id: string;
    user_id: string;
    type: number; // Có thể là enum nếu bạn biết các giá trị cụ thể
    audience: number; // Có thể là enum nếu bạn biết các giá trị cụ thể
    content: string;
    parent_id: string | null; // Có thể là null
    hashtags: HashtagType[];
    mentions: any[]; // Nếu bạn có cấu trúc cho mentions, hãy định nghĩa nó
    medias: Mediatype[];
    guest_views: number;
    user_views: number;
    created_at: string; // Có thể sử dụng Date nếu bạn muốn chuyển đổi
    updated_at: string; // Có thể sử dụng Date nếu bạn muốn chuyển đổi
    user: IUser;
    bookmarks: number;
    likes: number;
    views: number;
    retweet_count: number;
    comment_count: number;
    quote_count: number;
}

export interface ResultTweet {
    tweet: {
        tweets: Tweet[];
        total: number;
    };
    limit: number;
    page: number;
    total_page: number;
}