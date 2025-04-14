import { create } from "zustand";
import {
  ModalStoreState,
  VariablesStoreProps,
  ExpensesCategoryProps,
  addModalStoreState,
  ExpensesProps,
  useResetModalStoreInterface,
} from "@/types/types";
import { loadData, saveData } from "./storageData";

// Global store for user balance and expense categories
export const useVariablesStore = create<VariablesStoreProps>((set) => ({
  variables: {
    userBalance: { name: "balance", value: 0 },
    baseNeeds: { name: "Base needs", value: 0, expenses: [] },
    financialGoals: { name: "Financial goals", value: 0, expenses: [] },
    personalSpending: { name: "Personal spending", value: 0, expenses: [] },
  },

  // Update a specific variable (e.g., balance or category value)
  setVariable: async (key, newValue) => {
    set((state) => ({
      variables: {
        ...state.variables,
        [key]: { ...state.variables[key], value: newValue },
      },
    }));

    // Save updated value to AsyncStorage
    try {
      await saveData(key, JSON.stringify(newValue));
      console.log("Saved");
    } catch (error) {
      console.error("Save error:", error);
    }
  },

  // Load all variables and their expenses from AsyncStorage
  loadVariables: async () => {
    try {
      const userBalance = await loadData("userBalance");
      const baseNeeds = await loadData("baseNeeds");
      const financialGoals = await loadData("financialGoals");
      const personalSpending = await loadData("personalSpending");

      set((state) => ({
        variables: {
          ...state.variables,
          userBalance: {
            ...state.variables.userBalance,
            value: userBalance !== null ? JSON.parse(userBalance) : 0,
          },
          baseNeeds: {
            ...state.variables.baseNeeds,
            value: baseNeeds !== null ? JSON.parse(baseNeeds).value : 0,
            expenses: baseNeeds !== null ? JSON.parse(baseNeeds).expenses : [], // Load all expenses for base needs
          },
          financialGoals: {
            ...state.variables.financialGoals,
            value:
              financialGoals !== null ? JSON.parse(financialGoals).value : 0,
            expenses:
              financialGoals !== null
                ? JSON.parse(financialGoals).expenses
                : [], // Load all expenses for financial goals
          },
          personalSpending: {
            ...state.variables.personalSpending,
            value:
              personalSpending !== null
                ? JSON.parse(personalSpending).value
                : 0,
            expenses:
              personalSpending !== null
                ? JSON.parse(personalSpending).expenses
                : [], // Load all expenses for personal spending
          },
        },
      }));

      console.log("Loaded variables and expenses");
    } catch (error) {
      console.error("Error loading variables:", error);
    }
  },

  // Add a new expense to a category
  addExpense: async (category, newExpense: ExpensesProps) => {
    // Update the in-memory state (Zustand)
    set((state) => {
      const categoryData = state.variables[category] as ExpensesCategoryProps;

      const updatedCategory = {
        ...categoryData,
        value: categoryData.value + newExpense.value,
        expenses: [...categoryData.expenses, newExpense], // Add the new expense to memory
      };

      return {
        variables: {
          ...state.variables,
          [category]: updatedCategory,
        },
      };
    });

    try {
      // Get the updated list of expenses from memory (Zustand)
      const currentExpenses = (
        useVariablesStore.getState().variables[
          category
        ] as ExpensesCategoryProps
      ).expenses;

      const newTotal = currentExpenses.reduce(
        (acc, curr) => acc + curr.value,
        0
      );

      // Save the full list of expenses back to AsyncStorage
      await saveData(
        category,
        JSON.stringify({
          value: newTotal,
          expenses: currentExpenses,
        })
      );

      console.log("✅ All expenses successfully saved to AsyncStorage!");
    } catch (error) {
      console.error("❌ Error while saving:", error);
    }
  },
}));

// Example usage of addExpense:
// useVariablesStore
//   .getState()
//   .addExpense("baseNeeds", { description: "Utility bill", value: 150 });

// Load variables and expenses when the app starts
useVariablesStore.getState().loadVariables();

// Store for controlling modal visibility and data
export const useModalStore = create<ModalStoreState>((set) => ({
  modalVisible: false,
  modalData: null,
  setModalVisible: (visible) => set({ modalVisible: visible }),
  setModalData: (data) => set({ modalData: data }),
}));

// Store for controlling visibility of the "add" modal
export const useAddModalStore = create<addModalStoreState>((set) => ({
  addModalVisible: false,
  setAddModalVisible: (visible) => set({ addModalVisible: visible }),
}));

export const useResetModalStore = create<useResetModalStoreInterface>(
  (set) => ({
    addResetModalVisible: false,
    setAddResetModalVisible: (visible) =>
      set({ addResetModalVisible: visible }),
  })
);
