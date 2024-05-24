import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./landing.css";

function Failure() {
  return (
    <div className="landing-container">
      <Link to="/formforvote">
        <h3 style={{color:'red'}}>Failed to Vote(wrong roll number or Duplicate vote)</h3>
        <button className="centered-button">Get Started</button>
      </Link>
    </div>
  );
}

export default Failure;
