import LoadingPage from '@/components/common/Loading/LoadingPage';
import FirstStoryLayout from '@/components/layouts/story/FirstStory';
import React, { Suspense } from 'react';

const FirstStory = ({ params }: { params: { id: string } }) => {
    return (
        <Suspense fallback={<LoadingPage />}>
            <FirstStoryLayout user_id={params.id} />
        </Suspense>
    );
};

export default FirstStory;