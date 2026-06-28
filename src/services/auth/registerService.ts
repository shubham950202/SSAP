import {
  addUser,
  getUserByEmail,
} from '../../database/repositories/userRepository';

export const registerUser = async (
  data: any,
) => {
  const existingUser =
    await getUserByEmail(data.email);

  if (existingUser) {
    throw new Error(
      'Email already registered',
    );
  }

  const user = {
    id: `USR${Date.now()}`,
    fullName: data.fullName,
    email: data.email,
    mobile: data.mobile,
    password: data.password,
    profileImage: '',
    createdAt: new Date().toISOString(),
  };

  await addUser(user);

  return user;
};
