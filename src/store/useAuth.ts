import { IUser, LoginForm, RegisterForm } from "@/types/userTypes";
import { apiInstance } from "@/utils/api";
import Cookies from "js-cookie";
import AxiosError from "axios";
import createError from "http-errors";
import {
  getOTPToken,
  getToken,
  logOutCookies,
  saveToken,
} from "@/utils/auth/cookies";
import { AxiosResponse } from "axios";
import { create } from "zustand";
import { ForgotForm } from "@/app/users/find-account/page";
import { OTPForm } from "@/app/users/forgot-password/send-otp/page";
import { ResetPasswordForm } from "@/app/users/reset-password/page";
type IAuthStore = {
  userInfo: IUser | null;
  errorMessage: string;
  access_token: string | null;
  login: (infoLogin: LoginForm) => Promise<IUser>;
  logout: () => Promise<AxiosResponse | undefined>;
  fetchMe: (token: string) => Promise<IUser>;
  getUserReload: (token: string) => void;
  updateUserAndToken: ({
    userData,
    token,
  }: {
    userData: IUser | null;
    token: string;
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
          useAuth.getState().updateUserAndToken({
            userData: fetchedUser as IUser,
            token: access_token,
          });
          return fetchedUser;
        }
      } catch (error) {
        if (AxiosError.isAxiosError(error) && error.response?.status === 422) {
          console.log("Validation errors:", error.response?.data);
        }
      }
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
      if (response.status === 200) {
        const access_token = response?.data?.result?.access_token;
        const refresh_token = response?.data?.result?.refresh_token;
        saveToken({ access_token, refresh_token });
        const user = await useAuth.getState().fetchMe(access_token);
        useAuth.getState().updateUserAndToken({
          userData: user as IUser,
          token: access_token,
        });
      }
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
