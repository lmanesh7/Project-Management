// ProjectDetails.jsx

import React, { useState, useEffect } from 'react';
import { SERVER_DB } from '../helpers/variables';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Paper, Button } from '@mui/material';
import Sidebar from './HomePage';
import './CreateProject.css';
const ProjectDetails = () => {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();

  useEffect(() => {
    const fetchProjectData = async () => {
      const response = await axios.get(`${SERVER_DB}/project/${projectId}`);
      setProject(response.data.responseData.project);
    };

    fetchProjectData();
  }, [projectId]);

  return (<><Sidebar></Sidebar>
     <div className='create-project'>
    <Paper elevation={3} style={{ padding: '20px', margin: '20px', maxWidth: '600px' }}>
      <Typography variant="h4" gutterBottom>Project Details</Typography>
      {project && (
        <div>
          <Typography variant="h5" gutterBottom>{project.proj_name}</Typography>
          <Typography paragraph>Description: {project.proj_desc}</Typography>
          <Typography paragraph>Product Owner: {project.prod_owner_name}</Typography>
          <Typography paragraph>Project Manager: {project.mgr_name}</Typography>
          <Typography paragraph>Team: {project.team_name}</Typography>
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

export default ProjectDetails;
