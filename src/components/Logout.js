// Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user data from local storage or session
    localStorage.clear();
    // Redirect to the login page
    navigate('/');
  }, [navigate]);

  return (
    <div>
      Logging out...
    </div>
  );
};

export default Logout;
