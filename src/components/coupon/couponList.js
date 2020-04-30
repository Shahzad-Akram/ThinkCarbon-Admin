import React from 'react';
import { Coupon } from './coupon';

const CouponList = ({ coupons }) =>
  coupons.map((coupon) => <Coupon key={coupon._id} coupon={coupon} />);

export default CouponList;
