"use client";
import DashboardPage from "@/components/layouts/Dashboard";
import HomeLayout from "@/components/layouts/HomeLayout";
import React from "react";
import dynamic from "next/dynamic";
import { LoadingSniper } from "@/components/common/Loading/LoadingSniper";
const DynamicHome = dynamic(() => import("@/components/layouts/HomeLayout"), {
  loading: () => <LoadingSniper></LoadingSniper>,
});

const Home = () => {
  return (
    <DashboardPage>
      <DynamicHome></DynamicHome>
    </DashboardPage>
  );
};

export default Home;
