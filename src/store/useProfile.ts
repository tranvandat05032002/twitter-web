import { IUpdateUser, IUser } from "@/types/userTypes";
import { apiInstance } from "@/utils/api";
import { getToken } from "@/utils/auth/cookies";
import { create } from "zustand";
import { useEvent } from "./useEven";
import { toast } from "react-toastify";
type ProfileType = {
  userProfile: IUser | null;
  statusUpdate: Boolean;
  getUserProfile: (username: string) => Promise<void>;
  setStatusUpdate: (status: Boolean) => void;
  updateUserProfile: (info: IUpdateUser) => Promise<void>;
};

export const useProfileStore = create<ProfileType>((set) => ({
  userProfile: null,
  statusUpdate: true,
  setStatusUpdate: (status: Boolean) => set({ statusUpdate: status }),
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
  updateUserProfile: async (info: IUpdateUser) => {
    const { access_token } = getToken();
    console.log(access_token);
    try {
      const response = await apiInstance.patch(
        "/users/me",
        {
          ...info,
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
        set(() => ({ userProfile: response?.data.result }));
        set(() => ({ statusUpdate: true }));
      }
    } catch (error) {
      toast.error("Update failed", {
        pauseOnHover: false,
      });
      console.log(error);
    }
  },
}));
