import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { useAddModalStore, useVariablesStore } from "./GlobalStates";

type Category =
  | "personalSpending"
  | "userBalance"
  | "baseNeeds"
  | "financialGoals";

const AddModal = () => {
  const { addModalVisible, setAddModalVisible } = useAddModalStore();
  const { variables, setVariable } = useVariablesStore();

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
    handleClose(); // close
  };

  return (
    <View className="flex-1">
      <Modal
        animationType="slide"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={handleClose}
      >
        <View className="absolute justify-center w-full bottom-0 h-[55%] items-center">
          <View className="bg-white w-full h-full p-4 rounded-lg">
            <Text className="text-lg font-bold mb-2 mt-2">
              Enter the amount
            </Text>
            <TextInput
              className="border border-gray-300 p-2 rounded-lg mb-2"
              placeholder="Enter..."
              keyboardType="numeric"
              value={inputAmauntValue?.toString() || ""}
              onChangeText={(text) =>
                setInInputAmauntValue(parseInt(text) || null)
              }
            />

            <Text className="text-lg font-bold mb-2 mt-2">
              Enter the description
            </Text>
            <TextInput
              className="border border-gray-300 p-2 rounded-lg mb-2"
              placeholder="Enter..."
              value={inputDescriptionValue}
              onChangeText={setInputDescriptionValue}
            />

            <View className="w-full">
              <Text className="text-lg font-bold mb-2">Choose category</Text>
              <View className="flex-row flex-wrap gap-2">
                {["baseNeeds", "financialGoals", "personalSpending"].map(
                  (cat) => (
                    <TouchableOpacity
                      key={cat}
                      className={`px-4 py-2 rounded-lg bg-[#343434] ${
                        chosedCategory === cat
                          ? "border-2 border-blue-500"
                          : "border-0"
                      }`}
                      onPress={() => setCategory(cat as Category)}
                    >
                      <Text className="text-white text-base">
                        {variables[cat as Category].name}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            </View>

            <TouchableOpacity
              className="bg-[#343434] p-3 mt-6 rounded-lg"
              onPress={handleAdd}
            >
              <Text className="text-white text-center text-base">Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddModal;
