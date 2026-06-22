import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const SessionManager = () => {
  const navigate = useNavigate();
  // 15 minutes in milliseconds
  const INACTIVITY_LIMIT = 15 * 60 * 1000;

  const logout = useCallback(() => {
    localStorage.removeItem('loggedInUser');
    sessionStorage.removeItem('loggedInUser');
    navigate('/Project-Management', { replace: true });
  }, [navigate]);

  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      // Only set timer if user is logged in
      if (localStorage.getItem('loggedInUser')) {
        timeoutId = setTimeout(logout, INACTIVITY_LIMIT);
      }
    };

    // Events to monitor for activity
    const events = [
      'mousedown',
      'mousemove',
      'keydown',
      'scroll',
      'touchstart'
    ];

    const handleActivity = () => {
      resetTimer();
    };

    // Attach event listeners
    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    // Initialize timer
    resetTimer();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [logout, INACTIVITY_LIMIT]);

  // This component doesn't render anything
  return null;
};

export default SessionManager;
