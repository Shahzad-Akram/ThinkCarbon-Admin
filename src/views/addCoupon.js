import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useIsAdmin } from '../hooks/useIsAdmin';
import { setAuthorizationToken } from '../helpers/utils';

export const AddCoupon = () => {
  useIsAdmin();

  const { register, handleSubmit, errors, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    setAuthorizationToken();
    axios
      .post('/coupon', data)
      .then((res) => {
        setIsLoading(false);
        toast.success(res.data.Message, {
          autoClose: '1500',
        });
        reset();
      })
      .catch((err) => {
        setIsLoading(false);
        toast(err.response.data.Message, {
          autoClose: '1500',
        });
      });
  };
  return (
    <div className='container mt-4'>
      <h3 className='text-info font-weight-bold py-2 border-top border-bottom '>
        Add Coupon
      </h3>
      <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <input
            type='text'
            name='name'
            className='form-control'
            placeholder='Enter Coupon Name..'
            ref={register({ required: true })}
          />

          {errors.name && (
            <div className='font-weight-bold text-danger mt-1 mb-0'>
              Name is Required.
            </div>
          )}
        </div>
        <div className='form-group'>
          <input
            type='text'
            name='code'
            className='form-control'
            placeholder='Enter Coupon Code..'
            ref={register({ required: true })}
          />
          <small className='text-muted'>
            Please Enter A Unique Coupon Code.
          </small>
          {errors.code && (
            <div className='font-weight-bold text-danger mt-1 mb-0'>
              Code is Required.
            </div>
          )}
        </div>
        <div className='form-group'>
          <input
            type='text'
            name='value'
            className='form-control'
            placeholder='Enter Discount Value..'
            ref={register({ required: true })}
          />
          {errors.value && (
            <div className='font-weight-bold text-danger mt-1 mb-0'>
              Discount Value is Required.
            </div>
          )}
        </div>
        <div className='form-group'>
          <select
            name='isActive'
            defaultValue=''
            className='form-control'
            ref={register({ required: true })}
          >
            <option value='' disabled>
              Please Selected Coupon Status
            </option>
            <option value='true'>Active</option>
            <option value='false'>InActive</option>
          </select>
          {errors.isActive && (
            <div className='font-weight-bold text-danger mt-1 mb-0'>
              Coupon Status is Required.
            </div>
          )}
        </div>
        <button
          type='submit'
          className='btn btn-block btn-dark mb-2'
          disabled={isLoading}
        >
          <span
            className={isLoading ? 'mr-2 spinner-border spinner-border-sm' : ''}
            role='status'
            aria-hidden='true'
          ></span>
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};
