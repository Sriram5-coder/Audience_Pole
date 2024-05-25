import React, { useState, useEffect } from "react";
import "./vote.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function FormForVote() {
  const navigate = useNavigate();
  const [rollNumber, setRollNumber] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [error, setError] = useState("");
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Fetch the list of teams from your server
    axios
      .get("https://audience-poll-o9gm.onrender.com/getTeams")
      .then((response) => setTeams(response.data))
      .catch((error) => console.error(error));
  }, []);

  const validateRollNumber = (rollNumber) => {
    // Regular expression to match the specified pattern
    const pattern = /^2.{9}$/;
    return pattern.test(rollNumber);
};

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateRollNumber(rollNumber)) {
      setError('Invalid roll number. Please check the format.');
      return;
    }

    if (!selectedTeam) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');

    const data = {
      rollNumber,
      selectedTeam,
    };

    axios
      .post("https://audience-poll-o9gm.onrender.com/checkDuplicateRollNumber", { rollNumber })
      .then((result) => {
        if (result.data === "Duplicate") {
          navigate('/failure');
        } else {
          axios
          .post("https://audience-poll-o9gm.onrender.com/getdata", data)
          .then((result) => {
            console.log(result.data);
            navigate('/success');
          })
          .catch((err) => {
            console.error(err);
            navigate('/failure');
          });
        }
      
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form-title" style={{ color: 'white' }}>Vote for Your Favorite Team</h2>
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <label className="label" htmlFor="rollNumber" style={{ color: 'white' }}>
            Roll Number:
          </label>
          <input
            className="input"
            type="text"
            id="rollNumber"
            name="rollNumber"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            placeholder="Enter your roll number"
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="teamSelection" style={{ color: "white" }}>
            Select the Team to Vote:
          </label>
          <select
            className="select"
            id="teamSelection"
            name="teamSelection"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
          >
            <option value="">Choose your team</option>
            {teams.map((team, index) => (
              <option key={index} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>

        <button className="submit-button" type="submit">
          Submit
        </button><br />
        <Link to="/" style={{textDecoration:'none', color:'white'}}>
        Home
        </Link>

      </form>
    </div>
  );
}

export default FormForVote;
