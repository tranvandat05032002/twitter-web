import { create } from "zustand";
interface INormalizeEmail {
  emailWithoutAt: string;
  emailSave: string;
  setEmailWithoutAt: (normalizeEmail: string) => void;
  setSaveEmail: (email: string) => void;
}
export const useEmail = create<INormalizeEmail>((set) => ({
  emailWithoutAt: "",
  emailSave: "",
  setEmailWithoutAt: (normalizeEmail: string) =>
    set({ emailWithoutAt: normalizeEmail }),
  setSaveEmail: (email: string) => set({ emailSave: email }),
}));
