import { create } from "zustand";
import {
  ModalStoreState,
  VariablesStoreProps,
  ExpensesCategoryProps,
  addModalStoreState,
  ExpensesProps,
} from "@/types/types";
import { loadData, saveData } from "./storageData";

// user balance state store
export const useVariablesStore = create<VariablesStoreProps>((set) => ({
  variables: {
    userBalance: { name: "balance", value: 0 },
    baseNeeds: { name: "Base needs", value: 0, expenses: [] },
    financialGoals: { name: "Financial goals", value: 0, expenses: [] },
    personalSpending: { name: "Personal spending", value: 0, expenses: [] },
  },

  setVariable: async (key, newValue) => {
    set((state) => ({
      variables: {
        ...state.variables,
        [key]: { ...state.variables[key], value: newValue },
      },
    }));

    // Save in AsyncStorage
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

  // Function to add new consumption
  addExpense: async (category, newExpense: ExpensesProps) => {
    // Update the Zustand state with new expense data
    set((state) => {
      const categoryData = state.variables[category] as ExpensesCategoryProps;

      // Create an updated category with the new expense
      const updatedCategory = {
        ...categoryData,
        value: categoryData.value + newExpense.value, // Update the total value for the category
        expenses: [...categoryData.expenses, newExpense], // Add the new expense to the category's expense list
      };

      return {
        variables: {
          ...state.variables,
          [category]: updatedCategory, // Update the specific category in global state
        },
      };
    });

    try {
      // Load the current category data from AsyncStorage
      const storedCategory = await loadData(category);

      // Initialize an empty array for expenses
      let updatedExpenses: ExpensesProps[] = [];

      if (storedCategory) {
        // If category data exists in AsyncStorage, add the new expense to the current expenses
        updatedExpenses = storedCategory.expenses
          ? [...storedCategory.expenses, newExpense] // Add the new expense to the current expenses array
          : [newExpense]; // If there were no previous expenses, initialize with the new expense
      } else {
        // If no data exists, initialize the expenses array with the new expense
        updatedExpenses = [newExpense];
      }

      // Recalculate the total value for the category
      const newTotal = updatedExpenses.reduce(
        (acc, curr) => acc + curr.value,
        0
      );

      // Save the updated category data (new total and updated expenses) back to AsyncStorage
      await saveData(
        category,
        JSON.stringify({
          value: newTotal, // Updated total value for the category
          expenses: updatedExpenses, // Updated list of expenses
        })
      );

      console.log("Expense added and saved");
    } catch (error) {
      console.error("Error saving expense:", error);
    }
  },
}));

// how to use addExpense
//useVariablesStore
//  .getState()
//  .addExpense("baseNeeds", { description: "Utility bill", value: 150 });

// load data when app start
useVariablesStore.getState().loadVariables();

// Modal state store
export const useModalStore = create<ModalStoreState>((set) => ({
  modalVisible: false,
  modalData: null,
  setModalVisible: (visible) => set({ modalVisible: visible }),
  setModalData: (data) => set({ modalData: data }),
}));

export const useAddModalStore = create<addModalStoreState>((set) => ({
  addModalVisible: false,
  setAddModalVisible: (visible) => set({ addModalVisible: visible }),
}));
