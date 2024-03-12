import { IUser } from "@/types/userTypes";
import { create } from "zustand";
import { produce, Draft } from "immer"
type ProfileType = {
  userProfile: IUser;
  updateProfile: (newProfile: Partial<IUser>) => void;
};

export const useProfileStore = create<ProfileType>((set) => ({
  userProfile: {} as IUser,
  updateProfile: (newProfile: Partial<IUser>) => set(
    produce((draft: Draft<ProfileType>) => {
      draft.userProfile = { ...draft.userProfile, ...newProfile };
    })
  )
}));
