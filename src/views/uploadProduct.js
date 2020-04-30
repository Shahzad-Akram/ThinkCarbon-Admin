import React from 'react';
import { ProductForm } from '../components/ProductForm';
import { useIsAdmin } from '../hooks/useIsAdmin';
import { setAuthorizationToken } from '../helpers/utils';

export const UploadProduct = () => {
  setAuthorizationToken();
  useIsAdmin();
  return (
    <div className='container mt-4'>
      <ProductForm />
    </div>
  );
};
