import { create } from "zustand";

export enum ModalType {
  NONE = '',
  CREATE_POST = 'CREATE_POST',
  DETAIL_TWEET = 'DETAIL_TWEET',
  EDIT = 'EDIT',
}

type EventStore = {
  activeModal: ModalType;
  setActiveModal: (modal: ModalType) => void;
  closeModal: () => void;
};

export const useEvent = create<EventStore>((set) => ({
  activeModal: ModalType.NONE,
  setActiveModal: (modal) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: ModalType.NONE }),
}));
