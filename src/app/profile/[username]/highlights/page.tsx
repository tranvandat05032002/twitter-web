"use client";
import DashboardPage from "@/components/layouts/Dashboard";
import React from "react";
import dynamic from "next/dynamic";
import LoadingPage from "@/components/common/Loading/LoadingPage";
const DynamicHighlights = dynamic(
  () => import("@/components/layouts/ProfileLayout"),
  {
    loading: () => <LoadingPage></LoadingPage>,
  }
);

const Highlights = ({ params }: { params: { username: string } }) => {
  return (
    <DashboardPage>
      <DynamicHighlights params={params}>This is Highlights page</DynamicHighlights>
    </DashboardPage>
  );
};

export default Highlights;
