// TaskDetails.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Paper, Button } from '@mui/material';
import Sidebar from './HomePage';
import './CreateProject.css';
const TaskDetails = () => {
  const [task, setTask] = useState(null);
  const { taskId } = useParams();

  useEffect(() => {
    const fetchTaskData = async () => {
      const response = await axios.get(`http://localhost:3001/task/${taskId}`);
      setTask(response.data.task);
    };

    fetchTaskData();
  }, [taskId]);

  return (<><Sidebar></Sidebar>
     <div className='create-project'>
    <Paper elevation={3} style={{ padding: '20px', margin: '20px', maxWidth: '600px' }}>
      <Typography variant="h4" gutterBottom>Task Details</Typography>
      {task && (
        <div>
          <Typography variant="h5" gutterBottom>{task.task}</Typography>
          <Typography paragraph>User Story: {task.user_story_id.user_story}</Typography>
          <Typography paragraph>Description: {task.task}</Typography>
          <Typography paragraph>Status: {task.status}</Typography>
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

export default TaskDetails;
