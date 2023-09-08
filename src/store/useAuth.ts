import { IUser } from "@/types/userTypes";
import { getToken } from "@/utils/auth/cookies";
import { create } from "zustand";
type IAuthStore = {
  userInfo: IUser | null;
  errorMessage: string;
  access_token: string | null;
  isLoggedIn: () => Boolean;
  updateUserAndToken: ({
    userData,
    access_token,
  }: {
    userData?: IUser;
    access_token?: string;
  }) => void;
};
export const useAuth = create<IAuthStore>((set) => {
  const authFunctions = {
    userInfo: null,
    access_token: "",
    updateUserAndToken: ({
      userData,
      access_token,
    }: {
      userData?: IUser;
      access_token?: string;
    }) => set({ userInfo: userData, access_token: access_token }),
    errorMessage: "",
    isLoggedIn: () => {
      const { access_token, refresh_token } = getToken();
      if (access_token && refresh_token) {
        return true;
      }
      return false;
    },
  };

  return {
    ...authFunctions,
  };
});
