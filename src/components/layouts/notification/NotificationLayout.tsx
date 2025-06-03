import { LoadingSniper } from '@/components/common/Loading/LoadingSniper';
import React, { Suspense } from 'react';
import RightExplore from '../explore/RightExplore';
import LeftNotify from './LeftNotify';

const NotificationLayout = () => {
    return (
        <div className='flex w-full'>
            <Suspense fallback={<LoadingSniper className="border-blue-300 mx-auto h-6 w-6" />}>
                <LeftNotify />
            </Suspense>
            <RightExplore></RightExplore>
        </div>
    );
};

export default NotificationLayout;