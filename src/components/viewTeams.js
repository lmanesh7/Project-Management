import React, { useState, useEffect } from 'react';
import { SERVER_DB } from '../helpers/variables';
import './CreateProject.css';
import Sidebar from './HomePage';
const ViewTeams = () => {
  const [teamNames, setTeamNames] = useState([]);

  useEffect(() => {
    // Fetch team names from the /getTeams endpoint
    fetch(`${SERVER_DB}/getTeams`)
      .then((response) => response.json())
      .then((data) => {
        setTeamNames(data.teamNames);
      })
      .catch((error) => {
        console.error('Error fetching team names:', error);
      });
  }, []);

  return (<><div><Sidebar/></div>
   <div className='create-project'>
      <h2>Team List</h2>
      <table>
        <thead>
          <tr>
            <th>Team Name</th>
          </tr>
        </thead>
        <tbody>
          {teamNames.map((teamName, index) => (
            <tr key={index}>
              <td>{teamName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default ViewTeams;
