import StoryView from '@/components/layouts/story/StoryView';
import React from 'react';

const Story = ({ params }: { params: { id: string } }) => {
    const storyGroupId = String(params.id);

    return <StoryView user_id={storyGroupId} />;
};

export default Story;