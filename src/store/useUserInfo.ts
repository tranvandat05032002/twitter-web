import { IUser } from "@/types/userTypes";
import { create } from "zustand";
type UserInfoType = {
  userInfo: IUser | null;
  canSubmit: Boolean;
  setCanSubmit: (status: boolean) => void;
  setUserInfo: (userFetch: IUser) => void;
};
export const useUserInfo = create<UserInfoType>((set) => ({
  userInfo: null,
  canSubmit: true,
  setCanSubmit: (status: boolean) => set({ canSubmit: status }),
  setUserInfo: (userFetch: IUser) => set({ userInfo: userFetch }),
}));
