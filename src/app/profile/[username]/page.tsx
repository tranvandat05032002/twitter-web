"use client";
import DashboardPage from "@/components/layouts/Dashboard";
import React from "react";
import dynamic from "next/dynamic"
import LoadingPage from "@/components/common/Loading/LoadingPage";
const DynamicProfile = dynamic(() => import("@/components/layouts/ProfileLayout"), {
  loading: () => <LoadingPage></LoadingPage>
})

const Profile = ({ params }: { params: { username: string } }) => {
  
  return (
    <DashboardPage>
      <DynamicProfile params={params}>This is Profile page </DynamicProfile>
      <div>This is search page</div>
    </DashboardPage>
  );
};

export default Profile;
