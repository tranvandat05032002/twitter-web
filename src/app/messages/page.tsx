import DashboardPage from '@/components/layouts/Dashboard';
import LeftMessage from '@/components/layouts/message/LeftMessage';
import React from 'react';

const Messages = () => {
    return (
        <DashboardPage middleWidth={"w-[331px]"}>
            <LeftMessage></LeftMessage>
        </DashboardPage>
    );
};

export default Messages;