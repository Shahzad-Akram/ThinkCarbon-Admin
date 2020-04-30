import React from 'react';

export default function NotFound({ message }) {
  return (
    <div
      className='list-group-item font-weight-bold text-capitalize w-100 mt-3
      shadow-sm p-3 mb-2'
    >
      {message}
    </div>
  );
}
