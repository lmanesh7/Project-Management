import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_DB } from '../helpers/variables';
import '../login.css';
import axios from 'axios';

function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMsg('');
    try {
      const response = await axios.post(`${SERVER_DB}/login`, {
        userId,
        password,
      });

      if (response.status === 200) {
        localStorage.removeItem('loggedInUser');
        sessionStorage.removeItem('loggedInUser');

        localStorage.setItem('loggedInUser', response.data.data._id);
        const username = `${response.data.data.firstName} ${response.data.data.lastName}`;
        sessionStorage.setItem('loggedInUser', username);

        navigate('/home-page');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg('Login failed. Please check your credentials and try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      {errorMsg && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{errorMsg}</div>}

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

