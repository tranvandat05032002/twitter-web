import { Story, StoryGroup } from '@/types/storyTypes';
import React from 'react';
import { IoIosPause, IoIosPlay, IoMdVolumeOff } from "react-icons/io";
import { IoVolumeMediumSharp } from "react-icons/io5";
import { useViewStory } from '@/hooks/users/useMutation';

const DURATION = 10000; //10s

interface ProgressStoryProps {
    user: StoryGroup | undefined;
    storyIndex: number;
    handleNextStory: () => void;
}

const ProgressStory: React.FC<ProgressStoryProps> = ({
    user,
    storyIndex,
    handleNextStory,
}) => {
    const [progress, setProgress] = React.useState(0);
    const [storyKey, setStoryKey] = React.useState(0);
    const [playStory, setPlayStory] = React.useState(true);
    const [muteVolumStory, setMuteVolumStory] = React.useState(false);
    const [elapsedTime, setElapsedTime] = React.useState(0);

    const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

    const { mutate: viewStory } = useViewStory();
    const viewedStoriesRef = React.useRef<Set<string>>(new Set());

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
    }, [storyKey, playStory, elapsedTime, handleNextStory]); // Added dependencies - Ensure handleNextStory is stable

    React.useEffect(() => {
        if (playStory) {
            startProgress();
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [playStory, elapsedTime, startProgress]); // Added dependencies - Ensure startProgress is stable

    // Khi đổi story
    React.useEffect(() => {
        // Clear interval on story change to prevent multiple intervals running
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        // Reset progress and start new interval when storyIndex changes
        setProgress(0);
        setElapsedTime(0);
        setStoryKey((prev) => prev + 1); // Change storyKey to trigger the main progress effect

    }, [storyIndex]); // Depend on storyIndex

    // Main effect to start/stop progress interval based on playStory and storyKey
    React.useEffect(() => {
        if (!playStory || !user?.stories?.[storyIndex]) { // Also stop if current story is not available
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }

        const start = Date.now() - elapsedTime; // Capture start time when interval is set

        intervalRef.current = setInterval(() => {
            const now = Date.now();
            const newElapsed = now - start; // Calculate elapsed based on captured start time
            const percentage = Math.min((newElapsed / DURATION) * 100, 100);

            setProgress(percentage); // Use functional update if needed, but direct update is fine here
            setElapsedTime(newElapsed); // Use functional update if needed, but direct update is fine here

            const currentStoryData = user?.stories?.[storyIndex];

            // Call API when progress reaches 30% for the first time for this story
            if (percentage >= 30 && currentStoryData?._id && !viewedStoriesRef.current.has(currentStoryData._id)) {
                viewStory(currentStoryData._id); // Call the mutation
                viewedStoriesRef.current.add(currentStoryData._id); // Mark as viewed
            }

            if (percentage >= 100) {
                clearInterval(intervalRef.current!);
                intervalRef.current = null; // Clear ref immediately after clearing interval
                handleNextStory();
            }
        }, 50);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [storyKey, playStory, handleNextStory, user?.stories, storyIndex, elapsedTime]); // KEEP elapsedTime for now, let's try another approach first

    // Let's try a simpler approach by making the interval callback use a ref for state access
    React.useEffect(() => {
        const currentStoryData = user?.stories?.[storyIndex];

        if (!playStory || !currentStoryData) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }

        const start = Date.now() - elapsedTime;

        intervalRef.current = setInterval(() => {
            const now = Date.now();
            const newElapsed = now - start;
            const percentage = Math.min((newElapsed / DURATION) * 100, 100);

            // Use functional updates for setProgress and setElapsedTime
            setProgress(prev => Math.min((Date.now() - (Date.now() - prev * DURATION / 100)) / DURATION * 100, 100));
            setElapsedTime(prev => Date.now() - (Date.now() - prev));

            // Re-calculate percentage based on updated elapsedTime if needed, or just use the newElapsed
            const updatedPercentage = Math.min((newElapsed / DURATION) * 100, 100); // Use newElapsed directly

            // Call API when progress reaches 30% for the first time for this story
            if (updatedPercentage >= 30 && currentStoryData._id && !viewedStoriesRef.current.has(currentStoryData._id)) {
                viewStory(currentStoryData._id); // Call the mutation
                viewedStoriesRef.current.add(currentStoryData._id); // Mark as viewed
            }

            if (updatedPercentage >= 100) {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
                handleNextStory();
            }
        }, 50);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };

    }, [storyKey, playStory, handleNextStory, user?.stories, storyIndex]); // Dependencies excluding elapsedTime

    const handlePlayStory = () => {
        setPlayStory((prev) => !prev);
    };

    const handleMuteVolumStory = () => {
        setMuteVolumStory((prev) => !prev);
    };

    return (
        <>
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

            {/* Controls (Play/Pause/Mute) positioned within the main story content area) */}
            {/* These controls might need to be positioned differently depending on the layout needs. */}
            {/* For now, placing them here as a placeholder within the new component. */}
            {/* You might want to absolutely position these on top of the image in StoryView */}
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
        </>
    );
};

export default ProgressStory; 