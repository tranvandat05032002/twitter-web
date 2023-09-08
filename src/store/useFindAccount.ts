import { IUser } from "@/types/userTypes";
import { create } from "zustand";
interface IFindAccount {
  accountFind: IUser | null;
  setAccountFind: (user: IUser) => void;
}
export const useFindAccount = create<IFindAccount>((set) => ({
  accountFind: null,
  setAccountFind: (user: IUser) => set({ accountFind: user }),
}));
