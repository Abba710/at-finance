import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { useBalanceStore, useModalStore } from "@/component/GlobalStates";
import ModalInput from "@/component/modalInput";

export default function Home() {
  const { userBalance, setUserBalance } = useBalanceStore();
  const handleEdit = (name, value, saveFunction) => {
    useModalStore
      .getState()
      .setModalData({ name, value, onSave: saveFunction }); // transmit data
    useModalStore.getState().setModalVisible(true); // open modal
  };

  return (
    <View className="w-full h-full">
      {/* Balance */}
      <View className="mt-[50px] flex flex-row justify-center items-center">
        <Text className="text-white text-3xl font-bold">
          Total Balance: {userBalance.value} $
        </Text>
        <TouchableOpacity
          className="flex justify-center ml-2 items-center"
          onPress={() => {
            handleEdit(userBalance.value, userBalance.value, setUserBalance);
          }}
        >
          <Image
            source={require("@/assets/home/edit.png")}
            className="w-[20px] h-[20px]"
          ></Image>
        </TouchableOpacity>
      </View>

      {/* Date */}
      <View className="mt-[5px] flex flex-row justify-center items-center">
        <Text className="text-white text-2xl font-bold ">March 2025</Text>
      </View>

      {/* Category */}
      <View className="w-[178px] h-[71.53px] flex flex-row justify-start items-start ml-[20px] mt-[20px]">
        <View className="w-[178px] h-[71.53px] left-0 top-0 absolute bg-[#343434] rounded-[10px]" />

        <Text className="w-[77px] h-[22.81px] left-[7px] top-[24.88px] absolute text-center text-white text-[16px] font-poppins font-bold leading-[22px]">
          1.200.00 $
        </Text>

        <Text className="w-[30px] h-[17.62px] left-[7px] top-[5.18px] absolute text-center text-white text-[12px] font-poppins font-bold leading-[22px]">
          Food
        </Text>

        <View className="w-[43.21px] h-[44.80px] left-[121px] top-[11.40px] absolute bg-[#808080] rounded-full" />
        <View className="w-[43.21px] h-[44.80px] left-[121px] top-[11.40px] absolute bg-[#8EE42C] rounded-full" />

        <Text className="w-[29px] h-[22.81px] left-[129px] top-[22.81px] absolute text-center text-white text-[14.40px] font-poppins font-bold leading-[22px]">
          78%
        </Text>
      </View>
      <ModalInput />
    </View>
  );
}
