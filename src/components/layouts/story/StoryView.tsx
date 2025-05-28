'use client'
import { useStory } from '@/context/StoryContext';
import { useGetStories } from '@/hooks/users/useQuery';
import { Story, StoryGroup } from '@/types/storyTypes';
import { formatTweetTime } from '@/utils/handlers';
import { parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoIosPause, IoIosPlay, IoMdVolumeOff } from "react-icons/io";
import { IoVolumeMediumSharp } from "react-icons/io5";

const DURATION = 10000  //10s

const StoryView = ({ user_id }: { user_id: string }) => {
    const router = useRouter();
    const [progress, setProgress] = React.useState(0);

    const [storyIndex, setStoryIndex] = React.useState(0);

    const [storyKey, setStoryKey] = React.useState(0);

    const [playStory, setPlayStory] = React.useState(true)

    const [muteVolumStory, setMuteVolumStory] = React.useState(false)

    const [elapsedTime, setElapsedTime] = React.useState(0);

    const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

    // const storyGroup = useStory()
    const { data } = useGetStories()
    const storyGroup = data?.result.stories as StoryGroup[]

    console.log("storyGroup ----> ", storyGroup)
    console.log("data ----> ", data)

    const user = React.useMemo(() => storyGroup.find((id) => id._id === user_id), [storyGroup, user_id]);
    const currentStoryGroup = React.useMemo(() => {
        return user?.stories?.[storyIndex] as Story;
    }, [user, storyIndex]);

    const date = parseISO(currentStoryGroup?.created_at.toString());
    const time = formatTweetTime(date)

    const startProgress = () => {
        const start = Date.now() - elapsedTime;

        intervalRef.current = setInterval(() => {
            const now = Date.now();
            const newElapsed = now - start;
            const percentage = Math.min((newElapsed / DURATION) * 100, 100);
            setProgress(percentage);
            setElapsedTime(newElapsed);

            if (percentage >= 100) {
                clearInterval(intervalRef.current!);
                handleNextStory();
            }
        }, 50);
    };

    const handleNextStory = () => {
        const currentUserIndex = storyGroup.findIndex((u) => u._id === user_id);
        const hasNextStory = storyIndex + 1 < (user?.stories?.length ?? 0);

        if (hasNextStory) {
            setStoryIndex((prev) => prev + 1);
        } else {
            const nextUser = storyGroup[currentUserIndex + 1];
            if (nextUser) {
                router.push(`/story/${nextUser._id}`);
            }
            // setStoryIndex(0);
        }
    }

    React.useEffect(() => {
        if (!playStory) return;

        const start = Date.now() - elapsedTime;

        const interval = setInterval(() => {
            const now = Date.now();
            const newElapsed = now - start;
            const percentage = Math.min((newElapsed / DURATION) * 100, 100);

            setProgress(percentage);
            setElapsedTime(newElapsed);

            if (percentage >= 100) {
                clearInterval(interval);
                handleNextStory();
            }
        }, 50);

        return () => clearInterval(interval);
    }, [storyKey, playStory]);

    React.useEffect(() => {
        if (playStory) {
            startProgress();
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [playStory]);

    // Khi đổi story
    React.useEffect(() => {
        if (!currentStoryGroup) return;

        setProgress(0);
        setElapsedTime(0);
        setStoryKey((prev) => prev + 1);
    }, [storyIndex]);

    const handlePlayStory = () => {
        setPlayStory((prev) => !prev)
    }

    const handleMuteVolumStory = () => {
        setMuteVolumStory((prev) => !prev)
    }

    if (!currentStoryGroup) return <div className="text-white">Không có tin</div>;

    return (
        <div className="flex-1 flex flex-col items-center justify-center bg-black px-4 py-6 h-screen overflow-hidden">
            <div className="w-[400px] bg-transparent rounded-lg overflow-hidden shadow-xl border border-gray-700 relative">
                {/* Progress bar */}
                <div className="absolute top-0 left-0 w-full flex gap-1 px-2 py-1">
                    {user?.stories.map((story, index) => (
                        <div key={story._id} className="flex-1 h-1 bg-gray-700 rounded overflow-hidden">
                            <div
                                className="h-full bg-blue-500 transition-all duration-100 linear"
                                style={{
                                    width:
                                        index < storyIndex
                                            ? '100%'
                                            : index === storyIndex
                                                ? `${progress}%`
                                                : '0%',
                                }}
                            />
                        </div>
                    ))}
                </div>
                {/* Header */}
                <div className='flex items-center justify-between p-4'>
                    <div className="flex items-center">
                        <img
                            src={user?.user.avatar}
                            alt={user?.user.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="ml-3">
                            <div className="font-semibold text-white">
                                {user?.user.name}
                                <span className="ml-2 text-xs text-gray-400">{time}</span>
                            </div>
                            {/* {currentStory.music && (
                                <div className="text-xs text-blue-400 mt-1">🎵 {currentStory.music}</div>
                            )} */}
                        </div>
                    </div>
                    <div className='flex items-center space-x-2'>
                        {playStory ? (
                            <IoIosPause
                                className="w-[24px] h-[24px] cursor-pointer text-white"
                                onClick={handlePlayStory}
                            />
                        ) : (
                            <IoIosPlay
                                className="w-[24px] h-[24px] cursor-pointer text-white"
                                onClick={handlePlayStory}
                            />
                        )}

                        {muteVolumStory ? (
                            <IoMdVolumeOff
                                className="w-[24px] h-[24px] cursor-pointer text-white"
                                onClick={handleMuteVolumStory}
                            />
                        ) : (
                            <IoVolumeMediumSharp
                                className="w-[24px] h-[24px] cursor-pointer text-white"
                                onClick={handleMuteVolumStory}
                            />
                        )}
                    </div>
                </div>

                {/* Image content */}
                <div className="flex-1 min-h-0 w-full">
                    <img
                        src={currentStoryGroup.medias.url}
                        alt="story"
                        className="w-full h-full object-cover object-top"
                    />
                </div>
            </div>
        </div>
    );
};

export default StoryView;