import { create } from "zustand";
import {
  ModalStoreState,
  VariablesStoreProps,
  ExpensesCategoryProps,
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

    // Сохраняем в AsyncStorage
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
            value: baseNeeds !== null ? JSON.parse(baseNeeds).value : 0, // Обрабатываем только значение
            expenses: baseNeeds !== null ? JSON.parse(baseNeeds).expenses : [], // Расходы отдельно
          },
          financialGoals: {
            ...state.variables.financialGoals,
            value:
              financialGoals !== null ? JSON.parse(financialGoals).value : 0,
            expenses:
              financialGoals !== null
                ? JSON.parse(financialGoals).expenses
                : [],
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
                : [],
          },
        },
      }));
      console.log("loaded");
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    }
  },

  // Функция для добавления нового расхода
  addExpense: async (category, newExpense) => {
    set((state) => {
      const categoryData = state.variables[category] as ExpensesCategoryProps;
      const updatedCategory = {
        ...categoryData,
        value: categoryData.value + newExpense.value, // Обновляем сумму категории
        expenses: [...categoryData.expenses, newExpense], // Добавляем новый расход
      };

      return {
        variables: {
          ...state.variables,
          [category]: updatedCategory, // Обновляем категорию
        },
      };
    });

    try {
      const storedCategory = await loadData(category); // Загружаем текущие данные расходов
      const updatedExpenses = storedCategory ? JSON.parse(storedCategory) : []; // Если данных нет, создаем пустой массив
      updatedExpenses.push(newExpense); // Добавляем новый расход в массив

      // Сохраняем обновленные данные обратно в AsyncStorage
      await saveData(
        category,
        JSON.stringify({
          value: updatedExpenses.reduce((acc, curr) => acc + curr.value, 0),
          expenses: updatedExpenses,
        })
      );
      console.log("Expense added and saved");
    } catch (error) {
      console.error("Ошибка сохранения расхода:", error);
    }
  },
}));

useVariablesStore
  .getState()
  .addExpense("baseNeeds", { description: "Utility bill", value: 150 });

// load data when app start
useVariablesStore.getState().loadVariables();

// Modal state store
export const useModalStore = create<ModalStoreState>((set) => ({
  modalVisible: false,
  modalData: null,
  setModalVisible: (visible) => set({ modalVisible: visible }),
  setModalData: (data) => set({ modalData: data }),
}));
