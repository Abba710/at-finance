import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { useResetModalStore, useVariablesStore } from "./GlobalStates";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ResetButton = () => {
  const { addResetModalVisible, setAddResetModalVisible } =
    useResetModalStore();

  return (
    <View className="flex-1">
      <Modal
        animationType="slide"
        transparent={true}
        visible={addResetModalVisible}
        onRequestClose={() => {
          setAddResetModalVisible(false);
        }}
      >
        <View className="flex-1 bg-black/60 justify-center items-center">
          <View className="bg-zinc-900 rounded-xl p-6 w-4/5 shadow-lg">
            <Text className="text-white text-lg font-semibold text-center mb-4">
              Are you sure you want to reset?
            </Text>
            <View className="flex-row justify-between">
              <TouchableOpacity
                className="flex-1 mr-2 py-2 rounded-md bg-zinc-700 items-center"
                onPress={() => setAddResetModalVisible(false)}
              >
                <Text className="text-gray-300 font-medium">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 ml-2 py-2 rounded-md bg-red-600 items-center"
                onPress={() => {
                  AsyncStorage.clear();
                  useVariablesStore.getState().loadVariables();
                  setAddResetModalVisible(false);
                }}
              >
                <Text className="text-white font-bold">Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ResetButton;
