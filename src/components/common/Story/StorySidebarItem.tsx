import { Story, StoryGroup } from '@/types/storyTypes';
import { formatTweetTime } from '@/utils/handlers';
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
        time = formatTweetTime(date);
    }

    return (
        <div
            className={`flex items-center p-2 rounded-lg cursor-pointer ${selectedId === story?._id ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            onClick={() => {
                if (!story?._id || !story?.stories) return;

                let startIndex = 0;
                if (currentUser) {
                    console.log("if")
                    if (story.user._id === currentUser._id) {
                        startIndex = 0;
                    } else {
                        const firstUnviewedIndex = story.stories.findIndex((story) => {
                            const viewers = Array.isArray(story.viewers)
                            if (viewers) {
                                const storyId = story.viewers.some((viewer) => viewer._id === currentUser._id)
                                return storyId
                            }
                        })


                        if (firstUnviewedIndex !== -1) {
                            startIndex = firstUnviewedIndex;
                        } else {
                            startIndex = 0;
                        }
                    }
                } else {
                    startIndex = 0;
                }

                router.push(`/stories/${story._id}?startIndex=${startIndex}`);
            }}
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