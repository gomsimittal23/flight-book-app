import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css'
// import { AdminContext } from './AdminContext';

const Navbar = () => {
  // const { adminInfo, clearAdminInfo } = useContext(AdminContext);
  // console.log(adminInfo);
  const [login, setLogin] = useState(false);


  const handleLogout = () => {
    console.log("logout");
    setLogin(false)
    localStorage.removeItem('adminInfo')
    localStorage.removeItem('userInfo')
    window.location.reload();
    // clearAdminInfo();
  }

  useEffect(() => {
    if(localStorage.getItem('adminInfo'))
    {
      const { email, name } = JSON.parse(localStorage.getItem('adminInfo'))
      console.log(email);

      if(email) setLogin(true);
    }

    if(localStorage.getItem('userInfo'))
    {
      const { email, name } = JSON.parse(localStorage.getItem('userInfo'))
      console.log(email);

      if(email) setLogin(true);
    }

    console.log(login)
  }, [login])
  
  


  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          Flight Booking App
        </Link>
      </div>
      <ul className="navbar-links">
        {
          !login &&
          <li className="navbar-item">
            <Link to="/user-login" className="navbar-link">User Login</Link>
          </li>
        }
        {
          !login &&
          <li className="navbar-item">
            <Link to="/user-signup" className="navbar-link">User Signup</Link>
          </li>
        }
        {
          !login &&
          <li className="navbar-item">
            <Link to="/admin-login" className="navbar-link">Admin Login</Link>
          </li>
        }
        {
          login &&
          <li className="navbar-item">
            <button onClick={handleLogout}>Logout</button>
          </li>
        }

      </ul>
    </nav>
  );
};

export default Navbar;
