import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useVariablesStore, useModalStore } from "@/component/GlobalStates";
import ModalInput from "@/component/modalInput";
import AddModal from "@/component/addmodal";
import Celendar from "@/component/Celendar";

export default function Home() {
  const { variables, setVariable } = useVariablesStore();
  console.log(variables);
  console.log(variables.baseNeeds.expenses);

  // State to track which category is expanded
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleEdit = (name, key, value, saveFunction) => {
    useModalStore.getState().setModalData({
      name,
      value,
      onSave: (newValue) => saveFunction(key, newValue),
    });
    useModalStore.getState().setModalVisible(true);
  };

  const toggleCategory = (categoryName) => {
    // Toggle the expanded state for the clicked category
    setExpandedCategory((prev) =>
      prev === categoryName ? null : categoryName
    );
  };

  // Helper to limit expenses to a max of 5 items and show a scroll if more
  const renderExpenses = (category) => {
    const expenses = variables[category].expenses;
    return (
      <ScrollView style={styles.expenseList}>
        {expenses.map((expense, index) => (
          <View
            key={index}
            className="flex flex-row justify-between items-center mt-[10px] px-2 border-t-2 border-b-2 border-white"
          >
            <Text className="text-white border-l-2 border-r-2 border-white text-[16px]">
              {expense.description}
            </Text>
            <Text className="text-white text-[16px] border-l-2 border-r-2 border-white">
              {expense.value}$
            </Text>
          </View>
        ))}
      </ScrollView>
    );
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

      {/* Category - Base needs */}
      <TouchableOpacity onPress={() => toggleCategory("baseNeeds")}>
        <View className="w-full h-[71.53px] flex flex-row justify-between items-center mt-[20px] bg-[#343434] px-4">
          <Text className="text-white text-[24px] font-poppins font-bold leading-[50px]">
            {variables.baseNeeds.name}
          </Text>
          <Text className="text-white text-[16px] font-poppins font-bold leading-[22px]">
            {variables.baseNeeds.value}$
          </Text>
        </View>
      </TouchableOpacity>

      {/* If category is expanded, show the expenses */}
      {expandedCategory === "baseNeeds" && renderExpenses("baseNeeds")}

      {/* Category - Financial goals */}
      <TouchableOpacity onPress={() => toggleCategory("financialGoals")}>
        <View className="w-full h-[71.53px] flex flex-row justify-between items-center mt-[20px] bg-[#343434] px-4">
          <Text className="text-white text-[24px] font-poppins font-bold leading-[50px]">
            {variables.financialGoals.name}
          </Text>
          <Text className="text-white text-[16px] font-poppins font-bold leading-[22px]">
            {variables.financialGoals.value}$
          </Text>
        </View>
      </TouchableOpacity>

      {/* If category is expanded, show the expenses */}
      {expandedCategory === "financialGoals" &&
        renderExpenses("financialGoals")}

      {/* Category - Personal spending */}
      <TouchableOpacity onPress={() => toggleCategory("personalSpending")}>
        <View className="w-full h-[71.53px] flex flex-row justify-between items-center mt-[20px] bg-[#343434] px-4">
          <Text className="text-white text-[24px] font-poppins font-bold leading-[50px]">
            {variables.personalSpending.name}
          </Text>
          <Text className="text-white text-[16px] font-poppins font-bold leading-[22px]">
            {variables.personalSpending.value}$
          </Text>
        </View>
      </TouchableOpacity>

      {/* If category is expanded, show the expenses */}
      {expandedCategory === "personalSpending" &&
        renderExpenses("personalSpending")}

      <ModalInput />
      <AddModal />
    </View>
  );
}

// Styles for expense list and scroll
const styles = StyleSheet.create({
  expenseList: {
    maxHeight: 160, // Set a max height for the list
  },
});
