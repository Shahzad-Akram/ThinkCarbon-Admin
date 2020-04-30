import React, { useState } from 'react';
import Logo from '../assets/images/logo.png';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
const Appbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const toggle = () => setIsOpen(!isOpen);

  const isLoggedIn = localStorage.getItem('loggedIn');

  return (
    <div>
      {isLoggedIn ? (
        <Navbar color='light' className='shadow-sm p-3' light expand='md'>
          <Container>
            <NavbarBrand href='/'>
              <img src={Logo} alt='Nadaasi Logo' width='90px' />
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className='ml-auto' navbar>
                <NavItem>
                  <NavLink
                    exact={true}
                    activeClassName='text-dark font-weight-bold '
                    tag={RRNavLink}
                    to='/coupons'
                  >
                    Coupons
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    exact={true}
                    activeClassName='text-dark font-weight-bold '
                    tag={RRNavLink}
                    to='/add-coupon'
                  >
                    Add Coupon
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    exact={true}
                    activeClassName='text-dark font-weight-bold '
                    tag={RRNavLink}
                    to='/upload-product'
                  >
                    Add Product
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    exact={true}
                    activeClassName='text-dark font-weight-bold '
                    tag={RRNavLink}
                    to='/products'
                  >
                    Products
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    exact={true}
                    activeClassName='text-dark font-weight-bold '
                    tag={RRNavLink}
                    to='/feedback'
                  >
                    Feedback
                  </NavLink>
                </NavItem>
                {isLoggedIn ? (
                  <>
                    <NavItem>
                      <button
                        onClick={() => {
                          localStorage.clear();
                          history.push('/');
                        }}
                        className='btn btn-outline-info'
                        exact={true}
                      >
                        Log out
                      </button>
                    </NavItem>
                  </>
                ) : (
                  ''
                )}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      ) : (
        ''
      )}
    </div>
  );
};

export default Appbar;
