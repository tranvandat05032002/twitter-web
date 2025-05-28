import { Story, StoryGroup } from '@/types/storyTypes';
import { formatTweetTime } from '@/utils/handlers';
import { parseISO } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const StorySidebarItem = ({ story, selectedId }: { story: StoryGroup, selectedId: string }) => {
    const router = useRouter();
    let time = "";
    if (story.stories.length > 0) {
        const lastStory = story.stories.pop() as Story
        const date = parseISO(lastStory.created_at.toString());
        time = formatTweetTime(date)
    }

    return (
        <div
            className={`flex items-center p-2 rounded-lg cursor-pointer ${selectedId === story._id ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            onClick={() => router.push(`/stories/${story._id}`)}
        >
            <div className="relative w-12 h-12 rounded-full border-2 border-blue-500 overflow-hidden">
                <Image
                    src={story.user.avatar ?? "/image/default.jpg"}
                    alt="story-avatar"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="ml-3">
                <div className="font-semibold">{story.user.name}</div>
                <div className="text-xs text-gray-400">{time}</div>
            </div>
        </div>
    );
};

export default StorySidebarItem;