"use client";
import { useAuth } from "@/store";
import { getToken } from "@/utils/auth/cookies";
import { useRouter } from "next/navigation";
import React from "react";

const Home = () => {
  const { userInfo, updateUserAndToken, logout, access_token } = useAuth(
    (state) => state
  );
  const router = useRouter();
  React.useEffect(() => {
    if (userInfo) {
      const { access_token } = getToken();
      updateUserAndToken({ userData: userInfo, token: access_token as string });
    } else {
      // get accessToken when refresh site

      // updateUserAndToken({ userData: null, token: "" });
      // router.push("/sign-in");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);
  console.log(userInfo, access_token);
  const handleLogout = async () => {
    const response = await logout();
    if(response?.status === 200 || !userInfo) {
      router.push("/sign-in")
    }
  };
  return (
    <div>
      <p>This is home page</p>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
