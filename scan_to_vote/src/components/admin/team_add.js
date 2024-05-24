import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

function Team_edit() {
  const navigate = useNavigate();
  const [teamname, setTeamname] = useState("");
  const [teamlead, setTeamlead] = useState(""); // New state for team lead name
  const [branch, setBranch] = useState(""); // New state for branch

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      teamname,
      teamlead,
      branch
    };
    axios.post("http://localhost:3001/teamadd", data)
      .then(result => {
        console.log(result);
        navigate('/admin');
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <div className='form-container'>
        <form className='form' onSubmit={handleSubmit}>
          <h2 className='form-title'>Add Team</h2>
          <div className="form-group">
            <label className='label' htmlFor="teamname">Team Name:</label>
            <input type="text" className="input" id="teamname"
              placeholder="Enter Team Name" name="teamname"
              value={teamname} onChange={(e) => { setTeamname(e.target.value) }} />
          </div>
          <div className="form-group">
            <label className='label' htmlFor="teamlead">Team Lead:</label>
            <input type="text" className="input" id="teamlead"
              placeholder="Enter Team Lead Name" name="teamlead"
              value={teamlead} onChange={(e) => { setTeamlead(e.target.value) }} />
          </div>
          <div className="form-group">
            <label className='label' htmlFor="branch">Branch:</label>
            <select className="select" id="branch"
              value={branch} onChange={(e) => { setBranch(e.target.value) }}>
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
              <option value="EEE">EEE</option>
              <option value="ECE">ECE</option>
              <option value="Mining">Mining</option>
            </select>
          </div>
          <br />
          <button type="submit" className="btn btn-primary submit-button">Add</button>
          <br /><br />
          <Link to="/admin" style={{ textDecoration: 'none', fontSize: '18px', color: 'white' }}>
            Home
          </Link><br /><br />
          <Link to="/" style={{ textDecoration: 'none', fontSize: '18px', color: 'white' }}>
            Logout
          </Link>
        </form>
      </div>
    </>
  )
}

export default Team_edit;
