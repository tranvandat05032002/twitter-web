"use client";
import DashboardPage from "@/components/layouts/Dashboard";
import React from "react";
import dynamic from "next/dynamic";
import LoadingPage from "@/components/common/Loading/LoadingPage";
const DynamicMedia = dynamic(
  () => import("@/components/layouts/ProfileLayout"),
  {
    loading: () => <LoadingPage></LoadingPage>,
  }
);

const Media = ({ params }: { params: { username: string } }) => {
  return (
    <DashboardPage>
      <DynamicMedia params={params}>This is Media page</DynamicMedia>
    </DashboardPage>
  );
};

export default Media;
