import { IUser, LoginForm, RegisterForm } from "@/types/userTypes";
import { apiInstance } from "@/utils/api";
import AxiosError from "axios";
import {
  getToken,
  logOutCookies,
  saveToken,
} from "@/utils/auth/cookies";
import { AxiosResponse } from "axios";
import { create } from "zustand";
import { ForgotForm } from "@/app/users/find-account/page";
import { ResetPasswordForm } from "@/app/users/reset-password/page";
type IAuthStore = {
  userInfo: IUser | null;
  errorMessage: string;
  access_token: string | null;
  login: (infoLogin: LoginForm) => Promise<AxiosResponse | undefined>;
  logout: () => Promise<AxiosResponse | undefined>;
  isLoggedIn: () => Boolean;
  fetchMe: () => Promise<IUser>;
  getUserReload: (token: string) => Promise<AxiosResponse | undefined>;
  updateUserAndToken: ({
    userData,
  }: {
    userData: IUser;
  }) => void;
  registerErrorMessage: string;
  register: (data: RegisterForm) => Promise<AxiosResponse | undefined>;
  verifyEmailToken: (token: string) => Promise<AxiosResponse | undefined>;
  resendEmailToken: () => Promise<AxiosResponse | undefined>;
  findEmail: (email: ForgotForm) => Promise<AxiosResponse | undefined>;
  forgotPasswordToken: (email: string) => Promise<AxiosResponse | undefined>;
  checkOTP: ({
    otp,
    otpToken,
  }: {
    otp: string;
    otpToken: string;
  }) => Promise<AxiosResponse | undefined>;
  resetPassword: ({
    resetForm,
    otpToken,
  }: {
    resetForm: ResetPasswordForm;
    otpToken: string;
  }) => Promise<AxiosResponse | undefined>;
  resendOTP: (otpToken: string) => Promise<AxiosResponse | undefined>;
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
        const access_token = response?.data?.result?.access_token as string;
        const refresh_token = response?.data?.result?.refresh_token as string;
        if (access_token && refresh_token) {
          saveToken({ access_token, refresh_token });
        }
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    fetchMe: async () => {
      const { access_token } = getToken();
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
    }: {
      userData: IUser;
    }) => set({ userInfo: userData }),
    login: async (user: LoginForm) => {
      try {
        const response = await apiInstance.post("/users/login", {
          ...user,
        });
        return response;
      } catch (error) {
        if (AxiosError.isAxiosError(error) && error.response?.status === 422) {
          console.log("Validation errors:", error.response?.data);
        }
      }
    },
    isLoggedIn: () => {
      const {access_token, refresh_token} = getToken()
      if(access_token && refresh_token) {
        return true;
      }
      return false;
    },
    logout: async () => {
      const { access_token, refresh_token } = getToken();
      if (!access_token && !refresh_token) return;
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
    getUserReload: async (token: string) => {
      const { access_token } = getToken();
      const response = await apiInstance.post(
        "/users/refresh-token",
        {
          refresh_token: token,
        },
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const new_access_token = response?.data?.result?.access_token as string;
      const new_refresh_token = response?.data?.result?.refresh_token as string;
      saveToken({ access_token: new_access_token, refresh_token: new_refresh_token });
      return response
    },
    verifyEmailToken: async (token: string) => {
      try {
        const response = await apiInstance.post("/users/verify-email", {
          email_verify_token: token as string,
        });
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    resendEmailToken: async () => {
      const { access_token } = getToken();
      if (!access_token) return;
      try {
        const response = await apiInstance.post(
          "/users/resend-verify-email",
          {},
          {
            headers: {
              "Content-Type": "Application/json",
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    findEmail: async (email: ForgotForm) => {
      try {
        const response = await apiInstance.post("/users/find-email", {
          ...email,
        });
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    forgotPasswordToken: async (email: string) => {
      try {
        const response = await apiInstance.post("/users/forgot-password", {
          email,
        });
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    checkOTP: async ({ otp, otpToken }: { otp: string; otpToken: string }) => {
      try {
        const response = await apiInstance.post(
          "/users/verify-otp",
          {
            otp_auth: otp,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${otpToken}`,
            },
          }
        );
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    resetPassword: async ({
      resetForm,
      otpToken,
    }: {
      resetForm: ResetPasswordForm;
      otpToken: string;
    }) => {
      try {
        const response = await apiInstance.post("/users/reset-password", {
          ...resetForm,
          otp_password_token: otpToken,
        });
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    resendOTP: async (otpToken: string) => {
      try {
        const response = await apiInstance.post(
          "/users/resend-otp",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${otpToken}`,
            },
          }
        );
        return response;
      } catch (error) {
        console.log(error);
      }
    },
  };

  return {
    ...authFunctions,
  };
});
