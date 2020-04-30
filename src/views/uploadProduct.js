import React from 'react';
import { ProductForm } from '../components/ProductForm';
import { useIsAdmin } from '../hooks/useIsAdmin';

export const UploadProduct = () => {
  useIsAdmin();
  return (
    <div className='container mt-4'>
      <ProductForm />
    </div>
  );
};
