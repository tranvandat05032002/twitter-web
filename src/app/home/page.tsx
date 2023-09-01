"use client";
import DashboardPage from "@/components/layouts/Dashboard";
import HomeLayout from "@/components/layouts/HomeLayout";
import React from "react";
import dynamic from "next/dynamic";
import LoadingPage from "@/components/common/Loading/LoadingPage";
const DynamicHome = dynamic(() => import("@/components/layouts/HomeLayout"), {
  loading: () => <LoadingPage></LoadingPage>,
});

const Home = () => {
  return (
    <DashboardPage>
      <DynamicHome></DynamicHome>
    </DashboardPage>
  );
};

export default Home;
