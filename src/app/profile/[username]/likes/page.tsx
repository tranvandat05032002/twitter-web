"use client";
import DashboardPage from "@/components/layouts/Dashboard";
import React from "react";
import dynamic from "next/dynamic";
import LoadingPage from "@/components/common/Loading/LoadingPage";
const DynamicLikes = dynamic(
  () => import("@/components/layouts/ProfileLayout"),
  {
    loading: () => <LoadingPage></LoadingPage>,
  }
);

const Likes = ({ params }: { params: { username: string } }) => {
  return (
    <DashboardPage>
      <DynamicLikes params={params}>This is Likes page</DynamicLikes>
    </DashboardPage>
  );
};

export default Likes;
