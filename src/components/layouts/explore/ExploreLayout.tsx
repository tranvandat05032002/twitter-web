import React from 'react';
import LeftExplore from './LeftExplore';
import RightExplore from './RightExplore';
import { SearchProvider } from '@/context/SearchProvider';

const ExploreLayout = () => {
    return (
        <div className='flex w-full'>
            <SearchProvider>
                <LeftExplore></LeftExplore>
                <RightExplore></RightExplore>
            </SearchProvider>
        </div>
    );
};

export default ExploreLayout;