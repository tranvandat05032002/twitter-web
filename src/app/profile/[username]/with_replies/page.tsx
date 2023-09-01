"use client";
import DashboardPage from "@/components/layouts/Dashboard";
import React from "react";
import dynamic from "next/dynamic"
import LoadingPage from "@/components/common/Loading/LoadingPage";
const DynamicReplies = dynamic(() => import("@/components/layouts/ProfileLayout"), {
  loading: () => <LoadingPage></LoadingPage>
})

const Replies = ({ params }: { params: { username: string } }) => {
  
  return (
    <DashboardPage>
      <DynamicReplies params={params}>This is Replies</DynamicReplies>
    </DashboardPage>
  );
};

export default Replies;
