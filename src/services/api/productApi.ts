import {apiGet} from './apiClient';

export const getProducts =
  async () => {
    return apiGet('/products');
  };
