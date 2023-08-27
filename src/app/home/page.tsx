"use client";
import DashboardPage from "@/components/layouts/Dashboard";
import { useAuth } from "@/store";
import { getToken } from "@/utils/auth/cookies";
import { Routers } from "@/utils/router/routers";
import { useRouter } from "next/navigation";
import React from "react";

const Home = () => {
  const { userInfo, updateUserAndToken, logout, access_token, getUserReload } =
    useAuth((state) => state);
  const router = useRouter();
  React.useEffect(() => {
    if (userInfo && userInfo._id) {
      const { access_token } = getToken();
      updateUserAndToken({ userData: userInfo, token: access_token as string });
    } else {
      const { refresh_token } = getToken();
      if (refresh_token) {
        getUserReload(refresh_token);
      } else {
        router.push(Routers.signInPage);
        updateUserAndToken({
          userData: null,
          token: "",
        });
        logout();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);
  const handleLogout = async () => {
    const response = await logout();
    if (response?.status === 200 || !userInfo) {
      router.push(Routers.signInPage);
    }
  };
  return (
    <div>
      <DashboardPage></DashboardPage>
      {/* <button type="button" onClick={handleLogout}>
        Logout
      </button> */}
    </div>
  );
};

export default Home;
