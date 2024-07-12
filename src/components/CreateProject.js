import React, { useState, useEffect } from 'react';
import './CreateProject.css';
import Sidebar from './HomePage';

const CreateProject = () => {
  const [project, setProject] = useState({
    proj_name: '',
    proj_desc: '',
    prod_owner_id: '',
    mgr_id: '',
    team_id: '',
    owner_id: '',
  });

  const [managers, setManagers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [owners, setOwners] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Project data submitted:', project);
  
    // Define the data you want to send to the server
    const postData = {
      proj_name: project.proj_name,
      proj_desc: project.proj_desc,
      prod_owner_id: project.prod_owner_id,
      mgr_id: project.mgr_id,
      team_id: project.team_id,
      owner_id: project.owner_id,
    };
  
    // Make a POST request to the server
    fetch(`${process.env.SERVER_DB}/createProject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (response.ok) {
          // Handle success
          console.log('Project created successfully');
          alert('Project created successfully');
          
        } else {
       
          console.error('Error creating project:', response.status, response.statusText);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
            
          alert("Project with the same name already exists. Please choose a different name.");
        }
        console.error('Error creating project:', error);
      });
  };
  
  useEffect(() => {
    fetch(`${process.env.SERVER_DB}/getusers`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const managerData = data.managers_ || [];
        const ownerData = data.managers_ || [];
        const teamData = data.teams_ || [];
        setManagers(managerData.map((manager) => ({ id: manager._id, name: manager.firstName })));
        setOwners(ownerData.map((owner) => ({ id: owner._id, name: owner.firstName })));
        setTeams(teamData.map((team)=> ({id:team._id, name: team.team_name})))
   
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <div>
        <Sidebar />
      </div>
      <div className="create-project">
        <h2>Create Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="proj_name">Project Name</label>
            <input
              type="text"
              id="proj_name"
              name="proj_name"
              value={project.proj_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="proj_desc">Project Description</label>
            <textarea
              id="proj_desc"
              name="proj_desc"
              value={project.proj_desc}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="prod_owner_id">Product Owner ID</label>
            <select
              type="number"
              id="prod_owner_id"
              name="prod_owner_id"
              value={project.prod_owner_id}
              onChange={handleChange}
              required
            >
            <option value="">Select Product Owner ID</option>
              {managers.map((manager) => (
                <option key={manager.id} value={manager.id}>
                  {manager.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="mgr_id">Manager ID</label>
            <select
              id="mgr_id"
              name="mgr_id"
              value={project.mgr_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Manager ID</option>
              {managers.map((manager) => (
                <option key={manager.id} value={manager.id}>
                  {manager.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="team_id">Team ID</label>
            <select
              id="team_id"
              name="team_id"
              value={project.team_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Team ID</option>
              {teams.map((team, index) => (
                <option key={index} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group" hidden>
            <label htmlFor="owner_id">Owner ID</label>
            <select
              id="owner_id"
              name="owner_id"
              value={project.owner_id}
              onChange={handleChange}
              
            >
              <option value="">Select Owner ID</option>
              {owners.map((owner) => (
                <option key={owner.id} value={owner.id}>
                  {owner.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </>
  );
};

export default CreateProject;
