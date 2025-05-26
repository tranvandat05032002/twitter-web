import StoryView from '@/components/layouts/story/StoryView';
import React from 'react';

const FirstStory = ({ params }: { params: { id: string } }) => {
    const id = Number(params.id) || 1;
    return <StoryView />;
};

export default FirstStory;