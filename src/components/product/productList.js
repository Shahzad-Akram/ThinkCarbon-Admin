import React from 'react';
import { ProductItem } from './productItem';

export const ProductList = ({ products }) => {
  return (
    <div class='list-group '>
      {products.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </div>
  );
};
