import {
  useEffect,
  useState,
} from 'react';

import {getProducts} from '../../../services/api/productApi';

export default function useProducts() {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts =
    async () => {
      try {
        setLoading(true);

        const data =
          await getProducts();

        setProducts(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

  return {
    products,
    loading,
    error,
    refresh: loadProducts,
  };
}
