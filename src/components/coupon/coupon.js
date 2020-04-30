import Toggle from 'react-toggle';
import React from 'react';
import axios from 'axios';

export const Coupon = ({ coupon }) => {
  const { _id, name, code, value, isActive } = coupon;

  const handleChange = (_id, status) => {
    const payload = {
      isActive: status,
    };
    axios
      .patch(`/coupon/${_id}`, payload)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response.data));
  };

  return (
    <div className='col-md-12 mb-3 mt-2 list-group-item d-flex text-muted justify-content-between shadow-sm py-2'>
      <div className=''>
        <h5 className='py-1 text-capitalize'>{name}</h5>
        <h6 className='mb-0'>
          <span className='tag text-info font-weight-bold'>{code}</span>
        </h6>
      </div>
      <div>
        <h5 className='py-1 text-muted '>
          Discount :{' '}
          <span className='small text-success font-weight-bold'>${value}</span>
        </h5>
        <div className='d-flex justify-content-between align-items-center mb-0'>
          Active
          <small>
            <Toggle
              id={_id}
              defaultChecked={isActive}
              onChange={() => {
                handleChange(_id, !isActive);
              }}
            />
          </small>
        </div>
      </div>
    </div>
  );
};
