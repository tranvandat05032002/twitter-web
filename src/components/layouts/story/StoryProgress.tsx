import { useViewStory } from '@/hooks/users/useMutation';
import { Story, StoryGroup } from '@/types/storyTypes';
import React from 'react';
import { IoIosPause, IoIosPlay, IoMdVolumeOff } from "react-icons/io";
import { IoVolumeMediumSharp } from "react-icons/io5";

const DURATION = 10000; //10s

interface ProgressStoryProps {
    user: StoryGroup | undefined;
    storyIndex: number;
    playStory: boolean;
    handleNextStory: () => void;
    isResetProgress: boolean;
}

const StoryProgress: React.FC<ProgressStoryProps> = ({
    user,
    storyIndex,
    playStory,
    handleNextStory,
    isResetProgress
}) => {
    const [progress, setProgress] = React.useState(0);
    const [storyKey, setStoryKey] = React.useState(0);
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

            const currentStoryData = user?.stories?.[storyIndex];

            if (percentage >= 30 && currentStoryData?._id && !viewedStoriesRef.current.has(currentStoryData._id)) {
                viewStory(currentStoryData._id); // Call the mutation
                viewedStoriesRef.current.add(currentStoryData._id); // Mark as viewed
            }

            if (percentage >= 100) {
                clearInterval(intervalRef.current!);
                handleNextStory();
            }
        }, 50);
    };

    React.useEffect(() => {
        if (!playStory) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }

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

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [storyKey, playStory]);

    React.useEffect(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        if (playStory) {
            startProgress();
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [playStory, storyKey]);

    // Khi đổi story
    React.useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        setProgress(0);
        setElapsedTime(0);
        setStoryKey((prev) => prev + 1);
    }, [storyIndex]);


    return (
        <>
            {/* Progress bar */}
            <div className="absolute top-0 left-0 w-full flex gap-1 px-2 py-1">
                {user?.stories.map((story, index) => (
                    <div key={story._id} className="flex-1 h-1 bg-gray-700/50 rounded overflow-hidden">
                        <div
                            className="h-full bg-gray-300/80 transition-all duration-100 linear"
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
        </>
    );
};

export default React.memo(StoryProgress); 