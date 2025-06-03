import DashboardPage from '@/components/layouts/Dashboard';
import NotificationLayout from '@/components/layouts/notification/NotificationLayout';
import React from 'react';

const Explore = () => {
    return (
        <DashboardPage>
            <NotificationLayout></NotificationLayout>
        </DashboardPage>
    );
};

export default Explore;