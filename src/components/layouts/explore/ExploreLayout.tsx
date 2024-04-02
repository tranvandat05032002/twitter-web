import React from 'react';
import LeftExplore from './LeftExplore';
import RightExplore from './RightExplore';

const ExploreLayout = () => {
    return (
        <div className='flex border border-red-500 w-full'>
            <LeftExplore></LeftExplore>
            <RightExplore></RightExplore>
        </div>
    );
};

export default ExploreLayout;