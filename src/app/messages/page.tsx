import DashboardPage from '@/components/layouts/Dashboard';
import Conversation from '@/components/layouts/message/Conversation';
import LeftMessage from '@/components/layouts/message/LeftMessage';
import React from 'react';

const Messages = () => {
    return (
        <DashboardPage>
            <LeftMessage></LeftMessage>
            <Conversation></Conversation>
        </DashboardPage>
    );
};

export default Messages;