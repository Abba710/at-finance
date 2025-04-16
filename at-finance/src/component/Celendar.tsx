import React from "react";
import { View, Text } from "react-native";

export default function Calendar() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString("en-US", { month: "long" });

  return (
    <View className="flex-row items-center">
      <Text className="text-text-secondary text-base font-medium">
        {currentMonth} {currentYear}
      </Text>
    </View>
  );
}
