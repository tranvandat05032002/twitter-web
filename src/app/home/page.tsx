"use client";
import DashboardPage from "@/components/layouts/Dashboard";
import React from "react";
import dynamic from "next/dynamic";
import LoadingPage from "@/components/common/Loading/LoadingPage";
import HomeFollowing from "@/components/layouts/home/HomeFollowing";
const DynamicHome = dynamic(() => import("@/components/layouts/home/HomeLayout"), {
  loading: () => <LoadingPage></LoadingPage>,
});

const Home = () => {
  return (
    <DashboardPage>
      <DynamicHome></DynamicHome>
      <HomeFollowing></HomeFollowing>
    </DashboardPage>
  );
};

export default Home;
