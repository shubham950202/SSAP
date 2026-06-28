const BASE_URL = 'http://localhost:3001/users';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  mobile: string;
  password: string;
  profileImage?: string;
  createdAt: string;
}

export const getAllUsers = async (): Promise<User[]> => {
  const res = await fetch(BASE_URL);
  return await res.json();
};

export const getUserById = async (
  id: string,
): Promise<User | null> => {
  const res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) {
    return null;
  }

  return await res.json();
};

export const getUserByEmail = async (
  email: string,
): Promise<User | null> => {
  const res = await fetch(
    `${BASE_URL}?email=${email}`,
  );

  const users = await res.json();

  return users.length
    ? users[0]
    : null;
};

export const addUser = async (
  user: User,
): Promise<User> => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type':
        'application/json',
    },
    body: JSON.stringify(user),
  });

  return await res.json();
};

export const updateUser = async (
  id: string,
  updatedData: Partial<User>,
): Promise<User> => {
  const res = await fetch(
    `${BASE_URL}/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type':
          'application/json',
      },
      body: JSON.stringify(updatedData),
    },
  );

  return await res.json();
};

export const deleteUser = async (
  id: string,
): Promise<boolean> => {
  await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  return true;
};
