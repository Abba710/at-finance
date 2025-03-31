import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";

interface ModalInputProps {
  toEdit: object;
  isopen: boolean;
}
const ModalInput: React.FC<ModalInputProps> = ({ toEdit, isopen }) => {
  const [modalVisible, setModalVisible] = useState(isopen);
  const [inInputValue, setInInputValue] = useState(0);

  const nameKey = Object.values(toEdit)[0];
  const valueKey = Object.values(toEdit)[1];

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
              Input new {nameKey} value
            </Text>
            <TextInput
              className="border border-gray-300 p-2 rounded-lg mb-2"
              placeholder="Enter..."
              keyboardType="numeric"
              onChangeText={(text) => setInInputValue(parseInt(text))}
            />
            <TouchableOpacity
              className="bg-blue-500 p-2 rounded-lg"
              onPress={() => {
                setModalVisible(!modalVisible);
                toEdit[valueKey] = inInputValue;
              }}
            >
              <Text className="text-white text-center">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        className="bg-blue-500 p-2 rounded-lg"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white text-center">Open Modal</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalInput;
