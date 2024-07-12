import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateTaskList.css';
import "./viewprojects.css";
import Sidebar from './HomePage';
import './CreateProject.css';

const CreateTaskList = () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const [task, setTask] = useState({
    task: '',
    user_story_id: '',
    created_by: loggedInUser,
    status: 'New', // Default status
  });


  const [userStories, setUserStories] = useState([]); // State to store user stories fetched from the server

  // Fetch user stories from the server
  useEffect(() => {
    axios.get(`${process.env.SERVER_DB}/getAssignedUserStoriesValue/${loggedInUser}`) 
      .then((res) => {
        console.log(res.data);
        setUserStories(res.data);
      })
      .catch((error) => {
        console.error('Error fetching assigned user stories:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission (e.g., send data to the server)
    axios.post(`${process.env.SERVER_DB}/createTask`, task) // Replace with your API endpoint for creating tasks
      .then((res) => {
       
          alert("Task Created");
       
        console.log('Task created successfully:', res.data);
        // Optionally, you can update the UI or perform other actions after creating the task
      })
      .catch((error) => {
        console.error('Error creating task:', error);
      });
  };

  return (
    <>
      <div >
        <Sidebar />
      </div>
      <div className='create-project'>
        <h2>Create Task List Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="taskDescription">Task Description</label>
            <textarea
              id="taskDescription"
              name="task"
              value={task.task}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="userStoryId">User Story</label>
            <select
              id="userStoryId"
              name="user_story_id"
              value={task.user_story_id}
              onChange={handleChange}
              required
            >
              <option value="">Select User Story</option>
              {userStories.map((story) => (
                <option key={story._id} value={story._id}>
                  {story.user_story}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={task.status}
              onChange={handleChange}
              required
            >
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Awaiting Confirmation">Awaiting Confirmation</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </>
  );
};

export default CreateTaskList;
