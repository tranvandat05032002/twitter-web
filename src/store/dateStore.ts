import { create } from "zustand";
type DateType = {
  month: string | number;
  day: string | number;
  year: string | number;
  setMonth: (month: string | number) => void;
  setDay: (day: string | number) => void;
  setYear: (year: string | number) => void;
};

export const useDateStore = create<DateType>((set) => ({
  month: "",
  day: "",
  year: "",
  setMonth: (month) => set({ month }),
  setDay: (day) => set({ day }),
  setYear: (year) => set({ year }),
}));
