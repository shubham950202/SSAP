import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_KEY = 'CURRENT_USER';

export const saveSession = async (user: any) => {
  await AsyncStorage.setItem(
    SESSION_KEY,
    JSON.stringify(user),
  );
};

export const getSession = async () => {
  const user = await AsyncStorage.getItem(
    SESSION_KEY,
  );

  return user ? JSON.parse(user) : null;
};

export const clearSession = async () => {
  await AsyncStorage.removeItem(
    SESSION_KEY,
  );
};
