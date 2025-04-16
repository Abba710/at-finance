import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import "../global.css";
import Navmenu from "@/component/Navigation";
import Home from "./screens/Home";

export default function App() {
  return (
    <View className="flex-1 bg-bg-primary">
      <StatusBar style="light" />
      <Home />
      <Navmenu />
    </View>
  );
}
