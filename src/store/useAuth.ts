import { IUser, LoginForm, RegisterForm } from "@/types/userTypes";
import { apiInstance } from "@/utils/api";
import { create } from "zustand";
type IAuthStore = {
  user: IUser | null;
  loginStatus: boolean;
  errorMessage: string;
  login: (infoLogin: LoginForm) => Promise<void>;
  logout: () => void;
  registerErrorMessage: string;
  register: (data: RegisterForm) => Promise<void>;
};
export const useAuth = create<IAuthStore>((set) => ({
  user: null,
  registerErrorMessage: "",
  register: async (userForm: RegisterForm) => {
    console.log(userForm);
    try {
      const response = await apiInstance.post("/users/register", {
        ...userForm,
      });
      if (response?.status === 200) {
        return response?.data;
      }
    } catch (error) {
      console.log(error);
    }
  },
  //feature
  loginStatus: true,
  errorMessage: "",
  login: async () => {},
  logout() {},
}));
