import {getData, saveData} from '../services/storageService';

const USERS_KEY = 'USERS';

export interface User {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  profileImage?: string;
  createdAt: string;
}

/**
 * Get All Users
 */
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const users = await getData(USERS_KEY);

    console.log('ALL USERS =>', users);

    return users || [];
  } catch (error) {
    console.log('GET USERS ERROR =>', error);
    return [];
  }
};

/**
 * Get User By ID
 */
export const getUserById = async (
  id: string,
): Promise<User | null> => {
  const users = await getAllUsers();

  return (
    users.find(user => user.id === id) ||
    null
  );
};

/**
 * Get User By Email
 */
export const getUserByEmail = async (
  email: string,
): Promise<User | null> => {
  const users = await getAllUsers();

  return (
    users.find(
      user =>
        user.email.toLowerCase() ===
        email.toLowerCase(),
    ) || null
  );
};

/**
 * Add User
 */
export const addUser = async (
  user: User,
): Promise<User> => {
  const users = await getAllUsers();

  users.push(user);

  await saveData(
    USERS_KEY,
    users,
  );

  console.log(
    'USER ADDED =>',
    user,
  );

  return user;
};

/**
 * Update User
 */
export const updateUser = async (
  id: string,
  updatedData: Partial<User>,
): Promise<User | null> => {
  const users = await getAllUsers();

  const index = users.findIndex(
    user => user.id === id,
  );

  if (index === -1) {
    console.log(
      'USER NOT FOUND =>',
      id,
    );

    return null;
  }

  users[index] = {
    ...users[index],
    ...updatedData,
  };

  console.log(
    'UPDATED USER =>',
    users[index],
  );

  await saveData(
    USERS_KEY,
    users,
  );

  return users[index];
};

/**
 * Delete User
 */
export const deleteUser = async (
  id: string,
): Promise<boolean> => {
  const users = await getAllUsers();

  const filteredUsers = users.filter(
    user => user.id !== id,
  );

  await saveData(
    USERS_KEY,
    filteredUsers,
  );

  console.log(
    'USER DELETED =>',
    id,
  );

  return true;
};
