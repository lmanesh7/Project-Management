import React, { useState, useEffect } from "react";
import "./viewprojects.css";
import Sidebar from "./HomePage";
import "./CreateProject.css";
const ViewProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch project details from the /getProjects endpoint
    console.log(`${process.env.SERVER_DB}/getProjects`)
    fetch(`${process.env.SERVER_DB}/getProjects`)
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error("Error fetching project details:", error);
      });
  }, []);

  if (projects.length === 0) {
    return (
      <>
        <div>
          <Sidebar />
        </div>
        <div className="create-project">
          <h3>No projects yet. Start creating a new project</h3>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <Sidebar />
        </div>
        <div className="create-project">
          <h2>Project List</h2>
          <table className="center-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Description</th>
                <th>Manager</th>
                <th>Owner</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={index}>
                  <td>{project.project_name}</td>
                  <td>{project.description}</td>
                  <td>
                    {project.manager_details?.firstName +
                      " " +
                      project.manager_details?.lastName}
                  </td>
                  <td>
                    {project.owner_details?.firstName +
                      " " +
                      project.owner_details?.lastName}
                  </td>
                  <td>{project.teams_details?.team_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
};

export default ViewProjects;
