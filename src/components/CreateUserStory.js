import React, { useState, useEffect } from 'react';
import { SERVER_DB } from '../helpers/variables';
import './CreateUserStory.css';
import Sidebar from './HomePage';

const CreateUserStory = () => {
  const [userStory, setUserStory] = useState({
    user_story: '',
    proj_id: '',
    priority: 0,
  });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch projects when the component mounts
    fetch(`${SERVER_DB}/getProjects`) // Make sure the URL matches your API endpoint
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserStory({ ...userStory, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      user_story: userStory.user_story,
      proj_id: userStory.proj_id,
      priority: userStory.priority,
    };

    // Send the data to /CreateUserStory using a POST request.
    fetch(`${SERVER_DB}/createUserStory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('User Story data submitted:', userStory);
          alert("User Story Saved Successfully");
        } else {
          console.error('Error submitting user story data');
        }
      })
      .catch((error) => console.error('Error submitting user story data:', error));
  
  };

  return (
    <>
      <div>
        <Sidebar />
      </div>
      <div className="create-user-story">
        <h2>Create User Story</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="user_story">User Story</label>
            <textarea
              id="user_story"
              name="user_story"
              value={userStory.user_story}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="proj_id">Project ID</label>
            <select
              id="proj_id"
              name="proj_id"
              value={userStory.proj_id}
              onChange={handleChange}
              required
            >
              <option value="">Select a Project</option>
              {projects.map((project) => (
                <option key={project.project_name} value={project.project_id}>
                  {project.project_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <input
              type="number"
              id="priority"
              name="priority"
              value={userStory.priority}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </>
  );
};

export default CreateUserStory;
