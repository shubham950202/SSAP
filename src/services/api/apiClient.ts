const BASE_URL = 'http://localhost:3001';

export async function apiGet(
  endpoint: string,
) {
  const response = await fetch(
    `${BASE_URL}${endpoint}`,
  );

  if (!response.ok) {
    throw new Error('API Error');
  }

  return response.json();
}
