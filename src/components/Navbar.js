import React, { useState } from 'react';
import Logo from '../assets/images/logo-white.png';
import { NavItem, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import Toggle from 'react-toggle';

const Appbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const isLoggedIn = localStorage.getItem('loggedIn');

  return (
    <div className='h-100vh'>
      {isLoggedIn ? (
        <ProSidebar collapsed={isOpen}>
          <Menu>
            <div className='ml-3'>
              <Toggle
                id='navbar'
                defaultChecked={!isOpen}
                onChange={() => {
                  setIsOpen(!isOpen);
                }}
              />
            </div>

            <MenuItem>
              <NavLink
                exact={true}
                activeClassName='text-dark font-weight-bold '
                tag={RRNavLink}
                to='/coupons'
              >
                <img src={Logo} alt='Nadaasi Logo' width='90px' />{' '}
                <span className='text-white ml-1'>Admin</span>
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink
                exact={true}
                activeClassName='text-light font-weight-bold '
                tag={RRNavLink}
                to='/coupons'
              >
                Coupons
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink
                exact={true}
                activeClassName='text-light font-weight-bold '
                tag={RRNavLink}
                to='/add-coupon'
              >
                Add Coupons
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink
                exact={true}
                activeClassName='text-light font-weight-bold '
                tag={RRNavLink}
                to='/upload-product'
              >
                Add Product
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink
                exact={true}
                activeClassName='text-light font-weight-bold '
                tag={RRNavLink}
                to='/products'
              >
                Products
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink
                exact={true}
                activeClassName='text-light font-weight-bold '
                tag={RRNavLink}
                to='/feedback'
              >
                Feedback
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavItem>
                <NavLink
                  onClick={() => {
                    localStorage.clear();
                    history.push('/');
                  }}
                  exact={true}
                >
                  Log out
                </NavLink>
              </NavItem>
            </MenuItem>
          </Menu>
        </ProSidebar>
      ) : (
        ''
      )}
    </div>
  );
};

export default Appbar;
