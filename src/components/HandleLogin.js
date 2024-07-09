import React, { useState } from 'react';
import Login from './login';
import Signup from './signup';


const Startup = () => {
    const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };
return(<>
<div className="app-container">
<header className="app-header">
  <div className="form-container">
    {isLoginView ? <Login /> : <Signup />} {/* This line conditionally renders the login/signup based on isloginview value */}
    <p>
      {isLoginView ? "Don't have an account?" : ""}
      <button onClick={toggleView} className="toggle-button">
        {isLoginView ? "Signup" : "Login"}
      </button>
    </p>
  </div>
</header>
</div>
</>
)
};
export default Startup;