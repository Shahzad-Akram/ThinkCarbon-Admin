import React, { Fragment, useState } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { Loader } from '../components/spinner';
import { Alert } from 'reactstrap';
import { setAuthorizationToken } from '../helpers/utils';

export const UploadPosts = () => {
  const user = jwt.decode(localStorage.getItem('loggedIn'));
  const [inputFields, setInputFields] = useState([
    { title: '', description: '', file: '', placeholder: '', filter: '' },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === 'title') {
      values[index].title = event.target.value;
    } else if (event.target.name === 'file') {
      values[index].placeholder = URL.createObjectURL(event.target.files[0]);
      values[index].file = event.target.files[0];
    } else if (event.target.name === 'filter') {
      values[index].filter = event.target.value;
    } else {
      values[index].description = event.target.value;
    }

    setInputFields(values);
  };
  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ title: '', description: '' });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleSubmit = (e) => {
    setAuthorizationToken();
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    if (inputFields.length === 1) {
      formData.append('title', inputFields[0].title);
      formData.append('description', inputFields[0].description);
      formData.append('filter', inputFields[0].filter);
      formData.append('mediaUrl', inputFields[0].file);
      formData.append('postBy', user._id);
      formData.append('tags', 'cool,lush');
      axios
        .post('/admin/post/add', formData)
        .then((res) => {
          setIsLoading(false);
          console.log(res.data);
          setSuccess(res.data);
        })
        .catch((err) => {
          console.log(err.response);
          setIsLoading(false);
        });
    } else {
      // eslint-disable-next-line
      inputFields.map((inputField) => {
        formData.append('title', inputField.title);
        formData.append('description', inputField.description);
        formData.append('filter', inputField.filter);
        formData.append('files', inputField.file);
        formData.append('postBy', user._id);
      });
      axios
        .post('/admin/post/add/multiple', formData)
        .then((res) => {
          setIsLoading(false);
          setSuccess(res.data);
        })
        .catch((err) => {
          console.log(err.response);
          setIsLoading(false);
        });
    }
  };
  return (
    <>
      <form className='container mt-4' onSubmit={handleSubmit}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className='form-row align-items-center'>
              <div className='row'>
                {success ? <Alert>{success.Message}</Alert> : ''}
              </div>
              <div className='row justify-content-between w-100 m-0 py-2 mb-2'>
                <div className='submit-button'>
                  <button
                    className='btn btn-primary btn-sm mr-2'
                    type='submit'
                    onSubmit={handleSubmit}
                  >
                    Upload Posts
                  </button>
                </div>
                <div>
                  <button
                    className='btn btn-sm btn-outline-dark mr-2'
                    type='button'
                    onClick={() => handleAddFields()}
                  >
                    Add New Posts
                  </button>
                  <span className='badge badge-primary badge-pill shadow-sm p-2 mb-2'>
                    Total Fields:{' '}
                    <span className='font-weight-bold '>
                      {inputFields.length}
                    </span>
                  </span>
                </div>
              </div>

              {inputFields.map((inputField, index) => (
                <Fragment key={`${inputField}~${index}`}>
                  <div className='row  py-2 mb-2 shadow-sm border-left border-dark'>
                    <div className='form-group col-sm-2'>
                      <label htmlFor='title'>Model Name</label>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Model Name'
                        name='title'
                        value={inputField.title}
                        onChange={(event) => handleInputChange(index, event)}
                        required
                      />
                    </div>
                    <div className='form-group col-sm-3'>
                      <label htmlFor='description'>Description</label>
                      <input
                        type='text'
                        className='form-control'
                        name='description'
                        placeholder='Description'
                        value={inputField.description}
                        onChange={(event) => handleInputChange(index, event)}
                        required
                      />
                    </div>
                    {inputField.placeholder ? (
                      <div className='form-group col-sm-2'>
                        <label htmlFor='filter'>Filter</label>
                        <select
                          className='select-custom form-control'
                          name='filter'
                          defaultValue=''
                          onChange={(event) => handleInputChange(index, event)}
                        >
                          <option value='' disabled>
                            Please Select A Filter
                          </option>
                          <option value='_1997'>1997</option>
                          <option value='brooklyn'>Brooklyn</option>
                          <option value='earlybird'>Earlybird</option>
                          <option value='gingham'>Gingham</option>
                          <option value='hudson'>Hudson</option>
                          <option value='lofi'>Lofi</option>
                          <option value='mayfair'>Mayfair</option>
                          <option value='perpetua'>Perpetua</option>
                          <option value='reyes'>Reyes</option>
                          <option value='toaster'>Toaster</option>
                          <option value='walden'>Walden</option>
                          <option value='xpro2'>Xpro2</option>
                          <option value='aden'>Aden</option>
                          <option value='inkwell'>Inkwell</option>
                        </select>
                      </div>
                    ) : (
                      ''
                    )}

                    <div className='form-group mt-4 col-sm-3'>
                      <label
                        className='custom-file-label mt-2 overflow-hidden mr-3'
                        htmlFor='file'
                      >
                        {inputField.file?.name || 'File'}
                      </label>
                      <input
                        type='file'
                        className='custom-file-input'
                        id='file'
                        name='file'
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    </div>
                    {inputField.placeholder ? (
                      <div className='d-flex justify-content-center align-items-center'>
                        {
                          <div
                            style={{
                              height: '60px',
                              width: '60px',
                            }}
                          >
                            <img
                              className={`img-thumbnail h-100 w-100  ${inputField.filter}`}
                              src={inputField.placeholder}
                              alt=''
                            />
                          </div>
                        }
                      </div>
                    ) : (
                      ''
                    )}
                    <div className='ml-3 d-flex justify-content-center align-items-center mt-3'>
                      <button
                        className='btn btn-outline-danger btn-sm'
                        type='button'
                        onClick={() => handleRemoveFields(index)}
                      >
                        <i className='fa fa-trash'></i>
                      </button>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </>
        )}
      </form>
    </>
  );
};
