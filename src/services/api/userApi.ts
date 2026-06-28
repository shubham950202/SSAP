import BASE_URL from './api';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  mobile: string;
  password: string;
  profileImage: string;
  createdAt: string;
}

/**
 * GET ALL USERS
 */
export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${BASE_URL}/users`);

  if (!response.ok) {
    throw new Error('Unable to fetch users');
  }

  return response.json();
};

/**
 * GET USER BY ID
 */
export const getUserById = async (
  id: string,
): Promise<User | null> => {
  const response = await fetch(
    `${BASE_URL}/users/${id}`,
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Unable to fetch user');
  }

  return response.json();
};

/**
 * GET USER BY EMAIL
 */
export const getUserByEmail = async (
  email: string,
): Promise<User | null> => {
  const response = await fetch(
    `${BASE_URL}/users?email=${encodeURIComponent(
      email,
    )}`,
  );

  if (!response.ok) {
    throw new Error('Unable to fetch user');
  }

  const users: User[] = await response.json();

  return users.length ? users[0] : null;
};

/**
 * CREATE USER
 */
export const createUser = async (
  user: User,
): Promise<User> => {
  const response = await fetch(
    `${BASE_URL}/users`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    },
  );

  if (!response.ok) {
    throw new Error('Unable to create user');
  }

  return response.json();
};

/**
 * UPDATE USER
 */
export const updateUser = async (
  id: string,
  user: Partial<User>,
): Promise<User> => {
  const response = await fetch(
    `${BASE_URL}/users/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    },
  );

  if (!response.ok) {
    throw new Error('Unable to update user');
  }

  return response.json();
};

/**
 * DELETE USER
 */
export const deleteUser = async (
  id: string,
): Promise<boolean> => {
  const response = await fetch(
    `${BASE_URL}/users/${id}`,
    {
      method: 'DELETE',
    },
  );

  if (!response.ok) {
    throw new Error('Unable to delete user');
  }

  return true;
};

/**
 * LOGIN USER
 */
export const loginApi = async (
  email: string,
  password: string,
): Promise<User | null> => {
  const response = await fetch(
    `${BASE_URL}/users?email=${encodeURIComponent(
      email,
    )}&password=${encodeURIComponent(
      password,
    )}`,
  );

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const users: User[] = await response.json();

  return users.length ? users[0] : null;
};
