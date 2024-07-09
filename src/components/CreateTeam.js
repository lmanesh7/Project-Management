import React, { useState } from 'react';
import './CreateProject.css';
import Sidebar from './HomePage';
import axios from 'axios';

const CreateTeam = () => {
  const [team, setTeam] = useState({
    team_name: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeam({ ...team, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3001/createTeam', team);
  
      console.log('Server response:', response.data);
      alert("Team created successfully");
    } catch (error) {
      if (error.response && error.response.status === 500) {
        //
        alert("Team with the same name already exists. Please choose a different name.");
      } else {
        console.error('Error submitting data:', error);
        alert("Error creating team");
      }
    }
  };
  

  return (
    <>
      <Sidebar />
      <div className="create-project">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="team_name">Team Name</label>
            <input
              type="text"
              id="team_name"
              name="team_name"
              value={team.team_name}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </>
  );
};

export default CreateTeam;
