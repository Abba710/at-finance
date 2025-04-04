import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { useAddModalStore } from "./GlobalStates";

export default function Navmenu() {
  function handleAdd() {
    useAddModalStore.getState().setAddModalVisible(true);
  }

  return (
    <View className="w-[100%] h-[6%] absolute bottom-[10px] px-[80px] bg-[#1F1F1F] flex flex-row items-center justify-between">
      <TouchableOpacity>
        <Image
          source={require("@/assets/navmenu/Home.png")}
          className="w-[32px] h-[32px]"
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleAdd}>
        <Image
          source={require("@/assets/navmenu/Add.png")}
          className="w-[42px] h-[42px]"
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <Image
          source={require("@/assets/navmenu/FAQ.png")}
          className="w-[32px] h-[32px]"
        />
      </TouchableOpacity>
    </View>
  );
}
