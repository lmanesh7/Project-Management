// UserStories.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./viewprojects.css";
import Sidebar from './HomePage';
import './CreateProject.css';

function UserStories() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [userStories, setUserStories] = useState([]);

  useEffect(() => {
    // Fetch the list of projects when the component mounts
    axios.get("http://localhost:3001/getProjects")
      .then((response) => setProjects(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    // Fetch user stories for the selected project when selectedProject changes
    if (selectedProject) {
      axios.get(`http://localhost:3001/getUserStories/${selectedProject}`)
        .then((response) => setUserStories(response.data))
        .catch((error) => console.error(error));
    }
  }, [selectedProject]);

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };


    const handleDelete = (userStoryId) => {
        // Send a DELETE request to your server to delete the user story.
        axios.delete(`http://localhost:3001/deleteUserStory/${userStoryId}`)
          .then(() => {
            // Remove the deleted user story from the local state
            setUserStories(userStories.filter(userStory => userStory._id !== userStoryId));
            alert("Deleted Successfully");
          })
          .catch((error) => console.error(error));
      };

  return (<>
  <Sidebar/>
    <div className="create-project">
      <h1>User Stories</h1>
      <label htmlFor="projects">Select a project:</label>
      <select id="projects" onChange={handleProjectChange}>
        <option value="">Select a project</option>
        {projects.map((project) => (
          <option key={project.project_id} value={project.project_id}>
            {project.project_name}
          </option>
        ))}
      </select>
      <table className="center-table">
        <thead>
          <tr>
            <th>User Story</th>
            <th>Priority</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {userStories.map((userStory) => (
            <tr key={userStory._id}>
              <td>{userStory.user_story}</td>
              <td>{userStory.priority}</td>
              <td>
                <button onClick={() => handleDelete(userStory._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default UserStories;
