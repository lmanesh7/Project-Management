import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // Import Select from react-select
import Sidebar from './HomePage';
import './CreateProject.css';

const RemoveTeamMembers = () => {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  // Fetch the list of teams from the backend
  useEffect(() => {
    fetch(`${process.env.SERVER_DB}/getTeams`)
      .then(response => response.json())
      .then(data => setTeams(data.teamNames));
  }, []);

  // Fetch the list of team members based on the selected team
  useEffect(() => {
    if (selectedTeam) {
      fetch(`${process.env.SERVER_DB}/getTeamMembers?team=${selectedTeam}`)
        .then(response => response.json())
        .then(data => setTeamMembers(data.members));
    }
  }, [selectedTeam]);

  const handleTeamSelection = (selectedOption) => {
    setSelectedTeam(selectedOption.value);
    setSelectedUsers([]);
  };

  const handleUserSelection = (selectedOption) => {
    const selectedUserIds = selectedOption.map(option => option.value);
    setSelectedUsers(selectedUserIds);
  };

  const removeMembersFromTeam = () => {
    if (selectedTeam && selectedUsers.length > 0) {
      fetch(`${process.env.SERVER_DB}/removeTeamMembers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ team: selectedTeam, users: selectedUsers }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Members removed:', data.message);
          alert("Team members removed successfully");
          // Update the UI to reflect the removed members
          // Remove the selected users from the teamMembers state
          setTeamMembers((prevMembers) =>
            prevMembers.filter((member) => !selectedUsers.includes(member._id))
          );
          // Clear the selected users
          setSelectedUsers([]);
        })
        .catch((error) => {
          console.error('Error removing team members:', error);
        });
    } else {
      console.log('Please select a team and at least one member to remove.');
    }
  };

  const teamOptions = teams.map(team => ({ value: team, label: team }));
  const memberOptions = teamMembers.map(member => ({ value: member._id, label: member.firstName +" "+ member.lastName}));

  return (
    <>
      <Sidebar />
      <div className="create-project">
        <h2>Remove Team Members</h2>
        <div className="form-group">
          <label>Select a Team:</label>
          <Select
            value={{ value: selectedTeam, label: selectedTeam }}
            options={teamOptions}
            onChange={handleTeamSelection}
          />
        </div>
        {selectedTeam && (
          <div className="form-group">
            <label>Select Members to Remove:</label>
            <Select
              isMulti
              value={memberOptions.filter(option => selectedUsers.includes(option.value))}
              options={memberOptions}
              onChange={handleUserSelection}
            />
          </div>
        )}
        <button onClick={removeMembersFromTeam}>Remove Members from Team</button>
      </div>
    </>
  );
};

export default RemoveTeamMembers;
