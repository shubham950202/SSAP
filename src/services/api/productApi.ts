import axios from 'axios';

/**
 * Android Emulator
 * http://10.0.2.2:3001
 *
 * iOS Simulator
 * http://localhost:3001
 *
 * Physical Device
 * http://YOUR_PC_IP:3001
 */

const API = 'http://localhost:3001/products';

const api = axios.create({
  baseURL: API,
  timeout: 10000,
});

export const getProducts = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.log('GET PRODUCTS ERROR', error);
    throw error;
  }
};

export const getProduct = async (
  id: number,
) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.log('GET PRODUCT ERROR', error);
    throw error;
  }
};

export const addProduct = async (
  product: any,
) => {
  try {
    const response = await api.post(
      '/',
      product,
    );

    return response.data;
  } catch (error) {
    console.log('ADD PRODUCT ERROR', error);
    throw error;
  }
};

export const updateProduct = async (
  id: number,
  product: any,
) => {
  try {
    const response = await api.put(
      `/${id}`,
      product,
    );

    return response.data;
  } catch (error) {
    console.log('UPDATE PRODUCT ERROR', error);
    throw error;
  }
};

export const deleteProduct = async (
  id: number,
) => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    console.log('DELETE PRODUCT ERROR', error);
    throw error;
  }
};
