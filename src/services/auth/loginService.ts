import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserByEmail} from '../../database/repositories/userRepository';

export const loginUser = async (
  email: string,
  password: string,
) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error('User not found');
  }

  if (user.password !== password) {
    throw new Error('Invalid password');
  }

  await AsyncStorage.setItem(
    'CURRENT_USER',
    JSON.stringify(user),
  );

  return user;
};
