import React, { createContext, useContext } from 'react';
export interface MyContextType {
    isPrewImage: boolean;
    setIsPrewImage: React.Dispatch<React.SetStateAction<boolean>>;
    isCreateStory: boolean;
    setIsCreateStory: React.Dispatch<React.SetStateAction<boolean>>;
    preview: string | null;
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
}
export const StoryContext = createContext<MyContextType | null>(null);

export const StoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isPrewImage, setIsPrewImage] = React.useState(false)
    const [isCreateStory, setIsCreateStory] = React.useState(false)
    const [preview, setPreview] = React.useState<string | null>(null);
    return (
        <StoryContext.Provider value={{
            isPrewImage,
            setIsPrewImage,
            isCreateStory,
            setIsCreateStory,
            preview,
            setPreview
        }}>
            {children}
        </StoryContext.Provider>
    );
};
