// types of variables
interface VariableProps {
  name: string;
  value: number;
}

export interface VariablesStoreProps {
  variables: {
    userBalance: VariableProps;
    foodCosts: VariableProps;
  };
  setVariable: (
    key: keyof VariablesStoreProps["variables"],
    value: number
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
