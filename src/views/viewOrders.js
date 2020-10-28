import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { setAuthorizationToken } from '../helpers/utils';
import { Loader } from '../components/spinner';
import NotFound from '../components/NotFound';
import Select from 'react-select';
import { OPTIONS } from '../config/selectConfig';

export const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false)
 

  setAuthorizationToken();
  useEffect(() => {
    setLoading(true)
    axios
      .get('/order')
      .then((res) => {
        setOrders(res.data);
        console.log(res.data, orders)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false)
      });
  }, []);

  const handleChange = async (_id, option) => {
    console.log(_id, option)
   await axios
      .patch(`/order/${_id}`, option)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response.data));
      
  };


  return (
      
    <div class='list-group '>
      {console.log(orders)}
      { loading ? <Loader />:
      orders.length > 0 ?
      orders.map((order) => (
        <div class='shadow-sm mb-2 rounded-lg list-group-item list-group-item-action'>
         <div class='row'>
          <div class='col-md-12 m-0'>
            <div class='row justify-content-between p-1'>
              <div class='d-flex flex-column'>
              <div class='font-weight-bold text-capitalize border-bottom py-1 mb-2'>
                Order by: 
              </div>
              <div>
                {order.email}
              </div>
              <div class='font-weight-bold text-capitalize  py-2 mb-2'>
                Order Details: 
              </div>
              {order.orderItem.map(item => 
                <div className ="d-flex flex-column justify-content-between p-2 border-bottom">
                <div className="">
                  <span className="font-weight-bold text-capitalize p-2">Item Name :</span>
                   {item.name}
                </div>
                <div className="">
                  <span className="font-weight-bold text-capitalize p-2">Item Brand :</span>
                   {item.brand}
                </div>
                <div className="">
                  <span className="font-weight-bold text-capitalize p-2">Item Quantity :</span>
                   {item.quantity}
                </div>
                <div className="">
                  <span className="font-weight-bold text-capitalize p-2">Stock Quantity :</span>
                   {item.stockQuantity}
                </div>
                
                </div>
                )}
              </div>
             <div>
              <div class='font-weight-bold d-flex justify-content-end border-bottom align-items-end'>
                <h5 class=' text-success font-weight-bold'>￡ {order.total}</h5>
              </div>
            </div>
            </div>
            <div className="col-md-8 align-item-center p-3">
            <Select
              defaultValue={[]}
              placeholder='Select Status'
              name='category'
              options={OPTIONS.deliveryOptions}
              onChange={({ value }) => {
                handleChange(order._id,{orderStatus: value})
              }}
            />
            </div>
        </div>
      </div>
    </div>
      ))
      : <NotFound message ="no Order" />
      }
    </div>
  );
};
