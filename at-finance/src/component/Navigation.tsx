import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { useAddModalStore } from "./GlobalStates";

export default function Navmenu() {
  const { setAddModalVisible } = useAddModalStore();

  return (
    <View className="absolute bottom-[10px] w-full px-6">
      <View className="bg-bg-secondary rounded-2xl p-4 flex-row items-center justify-between shadow-lg">
        <TouchableOpacity className="w-10 h-10 justify-center items-center">
          <Image
            source={require("@/assets/navmenu/Home.png")}
            className="w-6 h-6 opacity-80"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setAddModalVisible(true)}
          className="w-16 h-16 bg-accent rounded-full flex items-center justify-center -mt-8 shadow-lg"
        >
          <Image
            source={require("@/assets/navmenu/Add.png")}
            className="w-[42] h-[42] "
          />
        </TouchableOpacity>

        <TouchableOpacity
          className="w-10 h-10 justify-center items-center"
          onPress={() => {
            alert("Financial AI Assistant will soon appear!");
          }}
        >
          <Image
            source={require("@/assets/navmenu/FAQ.png")}
            className="w-6 h-6 opacity-80"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
