import AsyncStorage from '@react-native-async-storage/async-storage';

export class AppStorage {
  constructor(key) {
    this.key = key;
  }

  set(value, ...params) {
    const json = JSON.stringify(value);
    return AsyncStorage.setItem(this.key, json, ...params);
  }

  async get(...params) {
    try {
      const value = await AsyncStorage.getItem(this.key, ...params);
      if (value !== null) {
        return JSON.parse(value);
      }
      throw Error(null);
    } catch (error) {
      throw Error(null);
    }
  }

  remove(...params) {
    return AsyncStorage.removeItem(this.key, ...params);
  }
}
