import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { useModalStore, useCurrencyStore } from "@/component/GlobalStates";

const ModalInput = () => {
  const { modalVisible, modalData, setModalVisible, setModalData } =
    useModalStore();
  const { selectedCurrency } = useCurrencyStore();
  const [inputValue, setInInputValue] = useState(0);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View className="flex-1 bg-black/60 justify-end">
        <View className="bg-bg-primary rounded-t-2xl p-6">
          <Text className="text-text-primary text-xl font-semibold mb-4">
            Update {modalData?.name}
          </Text>

          <TextInput
            className="bg-bg-input text-text-primary px-4 py-3 rounded-xl mb-6 border border-text-secondary/20"
            placeholder={`Enter new value in ${selectedCurrency.name}...`}
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            onChangeText={(text) => setInInputValue(parseInt(text) || 0)}
          />

          <TouchableOpacity
            className="bg-accent p-4 rounded-xl shadow-lg"
            onPress={() => {
              if (modalData?.onSave) {
                modalData.onSave(inputValue);
              }
              setModalVisible(!modalVisible);
              setModalData(null);
            }}
          >
            <Text className="text-text-primary text-center text-base font-semibold">
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalInput;
