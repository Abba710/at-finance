import { create } from "zustand";
import { ModalStoreState, VariablesStoreProps } from "@/types/types";
import { loadData, saveData } from "./storageData";

// user balance state store
export const useVariablesStore = create<VariablesStoreProps>((set) => ({
  variables: {
    userBalance: { name: "balance", value: 0 }, // begin variables
    foodCosts: { name: "Food", value: 0 },
  },

  setVariable: async (key, newValue) => {
    set((state) => ({
      variables: {
        ...state.variables,
        [key]: { ...state.variables[key], value: newValue },
      },
    }));

    // save in AsyncStorage
    try {
      await saveData(key, JSON.stringify(newValue));
      console.log("saved");
    } catch (error) {
      console.error("Ошибка сохранения:", error);
    }
  },

  loadVariables: async () => {
    try {
      const userBalance = await loadData("userBalance");
      const food = await loadData("foodCosts");

      set((state) => ({
        variables: {
          ...state.variables,
          userBalance: {
            ...state.variables.userBalance,
            value: userBalance !== null ? JSON.parse(userBalance) : 0,
          },
          food: {
            ...state.variables.foodCosts,
            value: food !== null ? JSON.parse(food) : 0,
          },
        },
      }));
      console.log("loaded");
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    }
  },
}));

// load data when app start
useVariablesStore.getState().loadVariables();

// Modal state store
export const useModalStore = create<ModalStoreState>((set) => ({
  modalVisible: false,
  modalData: null,
  setModalVisible: (visible) => set({ modalVisible: visible }),
  setModalData: (data) => set({ modalData: data }),
}));
