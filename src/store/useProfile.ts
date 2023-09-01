import { IUser } from "@/types/userTypes";
import { apiInstance } from "@/utils/api";
import { SetState, create } from "zustand";
type ProfileType = {
  userProfile: IUser | null;
  getUserProfile: (username: string) => Promise<void>;
};

export const useProfileStore = create<ProfileType>((set) => ({
  userProfile: null,
  getUserProfile: async (username: string) => {
    try {
      const response = await apiInstance.get(`/users${username}`);
      if (response.status === 200) {
        set(() => ({ userProfile: response?.data.result }));
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
