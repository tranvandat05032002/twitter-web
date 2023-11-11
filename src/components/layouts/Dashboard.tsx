"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Routers } from "@/utils/router/routers";
import { getToken, saveProfileMe, saveToken } from "@/utils/auth/cookies";
import LeftSidebar from "./LeftSidebar";
import { useEvent } from "@/store/useEven";
import { useFetchMe } from "@/hooks/users/useQuery";
import { useUserInfo } from "@/store/useUserInfo";
import { useGetUserReload, useLogoutUser } from "@/hooks/users/useMutation";
import { IUser } from "@/types/userTypes";

interface IDashboard {
  children: React.ReactNode;
}
const DashboardPage: React.FC<IDashboard> = (props) => {
  const { children } = props;
  const router = useRouter();
  const { showModal } = useEvent((state) => state);
  const { data: user } = useFetchMe();
  const { mutate: mutateGetUserReload } = useGetUserReload();
  const { mutate: mutateLogout } = useLogoutUser();
  const { userInfo } = useUserInfo();
  const searchParams = useSearchParams();
  React.useEffect(() => {
    const access_token = searchParams.get("access_token");
    const refresh_token = searchParams.get("refresh_token");
    const verify = searchParams.get("verify");
    if (access_token && refresh_token) {
      saveToken({
        access_token,
        refresh_token,
      });
    }
    if (verify === "0" && !access_token) {
      router.push(Routers.signInPage);
    }
  }, [searchParams, router]);
  React.useEffect(() => {
    if (!user) {
      const { access_token, refresh_token } = getToken();
      if (refresh_token) {
        mutateGetUserReload({
          access_token: access_token as string,
          refresh_token,
        });
      } else {
        router.push(Routers.signInPage);
        mutateLogout();
      }
    }
  }, [user]);
  return (
    <div
      className={`relative flex items-center w-full ${
        showModal ? "h-screen" : "h-full"
      }`}
    >
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
