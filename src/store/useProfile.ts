import { IUser } from "@/types/userTypes";
import { create } from "zustand";
type ProfileType = {
  userProfile: IUser;
  statusUpdate: Boolean;
  setStatusUpdate: (status: Boolean) => void;
  setUserProfile: (user: IUser) => void;
};

export const useProfileStore = create<ProfileType>((set) => ({
  userProfile: {} as IUser,
  statusUpdate: true,
  setStatusUpdate: (status: Boolean) => set({ statusUpdate: status }),
  setUserProfile: (user: IUser) => set({ userProfile: user }),
}));
