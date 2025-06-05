import LoadingPage from '@/components/common/Loading/LoadingPage';
import DashboardPage from '@/components/layouts/Dashboard';
import RightExplore from '@/components/layouts/explore/RightExplore';
import GetTweetByUser from '@/components/layouts/GetTweetByUser';
import dynamic from "next/dynamic";
import React from 'react';
const DynamicGetProfile = dynamic(() => import("@/components/layouts/GetProfile"), {
    loading: () => <LoadingPage></LoadingPage>
})
const GetProfile: React.FC = () => {

    return (
        <React.Fragment>
            <DashboardPage>
                <DynamicGetProfile>
                    <GetTweetByUser></GetTweetByUser>
                </DynamicGetProfile>
                {/* <RightExplore /> */}
                <RightExplore />
            </DashboardPage>
        </React.Fragment>
    );
};

export default GetProfile;