import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_DB } from '../helpers/variables';
import "./viewprojects.css";
import Sidebar from './HomePage';
import './CreateProject.css';
const ViewTasks = () => {
  const [tasks, setTasks] = useState([]);
  const[loggedUser, setLoggedInUser] = useState();

  useEffect(() => {
    // Fetch tasks assigned to the logged-in user
    const loggedInUser = localStorage.getItem('loggedInUser');
    const lu = sessionStorage.getItem('loggedInUser');
    setLoggedInUser(lu);
    axios.get(`${SERVER_DB}/getTasks/${loggedInUser}`).then((res) => {
      setTasks(res.data);
    }).catch((error) => {
      console.error('Error fetching tasks:', error);
    });
  }, []);

  const handleChangeStatus = async (taskId, newStatus) => {
    try {
      // Update the task status
      await axios.post(`${SERVER_DB}/updateTaskStatus`, {
        taskId,
        newStatus,
      });

      // Update the local state to reflect the changes
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (<><Sidebar/>
    <div className='create-project'>
      <h1>View Tasks</h1>
      <table className='center-table'>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>User Story Name</th>
            <th>Created By User Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.task}</td>
              <td>{task.user_story_id}</td>
              <td>{loggedUser}</td>
              <td>
                <select
                  value={task.status}
                  onChange={(e) => handleChangeStatus(task._id, e.target.value)}
                >
                  <option value="New">New</option>
			<option value="In Progress">In Progress</option>
			<option value="Awaiting Confirmation"> Awaiting Confirmation</option>
			<option value="Completed">Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default ViewTasks;
