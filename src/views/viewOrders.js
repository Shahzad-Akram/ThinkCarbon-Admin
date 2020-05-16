import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { setAuthorizationToken } from '../helpers/utils';

export const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  setAuthorizationToken();
  useEffect(() => {
    axios
      .get('/order')
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  return <div>{JSON.stringify(orders, null, 4)}</div>;
};
