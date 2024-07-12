import React, { useState } from 'react';
import { SERVER_DB } from '../helpers/variables';
import '../login.css'; // This is for Importing your .CSS file
import axios from 'axios'; // For making http requests

function Login() {
  //state variables to hold user inputs
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  // This code handles login functionality
  const handleLogin = async () => {
    try {
      //code for sending a post request to the server
      const response = await axios.post(`${SERVER_DB}/login`, {
        userId,
        password,
      });
      
      //checks the status and displays an alert message
      if (response.status === 200) {
        alert('Logged in successfully');
        console.log(response.data.data._id);
        localStorage.clear();
        localStorage.setItem('loggedInUser', response.data.data._id);
        const username = response.data.data.firstName + " "+ response.data.data.lastName
        sessionStorage.setItem('loggedInUser', username);
        debugger;
        window.location.href = "./home-page";
      } else {
        alert('Login failed');
      }
    } catch (error) {
      //code for handling error and displaying error message
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2> {/* Displays the heading Login */}
      <label>User ID</label>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <br />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button className="login-button" onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;

