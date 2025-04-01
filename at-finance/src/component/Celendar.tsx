import React from "react";
import { View, Text } from "react-native";

export default function Calendar() {
  // Get current date
  const currentDate = new Date();

  // Get current year and month
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString("en-US", { month: "long" });

  return (
    <View className="flex-row items-center justify-between">
      {/* Display current month and year */}
      <Text className="text-white text-2xl font-bold">
        {currentMonth} {currentYear}
      </Text>
    </View>
  );
}
