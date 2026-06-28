import {
  getUserByEmail,
} from '../api/userApi';

import {
  saveSession,
} from './sessionService';

export const loginUser =
  async (
    email: string,
    password: string,
  ) => {
    const user =
      await getUserByEmail(email);

    if (!user) {
      throw new Error(
        'User not found',
      );
    }

    if (
      user.password !== password
    ) {
      throw new Error(
        'Invalid password',
      );
    }

    await saveSession(user);

    return user;
  };
