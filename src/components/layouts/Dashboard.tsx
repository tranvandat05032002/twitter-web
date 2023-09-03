"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store";
import { Routers } from "@/utils/router/routers";
import { getToken } from "@/utils/auth/cookies";
import LeftSidebar from "./LeftSidebar";
import { useEvent } from "@/store/useEven";

interface IDashboard {
  children: React.ReactNode;
}
const DashboardPage: React.FC<IDashboard> = (props) => {
  const { children } = props;
  const router = useRouter();

  const { fetchMe, logout, updateUserAndToken, userInfo, getUserReload } =
    useAuth((state) => state);
  const {showModal} = useEvent((state) => state)
  const { refresh_token } = getToken();
  React.useEffect(() => {
    const getUser = async () => {
      const user = await fetchMe();
      if (user && user._id) {
        updateUserAndToken({ userData: user });
      } else {
        if (refresh_token) {
          const response = await getUserReload(refresh_token);
          if (response?.status === 200) {
            const user = await fetchMe();
            updateUserAndToken({
              userData: user,
            });
          }
        } else {
          router.push(Routers.signInPage);
          logout();
        }
      }
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh_token]);
  return (
    <div className={`relative flex items-center w-full ${showModal ? "h-screen" : "h-full"}`}>
      <div className="max-w-screen-xl w-full h-full flex relative">
        <LeftSidebar userInfo={userInfo}></LeftSidebar>
        {/*change*/}
        <main className="ml-[288px] w-[600px] flex flex-col h-full min-h-screen border-r-[0.5px] border-borderGrayPrimary">
          {children}
        </main>
        <section className="">Search</section>
      </div>
    </div>
  );
};

export default DashboardPage;
