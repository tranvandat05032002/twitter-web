import { IUser } from "@/types/userTypes";
import { create } from "zustand";
interface ISearchExplore {
    searchValue: string;
    setSearchValue: (value: string) => void;
}
export const useSearchExplore = create<ISearchExplore>((set) => ({
    searchValue: "",
    setSearchValue: (value: string) => set({ searchValue: value }),
}));