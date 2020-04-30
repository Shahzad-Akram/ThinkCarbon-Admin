import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Container } from 'reactstrap';
import { useIsAdmin } from '../hooks/useIsAdmin';
import { Loader } from '../components/spinner';
import { setAuthorizationToken } from '../helpers/utils';

export const stringTruncate = (str, length) => {
  const dots = str.length > length ? '...' : '';
  return `${str.substring(0, length)}${dots}`;
};

export const Posts = () => {
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useIsAdmin();
  useEffect(() => {
    setAuthorizationToken();
    axios
      .get('/feedback')
      .then((res) => {
        setFeedback(res.data);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setIsLoading(false);
      });
  }, []);

  return (
    <Container className='mt-4' fluid>
      <div className='col-md-12'>
        {isLoading ? (
          <Loader />
        ) : (
          <div className='row'>
            <div className='col-md-10 container '>
              <div
                className='w-100 d-flex 
              justify-content-between 
              align-items-center border-top 
              border-bottom py-1 mb-2'
              >
                <h3 className='mb-0 font-weight-bold text-info'>Feedback</h3>
                <span className='badge badge-info badge-pill shadow-sm p-2'>
                  Totals User Feedback: {feedback.length}
                </span>
              </div>
              <>
                {feedback.length > 0 ? (
                  <>
                    {feedback.map((item) => {
                      const { _id, name, subject, email, message } = item;
                      return (
                        <div
                          className='d-flex list-group-item py-3 
                          justify-content-between  
                          shadow-sm  mb-2'
                          key={_id}
                        >
                          <div className='col-md-2'>
                            <small className='d-flex flex-column'>
                              <span className='text-muted border-bottom py-1'>
                                Name
                              </span>
                              <span className=' py-1'>{name}</span>
                            </small>
                          </div>
                          <div className='col-md-2'>
                            <small className='d-flex flex-column '>
                              <span className='text-muted border-bottom py-1 '>
                                Subject
                              </span>
                              <span className=' py-1'>{subject}</span>
                            </small>
                          </div>
                          <div className='col-md-3'>
                            <small className='d-flex flex-column '>
                              <span className='text-muted border-bottom py-1'>
                                Email
                              </span>
                              <span className=' py-1'>{email}</span>
                            </small>
                          </div>
                          <div className='col-md-5'>
                            <small className='d-flex flex-column '>
                              <span className='text-muted py-1 border-bottom'>
                                Message
                              </span>
                              <span className='py-1'>{message}</span>
                            </small>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div
                    className='d-flex font-weight-bold
                   justify-content-between align-items-center shadow-sm p-3 mb-2'
                  >
                    No Feedback Added Given By User.
                  </div>
                )}
              </>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};
