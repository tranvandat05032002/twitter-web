import { IUser, LoginForm, RegisterForm } from "@/types/userTypes";
import { apiInstance } from "@/utils/api";
import Cookies from "js-cookie";
import { getToken, logOutCookies, saveToken } from "@/utils/auth/cookies";
import { AxiosResponse } from "axios";
import { create } from "zustand";
type IAuthStore = {
  userInfo: IUser | null;
  errorMessage: string;
  access_token: string | null;
  login: (infoLogin: LoginForm) => Promise<IUser>;
  logout: () => Promise<AxiosResponse | undefined>;
  fetchMe: (token: string) => void;
  updateUserAndToken: ({
    userData,
    token,
  }: {
    userData: IUser | null;
    token: string;
  }) => void;
  registerErrorMessage: string;
  register: (data: RegisterForm) => Promise<AxiosResponse | undefined>;
};
export const useAuth = create<IAuthStore>((set) => {
  const authFunctions = {
    userInfo: null,
    registerErrorMessage: "",
    access_token: "",
    register: async (userForm: RegisterForm) => {
      try {
        const response = await apiInstance.post("/users/register", {
          ...userForm,
        });
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    fetchMe: async (access_token: string) => {
      if (!access_token) return;
      try {
        const response = await apiInstance.get("/users/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });
        return response?.data?.result?.user;
      } catch (error) {
        console.log(error);
      }
    },
    errorMessage: "",
    updateUserAndToken: ({
      userData,
      token,
    }: {
      userData: IUser | null;
      token: string;
    }) => set({ userInfo: userData, access_token: token }),
    login: async (user: LoginForm) => {
      try {
        const response = await apiInstance.post("/users/login", {
          ...user,
        });
        const access_token = response?.data?.result?.access_token as string;
        const refresh_token = response?.data?.result?.refresh_token as string;
        if (access_token && refresh_token) {
          saveToken({ access_token, refresh_token });
          // fetch data /me here
          const fetchedUser = await authFunctions.fetchMe(access_token);
          return fetchedUser;
        }
      } catch (error) {
        console.log(error);
      }
    },
    logout: async () => {
      const { access_token, refresh_token } = getToken();
      console.log(access_token, refresh_token);
      try {
        const response = await apiInstance.post(
          "/users/logout",
          {
            refresh_token: refresh_token,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        if (response?.status === 200) {
          logOutCookies();
          return response;
        }
      } catch (error) {
        console.log(error);
      }
    },
  };

  return {
    ...authFunctions,
  };
});
