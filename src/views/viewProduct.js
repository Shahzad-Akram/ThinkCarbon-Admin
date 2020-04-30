import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductList } from '../components/product/productList';
import { useIsAdmin } from '../hooks/useIsAdmin';

export const ViewProducts = () => {
  useIsAdmin();
  const { products, isLoading, stats } = useProducts();
  return (
    <div className='container mt-4'>
      {isLoading ? (
        'fetching products'
      ) : (
        <>
          <div className='d-flex justify-content-between border-top border-bottom py-1 align-items-center'>
            <h3 className='text-info font-weight-bold mb-0'>View Products</h3>
            <span class='badge badge-info badge-pill shadow-sm p-2 '>
              Totals Products {stats.count}
            </span>
          </div>

          <div className='col-md-12'>
            <div className='row'>
              <div className='p-0 col-md-12 my-2'>
                <ProductList products={products} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
