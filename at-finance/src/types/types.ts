interface veriableProps {
  name: string;
  value: number;
}

export interface UserBalanceStoreState {
  userBalance: veriableProps;
  setUserBalance: (value: number) => void;
}

interface ModalData {
  name: string; // Name of edited data (for example, "Balance", "Food")
  value: any; // // The value that we edit
  onSave: (newValue: any) => void;
}

export interface ModalStoreState {
  modalVisible: boolean;
  modalData: ModalData | null;
  setModalVisible: (visible: boolean) => void;
  setModalData: (data: ModalData | null) => void;
}
