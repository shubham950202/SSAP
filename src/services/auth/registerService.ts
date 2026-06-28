import uuid from 'react-native-uuid';

import {
  getUserByEmail,
  createUser,
} from '../api/userApi';

export const registerUser = async (
  data: any,
) => {
  const exist = await getUserByEmail(
    data.email,
  );

  if (exist) {
    throw new Error(
      'Email already exists',
    );
  }

  const user = {
    id: uuid.v4().toString(),

    name: data.fullName,

    username:
      data.email
        .split('@')[0]
        .toLowerCase(),

    email: data.email,

    mobile: data.mobile,

    password: data.password,

    profileImage: '',

    createdAt:
      new Date().toISOString(),
  };

  return await createUser(user);
};
