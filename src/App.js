import React from 'react';
import Appbar from './components/Navbar.js';
import { Switch, Route } from 'react-router-dom';
import { Login } from './views/login.js';
import { Users } from './views/users.js';
import { Feedback } from './views/feedback';
import { UploadPosts } from './views/uploadPosts.js';
import { UploadProduct } from './views/uploadProduct';
import { ViewProducts } from './views/viewProduct.js';
import { AddCoupon } from './views/addCoupon.js';
import { ViewCoupon } from './views/viewCoupons.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toggle/style.css';
function App() {
  return (
    <>
      <ToastContainer />
      <Appbar />
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/users' component={Users} />
        <Route exact path='/feedback' component={Feedback} />
        <Route exact path='/upload-posts' component={UploadPosts} />
        <Route exact path='/upload-product' component={UploadProduct} />
        <Route exact path='/products' component={ViewProducts} />
        <Route exact path='/add-coupon' component={AddCoupon} />
        <Route exact path='/coupons' component={ViewCoupon} />
      </Switch>
    </>
  );
}

export default App;
