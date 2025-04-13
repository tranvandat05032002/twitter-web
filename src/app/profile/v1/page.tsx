import LoadingPage from '@/components/common/Loading/LoadingPage';
import DashboardPage from '@/components/layouts/Dashboard';
import dynamic from "next/dynamic";
import React from 'react';
const DynamicGetProfile = dynamic(() => import("@/components/layouts/GetProfile"), {
    loading: () => <LoadingPage></LoadingPage>
})
const GetProfile: React.FC = () => {
    return (
        <React.Fragment>
            <DashboardPage>
                <DynamicGetProfile> abc </DynamicGetProfile>
                {/* <RightExplore /> */}
                <div>This is search page</div>
            </DashboardPage>
        </React.Fragment>
    );
};

export default GetProfile;