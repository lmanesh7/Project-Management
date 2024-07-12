import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Typography, Grid, Paper, List, ListItem, Divider } from '@mui/material';
import Sidebar from './HomePage';
import './CreateProject.css';
const Home = () => {
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);
  const [userStories, setUserStories] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("loggedInUser");
    console.log(userId)
    // Fetch data from the server
    const fetchData = async () => {
      // Assuming your server is running at ${process.env.SERVER_DB}
      const response = await axios.get(`${process.env.SERVER_DB}/${userId}`);
      setTeams(response.data.teams);
      setProjects(response.data.projects);
      setUserStories(response.data.userStories);
      setTasks(response.data.tasks);
    };

    fetchData();
  }, []);

  return (<><Sidebar></Sidebar> 
     <div className='create-project'>
    <Grid container spacing={3} style={{ margin: '30px', fontFamily: 'Arial, sans-serif' }}>
      <Grid item xs={12}>
        <Typography variant="h4" color="primary">Home Page</Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '15px' }}>
          <Typography variant="h5">Teams</Typography>
          <List>
            {teams.map((team) => (
              <div key={team._id}>
                <ListItem disablePadding>
                  <Link to={`/team/${team._id}`} style={{ textDecoration: 'none', color: '#007BFF' }}>
                    {team.team_name}
                  </Link>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '15px' }}>
          <Typography variant="h5">Projects</Typography>
          <List>
            {projects.map((project) => (
              <div key={project._id}>
                <ListItem disablePadding>
                  <Link to={`/project/${project._id}`} style={{ textDecoration: 'none', color: '#007BFF' }}>
                    {project.proj_name}
                  </Link>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Paper>
      </Grid>

<Grid item xs={12} md={6}>
  <Paper elevation={3} style={{ padding: '15px' }}>
    <Typography variant="h5">User Stories</Typography>
    <List>
      {userStories.map((userStory) => (
        <div key={userStory._id}>
          <ListItem disablePadding>
            <Link to={`/userstory/${userStory._id}`} style={{ textDecoration: 'none', color: '#007BFF' }}>
              {userStory.user_story}
            </Link>
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  </Paper>
</Grid>

<Grid item xs={12} md={6}>
  <Paper elevation={3} style={{ padding: '15px' }}>
    <Typography variant="h5">Tasks</Typography>
    <List>
      {tasks.map((task) => (
        <div key={task._id}>
          <ListItem disablePadding>
            <Link to={`/task/${task._id}`} style={{ textDecoration: 'none', color: '#007BFF' }}>
              {task.task}
            </Link>
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  </Paper>
</Grid>


    </Grid>
    </div>
    </>
  );
};

export default Home;
