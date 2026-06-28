import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_KEY = 'CURRENT_USER';

export const saveSession = async (
  user: any,
) => {
  await AsyncStorage.setItem(
    SESSION_KEY,
    JSON.stringify(user),
  );
};

export const getSession =
  async () => {
    const data =
      await AsyncStorage.getItem(
        SESSION_KEY,
      );

    return data
      ? JSON.parse(data)
      : null;
  };

export const clearSession =
  async () => {
    await AsyncStorage.removeItem(
      SESSION_KEY,
    );
  };
