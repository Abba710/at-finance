import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { useVariablesStore, useModalStore } from "@/component/GlobalStates";
import ModalInput from "@/component/modalInput";
import Celendar from "@/component/Celendar";

export default function Home() {
  const { variables, setVariable } = useVariablesStore();
  console.log(variables);
  console.log(variables.baseNeeds.expenses);
  const handleEdit = (name, key, value, saveFunction) => {
    useModalStore.getState().setModalData({
      name,
      value,
      onSave: (newValue) => saveFunction(key, newValue),
    });
    useModalStore.getState().setModalVisible(true);
  };

  return (
    <View className="w-full h-full">
      {/* Balance */}
      <View className="mt-[50px] ml-[20px] flex flex-row justify-center items-center">
        <Text className="text-white text-3xl font-bold">
          Balance: {variables.userBalance.value} $
        </Text>
        <TouchableOpacity
          className="flex w-[40px] h-[40px] justify-center items-start ml-2"
          onPress={() => {
            handleEdit(
              variables.userBalance.name,
              "userBalance",
              variables.userBalance.value,
              useVariablesStore.getState().setVariable
            );
          }}
        >
          <Image
            source={require("@/assets/home/edit.png")}
            className="w-[20px] h-[20px]"
          ></Image>
        </TouchableOpacity>
      </View>

      {/* Date */}
      <View className="mt-[5px] w-full flex-nowrap justify-center items-center">
        <Celendar />
      </View>

      {/* Category */}
      {/* Base needs */}
      <View className="w-full h-[71.53px] flex flex-row justify-between items-center mt-[20px] bg-[#343434] px-4">
        <Text className="text-white text-[24px] font-poppins font-bold leading-[50px]">
          {variables.baseNeeds.name}
        </Text>

        <Text className="text-white text-[16px] font-poppins font-bold leading-[22px]">
          {variables.baseNeeds.value}$
        </Text>
      </View>
      {/* Financial goals */}
      <View className="w-full h-[71.53px] flex flex-row justify-between items-center mt-[20px] bg-[#343434] px-4">
        <Text className="text-white text-[24px] font-poppins font-bold leading-[50px]">
          {variables.financialGoals.name}
        </Text>

        <Text className="text-white text-[16px] font-poppins font-bold leading-[22px]">
          {variables.financialGoals.value}$
        </Text>
      </View>
      {/* Personal spendigns */}
      <View className="w-full h-[71.53px] flex flex-row justify-between items-center mt-[20px] bg-[#343434] px-4">
        <Text className="text-white text-[24px] font-poppins font-bold leading-[50px]">
          {variables.personalSpending.name}
        </Text>

        <Text className="text-white text-[16px] font-poppins font-bold leading-[22px]">
          {variables.personalSpending.value}$
        </Text>
      </View>
      <ModalInput />
    </View>
  );
}
