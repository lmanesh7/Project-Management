import React, { useState, useEffect } from 'react';
import { SERVER_DB } from '../helpers/variables';
import axios from 'axios';
import Sidebar from './HomePage';
import "./viewprojects.css";
const AssignUserStories = () => {
  const [userStories, setUserStories] = useState([]);
  const [teamRosters, setTeamRoasters] = useState([]);
  const [projects, setProjects] = useState([]);
  //const [UserStories, setUserStories] = useState([]);
  const [assignedUserStories, setAssignedUserStories] = useState([]);
  const loggedInUser = localStorage.getItem('loggedInUser');

  useEffect(() => {
    // Fetch team roster
    axios.get(`${SERVER_DB}/getTeamRoster/${loggedInUser}`).then((res) => {
      const teamRosterData = res.data.teamRoasterRecord;
      const teamRostersArray = Array.isArray(teamRosterData) ? teamRosterData : [teamRosterData];
      console.log("team roaster")
      console.log(teamRostersArray);
      setTeamRoasters(teamRostersArray);
    }).catch((error) => {
      console.error('Error fetching team roster:', error);
    });

    // Fetch projects
    axios.get(`${SERVER_DB}/getProjects`).then((res) => {
      console.log("projects")
      console.log(res.data);
      setProjects(res.data);
    }).catch((error) => {
      console.error('Error fetching projects:', error);
    });

    // Fetch unassigned user stories
    axios.get(`${SERVER_DB}/getUserStories`).then((res) => {
      //console.log(res.data)
      setUserStories(res.data);
    }).catch((error) => {
      console.error('Error fetching unassigned user stories:', error);
    });

    axios.get(`${SERVER_DB}/getAssignedUserStories`).then((res) => {
      //console.log(res.data)
      setAssignedUserStories(res.data);
    }).catch((error) => {
      console.error('Error fetching unassigned user stories:', error);
    });
  }, [loggedInUser]);

  const myTeams = Array.isArray(teamRosters) ? teamRosters.map((teamRoster) => teamRoster.team_id) : [];

  const filteredProjects = projects.filter((project) =>
    myTeams.includes(project.teams_details?._id)
  );

  const myProjects = filteredProjects.map((project) => project.project_id);
  console.log(myProjects);

   const assigned = assignedUserStories.map((assign) => 
     assign.user_story_id
  );
  const filteredUserStories = userStories.filter((userStory) =>
  myProjects.includes(userStory.proj_id)
);
  const unassignedUserStories = filteredUserStories.filter((userStory) => {
    return !assigned.includes(userStory?._id)}
  );
  


  const onClickAssign = (userStoryId) => {
    // Assign the user story to the logged-in user
    const assignData = {
      user_story_id: userStoryId,
      user_id: loggedInUser,
    };

    axios.post(`${SERVER_DB}/assignStory`, assignData).then((res) => {
      if(res.status === 200)
      {
        alert("Assigned Successfully");
        setAssignedUserStories(prevAssignedUserStories => [...prevAssignedUserStories, { _id: userStoryId }]);
        
    
      }
      else
      {
        alert("Some error occured");
      }
     
    }).catch((err) => {
      // Handle errors
      console.error(err);
    });
  };

  return (<><Sidebar></Sidebar>
    <div className='create-project'>
      <h1>Assign User Stories</h1>
      <table className='center-table'>
        <thead>
          <tr>
            
            <th>Story Title</th>
            <th>Priority</th>
            <th>Assign</th>
          </tr>
        </thead>
        <tbody>
          {unassignedUserStories?.map((userStory) => (
            <tr key={userStory?._id}>
              
              <td>{userStory?.user_story}</td>
              <td>{userStory?.priority}</td>
              <td>
                <button onClick={() => onClickAssign(userStory?._id)}>
                  Assign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default AssignUserStories;
