import { create } from "zustand";

type EvenType = {
  showModal: Boolean;
  setShowModal: (status: Boolean) => void;
};

export const useEvent = create<EvenType>((set) => ({
  showModal: true,
  setShowModal: (status: Boolean) => set(() => ({ showModal: status })),
}));
