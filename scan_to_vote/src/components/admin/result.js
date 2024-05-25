import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './result.css';
import { Link } from 'react-router-dom';

function Result() {
  const [teamVoteCounts, setTeamVoteCounts] = useState([]);
  const [winningTeam, setWinningTeam] = useState('');
  // const [runnerUpTeam, setRunnerUpTeam] = useState('');
  const [shouldResetVotes, setShouldResetVotes] = useState(false);

  useEffect(() => {
    const resetVotes = async () => {
      if (!shouldResetVotes) return;

      try {
        const response = await fetch('https://audience-poll-o9gm.onrender.com/api/reset-votes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          alert('Votes have been reset successfully.');
        } else {
          alert('Failed to reset votes.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while resetting votes.');
      } finally {
        setShouldResetVotes(false);
      }
    };

    resetVotes();
  }, [shouldResetVotes]);

  const handleResetVotes = () => {
    const userConfirmed = window.confirm("Are you sure you want to reset all the votes?");
    if (userConfirmed) {
      setShouldResetVotes(true);
    }
  };

  useEffect(() => {
    // Make a GET request to your Express.js server's API endpoint
    axios.get('https://audience-poll-o9gm.onrender.com/team-vote-counts')
      .then((response) => {
        const { teamCounts, winningTeam, runnerUpTeam } = response.data;
        setTeamVoteCounts(teamCounts);
        setWinningTeam(winningTeam);
        // setRunnerUpTeam(runnerUpTeam);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className='list-container'>
      <div className="elements">
        <h2>Votes Count</h2>
        <Link to="/admin">
          <p style={{ color: 'black', textDecoration: 'none' }}>Back</p>
        </Link>
        <button onClick={handleResetVotes} style={{ color: 'black', textDecoration: 'none' }}>
      Reset the votes
    </button>
        <Link to="/">
          <p style={{ color: 'black', textDecoration: 'none' }}>Logout</p>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {teamVoteCounts.map((teamCount) => (
            <tr key={teamCount._id}>
              <td>{teamCount._id}</td>
              <td>{teamCount.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <p>Winning team: {winningTeam}</p>
    </div>
  );
}

export default Result;
