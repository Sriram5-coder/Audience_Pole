import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./landing.css";

function Success() {

  return (
    <div className="landing-container">
      <Link to="/formforvote">
        <h1 style={{color:'Green'}}>Vote submitted successfully!</h1>
        <button className="centered-button">Get Started</button>
      </Link>
    </div>
  );
}

export default Success;
