"use client";
import LoadingPage from "@/components/common/Loading/LoadingPage";
import dynamic from "next/dynamic";
const DynamicHome = dynamic(() => import("@/components/layouts/MainPage"), {
  loading: () => <LoadingPage></LoadingPage>,
});
export default function Home() {
  return (
    <main>
      <DynamicHome></DynamicHome>
    </main>
  );
}
