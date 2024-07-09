// UserStoryDetails.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Paper, Button } from '@mui/material';
import Sidebar from './HomePage';
import './CreateProject.css';
const UserStoryDetails = () => {
  const [userStory, setUserStory] = useState(null);
  const { userStoryId } = useParams();

  useEffect(() => {
    const fetchUserStoryData = async () => {
      const response = await axios.get(`http://localhost:3001/userstory/${userStoryId}`);
      setUserStory(response.data.userStory);
    };

    fetchUserStoryData();
  }, [userStoryId]);

  return (<><Sidebar></Sidebar>
     <div className='create-project'>
    <Paper elevation={3} style={{ padding: '20px', margin: '20px', maxWidth: '600px' }}>
      <Typography variant="h4" gutterBottom>User Story Details</Typography>
      {userStory && (
        <div>
          <Typography variant="h5" gutterBottom>Project: {userStory.project_name}</Typography>
          <Typography paragraph>Description: {userStory.user_story}</Typography>
          <Typography paragraph>Priority: {userStory.priority}</Typography>
        </div>
      )}
      <Button component={Link} to="/home-page" variant="outlined" color="primary">
        Back to Home
      </Button>
    </Paper>
    </div>
    </>
  );
};

export default UserStoryDetails;
