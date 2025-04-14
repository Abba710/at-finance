import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { useModalStore } from "@/component/GlobalStates";

const ModalInput = () => {
  const { modalVisible, modalData, setModalVisible, setModalData } =
    useModalStore();
  const [inputValue, setInInputValue] = useState(0);

  return (
    <View className="flex-1">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className=" absolute justify-center w-full bottom-0 h-[50%] items-center">
          <View className="bg-white w-full h-[100%] p-4 rounded-lg">
            <Text className="text-lg font-bold mb-2">
              Input new {modalData?.name} value
            </Text>
            <TextInput
              className="border border-gray-300 p-2 rounded-lg mb-2"
              placeholder="Enter..."
              keyboardType="numeric"
              onChangeText={(text) => setInInputValue(parseInt(text))}
            />
            <TouchableOpacity
              className="bg-[#343434] p-3 mt-6 rounded-lg"
              onPress={() => {
                if (modalData?.onSave) {
                  modalData.onSave(inputValue); // call save function
                }
                setModalVisible(!modalVisible);
                setModalData(null);
              }}
            >
              <Text className="text-white text-center">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalInput;
