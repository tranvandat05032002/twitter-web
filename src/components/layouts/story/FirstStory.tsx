'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import StoryView from './StoryView';

const FirstStoryLayout = ({ user_id }: { user_id: string }) => {
    const searchParams = useSearchParams();
    return <StoryView user_id={user_id} />;
};

export default FirstStoryLayout;