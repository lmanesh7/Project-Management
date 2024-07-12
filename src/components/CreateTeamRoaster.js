import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './CreateProject.css';
import Sidebar from './HomePage';

const CreateTeamRoaster = () => {
  const [teamRoaster, setTeamRoaster] = useState({
    team_name: '',
    member_names: [], // Use an array to store multiple members
  });

  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  // Fetch the list of teams and members from the backend
  useEffect(() => {
    fetch(`${process.env.SERVER_DB}/getTeams`)
      .then(response => response.json())
      .then(data => setTeams(data.teamNames));
  }, []);

  useEffect(() => {
    fetch(`${process.env.SERVER_DB}/getusersforroster`)
      .then(response => response.json())
      .then(data => setMembers(data.managers_));
  }, []);

  const handleChange = (e) => {
    setTeamRoaster({ ...teamRoaster, [e.target.name]: e.target.value });
  };

  const handleMemberChange = (selectedOptions) => {
    const selectedMemberValues = selectedOptions.map((option) => option.value);
    console.log('Selected Member Values:', selectedMemberValues);
    setSelectedMembers(selectedMemberValues);
    setTeamRoaster({ ...teamRoaster, member_names: selectedMemberValues });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(teamRoaster);
    fetch(`${process.env.SERVER_DB}/addTeamMembers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teamRoaster),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Members added:', data.message);
        alert('Team members added successfully');
      })
      .catch((error) => {
        console.error('Error adding team members:', error);
      });
  };

  const memberOptions = members.map((member, index) => ({
    value: member._id,
    label: member.firstName + " "+ member.lastName,
  }));

  return (
    <>
      <Sidebar />
      <div className='create-project'>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="team_name">Team Name</label>
            <select
              id="team_name"
              name="team_name"
              value={teamRoaster.team_name}
              onChange={handleChange}
              required
            >
              <option value="">Select Team</option>
              {teams.map((team, index) => (
                <option key={index} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="member_names">Member Names</label>
            <Select
              isMulti
              options={memberOptions}
              value={memberOptions.filter((option) => selectedMembers.includes(option.value))}
              onChange={handleMemberChange}
              placeholder="Select Members"
            />
          </div>
          <button type="submit">Add Members to Team</button>
        </form>
      </div>
    </>
  );
};

export default CreateTeamRoaster;
