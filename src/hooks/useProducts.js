import { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../config/apiConfig';

export const useProducts = () => {
  const [products, setProduct] = useState();
  const [stats, setStats] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(API.getProducts)
      .then((res) => {
        const { products, count, skip, limit } = res.data;
        setProduct(products);
        setStats({
          count,
          skip,
          limit,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setIsLoading(false);
      });
  }, []);
  return { products, isLoading, stats };
};
