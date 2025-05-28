import { Mediatype } from "./tweetTypes";
import { IUser } from "./userTypes";

export type StoryForm = {
    medias: Mediatype;
};

export type Story = {
    _id: string,
    user_id: string,
    medias: Mediatype,
    viewers: IUser[],
    expired_at: Date,
    created_at: Date
}

export type StoryGroup = {
    _id: string;
    user: IUser;
    stories: Story[]
}

export interface ResultStory {
    result: {
        stories: StoryGroup[];
    };
    limit: number;
    page: number;
    total_page: number;
}

export interface SlideItem {
    user_id: string;
    name: string;
    avatar: string;
    isCreate: boolean;
    stories: Story[]; // hoặc: stories: Story[] nếu bạn muốn là mảng story cụ thể
}