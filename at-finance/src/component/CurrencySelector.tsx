import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useCurrencyStore, currencies } from "./GlobalStates";
import { create } from "zustand";

interface CurrencyModalStore {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

const useCurrencyModalStore = create<CurrencyModalStore>((set) => ({
  isVisible: false,
  setIsVisible: (visible) => set({ isVisible: visible }),
}));

export const CurrencySelector = () => {
  const { selectedCurrency, setSelectedCurrency } = useCurrencyStore();
  const { isVisible, setIsVisible } = useCurrencyModalStore();

  return (
    <>
      <TouchableOpacity
        className="h-10 px-4 bg-bg-input rounded-xl flex-row items-center justify-center border border-text-secondary/10"
        onPress={() => setIsVisible(true)}
      >
        <Text className="text-text-secondary text-base font-medium">
          {selectedCurrency.symbol}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >
        <View className="flex-1 bg-black/60 justify-center items-center">
          <View className="bg-bg-primary rounded-2xl p-6 w-4/5">
            <Text className="text-text-primary text-xl font-semibold mb-4 text-center">
              Select Currency
            </Text>

            <View className="gap-2">
              {currencies.map((currency) => (
                <TouchableOpacity
                  key={currency.symbol}
                  className={`p-4 rounded-xl flex-row justify-between items-center ${
                    selectedCurrency.symbol === currency.symbol
                      ? "bg-accent"
                      : "bg-bg-secondary border border-text-secondary/10"
                  }`}
                  onPress={() => {
                    setSelectedCurrency(currency);
                    setIsVisible(false);
                  }}
                >
                  <Text
                    className={`text-lg ${
                      selectedCurrency.symbol === currency.symbol
                        ? "text-text-primary font-semibold"
                        : "text-text-secondary"
                    }`}
                  >
                    {currency.name}
                  </Text>
                  <Text
                    className={`text-lg ${
                      selectedCurrency.symbol === currency.symbol
                        ? "text-text-primary font-semibold"
                        : "text-text-secondary"
                    }`}
                  >
                    {currency.symbol}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
