import React, { useContext, useState } from 'react';
import './adminLogin.css';
import { useNavigate } from 'react-router-dom';
var validator = require('email-validator');

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const { storeAdminInfo } = useContext(AdminContext); 

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // console.log(process.env.REACT_APP_API)
    // console.log("hi")

    if(!email)   alert("please enter email");
    if(!password)   alert("please enter password");

    if(!validator.validate(email))  alert("please enter correct email format");

    // Create a login request object
    const loginRequest = {
        email,
        password,
      };
  
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginRequest),
        });
  
        if (response.ok) {
          const userInfo = await response.json();
        //   console.log(adminInfo)

          console.log('Login successful');

          localStorage.setItem('userInfo', JSON.stringify(userInfo));
          
          //   console.log(localStorage.getItem('adminInfo'))
          
          // storeAdminInfo(adminInfo);

          navigate("/");
          window.location.reload();

          
        } else {
          alert("Invalid credentials");
          console.log('Login failed');
        }
      } catch (error) {
        console.error('Error occurred during login:', error);
        alert(error)
      }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-form">
        <h2 className="admin-login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="admin-login-field">
            <label htmlFor="email">email:</label>
            <input
              type="text"
              id="email"
              className="admin-login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="admin-login-field">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="admin-login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="admin-login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
