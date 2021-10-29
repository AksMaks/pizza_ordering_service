import AsyncStorage from '@react-native-async-storage/async-storage';

exports.setData = setData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    console.log(e)
  }
}
exports.getData = getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(value) : null;
    
  } catch(e) {
    console.log(e)
  }
}