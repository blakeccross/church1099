import AsyncStorage from '@react-native-async-storage/async-storage';
const fetchKey = async key => {
  let res = await AsyncStorage.getItem(key);
  return res;
};
const setKey = async (name, value) => {
  await AsyncStorage.setItem(name, value);
};
const removeKey = async key => {
  await AsyncStorage.removeItem(key);
};
export const storageServices = {
  fetchKey,
  setKey,
  removeKey,
};
