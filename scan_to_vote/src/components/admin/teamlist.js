import React, { useState, useEffect } from "react";
import axios from "axios";
import "./teamlist.css";
import { Link, useNavigate } from "react-router-dom";

function Teamlist() {
  const [teams, setTeams] = useState([]);


  useEffect(() => {
    // Fetch the list of teams from your server
    axios
      .get("http://localhost:3001/getTeams1")
      .then((response) => setTeams(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDeleteTeam = (teamName) => {
    console.log(`Deleting team with name: ${teamName}`);
    axios
      .delete(`http://localhost:3001/teams/${teamName}`)
      .then((response) => {
        setTeams(teams.filter((team) => team.teamname !== teamName));
      })
      .catch((error) => {
        console.error("Error deleting team:", error);
      });
  };

  return (
    <div className="table-container">
      <br />
      <br />
      <div className="elements">
        <h2>List of Teams</h2>
        <Link to="/admin">
          <p>Back</p>
        </Link>
        <Link to="/">
          <p>Logout</p>
        </Link>
      </div>

      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Team Lead</th>
            <th>Team Branch</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={index}>
              <td>{team.teamname}</td>
              <td>{team.teamlead}</td>
              <td>{team.branch}</td>
              <td>
                <button onClick={() => handleDeleteTeam(team.teamname)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teamlist;
