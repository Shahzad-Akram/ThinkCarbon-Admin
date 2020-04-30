import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductList } from '../components/product/productList';
import { useIsAdmin } from '../hooks/useIsAdmin';
import { setAuthorizationToken } from '../helpers/utils';
import Header from '../components/header';
import { Loader } from '../components/spinner';
import NotFound from '../components/NotFound';

export const ViewProducts = () => {
  setAuthorizationToken();
  useIsAdmin();
  const { products, isLoading } = useProducts();
  return (
    <div className='container mt-4'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header heading='Products' item={products} />
          <div className='col-md-12'>
            <div className='row'>
              <div className='p-0 col-md-12 my-2'>
                {products.length > 0 ? (
                  <ProductList products={products} />
                ) : (
                  <NotFound message='Not Products Added.' />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
