import { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../config/apiConfig';

export const useCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(API.getCoupon)
      .then((coupons) => {
        setCoupons(coupons.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setIsLoading(false);
      });
  }, []);
  return { coupons, isLoading };
};
