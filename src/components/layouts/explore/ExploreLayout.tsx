import React, { Suspense } from 'react';
import LeftExplore from './LeftExplore';
import RightExplore from './RightExplore';
import { SearchProvider } from '@/context/SearchProvider';
import { LoadingSniper } from '@/components/common/Loading/LoadingSniper';

const ExploreLayout = () => {
    return (
        <div className='flex w-full'>
            <SearchProvider>
            <Suspense fallback={ <LoadingSniper className="border-blue-300 mx-auto h-6 w-6" />}>
                <LeftExplore />
            </Suspense>
                <RightExplore></RightExplore>
            </SearchProvider>
        </div>
    );
};

export default ExploreLayout;