import React, { useState } from 'react';
import '../signup.css'; // For Importing  your CSS file
import axios from 'axios'; // For making http requests

function Signup() {
  //state variables to hold user inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  // Code for signup functionality
  const handleSignup = async () => {
    try {
      //code for sending a post request to the server
      const response = await axios.post('http://localhost:3001/signup',     
       {
        firstName,
        lastName,
        userId,
        password,
      });

      //code for checking the status and displaying the alert message
      if (response.status === 201) {
        alert('Signup successfull');
      } else {
        alert('Signup failed');
      }
    } catch (error) {
      //code for handling error and displaying error message
      console.error('Error:', error);
      alert('User already exists');
    }
  };
  // code for Rendering the user registration form
  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <label>First Name</label>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <br />
      <label>Last Name</label>
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <br />
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
      <button className="signup-button" onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;

