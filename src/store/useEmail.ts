import { create } from "zustand";
interface IEmailSave {
  emailSave: string;
  setSaveEmail: (email: string) => void;
}
export const useEmail = create<IEmailSave>((set) => ({
  emailSave: "",
  setSaveEmail: (email: string) => set({ emailSave: email }),
}));
