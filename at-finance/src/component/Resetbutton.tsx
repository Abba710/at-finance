import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { useResetModalStore, useVariablesStore } from "./GlobalStates";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ResetButton = () => {
  const { addResetModalVisible, setAddResetModalVisible } =
    useResetModalStore();

  const handleReset = async () => {
    await AsyncStorage.clear();
    useVariablesStore.getState().loadVariables();
    setAddResetModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={addResetModalVisible}
      onRequestClose={() => setAddResetModalVisible(false)}
    >
      <View className="flex-1 bg-black/60 justify-center items-center">
        <View className="bg-bg-primary rounded-2xl p-6 w-4/5 shadow-lg">
          <Text className="text-text-primary text-xl font-semibold text-center mb-6">
            Are you sure you want to reset?
          </Text>
          <View className="flex-row justify-between gap-3">
            <TouchableOpacity
              className="flex-1 py-3 rounded-xl bg-bg-secondary border border-text-secondary/20"
              onPress={() => setAddResetModalVisible(false)}
            >
              <Text className="text-text-secondary text-base font-medium text-center">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 py-3 rounded-xl bg-accent shadow-md"
              onPress={handleReset}
            >
              <Text className="text-text-primary text-base font-semibold text-center">
                Reset
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ResetButton;
