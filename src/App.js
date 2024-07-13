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
function App() {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
  <Router>
 
    <Routes>
    <Route path="/Project-Management" element={<Startup />} />
    <Route exact path="/Project-Management/home" element={<Sidebar/>} />
    <Route exact path="/Project-Management/create-project" element={<CreateProject/>} />
    <Route exact path="/Project-Management/create-task-list" element={<CreateTaskList/>} />
    <Route exact path="/Project-Management/create-user-story" element={<CreateUserStory/>} />
    <Route exact path='/Project-Management/create-team' element={<CreateTeam/>}/>
    <Route exact path="/Project-Management/create-team-roaster" element={<CreateTeamRoaster/>}/>
    <Route exact path="/Project-Management/view-projects" element={<ViewProjects/>}/>
    <Route exact path="/Project-Management/view-teams" element={<ViewTeams/>}/>
    <Route exact path="/Project-Management/view-user-stories" element={<UserStories/>}/>
    <Route exact path="/Project-Management/add-team-members" element={<AddTeamMembers/>}/>
    <Route exact path="/Project-Management/remove-team-members" element={<RemoveTeamMembers/>}/>
    <Route exact path="/Project-Management/assign-user-stories" element={<AssignUserStories/>}/>
    <Route exact path="/Project-Management/view-tasks" element={<ViewTasks/>}/>
    <Route exact path="/Project-Management/home-page" element={<Home/>}/>
    <Route exact path="/Project-Management/team/:teamId" element={<TeamDetails/>} />
    <Route exact path="/Project-Management/task/:taskId" element={<TaskDetails/>} />
    <Route exact path="/Project-Management/project/:projectId" element={<ProjectDetails/>} />
    <Route exact path="/Project-Management/userstory/:userStoryId" element={<UserStoryDetails/>} />
    </Routes>
    
    </Router>
  );
}

export default App; //makes it available for other parts of the application
 
