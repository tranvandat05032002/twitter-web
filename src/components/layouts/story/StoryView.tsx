'use client'
import React, { use } from 'react';
import { IoIosPause, IoIosPlay, IoMdVolumeOff } from "react-icons/io";
import { IoVolumeMediumSharp } from "react-icons/io5";

const storyContents = [
    {
        id: 1,
        name: 'Haru',
        avatar: '/image/avatar.jpg',
        stories: [
            { id: 101, image: '/image/avatar.jpg', music: 'G.E.M. 邓紫棋', time: '1 giờ' },
            { id: 102, image: 'https://images2.thanhnien.vn/528068263637045248/2024/1/25/428059e47aeafb68640f168d615371dc-65a11b038315c880-1706156293087602824781.jpg', music: '', time: '1 giờ' },
        ],
    },
    {
        id: 2,
        name: 'Nhi Tran',
        avatar: '/image/avatar.jpg',
        stories: [
            { id: 103, image: '/image/avatar.jpg', music: '', time: '12 giờ' },
        ],
    },
];

const DURATION = 10000  //10s


const StoryView = () => {
    const [progress, setProgress] = React.useState(0);
    const [storyIndex, setStoryIndex] = React.useState(0);
    const [userIndex, setUserIndex] = React.useState(0);
    const [storyKey, setStoryKey] = React.useState(0);
    const [playStory, setPlayStory] = React.useState(true)
    const [muteVolumStory, setMuteVolumStory] = React.useState(false)
    const [elapsedTime, setElapsedTime] = React.useState(0);
    const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

    const user = storyContents[userIndex];
    const currentStory = user?.stories[storyIndex];

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
                handleNextStor();
            }
        }, 50);
    };

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
                handleNextStor();
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
        if (!currentStory) return;

        setProgress(0);
        setElapsedTime(0);
        setStoryKey(prev => prev + 1); // buộc useEffect chạy lại
    }, [userIndex, storyIndex]);

    const handleNextStor = () => {
        const hasNextStory = storyIndex + 1 < user?.stories.length

        if (hasNextStory) {
            setStoryIndex((prev) => prev + 1)
        } else {
            const hasNextUser = userIndex + 1 < storyContents.length
            if (hasNextUser) {
                setUserIndex((prev) => prev + 1);
                setStoryIndex(0);
            } else {
                //Hết story
                setUserIndex(0)
                setStoryIndex(0)
            }
        }
    }

    const handlePlayStory = () => {
        setPlayStory((prev) => !prev)
    }

    const handleMuteVolumStory = () => {
        setMuteVolumStory((prev) => !prev)
    }

    if (!currentStory) return <div className="text-white">Không có tin</div>;

    return (
        <div className="flex-1 flex flex-col items-center justify-center bg-black px-4 py-6 h-screen overflow-hidden">
            <div className="w-[400px] bg-transparent rounded-lg overflow-hidden shadow-xl border border-gray-700 relative">
                {/* Progress bar */}
                <div className="absolute top-0 left-0 w-full flex gap-1 px-2 py-1">
                    {user?.stories.map((_, index) => (
                        <div key={index} className="flex-1 h-1 bg-gray-700 rounded overflow-hidden">
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
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="ml-3">
                            <div className="font-semibold text-white">
                                {user.name}
                                <span className="ml-2 text-xs text-gray-400">{currentStory.time}</span>
                            </div>
                            {currentStory.music && (
                                <div className="text-xs text-blue-400 mt-1">🎵 {currentStory.music}</div>
                            )}
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
                        src={currentStory.image}
                        alt="story"
                        className="w-full h-full object-cover object-top"
                    />
                </div>
            </div>
        </div>
    );
};

export default StoryView;