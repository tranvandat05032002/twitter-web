import { create } from "zustand";
type DateType = {
  month: string | number;
  day: string | number;
  year: string | number;
  setMonth: (month: string | number) => void;
  setDay: (day: string | number) => void;
  setYear: (year: string | number) => void;
  setISO8601: (date: string | number) => void;
  iso8601: string;
};

export const useDateStore = create<DateType>((set) => ({
  month: "",
  day: "",
  year: "",
  iso8601: "",
  setMonth: (month) => set({ month }),
  setDay: (day) => set({ day }),
  setYear: (year) => set({ year }),
  setISO8601: (date) => set({ iso8601: date as string }),
}));
