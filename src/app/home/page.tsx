"use client";
import DashboardPage from "@/components/layouts/Dashboard";
import React from "react";
import dynamic from "next/dynamic";
import LoadingPage from "@/components/common/Loading/LoadingPage";
import HomeFollowing from "@/components/layouts/home/HomeFollowing";
import { UserProvider } from "@/context/UserContext";
import { useFetchMe } from "@/hooks/users/useQuery";
const DynamicHome = dynamic(() => import("@/components/layouts/home/HomeLayout"), {
  loading: () => <LoadingPage></LoadingPage>,
});

const Home = () => {
  const { data: user } = useFetchMe()
  return (
    <UserProvider user={user || null}>
      <DashboardPage>
        <DynamicHome></DynamicHome>
        <HomeFollowing></HomeFollowing>
      </DashboardPage>
    </UserProvider>
  );
};

export default Home;
