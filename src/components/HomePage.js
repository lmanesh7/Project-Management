import React from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faProjectDiagram,
  faUsers,
  faUserFriends,
  faStickyNote,
  faTasks,
  faRectangleList,
  faUsersBetweenLines,
  faPenToSquare,
  faEye,
  faTags
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <FontAwesomeIcon icon={faProjectDiagram} className="icon" />
        Project Management
      </div>
      <ul className="sidebar-menu">
        <li>
          <a href="/create-project">
            <FontAwesomeIcon icon={faProjectDiagram} className="icon" />
            Create Project
          </a>
        </li>
        <li>
          <a href="/create-team">
            <FontAwesomeIcon icon={faUsers} className="icon" />
            Create Team
          </a>
        </li>
        <li>
          <a href="create-team-roaster">
            <FontAwesomeIcon icon={faUserFriends} className="icon" />
            Create Team Roster
          </a>
        </li>
        <li>
          <a href="/remove-team-members">
          <FontAwesomeIcon icon={faPenToSquare} className='icon' />
            Remove Team Members
          </a>
        </li>
        <li>
          <a href="/create-user-story">
            <FontAwesomeIcon icon={faStickyNote} className="icon" />
            Create User Story
          </a>
        </li>
        <li>
          <a href="/assign-user-stories">
          <FontAwesomeIcon icon={faTags}  className='icon' />
            Assign User Stories
          </a>
        </li>
        <li>
          <a href="/view-user-stories">
          <FontAwesomeIcon icon={faEye} className='icon' />
            View User Stories
          </a>
        </li>
        <li>
          <a href="/view-projects">
          <FontAwesomeIcon icon={faRectangleList} className='icon' />
            Project List
          </a>
        </li>
        <li>
          <a href="/view-teams">
          <FontAwesomeIcon icon={faUsersBetweenLines} className='icon' />
            Team List
          </a>
        </li>
    
   
        <li>
          <a href="/create-task-list">
            <FontAwesomeIcon icon={faTasks} className="icon" />
            Create Task
          </a>
        </li>
        <li>
          <a href="/view-tasks">
          <FontAwesomeIcon icon={faEye} className='icon' />
            View Tasks
          </a>
        </li>
   
      </ul>
    </div>
  );
};

export default Sidebar;
