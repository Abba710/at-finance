// types of variables
interface VariableProps {
  name: string;
  value: number;
}

export interface ExpensesProps {
  description: string;
  value: number;
}

export interface ExpensesCategoryProps {
  name: string;
  value: number;
  expenses: ExpensesProps[]; // array
}

export interface VariablesStoreProps {
  variables: {
    userBalance: VariableProps;
    baseNeeds: ExpensesCategoryProps;
    financialGoals: ExpensesCategoryProps;
    personalSpending: ExpensesCategoryProps;
  };
  setVariable: (
    key: keyof VariablesStoreProps["variables"],
    value: number
  ) => Promise<void>;

  addExpense: (
    category: keyof VariablesStoreProps["variables"],
    expense: ExpensesProps // Expert object
  ) => Promise<void>;

  loadVariables: () => Promise<void>;
}

interface ModalData {
  name: string; // Name (for example, "Balance", "Food")
  value: any; // // The value that we edit
  onSave: (newValue: any) => void;
}

export interface ModalStoreState {
  modalVisible: boolean;
  modalData: ModalData | null;
  setModalVisible: (visible: boolean) => void;
  setModalData: (data: ModalData | null) => void;
}
export interface addModalStoreState {
  addModalVisible: boolean;
  setAddModalVisible: (visible: boolean) => void;
}

export interface useResetModalStoreInterface {
  addResetModalVisible: boolean;
  setAddResetModalVisible: (visible: boolean) => void;
}
