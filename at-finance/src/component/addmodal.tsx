import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import {
  useAddModalStore,
  useVariablesStore,
  useCurrencyStore,
} from "./GlobalStates";

type Category =
  | "personalSpending"
  | "userBalance"
  | "baseNeeds"
  | "financialGoals";

const AddModal = () => {
  const { addModalVisible, setAddModalVisible } = useAddModalStore();
  const { variables, setVariable } = useVariablesStore();
  const { selectedCurrency } = useCurrencyStore();

  const [inputAmauntValue, setInInputAmauntValue] = useState<number | null>(
    null
  );
  const [inputDescriptionValue, setInputDescriptionValue] = useState("");
  const [chosedCategory, setCategory] = useState<Category | "">("");

  const handleClose = () => {
    setAddModalVisible(false);
    resetForm();
  };

  const resetForm = () => {
    setInInputAmauntValue(null);
    setInputDescriptionValue("");
    setCategory("");
  };

  const handleAdd = () => {
    if (!inputAmauntValue || inputAmauntValue <= 0) {
      Alert.alert("Error", "Enter the correct amount.");
      return;
    }

    if (inputDescriptionValue.trim() === "") {
      Alert.alert("Error", "Enter the description.");
      return;
    }

    if (chosedCategory === "") {
      Alert.alert("Error", "Select the category.");
      return;
    }

    useVariablesStore.getState().addExpense(chosedCategory, {
      description: inputDescriptionValue,
      value: inputAmauntValue,
    });
    const newBalance = variables.userBalance.value - inputAmauntValue;
    setVariable("userBalance", newBalance);
    handleClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={addModalVisible}
      onRequestClose={handleClose}
    >
      <View className="flex-1 bg-black/60 justify-end">
        <View className="bg-bg-primary rounded-t-2xl p-6">
          <Text className="text-text-primary text-xl font-semibold mb-4">
            Add New Transaction
          </Text>

          <Text className="text-text-secondary font-medium mb-2">
            Amount ({selectedCurrency.symbol})
          </Text>
          <TextInput
            className="bg-bg-input text-text-primary px-4 py-3 rounded-xl mb-4 border border-text-secondary/20"
            placeholder={`Enter amount in ${selectedCurrency.name}...`}
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            value={inputAmauntValue?.toString() || ""}
            onChangeText={(text) =>
              setInInputAmauntValue(parseInt(text) || null)
            }
          />

          <Text className="text-text-secondary font-medium mb-2">
            Description
          </Text>
          <TextInput
            className="bg-bg-input text-text-primary px-4 py-3 rounded-xl mb-4 border border-text-secondary/20"
            placeholder="Enter description..."
            placeholderTextColor="#9CA3AF"
            value={inputDescriptionValue}
            onChangeText={setInputDescriptionValue}
          />

          <Text className="text-text-secondary font-medium mb-2">Category</Text>
          <View className="flex-row flex-wrap gap-2 mb-6">
            {["baseNeeds", "financialGoals", "personalSpending"].map((cat) => (
              <TouchableOpacity
                key={cat}
                className={`px-4 py-2 rounded-xl ${
                  chosedCategory === cat
                    ? "bg-accent"
                    : "bg-bg-input border border-text-secondary/20"
                }`}
                onPress={() => setCategory(cat as Category)}
              >
                <Text
                  className={`text-base ${
                    chosedCategory === cat
                      ? "text-text-primary"
                      : "text-text-secondary"
                  }`}
                >
                  {variables[cat as Category].name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            className="bg-accent p-4 rounded-xl shadow-lg"
            onPress={handleAdd}
          >
            <Text className="text-text-primary text-center text-base font-semibold">
              Add Transaction
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddModal;
