import { create } from "zustand";

type EvenType = {
  showModal: Boolean;
  showEdit: Boolean;
  setShowModal: (status: Boolean) => void;
  setShowEdit: (status: Boolean) => void;
};

export const useEvent = create<EvenType>((set) => ({
  showModal: false,
  showEdit: false,
  setShowModal: (status: Boolean) => set(() => ({ showModal: status })),
  setShowEdit: (status: Boolean) => set(() => ({ showEdit: status })),
}));
