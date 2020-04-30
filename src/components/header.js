import React from 'react';

export default function Header({ heading, item }) {
  return (
    <div
      className='w-100 d-flex 
              justify-content-between 
              align-items-center border-top 
              border-bottom py-1 mb-2'
    >
      <h3 className='mb-0 font-weight-bold text-info'>{heading}</h3>
      <span className='badge badge-info badge-pill shadow-sm p-2'>
        Totals {heading}: {item.length}
      </span>
    </div>
  );
}
