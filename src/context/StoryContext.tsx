import { useGetStories } from '@/hooks/users/useQuery';
import { StoryGroup } from '@/types/storyTypes';
import React, { createContext, useContext } from 'react';

const StoryContext = createContext<StoryGroup[] | undefined>(undefined);

export const StoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data } = useGetStories()
    const stories = data?.result.stories
    console.log("stories -----> ", stories)
    return (
        <StoryContext.Provider value={stories}>
            {children}
        </StoryContext.Provider>
    );
};


export const useStory = (): StoryGroup[] => {
    const context = useContext(StoryContext);
    if (context === undefined) {
        throw new Error('Stories must be used within a StoryProvider');
    }
    return context;
}; 