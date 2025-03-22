import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import "../global.css";

export default function App() {
  return (
    <View className="bg-black w-[1900px] h-screen">
      <Text className="">Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
