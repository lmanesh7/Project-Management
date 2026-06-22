import React, { useState } from 'react';
import './App.css'; // This will Import your .CSS file
import Login from './components/login'; // This imports your login.js file
import Signup from './components/signup'; // This will import your signup.js file
import CreateProject from './components/CreateProject';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import ProtectedRoute from './components/ProtectedRoute';
import SessionManager from './components/SessionManager';

function App() {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
  <Router>
    <SessionManager />
    <Routes>
    <Route path="/" element={<Navigate to="/Project-Management" replace />} />
    <Route path="/Project-Management" element={<Startup />} />
    <Route exact path="/Project-Management/home" element={<ProtectedRoute><Sidebar/></ProtectedRoute>} />
    <Route exact path="/Project-Management/create-project" element={<ProtectedRoute><CreateProject/></ProtectedRoute>} />
    <Route exact path="/Project-Management/create-task-list" element={<ProtectedRoute><CreateTaskList/></ProtectedRoute>} />
    <Route exact path="/Project-Management/create-user-story" element={<ProtectedRoute><CreateUserStory/></ProtectedRoute>} />
    <Route exact path='/Project-Management/create-team' element={<ProtectedRoute><CreateTeam/></ProtectedRoute>}/>
    <Route exact path="/Project-Management/create-team-roaster" element={<ProtectedRoute><CreateTeamRoaster/></ProtectedRoute>}/>
    <Route exact path="/Project-Management/view-projects" element={<ProtectedRoute><ViewProjects/></ProtectedRoute>}/>
    <Route exact path="/Project-Management/view-teams" element={<ProtectedRoute><ViewTeams/></ProtectedRoute>}/>
    <Route exact path="/Project-Management/view-user-stories" element={<ProtectedRoute><UserStories/></ProtectedRoute>}/>
    <Route exact path="/Project-Management/add-team-members" element={<ProtectedRoute><AddTeamMembers/></ProtectedRoute>}/>
    <Route exact path="/Project-Management/remove-team-members" element={<ProtectedRoute><RemoveTeamMembers/></ProtectedRoute>}/>
    <Route exact path="/Project-Management/assign-user-stories" element={<ProtectedRoute><AssignUserStories/></ProtectedRoute>}/>
    <Route exact path="/Project-Management/view-tasks" element={<ProtectedRoute><ViewTasks/></ProtectedRoute>}/>
    <Route exact path="/Project-Management/home-page" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
    <Route exact path="/Project-Management/team/:teamId" element={<ProtectedRoute><TeamDetails/></ProtectedRoute>} />
    <Route exact path="/Project-Management/task/:taskId" element={<ProtectedRoute><TaskDetails/></ProtectedRoute>} />
    <Route exact path="/Project-Management/project/:projectId" element={<ProtectedRoute><ProjectDetails/></ProtectedRoute>} />
    <Route exact path="/Project-Management/userstory/:userStoryId" element={<ProtectedRoute><UserStoryDetails/></ProtectedRoute>} />
    </Routes>
    
    </Router>
  );
}

export default App; //makes it available for other parts of the application
