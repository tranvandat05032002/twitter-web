import StoryView from '@/components/layouts/story/StoryView';
import React from 'react';

const Story = ({ params }: { params: { id: string } }) => {
    const id = Number(params.id) || 1;
    return <StoryView />;
};

export default Story;