// TeamDetails.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Paper, List, ListItem, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Sidebar from './HomePage';
import './CreateProject.css';
const TeamDetails = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamData = async () => {
      const response = await axios.get(`http://localhost:3001/team/${teamId}`);
      setTeam(response.data.team);
      setTeamMembers(response.data.teamMembers);
    };

    fetchTeamData();
  }, [teamId]);

  return (<><Sidebar></Sidebar>
     <div className='create-project'>
    <Paper elevation={3} style={{ padding: '20px', margin: '20px', maxWidth: '600px' }}>
      <Typography variant="h4" gutterBottom>Team Details</Typography>
      {team && (
        <div>
          <Typography variant="h5" gutterBottom>Team Name: {team.team_name}</Typography>
          <Typography variant="h6" gutterBottom>Team Members:</Typography>
          <List>
            {teamMembers.map((member) => (
              <ListItem key={member._id}>
                {member.firstName} {member.lastName}
              </ListItem>
            ))}
          </List>
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

export default TeamDetails;
