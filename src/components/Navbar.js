import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import {CustomerServiceOutlined,UserOutlined} from '@ant-design/icons';

function Navbar({onClick,props}) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo'>
            ShopAlbums
            <CustomerServiceOutlined className="music-logo"/>
          </Link>
          
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/my-cart'
                className={`${props.loggedIn || props.token? 'nav-links':'nav-links-mobile'}`}
              >
                My Cart
              </Link>
            </li>
            
            <li className='profile'>
              <div
                className={`${props.loggedIn || props.token? 'welcome':'nav-links-mobile'}`}
              >
                <UserOutlined style={{
                    'color':'white',
                    'fontSize':'20px',
                    'marginRight':'10px'
                    }}/>Hello, {props.token? props.token: props.username}!
              </div>
            </li>
            <li className='nav-item'>
              <Link
                to='/sign-in'
                className={`${props.loggedIn || props.token? 'nav-links-mobile':'nav-links'}`}
              >
                Sign In
              </Link>
            </li>

            <li className='nav-item'>
              <div
                className={`${props.loggedIn || props.token? 'log-out':'nav-links-mobile'}`}
                onClick={onClick}
              >
                Log Out
              </div>
            </li>
            
            <li className='nav-item'>
              <Link
                to='/sign-up'
                className={`${props.loggedIn || props.token? 'nav-links-mobile':'nav-links-sign-up'}`}
              >
                No Account? Click here to Sign Up!
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;