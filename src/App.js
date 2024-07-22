import React, { useState } from 'react';
import './App.css'; // This will Import your .CSS file
import Login from './components/login'; // This imports your login.js file
import Signup from './components/signup'; // This will import your signup.js file
import CreateProject from './components/CreateProject';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from './components/HomePage';
import CreateTaskList from './components/CreateTaskList';
import CreateUserStory from './components/CreateUserStory';
import Startup from './components/HandleLogin';
import CreateTeam from './components/CreateTeam';
import CreateTeamRoaster from './components/CreateTeamRoaster';
import ViewProjects from './components/ViewProjects';
import ViewTeams from './components/viewTeams';
import UserStories from './components/ViewUserStories';
import AddTeamMembers from './components/AddTeamMembers';
import RemoveTeamMembers from './components/RemoveTeamMembers';
import AssignUserStories from './components/AssignUserStories';
import ViewTasks from './components/ViewTasks';
import Home from './components/Home';
import TaskDetails from './components/TaskDetails';
import TeamDetails from './components/TeamDetails';
import ProjectDetails from './components/ProjectDetails';
import UserStoryDetails from './components/UserStoryDetails';
import Logout from './components/Logout';
function App() {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
  <Router>
 
    <Routes>
    <Route path="/" element={<Startup />} />
    <Route exact path="/home" element={<Sidebar/>} />
    <Route exact path="/create-project" element={<CreateProject/>} />
    <Route exact path="/create-task-list" element={<CreateTaskList/>} />
    <Route exact path="/create-user-story" element={<CreateUserStory/>} />
    <Route exact path='/create-team' element={<CreateTeam/>}/>
    <Route exact path="/create-team-roaster" element={<CreateTeamRoaster/>}/>
    <Route exact path="/view-projects" element={<ViewProjects/>}/>
    <Route exact path="/view-teams" element={<ViewTeams/>}/>
    <Route exact path="/view-user-stories" element={<UserStories/>}/>
    <Route exact path="/add-team-members" element={<AddTeamMembers/>}/>
    <Route exact path="/remove-team-members" element={<RemoveTeamMembers/>}/>
    <Route exact path="/assign-user-stories" element={<AssignUserStories/>}/>
    <Route exact path="/view-tasks" element={<ViewTasks/>}/>
    <Route exact path="/home-page" element={<Home/>}/>
    <Route exact path="/team/:teamId" element={<TeamDetails/>} />
    <Route exact path="/task/:taskId" element={<TaskDetails/>} />
    <Route exact path="/project/:projectId" element={<ProjectDetails/>} />
    <Route exact path="/userstory/:userStoryId" element={<UserStoryDetails/>} />
    <Route exact path="/log-out" element={<Logout/>} />
    </Routes>
    
    </Router>
  );
}

export default App; //makes it available for other parts of the application
 
