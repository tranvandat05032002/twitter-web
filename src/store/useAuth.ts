import { IUser, LoginForm, RegisterForm } from "@/types/userTypes";
import { apiInstance } from "@/utils/api";
import { create } from "zustand";
type IAuthStore = {
  user: IUser | null;
  errorMessage: string;
  login: (infoLogin: LoginForm) => void;
  logout: () => void;
  registerErrorMessage: string;
  register: (data: RegisterForm) => Promise<void>;
};
export const useAuth = create<IAuthStore>((set) => ({
  user: null,
  registerErrorMessage: "",
  register: async (userForm: RegisterForm) => {
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
  //features
  errorMessage: "",
  login: async (user) => {
    console.log(user);
    try {
      const response = await apiInstance.post("/users/login", {
        ...user,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
  logout() {},
}));
