import React from 'react';
import LeftExplore from './LeftExplore';
import RightExplore from './RightExplore';

const ExploreLayout = () => {
    return (
        <div className='flex w-full'>
            <LeftExplore></LeftExplore>
            <RightExplore></RightExplore>
        </div>
    );
};

export default ExploreLayout;