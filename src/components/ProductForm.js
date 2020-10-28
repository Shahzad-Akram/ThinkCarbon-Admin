import React, { useCallback, useState } from 'react';

import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import Toggle from 'react-toggle';
import axios from 'axios';
import { OPTIONS } from '../config/selectConfig';
import { toast } from 'react-toastify';

export const ProductForm = () => {
  const { handleSubmit, register } = useForm();

  const [images, setImages] = useState([]);
  const [category, setCategory] = useState();
  const [dressSize, setDressSize] = useState([]);
  const [dressColor, setDressColor] = useState([]);
  const [inStock, setInStock] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [placeholder, setPlaceHolder] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const placeholderArray = [];
    setImages(acceptedFiles);
    acceptedFiles.map((file) =>
      placeholderArray.push(URL.createObjectURL(file))
    );

    setPlaceHolder(placeholderArray);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onSubmit = (data) => {
    setIsLoading(true);
    const {
      price,
      name,
      details,
      subCategory,
      brand,
      color,
      rating,
      stockQuantity,


    } = data;
    const formdata = new FormData();

    
    images.map((file) => formdata.append('images', file));
    formdata.append('price', price);
    formdata.append('name', name);
    formdata.append('rating', rating);
    formdata.append('size', dressSize);
    formdata.append('color', color);
    formdata.append('category', category);
    formdata.append('inStock', inStock);
    formdata.append('details', details);
    formdata.append('subCategory', subCategory);
    formdata.append('brand', brand);
    formdata.append('stockQuantity', stockQuantity);
    // formdata.append('details', JSON.stringify(productDetails));

    axios
      .post('/product', formdata)
      .then((res) => {
        setIsLoading(false);
        toast.success('Product Added Successfully', {
          autoClose: '1500',
        });
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false);
        toast.error('Unable To Add Product', {
          autoClose: '1500',
          
        });
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='row'>
        <div className='col-md-12 d-flex justify-content-between'>
          <h3 className='mb-0 font-weight-bold text-info'>Upload Product</h3>
          <div className='d-flex justify-content-end align-items-center'>
            <span className='mr-2'>In Stock</span>
            <Toggle
              id='123'
              defaultChecked={inStock}
              onChange={(e) => {
                setInStock(e.target.checked);
              }}
            />
          </div>
        </div>

        <div className='col-md-12'>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <div className='bg-white my-3 d-flex justify-content-center border shadow-sm py-5 mb-2'>
                <span className='text-info font-weight-bold'>
                  Drag n Drop Image Here Or Click to Select..
                </span>
              </div>
            )}
          </div>
        </div>
        <div className='col-md-12'>
          <div className='d-flex mb-3 wrap'>
            {placeholder.map((img) => (
              <img
                className='img-thumbnail h-300px mr-3 mb-2'
                src={img}
                alt={img}
              />
            ))}
          </div>
        </div>

        <div className='col-md-4'>
          <div className='form-group'>
            <input
              type='text'
              name='name'
              ref={register}
              className='form-control'
              placeholder='Name'
            />
          </div>
        </div>
        <div className='col-md-4'>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              name='price'
              ref={register}
              placeholder='Price'
            />
          </div>
        </div>
        <div className='col-md-4'>
          <div className='form-group'>
            <Select
              defaultValue={[]}
              placeholder='Select Category'
              name='category'
              options={OPTIONS.categoryOptions}
              onChange={({ value }) => {
                setCategory(value);
              }}
            />
          </div>
        </div>
        <div className='col-md-6'>
        <div className='form-group'>
            <input
              type='text'
              className='form-control'
              name='subCategory'
              ref={register}
              placeholder='Enter Sub-Category'
            />
          </div>
        </div>
        <div className='col-md-6'>
        <div className='form-group'>
            <input
              type='text'
              className='form-control'
              name='brand'
              ref={register}
              placeholder='Enter Brand'
            />
          </div>
        </div>
        <div className='col-md-12'>
          <div className='d-flex justify-content-between'>
            <h4 className='font-weight-bold text-info'>Product Details</h4>
            <span className='tag '>Optional</span>
          </div>
          <div className='row'>
            <div className='col-md-3'>
              <div className='form-group'>
                <input
                  name='color'
                  ref={register}
                  type='text'
                  className='form-control'
                  placeholder='Enter Color'
                />
              </div>
            </div>
            <div className='col-md-3'>
              <div className='form-group'>
              <Select
              defaultValue={[]}
              placeholder='Select Size'
              name='size'
              options={OPTIONS.dressSizeOptions}
              onChange={({ value }) => {
                setDressSize(value);
              }}
            />
              </div>
            </div>
            <div className='col-md-3'>
              <div className='form-group'>
                <input
                  name='rating'
                  ref={register}
                  type='text'
                  className='form-control'
                  placeholder='Enter Eco Friendly Rating'
                />
              </div>
              
            </div>
            <div className='col-md-3'>
              <div className='form-group'>
                <input
                  name='stockQuantity'
                  ref={register}
                  type='text'
                  className='form-control'
                  placeholder='Enter Stock Quantity'
                />
              </div>
              
            </div>

            <div className='col-md-12'>
              <div className='form-group'>
                <input
                  name='details'
                  ref={register}
                  type='text'
                  className='form-control'
                  placeholder='Enter Details'
                />
              </div>
            </div>
            {/* <div className='col-md-6'>
              <div className='form-group'>
                <input
                  name='waistLine'
                  ref={register}
                  type='text'
                  className='form-control'
                  placeholder='Enter Waistline'
                />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='form-group'>
                <input
                  name='details'
                  ref={register}
                  type='text'
                  className='form-control'
                  placeholder='Enter Details'
                />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='form-group'>
                <input
                  name='modelHAndS'
                  ref={register}
                  type='text'
                  className='form-control'
                  placeholder='Enter Model Height And Size'
                />
              </div>
            </div> */}
          </div>
        </div>

        <div className='col-md-12 '>
          <button
            type='submit'
            className='btn btn-block btn-dark mb-2'
            disabled={isLoading}
          >
            <span
              className={
                isLoading ? 'mr-2 spinner-border spinner-border-sm' : ''
              }
              role='status'
              aria-hidden='true'
            ></span>
            {isLoading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
    </form>
  );
};
