import React from 'react';
import Appbar from './components/Navbar.js';
import { ToastContainer } from 'react-toastify';
import { Router } from './Router/index.js';

function App() {
  return (
    <>
      <ToastContainer />
      <div className='container-fluid p-0 overflow-hidden'>
        <div className='d-flex'>
          <div>
            <Appbar />
          </div>
          <div className='main'>
            <Router />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
