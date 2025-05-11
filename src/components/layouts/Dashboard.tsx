"use client";
import React from "react";
import LeftSidebar from "./LeftSidebar";
import { ModalType, useEvent } from "@/store/useEven";
import { useFetchMe } from "@/hooks/users/useQuery";
import { useUserInfo } from "@/store/useUserInfo";
import { useRouter } from "next/navigation";
import { routers } from "@/utils/router/routers";
import {
  getToken,
  isTokenExpired,
  logOutCookies,
  removeToken,
} from "@/utils/auth/cookies";
import { jwtDecode } from "jwt-decode";
import { useGetToken, useLogoutUser } from "@/hooks/users/useMutation";
import { GhostButton } from "../common/Button";
import { IUser } from "@/types/userTypes";
import RightSidebar from "./RightSidebar";

interface IDashboard {
  children: React.ReactNode;
}
const DashboardPage: React.FC<IDashboard> = (props) => {
  const { children } = props;
  const { activeModal } = useEvent((state) => state);
  const { access_token, refresh_token } = getToken();
  const { userInfo } = useUserInfo();
  const router = useRouter();
  const { mutate: mutateGetToken } = useGetToken();
  const { data: user } = useFetchMe();
  const memoizedUser = React.useMemo(() => user, [user]) as IUser;
  const [showModalBackLogin, setShowModalBackLogin] =
    React.useState<boolean>(false);
  React.useEffect(() => {
    if (!memoizedUser) return;
    if (access_token && refresh_token) {
      if (memoizedUser.verify !== 1) {
        removeToken();
        // return verify page
        router.push(routers.verifyPage);
      }
    }
  }, [memoizedUser, router]);
  const handleBackSignIn = () => {
    removeToken();
    router.push(routers.signInPage);
  };
  const checkTokenExpiration = () => {
    const { access_token, refresh_token } = getToken();
    if (
      isTokenExpired(access_token as string) &&
      !isTokenExpired(refresh_token as string)
    ) {
      mutateGetToken({
        access_token: access_token as string,
        refresh_token: refresh_token as string,
      });
    } else if (isTokenExpired(refresh_token as string)) {
      setShowModalBackLogin(true);
    }
  };
  React.useEffect(() => {
    checkTokenExpiration();
  }, [router]);
  return (
    <React.Fragment>
      {!showModalBackLogin ? (
        <div
          className={`relative flex items-center w-full ${activeModal !== ModalType.NONE ? "h-screen" : "h-full"
            }`}
        >
          <div className="max-w-screen-xl w-full h-full flex">
            <LeftSidebar userInfo={userInfo}></LeftSidebar>
            <RightSidebar>{children}</RightSidebar>
          </div>
        </div>
      ) : (
        <div className="absolute w-full h-screen left-0 top-0 bottom-0 right-0 z-[1000] flex justify-center items-center bg-bgMain border border-red-500">
          <div className="max-w-[300px] max-h-[150px] w-[300px] h-[150px] bg-black rounded-md py-[20px] px-[20px]">
            <div className="relative w-full h-full">
              <p className="mb-[10px]">Phiên đã hết hạn</p>
              <p className="text-textGray mb-[10px]">Vui lòng đăng nhập lại.</p>
              <GhostButton
                className="absolute bottom-0 right-0 px-4 py-1 text-white rounded-full w-max"
                onClick={handleBackSignIn}
              >
                Đồng ý
              </GhostButton>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default DashboardPage;
