import { create } from "zustand";
import { UserBalanceStoreState, ModalStoreState } from "@/types/types";

// user blaance state store
export const useBalanceStore = create<UserBalanceStoreState>((set) => ({
  userBalance: { name: "balance", value: 0 },
  setUserBalance: (newValue) =>
    set((state) => ({
      userBalance: { ...state.userBalance, value: newValue },
    })),
}));

// Modal state store
export const useModalStore = create<ModalStoreState>((set) => ({
  modalVisible: false,
  modalData: null,
  setModalVisible: (visible) => set({ modalVisible: visible }),
  setModalData: (data) => set({ modalData: data }),
}));
