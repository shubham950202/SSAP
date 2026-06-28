import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Save any data
 */
export const saveData = async <T>(
  key: string,
  value: T,
): Promise<void> => {
  try {
    await AsyncStorage.setItem(
      key,
      JSON.stringify(value),
    );
  } catch (error) {
    console.log('Save Error:', error);
    throw error;
  }
};

/**
 * Get any data (generic safe)
 */
export const getData = async <T>(
  key: string,
): Promise<T | null> => {
  try {
    const data =
      await AsyncStorage.getItem(key);

    return data
      ? (JSON.parse(data) as T)
      : null;
  } catch (error) {
    console.log('Get Error:', error);
    return null;
  }
};

/**
 * Remove data
 */
export const removeData = async (
  key: string,
): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('Remove Error:', error);
  }
};
