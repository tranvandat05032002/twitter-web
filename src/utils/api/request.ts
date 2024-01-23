import {
  IOTP,
  IToken,
  IUpdateUser,
  IUser,
  LoginForm,
  RegisterForm,
  TRequestProfile,
  TRequestToken,
  TRequestUser,
} from "@/types/userTypes";
import { apiInstance } from ".";
import {
  getOTPToken,
  getToken,
  logOutCookies,
  removeOTPToken,
  removeToken,
  saveOTP,
  saveToken,
} from "../auth/cookies";
import { toast } from "react-toastify";
import { useUserInfo } from "@/store/useUserInfo";
import { ForgotForm } from "@/app/users/find-account/page";
import { ResetPasswordForm } from "@/app/users/reset-password/page";
export const requestRegister = async (registerInfo: RegisterForm) => {
  try {
    const { data } = await apiInstance.post<TRequestToken<IToken>>(
      "/users/register",
      {
        ...registerInfo,
      }
    );
    const { access_token, refresh_token } = data.result;
    saveToken({
      access_token,
      refresh_token,
    });
  } catch (error) {
    throw error;
  }
};

export const requestVerifyEmail = async (email_token: string) => {
  try {
    const { data } = await apiInstance.post<TRequestToken<IToken>>(
      "/users/verify-email",
      {
        email_verify_token: email_token as string,
      }
    );
    saveToken({
      access_token: data.result.access_token,
      refresh_token: data?.result.refresh_token,
    });
  } catch (error) {
    throw error;
  }
};

export const requestResendEmailToken = async () => {
  //apiPrivate is a interceptor
  const { access_token } = getToken();
  try {
    const response = await apiInstance.post(
      "/users/resend-verify-email",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    response?.status === 200
      ? toast.success("Email resent success!")
      : toast.error("Email resent error!");
    // return response;
  } catch (error) {
    throw error;
  }
};

export const requestFetchMe = async () => {
  const { access_token } = getToken();
  if (!access_token) return;
  const response = await apiInstance.get<TRequestUser<IUser>>("/users/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (response.status === 200) {
    const { data } = response;
    useUserInfo.getState().setUserInfo(data.result.user);
    return data.result.user as IUser;
  }
};
export const requestLogIn = async (signInInfo: LoginForm) => {
  try {
    const response = await apiInstance.post<TRequestToken<IToken>>(
      "/users/login",
      {
        ...signInInfo,
      }
    );
    if (response.status === 200) {
      const { data } = response;
      saveToken({
        access_token: data.result.access_token,
        refresh_token: data.result.refresh_token,
      });
    }
  } catch (error) {
    throw error;
  }
};

export const requestGetToken = async ({
  access_token,
  refresh_token,
}: {
  access_token: string;
  refresh_token: string;
}) => {
  if (!access_token && !refresh_token) return;
  try {
    const response = await apiInstance.post(
      "/users/refresh-token",
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
      const { access_token, refresh_token } = response.data.result;
      saveToken({
        access_token,
        refresh_token,
      });
    } else {
      removeToken();
    }
  } catch (error) {
    throw error;
  }
};

export const requestFetchUserReload = async ({
  access_token,
  refresh_token,
}: IToken) => {
  try {
    const response = await apiInstance.post<TRequestToken<IToken>>(
      "/users/refresh-token",
      {
        refresh_token: refresh_token,
      },
      {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (response.status === 200) {
      const { data } = response;
      const new_access_token = data?.result?.access_token as string;
      const new_refresh_token = data?.result?.refresh_token as string;
      saveToken({
        access_token: new_access_token,
        refresh_token: new_refresh_token,
      });
    }
  } catch (error) {
    throw error;
  }
};

export const requestLogout = async () => {
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
      toast.success("Logout success!", {
        pauseOnHover: false,
      });
    }
  } catch (error) {
    throw error;
  }
};

export const requestFindEmail = async (email: ForgotForm) => {
  try {
    const response = await apiInstance.post<TRequestUser<IUser>>(
      "/users/find-email",
      {
        ...email,
      }
    );
    if (response.status === 200) {
      return response?.data?.user;
    }
  } catch (error) {
    throw error;
  }
};

export const requestSendOTP = async (email: string) => {
  if (!email) return;
  try {
    const response = await apiInstance.post<IOTP>("/users/forgot-password", {
      email,
    });
    if (response.status === 200) {
      const { data } = response;
      saveOTP({
        jwtToken: data?.jwtToken as string,
      });
    }
  } catch (error) {
    throw error;
  }
};
export const requestCheckOTP = async (otp: string) => {
  const { otp_token } = getOTPToken();
  try {
    const response = await apiInstance.post(
      "/users/verify-otp",
      {
        otp_auth: otp,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${otp_token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const requestResendOTP = async () => {
  const { otp_token } = getOTPToken();
  try {
    const response = await apiInstance.post<IOTP>(
      "/users/resend-otp",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${otp_token}`,
        },
      }
    );
    if (response.status === 200) {
      toast.success("Chúng tôi đã gửi lại mã OTP mới đến bạn", {
        pauseOnHover: false,
      });
      saveOTP({
        jwtToken: response?.data.jwtToken,
      });
    } else {
      toast.error("Đã xảy ra lỗi", {
        pauseOnHover: false,
      });
    }
  } catch (error) {
    throw error;
  }
};

export const requestResetPassword = async (
  resetPasswordForm: ResetPasswordForm
) => {
  try {
    const { otp_token } = getOTPToken();
    await apiInstance.post("/users/reset-password", {
      ...resetPasswordForm,
      otp_password_token: otp_token,
    });
  } catch (error) {
    throw error;
  }
};

export const requestGetUserProfile = async (username: string) => {
  try {
    const response = await apiInstance.get<TRequestProfile<IUser>>(
      `/users${username}`
    );
    if (response.status === 200) {
      return response.data.result;
    } else {
      return;
    }
  } catch (error) {
    throw error;
  }
};
export const requestUpdateUserProfile = async (userInfo: IUpdateUser) => {
  const { access_token } = getToken();
  try {
    const response = await apiInstance.patch(
      "/users/me",
      {
        ...userInfo,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (response.status === 200) {
      toast.success("Update success!", {
        pauseOnHover: false,
      });
    }
  } catch (error) {
    toast.error("Update failed", {
      pauseOnHover: false,
    });
    throw error;
  }
};
