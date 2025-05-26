import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const StorySidebarItem = ({ story, selectedId }: { story: any, selectedId: number }) => {
    const router = useRouter();
    return (
        <div
            className={`flex items-center p-2 rounded-lg cursor-pointer ${selectedId === story.id ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            onClick={() => router.push(`/stories/${story.id}`)}
        >
            <div className="relative w-12 h-12 rounded-full border-2 border-blue-500 overflow-hidden">
                <Image
                    src="/image/avatar.jpg"
                    alt="story-avatar"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="ml-3">
                <div className="font-semibold">{story.name}</div>
                <div className="text-xs text-gray-400">{story.time}</div>
            </div>
        </div>
    );
};

export default StorySidebarItem;