import { create } from "zustand";
interface INormalizeEmail {
  emailWithoutAt: string;
  emailSave: string;
  setEmailWithoutAt: (normalizeEmail: string) => void;
  saveEmail: (email: string) => void;
}
export const useEmail = create<INormalizeEmail>((set) => ({
  emailWithoutAt: "",
  emailSave: "",
  setEmailWithoutAt: (normalizeEmail: string) =>
    set({ emailWithoutAt: normalizeEmail }),
  saveEmail: (email: string) => set({ emailSave: email }),
}));
