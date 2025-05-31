import { Story, StoryGroup } from '@/types/storyTypes';
import { formatStoryTime } from '@/utils/handlers';
import { parseISO } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useMe } from '@/context/UserContext';

const StorySidebarItem = ({ story, selectedId }: { story: StoryGroup, selectedId: string }) => {
    const router = useRouter();
    const { user: currentUser } = useMe();
    let time = "";
    if (story?.stories && story.stories.length > 0) {
        const lastStory = story.stories[story.stories.length - 1] as Story;
        const date = parseISO(lastStory.created_at.toString());
        time = formatStoryTime(date);
    }

    return (
        <div
            className={`flex items-center p-2 rounded-lg cursor-pointer ${selectedId === story?._id ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
        >
            <div className="relative w-12 h-12 rounded-full border-2 border-blue-500 overflow-hidden">
                <Image
                    src={story?.user.avatar ?? "/image/default.jpg"}
                    alt={story?.user.name ?? "story-avatar"}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="ml-3">
                <div className="font-semibold">{story?.user.name ?? 'User'}</div>
                <div className="text-xs text-gray-400">{time}</div>
            </div>
        </div>
    );
};

export default StorySidebarItem;