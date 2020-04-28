import React from 'react';

import { useCoupons } from '../hooks/useCoupons';
import { Coupon } from '../components/coupon';

export const ViewCoupon = () => {
  const { coupons, isLoading } = useCoupons();

  return (
    <div className='container'>
      <div className='col-md-12 mx-auto  py-4'>
        <div className='row'>
          <h3 className='border-top border-bottom font-weight-bold py-2 w-100 text-info mb-2'>
            Coupons
          </h3>
          {coupons.map((coupon) => (
            <Coupon key={coupon._id} coupon={coupon} />
          ))}
        </div>
      </div>
    </div>
  );
};
