import React, { useState, useEffect } from 'react';

function AddTeamMembers() {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  
  // Fetch the list of teams from the backend
  useEffect(() => {
    fetch(`${process.env.SERVER_DB}/getTeams`)
      .then(response => response.json())
      .then(data => setTeams(data.teamNames));
  }, []);

  // Fetch the list of users from the backend
  useEffect(() => {
    fetch(`${process.env.SERVER_DB}/getusers`)
      .then(response => response.json())
      .then(data => setUsers(data.managers_));
  }, []);

  // Handle the selection of team and users
  const handleTeamSelection = (event) => {
    setSelectedTeam(event.target.value);
  };

  const handleUserSelection = (event) => {
    const selectedUserIds = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedUsers(selectedUserIds);
  };

  // Submit the form to add members to the team
  const addMembersToTeam = () => {
    // Prepare the request body
    const requestBody = JSON.stringify({ team: selectedTeam, users: selectedUsers });
  
    // Send a POST request to the backend
    fetch(`${process.env.SERVER_DB}/addTeamMembers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // You can handle the response from the server here
      })
      .catch((error) => {
        console.error('Error adding team members:', error);
      });
  };
  

  return (
    <div>
      <h2>Add Team Members</h2>
      <label>Select a Team:</label>
      <select value={selectedTeam} onChange={handleTeamSelection}>
        <option value="">Select a Team</option>
        {teams.map((team, index) => (
          <option key={index} value={team}>{team}</option>
        ))}
      </select>

      <label>Select Users to Add:</label>
      <select multiple value={selectedUsers} onChange={handleUserSelection}>
        {users.map((user, index) => (
          <option key={index} value={user._id}>{user.firstName}</option>
        ))}
      </select>

      <button onClick={addMembersToTeam}>Add Members to Team</button>
    </div>
  );
}

export default AddTeamMembers;
