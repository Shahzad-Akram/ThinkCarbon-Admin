import React from 'react';

export default function FeedbackItem({ feedback }) {
  const { _id, name, subject, email, message } = feedback;
  return (
    <div
      className='d-flex list-group-item py-3 
  justify-content-between  
  shadow-sm  mb-2'
      key={_id}
    >
      <div className='col-md-2'>
        <small className='d-flex flex-column'>
          <span className='text-muted border-bottom py-1'>Name</span>
          <span className=' text-capitalize py-1'>{name}</span>
        </small>
      </div>
      <div className='col-md-2'>
        <small className='d-flex flex-column '>
          <span className='text-muted border-bottom py-1 '>Subject</span>
          <span className='text-capitalize py-1'>{subject}</span>
        </small>
      </div>
      <div className='col-md-3'>
        <small className='d-flex flex-column '>
          <span className='text-muted border-bottom py-1'>Email</span>
          <span className=' py-1'>{email}</span>
        </small>
      </div>
      <div className='col-md-5'>
        <small className='d-flex flex-column '>
          <span className='text-muted py-1 border-bottom'>Message</span>
          <span className='py-1'>{message}</span>
        </small>
      </div>
    </div>
  );
}
