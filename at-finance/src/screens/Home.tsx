import React, { useState } from "react";
import { View, TouchableOpacity, Image, Text, ScrollView } from "react-native";
import {
  useVariablesStore,
  useModalStore,
  useResetModalStore,
  useCurrencyStore,
} from "@/component/GlobalStates";
import ModalInput from "@/component/modalInput";
import AddModal from "@/component/addmodal";
import Celendar from "@/component/Celendar";
import ResetButton from "@/component/Resetbutton";
import { CurrencySelector } from "@/component/CurrencySelector";

export default function Home() {
  const { variables } = useVariablesStore();
  const { selectedCurrency } = useCurrencyStore();
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
    setExpandedCategory((prev) =>
      prev === categoryName ? null : categoryName
    );
  };

  const renderExpenses = (category) => {
    const expenses = variables[category].expenses;
    return (
      <ScrollView className="max-h-[200] mt-2">
        {expenses.map((expense, index) => (
          <View
            key={index}
            className="flex-row justify-between items-center mt-2 p-4 bg-bg-input rounded-xl border border-text-secondary/20"
          >
            <Text className="text-text-primary text-base">
              {expense.description}
            </Text>
            <Text className="text-text-secondary text-base">
              {expense.value}
              {selectedCurrency.symbol}
            </Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <View className="w-full h-full px-6">
      {/* Balance Card */}
      <View className="mt-14">
        <View className="bg-bg-secondary rounded-2xl p-6 shadow-lg">
          <Text className="text-text-secondary text-base font-medium mb-2">
            Your Balance
          </Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-text-primary text-4xl font-bold">
              {variables.userBalance.value}
              {selectedCurrency.symbol}
            </Text>
            <View className="flex-row items-center gap-2">
              <TouchableOpacity
                className="h-10 px-4 bg-bg-input rounded-xl flex-row items-center justify-center border border-text-secondary/10"
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
                  className="w-4 h-4 opacity-80 mr-2"
                />
                <Text className="text-text-secondary text-base font-medium">
                  Edit
                </Text>
              </TouchableOpacity>
              <CurrencySelector />
            </View>
          </View>
        </View>
      </View>

      {/* Date */}
      <View className="mt-6 w-full flex-row justify-center items-center">
        <View className="flex-row items-center bg-bg-secondary p-4 rounded-xl">
          <Celendar />
          <TouchableOpacity
            className="w-10 h-10 justify-center items-center ml-2 bg-bg-input rounded-xl"
            onPress={() => {
              useResetModalStore.getState().setAddResetModalVisible(true);
            }}
          >
            <Image
              source={require("@/assets/navmenu/Refresh.png")}
              className="w-5 h-5 opacity-80"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      {["baseNeeds", "financialGoals", "personalSpending"].map((category) => (
        <View key={category} className="mt-6">
          <TouchableOpacity onPress={() => toggleCategory(category)}>
            <View className="bg-bg-secondary rounded-xl p-6 shadow-lg">
              <View className="flex-row justify-between items-center">
                <Text className="text-text-primary text-xl font-semibold">
                  {variables[category].name}
                </Text>
                <Text className="text-text-secondary text-lg">
                  {variables[category].value}
                  {selectedCurrency.symbol}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {expandedCategory === category && renderExpenses(category)}
        </View>
      ))}

      <ModalInput />
      <AddModal />
      <ResetButton />
    </View>
  );
}
