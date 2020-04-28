import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Container } from 'reactstrap';
import { useIsAdmin } from '../hooks/useIsAdmin';
import { Loader } from '../components/spinner';
import { setAuthorizationToken } from '../helpers/utils';

const defaultImg =
  'https://www.flaticon.com/premium-icon/icons/svg/1993/1993420.svg';
export const Users = () => {
  const [users, setUsers] = useState([]);
  const [guest, setGuest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useIsAdmin();

  useEffect(() => {
    setAuthorizationToken();
    axios
      .get('/admin/users')
      .then((res) => {
        setUsers(res.data.userAccounts);
        setGuest(res.data.guestAccounts);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setIsLoading(false);
      });
  }, []);

  const deleteHandler = (id, type) => {
    axios
      .delete(`/admin/user/delete/${id}`)
      .then((res) => {
        if (type === 'guest') {
          setGuest(guest.filter((guest) => guest._id !== id));
        } else {
          setUsers(users.filter((user) => user._id !== id));
        }
      })
      .catch((err) => console.log(err));
  };

  const genderClass = (gender) => {
    if (gender === 'male') {
      return 'text-info';
    } else if (gender === 'female') {
      return 'text-danger';
    } else {
      return 'text-success';
    }
  };

  return (
    <Container className='mt-4' fluid>
      <div className='col-md-12 '>
        {isLoading ? (
          <>
            <Loader />
          </>
        ) : (
          <div className='row'>
            <div className='col-md-6 mb-3 h-80vh'>
              <div className='d-flex justify-content-end'>
                <span className='badge badge-primary badge-pill shadow-sm p-2 mb-2'>
                  Total Users:{' '}
                  <span className='font-weight-bold '>{users.length}</span>
                </span>
              </div>
              {users.map((user) => {
                const { _id, name, imageUrl, email, gender } = user;
                return (
                  <div
                    key={_id}
                    className='row justify-content-around p-3 align-items-center shadow-sm'
                  >
                    <div className='col-md-2'>
                      <img
                        className='img-circle user-image shadow-sm'
                        src={imageUrl}
                        alt={name}
                      />
                    </div>
                    <span className='text-capitalize'>{name}</span>
                    <div className='font-weight-bold'>
                      <span>{email}</span>
                    </div>

                    <div
                      className={`${genderClass(
                        gender
                      )} text-capitalize font-weight-bold`}
                    >
                      {gender}
                    </div>

                    <button
                      onClick={() => deleteHandler(_id, 'user')}
                      className='btn btn-sm btn-outline-danger'
                    >
                      <i className='fa fa-trash'></i>
                    </button>
                  </div>
                );
              })}
            </div>
            <div className='col-md-6 h-80vh'>
              <div className='d-flex justify-content-between'>
                <span></span>
                <span className='badge badge-primary badge-pill shadow-sm p-2 mb-2'>
                  Total Guests Users:{' '}
                  <span className='font-weight-bold'>{guest.length}</span>
                </span>
              </div>
              {guest.map((user) => {
                const { _id, name } = user;
                return (
                  <div
                    className='d-flex justify-content-around p-3 align-items-center shadow-sm mb-2'
                    key={_id}
                  >
                    <div>
                      <img
                        className='img-circle user-image'
                        src={defaultImg}
                        alt={name}
                      />
                    </div>
                    <span className='font-weight-bold'>{name}</span>
                    <span>
                      <button
                        onClick={() => deleteHandler(_id, 'guest')}
                        className='btn btn-sm btn-outline-danger'
                      >
                        <i className='fa fa-trash'></i>
                      </button>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};
