import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (myKey, toSave) => {
  try {
    const jsonValue = JSON.stringify(toSave);
    await AsyncStorage.setItem(myKey, jsonValue);
  } catch (error) {
    console.error("saving error:", error);
  }
};

export const loadData = async (myKey) => {
  try {
    const value = await AsyncStorage.getItem(myKey);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("loading error:", error);
    return null;
  }
};
